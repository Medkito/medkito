import { id } from "date-fns/locale";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Prescription } from "../../../entity/Prescription";
import { PrescriptionItem } from "../../../entity/PrescriptionItem";
import { Programare } from "../../../entity/Programare";
import { User } from "../../../entity/User";
import { MyContext } from "../../../types/MyContext";
import { PrescriptionEntry } from "../inputs/PrescriptionEntryInput";

@Resolver()
export class PrescriptionResolver {
  @Authorized()
  @Mutation(() => Prescription)
  async createPrescription(
    @Ctx() ctx: MyContext,
    @Arg("programareId", () => String) programareId: string,
    @Arg("items", () => [PrescriptionEntry]) items: PrescriptionEntry[]
  ) {
    const medic = await User.findOne({
      where: { id: ctx.currentUser!.id },
    });
    const programare = await Programare.findOne(programareId, {
      relations: ["pacient"],
    });
    const pacient = programare.pacient;

    const prescription = new Prescription();
    prescription.medic = medic;
    prescription.pacient = pacient;
    await prescription.save();

    await Promise.all(
      items.map(async (item) => {
        const id = await createPrescriptionItem(prescription.id, item);
        return id;
      })
    );

    return null;
  }

  @Authorized()
  @Query(() => Prescription)
  async getPrescription(
    @Ctx() ctx: MyContext,
    @Arg("prescriptionId", () => String) prescriptionId: string
  ) {
    return Prescription.findOne(prescriptionId, {
      relations: ["items", "items.medicament"],
    });
  }
}

const createPrescriptionItem = async (
  prescriptionId,
  item: PrescriptionEntry
) => {
  const newItem = new PrescriptionItem();
  newItem.cantitate = item.cantitate;
  newItem.zile = item.zile;
  newItem.interval = item.interval;
  newItem.medicamentId = item.medicamentId;
  newItem.prescriptionId = prescriptionId;

  await newItem.save();

  return id;
};
