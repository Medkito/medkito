import { MedicSpecialty } from "../../../entity/MedicSpecialty";
import { Specialty } from "../../../entity/Specialty";
import { User } from "../../../entity/User";

export const addSpecialtyToMedic = async (user: User, specialty: Specialty): Promise<boolean> => {
    const ms = new MedicSpecialty();
    ms.userId = user.id;
    ms.specialtyId = specialty.id;
    await ms.save()
    return true;
}