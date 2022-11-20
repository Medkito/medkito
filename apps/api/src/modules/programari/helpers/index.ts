import { endOfDay, startOfDay } from 'date-fns';
import moment from "moment";
import { Between } from 'typeorm';
import { Programare } from "../../../entity/Programare";
import { Interval, ProgramMedic, ZiDeLucru } from "../../../entity/ProgramMedic";
import { User } from "../../../entity/User";

var getISODay = require('date-fns/getISODay')


export const getWeekdayFromDate = (data: Date) => {
    const zile = ["luni", "marti", "miercuri", "joi", "vineri", "sambata", "duminica"];

    try {
        const index = getISODay(data) - 1;
        return zile[index];
    } catch (error) {
        return null;
    }
}

export const createProgramForMedic = async (medicId: number) => {
    const program = new ProgramMedic();
    const medic = await User.findOne(medicId)

    const ziDefault: ZiDeLucru = { workingHours: { oraInceput: "08:00", oraSfarsit: "16:00" }, pauze: [] }
    program.luni = ziDefault;
    program.marti = ziDefault;
    program.miercuri = ziDefault;
    program.joi = ziDefault;
    program.vineri = ziDefault;
    program.medic = medic;

    await program.save();
}

export const getLocuriTotaleDinProgram = (program: ProgramMedic, data: Date) => {
    const ziLucru = getWeekdayFromDate(data);
    if (!ziLucru) {
        return [];
    }

    if (!program[`${ziLucru}`]) {
        return [];
    }

    const { workingHours }: ZiDeLucru = program[`${ziLucru}`];

    return genereazaIntervale(workingHours.oraInceput, workingHours.oraSfarsit, program.durataConsultatie)
}

export const getLocuriOcupate = async (data: Date, medic: User): Promise<Interval[]> => {
    const programari = await Programare.find({
        where: {
            medic,
            startDate: Between(startOfDay(data).toISOString(), endOfDay(data).toISOString()),
        }
    })


    const resp: Interval[] = programari.map(programare => {
        return {
            oraInceput: moment(programare.startDate).format("HH:mm"),
            oraSfarsit: moment(programare.endDate).format("HH:mm")
        }
    })

    return resp;
}

export function genereazaIntervale(oraInceput, oraSfarsit, duration = 15): Interval[] {

    const dateObj = new Date();
    const dateStr = dateObj.toISOString().split('T').shift();

    var start = moment(`${dateStr} ${oraInceput}`, 'YYYY-MM-DD hh:mm a');
    var end = moment(`${dateStr} ${oraSfarsit}`, 'YYYY-MM-DD hh:mm a');

    start.minutes(Math.ceil(start.minutes() / duration) * duration);

    var result = [];
    var current = moment(start);

    while (current <= end) {
        result.push(current.format('HH:mm'));
        current.add(duration, 'minutes');
    }

    let resp = []

    result.forEach((el, index) => {

        const isLast = index === (result.length - 1);

        if (!isLast) {
            resp.push({ oraInceput: el, oraSfarsit: result[index + 1] })
        }
    })

    return resp;
}