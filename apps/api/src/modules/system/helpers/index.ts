import { Diagnostic } from "../../../entity/Diagnostic";
import { DiagnosticSymptom } from "../../../entity/DiagnosticSymptom";
import { Symptom } from "../../../entity/Symptom";


export const linkSymptomToDiagnostic = async (diagnosticId: number, symptomId: number): Promise<Boolean> => {

    const diagnostic = await Diagnostic.findOne(diagnosticId);
    const symptom = await Symptom.findOne(symptomId);

    if (!diagnostic || !symptom) {
        return false;
    }

    const alreadyLinked = await DiagnosticSymptom.findOne({
        where: {
            symptom,
            diagnostic
        }
    })

    if (alreadyLinked) {
        throw Error("already linked")
    }

    const link = new DiagnosticSymptom();
    link.diagnosticId = diagnosticId;
    link.symptomId = symptomId;

    await link.save()

    return true
}


export const numarDiagnostice = async (specialty) => {
    const [diag, cnt] = await Diagnostic.findAndCount({ where: { specialty } })
    return cnt
}