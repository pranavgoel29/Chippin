import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import connectRedis from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import { sendEmail } from "./utils/sendEmail";
// import { MyContext } from "./resolvers/types";

// import cors from "cors";

const main = async () => {
  sendEmail('bob@bobemail.com', 'Hello there')
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  // We have to form it or otherwise Entity manager won't work.
  const emFork = orm.em.fork();

  const app = express();
  // If we want to ignore req, or any other variable we can make it underscore.
  // app.get("/", (_, res) => {
  //   res.send('Hello')
  // });

  // remove (session), it is deperecated in the V7 of reddis-connect.
  const RedisStore = connectRedis;
  const redisClient = createClient();

  // Add 'await connect()' to remove the Error: The client is closed error.
  await redisClient.connect();

  // Comment this out when using the apollo Provider
  // app.use(
  //   cors({
  //     origin: "http://127.0.0.1:5173",
  //     credentials: true,
  //   })
  // );

  // Session middleware should always come before apollo middleware in this configuration.
  app.use(
    session({
      name: "qid",
      // WE can add how long will the data last in the redis.
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),

      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        // Because of 'httpOnly: true' we can not access the cookie in the front-end hence making it more secure.
        httpOnly: true,
        sameSite: "none", // csrf, allow the user to maintain a logged in status while arriving from an external link.

        secure: true, //Cookie only works in https, here we are setting it as prod so we can run it in our local env properly.
      },
      saveUninitialized: false, //It will not store any empty session data now, we have set it to false
      secret: "cujnjdcsjdcvfdvjfdnvj", // This should be hidden maybe in env files.
      resave: false,
    })
  );

  const apolloserver = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    introspection: true,

    // context is a speacial object that is acessible by all of our resolvers.
    // Adding ': MyContext' for types checking.
    context: ({ req, res }) => ({ em: emFork, req, res }),
  });

  await apolloserver.start();
  apolloserver.applyMiddleware({
    app,

    // Adding this to handle cross origin requests that will be going to the apollo studio.

    cors: {
      // origin: ["https://studio.apollographql.com"],
      origin: ["http://127.0.0.1:5173"],
      credentials: true,
    },
  });

  // Setting proxy for handling cookies
  app.set("trust proxy", 1);

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
