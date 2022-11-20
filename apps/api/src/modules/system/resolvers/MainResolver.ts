import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { Diagnostic } from "../../../entity/Diagnostic";
import { Medicament } from "../../../entity/Medicament";
import { Specialty } from "../../../entity/Specialty";
import { Symptom } from "../../../entity/Symptom";
import { User } from "../../../entity/User";
import { linkSymptomToDiagnostic, numarDiagnostice } from "../helpers";

@Resolver()
export class MainResolver {
    @Authorized("ADMIN")
    @Mutation(() => Boolean)
    async addSpecialty(@Arg("name") name: string,
    ): Promise<boolean> {
        const specialty = new Specialty()
        specialty.denumire = name;
        await specialty.save()
        return true;
    }

    @Authorized("ADMIN")
    @Mutation(() => Medicament)
    async addMedicament(@Arg("name") name: string,
    ): Promise<Medicament> {
        const medicament = new Medicament()
        medicament.name = name;
        await medicament.save()
        return medicament;
    }

    @Authorized("ADMIN")
    @Mutation(() => Diagnostic)
    async addDiagnostic(@Arg("name") name: string,
        @Arg("specialtyId", () => Int) specialtyId: number,
        @Arg("symptomsIds", () => [Int]) symptomsIds: number[],
    ): Promise<Diagnostic> {
        const specialty = await Specialty.findOne(specialtyId);
        if (!specialty) {
            throw Error("invalid specialty");
        }
        const diag = new Diagnostic()
        diag.name = name;
        diag.specialty = specialty;
        await diag.save()

        try {
            const promises = symptomsIds.map(symptomId => { return linkSymptomToDiagnostic(diag.id, symptomId) })
            await Promise.all(promises)
        } catch (error) {
            await diag.remove();
        }

        return diag;
    }

    @Authorized("ADMIN")
    @Mutation(() => Symptom)
    async addSymptom(@Arg("name") name: string,
    ): Promise<Symptom> {
        const sym = new Symptom()
        sym.name = name;
        await sym.save()
        return sym;
    }

    @Authorized("ADMIN")
    @Mutation(() => Boolean)
    async addSymptomToDiagnostic(
        @Arg("diagnosticId", () => Int) diagnosticId: number,
        @Arg("symptomId", () => Int) symptomId: number,
    ): Promise<Boolean> {
        await linkSymptomToDiagnostic(diagnosticId, symptomId)
        return true
    }

    @Authorized("ADMIN")
    @Mutation(() => Boolean)
    async addDiagnosticToSpecialty(
        @Arg("diagnosticId", () => Int) diagnosticId: number,
        @Arg("specialtyId", () => Int) specialtyId: number,
    ): Promise<Boolean> {

        const diagnostic = await Diagnostic.findOne(diagnosticId);
        const specialty = await Specialty.findOne(specialtyId);

        if (!diagnostic || !specialty) {
            return false;
        }

        diagnostic.specialty = specialty;
        await diagnostic.save()
        return true
    }

    @Query(() => [Specialty])
    async specialties() {
        return Specialty.find();
    }

    @Query(() => [Medicament])
    async medicamente() {
        return Medicament.find();
    }

    @Query(() => [Diagnostic])
    async diagnostice() {
        return Diagnostic.find();
    }

    @Authorized("ADMIN")
    @Query(() => [User])
    async medics() {
        return User.find();
    }

    @Query(() => [Symptom])
    async symptoms() {
        return Symptom.find();
    }

    @Query(() => [Specialty], { nullable: true })
    async findSpecializariFaraDiagnostice() {
        const toateSpecializarile = await Specialty.find();
        const promises = toateSpecializarile.map(x => {
            return numarDiagnostice(x)
        })
        const cnt = await Promise.all(promises)
        return toateSpecializarile.filter((x, index) => cnt[index] === 0);
    }
}
