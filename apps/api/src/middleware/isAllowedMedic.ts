import { MiddlewareFn } from "type-graphql";
import { Programare } from "../entity/Programare";
import { MyContext } from "../types/MyContext";
import { checkAuth } from "./isAuth";

export const isAllowedMedic: MiddlewareFn<MyContext> = async (
  { context, info, args }: any,
  next
) => {
  if (!checkAuth(context, null)) {
    throw new Error("Not authenticated");
  }

  try {
    const currentUser = context.currentUser;
    if (args.programareId) {
      const programare = await Programare.findOne(args.programareId);
      if (!programare) {
        throw Error("invalid programare");
      }

      if (programare.medic.id !== currentUser.id) {
        throw Error("unauthorized");
      }
    } else {
      throw Error("invalid args");
    }
  } catch (error) {
    throw new Error(error);
  }

  return next();
};
