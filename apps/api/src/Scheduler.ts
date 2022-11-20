import moment from "moment";
import { Between, LessThan } from "typeorm";
import { Consultation } from "./entity/Consultation";
import { Programare } from "./entity/Programare";
import pubSub from "./utils/pubSub";

var CronJob = require("cron").CronJob;
export class Scheduler {
  private static instance: Scheduler;
  private job: any;
  private idle = true;

  private constructor() {
    this.job = new CronJob({
      cronTime: "*/10 * * * * *",
      onTick: () => {
        console.log("ruleaza cronjob");
        // creeaza proces nou
        if (this.idle) {
          this.idle = false;
          this.verificaProgramari();
        }
      },
      start: true,
      timeZone: "Europe/Bucharest",
    });
  }

  static getInstance(): Scheduler {
    if (!Scheduler.instance) {
      Scheduler.instance = new Scheduler();
    }
    return Scheduler.instance;
  }

  private createConsultations = async (programari: Programare[]) => {
    let promises = [];
    programari.forEach((programare) => {
      promises.push(this.handleProgramare(programare));
    });
    await Promise.all(promises);
  };

  private handleProgramare = async (programare: Programare) => {
    const consultation = new Consultation();
    consultation.pacient = programare.pacient;
    consultation.medic = programare.medic;
    consultation.programare = programare;
    programare.consultation = consultation;
    await consultation.save();
    const payload = {
      pacientId: consultation.pacient.id,
      medicId: consultation.medic.id,
      id: consultation.id,
    };
    await pubSub.publish("NEW_CONSULTATION", payload);
  };

  private verificaProgramari = async () => {
    // gaseste progrmari care nu au consultatie
    // assignata si au date - Date.now() < 20 sec || Date.now() > date
    const now = new Date();
    const now_20 = moment(now).add(20, "s").toDate();
    const programari = await Programare.find({
      where: [
        { consultation: null, startDate: LessThan(now) },
        { consultation: null, startDate: Between(now, now_20) },
      ],
    });
    await this.createConsultations(programari);
    this.idle = true;
  };
}
