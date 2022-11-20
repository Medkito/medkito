import { buildSchema } from "type-graphql";
import { checkAuth } from "../middleware/isAuth";
import getSrcPath from "./getSrcPath";
import pubSub from "./pubSub";

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === "production";
const ext = isProduction ? "js" : "ts";

export const createSchema = () =>
  buildSchema({
    resolvers: [getSrcPath() + `/modules/**/resolvers/*.${ext}`],
    authChecker: ({ context }, roles) => {
      return checkAuth(context, roles);
    },
    pubSub, // redis-based instance of PubSub
  });
