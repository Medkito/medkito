import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Pacient } from "../../../entity/Pacient";
import { MyContext } from "../../../types/MyContext";
import { EditPacientInput } from "../inputs/EditPacientInput";

// @Resolver()
// export class PacientProfileResolver {
//     @Authorized()
//     @Mutation(() => Pacient, { nullable: true, complexity: 5 })
//     async editPacientInfo(
//         @Ctx() ctx: MyContext,
//         @Arg("data")
//         { sex, height, weight, birthDate }: EditPacientInput
//     ): Promise<Pacient> {
//         try {
//             const pacient = await Pacient.findOne(ctx.currentUser!.id);
//             const data = { sex, height, weight, birthDate };

//             if (pacient) {
//                 await Pacient.update(ctx.currentUser!.id, data);

//                 const updatedPacient = Pacient.merge(pacient, data);
//                 return updatedPacient;
//             }

//             throw Error("pacient invalid")
//         } catch (error) {
//             throw Error("eroare la modificare")
//         }
//     }
// }
