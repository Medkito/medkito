import { endOfDay, startOfDay } from 'date-fns';
import GraphQLJSON from 'graphql-type-json';
import moment from 'moment';
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Between } from 'typeorm';
import { Pacient } from '../../../entity/Pacient';
import { Programare } from "../../../entity/Programare";
import { Interval, ProgramMedic } from "../../../entity/ProgramMedic";
import { User } from "../../../entity/User";
import { MyContext } from '../../../types/MyContext';
import { createProgramForMedic, getLocuriOcupate, getLocuriTotaleDinProgram } from '../helpers';

@Resolver()
export class ProgramariResolver {
    @Authorized("ADMIN")
    @Mutation(() => Boolean)
    async addProgramMedic(@Arg("medicId", () => Int) medicId: number,
    ): Promise<boolean> {
        await createProgramForMedic(medicId);
        return true;
    }

    @Authorized()
    @Mutation(() => Boolean)
    async doProgramarePacient(
        @Ctx() ctx: MyContext,
        @Arg("medicId", () => Int) medicId: number,
        @Arg("startDate") startDate: Date,
    ): Promise<boolean> {
        const medic = await User.findOne(medicId)
        const pacient = await Pacient.findOne({ where: { id: ctx.currentUser!.id } });
        const program = await ProgramMedic.findOne({ where: { medic, isException: false } })

        // verific daca e o data valida in program
        // verific daca e ocupat folosind un lock

        const ocupat = await Programare.findOne({
            where: {
                medic,
                startDate
            }
        })

        if (ocupat) {
            return false
        }

        const programare = new Programare();
        programare.medic = medic;
        programare.pacient = pacient;
        programare.startDate = startDate;
        programare.endDate = moment(startDate).add(program.durataConsultatie, "minute").toDate()

        await programare.save()
        return true;
    }


    @Authorized()
    @Query(() => [GraphQLJSON])
    async oreDisponibile(@Arg("medicId", () => Int) medicId: number, @Arg("data") data: Date): Promise<Interval[]> {
        try {
            const medic = await User.findOne(medicId);
            const program = await ProgramMedic.findOne({ where: { medic, isException: false } })
            const now = new Date()
            if (startOfDay(data).toISOString() === startOfDay(now).toISOString()) {
                return [];
            }
            // verificam orele disponibile in functie de programul medicului
            let locuriPosibile = getLocuriTotaleDinProgram(program, data)
            // cautam programarile din data aleasa
            let locuriOcupate = await getLocuriOcupate(data, medic)
            // eliminam intervalele care sunt ocupate
            let resp: Interval[] = locuriPosibile.filter(loc =>
                !locuriOcupate.find(e =>
                    e.oraInceput === loc.oraInceput
                    && e.oraSfarsit === loc.oraSfarsit))
            return resp
        } catch (error) {
            throw Error("failed to get ore")
        }
    }


    @Authorized("ADMIN")
    @Query(() => [Programare])
    async programari(): Promise<Programare[]> {
        return Programare.find();
    }

    @Authorized()
    @Query(() => ProgramMedic)
    async getProgramMedic(@Ctx() ctx: MyContext): Promise<ProgramMedic> {
        const medic = await User.findOne(ctx.currentUser!.id)
        return ProgramMedic.findOne({ where: { medic, isException: false } });
    }

    @Authorized()
    @Query(() => [Programare])
    async getProgramariMedicForToday(@Ctx() ctx: MyContext): Promise<Programare[]> {
        const medic = await User.findOne(ctx.currentUser!.id)
        const now = new Date()
        return Programare.find({ where: { medic, startDate: Between(startOfDay(now).toISOString(), endOfDay(now).toISOString()), } });
    }

    @Authorized()
    @Query(() => [Programare])
    async getProgramariMedic(@Ctx() ctx: MyContext): Promise<Programare[]> {
        const medic = await User.findOne(ctx.currentUser!.id)
        return Programare.find({ where: { medic } });
    }

    @Authorized()
    @Query(() => [Programare])
    async getProgramariPacient(@Ctx() ctx: MyContext): Promise<Programare[]> {
        const pacient = await Pacient.findOne(ctx.currentUser!.id)
        return Programare.find({ where: { pacient } });
    }


    @Authorized("ADMIN")
    @Query(() => [ProgramMedic])
    async programe_medici(): Promise<ProgramMedic[]> {
        return ProgramMedic.find();
    }
}


