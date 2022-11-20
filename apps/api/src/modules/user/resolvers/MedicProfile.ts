import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MedicSpecialty } from "../../../entity/MedicSpecialty";
import { Specialty } from "../../../entity/Specialty";
import { User } from "../../../entity/User";
import { MyContext } from "../../../types/MyContext";
import CurrentUser from "../../../utils/decorators/currentUser";
@ObjectType("MedicStats")
export class MedicStats {
  @Field()
  intrebariActive: number;

  @Field()
  cazuriRezolvate: number;

  @Field()
  consultatiiTotale: number;
}

@Resolver()
export class MedicProfileResolver {
  @Mutation(() => Boolean)
  async addSpecialtyToMedic(
    @Arg("userId", () => Int) userId: number,
    @Arg("specialtyId", () => Int) specialtyId: number
  ) {
    const user = await User.findOne(userId);
    const specialty = await Specialty.findOne(specialtyId);

    const ms = new MedicSpecialty();
    ms.userId = user.id;
    ms.specialtyId = specialty.id;

    await ms.save();

    return true;
  }

  @Authorized()
  @Query(() => MedicStats, { nullable: true })
  async medicMainStats(
    @Ctx() context: MyContext,
    @CurrentUser() currentUser: User
  ): Promise<MedicStats> {
    const user = await User.findOne(currentUser.id);

    return {
      intrebariActive: 0,
      cazuriRezolvate: 0,
      consultatiiTotale: 0,
    };
  }
}
