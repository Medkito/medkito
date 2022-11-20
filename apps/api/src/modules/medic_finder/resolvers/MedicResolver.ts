import { Arg, Authorized, Int, Query, Resolver } from "type-graphql";
import { MedicSpecialty } from "../../../entity/MedicSpecialty";
import { User } from "../../../entity/User";

@Resolver()
export class MedicResolver {
  @Authorized()
  @Query(() => [User])
  async findMedicBySpecialty(
    @Arg("specialtyId", () => Int) specialtyId: number
  ) {
    const links = await MedicSpecialty.find({
      where: { specialtyId },
      select: ["userId"],
    });
    const userIds = links.map((link) => link.userId);
    return User.findByIds(userIds);
  }

  @Authorized()
  @Query(() => User)
  async getMedic(@Arg("medicId", () => Int) medicId: number) {
    return User.findOne(medicId);
  }
}
