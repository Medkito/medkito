import { compare } from "bcryptjs";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Resolver
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../../entity/User";
import { MyContext } from "../../../types/MyContext";
import { createAccessToken, createRefreshToken } from "../../../utils/auth";
import { sendRefreshToken } from "../../../utils/sendRefreshToken";

@ObjectType("LoginResponse")
export class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Email sau parola gresite");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("Email sau parola gresite");
    }

    // if (!user.confirmed) {
    //   throw new Error("Contul nu este confirmat, verifica email");
    // }

    // login successful

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");

    return true;
  }

  @Authorized("ADMIN")
  @Mutation(() => Boolean)
  async revocaRefreshTokenUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }
}
