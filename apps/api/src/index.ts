import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import console from "console";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import Express from "express";
import http from "http";
import { verify } from "jsonwebtoken";
import "reflect-metadata";
import { User } from "./entity/User";
import { Scheduler } from "./Scheduler";
import { createAccessToken, createRefreshToken } from "./utils/auth";
import connectToDB from "./utils/connectToDB";
import { createSchema } from "./utils/createSchema";
import { sendRefreshToken } from "./utils/sendRefreshToken";

const main = async () => {
  await connectToDB();
  console.log("CONNECTED TO DB");

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res, connection }: any) => {
      if (connection) {
        return {
          currentUser: connection.context.currentUser,
        };
      }

      return {
        req,
        res,
      };
    },
    subscriptions: {
      path: "/subscriptions",
      onConnect: async (connectionParams: any, webSocket, context: any) => {
        if (connectionParams.authToken) {
          return new Promise((resolve, reject) => {
            const token = connectionParams.authToken;
            const payload = verify(
              token,
              process.env.ACCESS_TOKEN_SECRET!
            ) as any;
            const { userId } = payload;

            if (!payload) {
              reject(new Error("dada"));
            }

            resolve({ userId });
          })
            .then(async (resp: any): Promise<any> => {
              const { userId } = resp;
              const user = await User.findOne({ where: { id: userId } });
              return { entity: user };
            })
            .then(({ entity }) => {
              return {
                currentUser: entity,
              };
            });
        }

        throw new Error("Missing auth token!");
      },
      // other options and hooks, like `onConnect`
    },
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    introspection: true,
  });

  const app = Express();

  const httpServer = http.createServer(app);

  apolloServer.installSubscriptionHandlers(httpServer);

  app.set("trust proxy", true);
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(cors({ origin: true, credentials: true }));

  app.get("/", (_req, res) => res.send("Medkito Server"));

  app.post("/refreshToken", async (req, res) => {
    console.log("REFRESHING ACCES TOKEN");

    const token = req.cookies.rtoken;
    if (!token) {
      console.log("ACCES TOKEN not present");

      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log("ACCES TOKEN invalid");

      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    console.log("ACCES TOKEN send");

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  apolloServer.applyMiddleware({ app, cors: false, path: "/api" });

  const PORT = process.env.PORT || 4000;
  const HOST = process.env.HOST || "localhost";
  const scheduler = Scheduler.getInstance();

  httpServer.listen(PORT, function () {
    console.log("API LISTENING ON PORT", PORT);
    console.log(
      `Subscriptions ready at ws://${HOST}:${PORT}${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch((err) => console.error(err));
