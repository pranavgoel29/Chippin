import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { ExpenseResolver } from "./resolvers/expense";
import { UserResolver } from "./resolvers/user";
import connectRedis from "connect-redis";
import session from "express-session";

import * as dotenv from "dotenv";
dotenv.config();

// import redis from "ioredis";

import { createClient } from "redis";

import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Expense } from "./entities/Expense";
import { Budget } from "./entities/Budget";
import { BudgetResolver } from "./resolvers/budget";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

// import { createClient } from "redis";

// import { MyContext } from "./resolvers/types";

// import cors from "cors";

const connectionString: string = process.env.POSTGRES_URL as string;

const connectionOptions: PostgresConnectionOptions = {
  type: "postgres",
  url: connectionString, // Use 'url' instead of 'database', 'username', 'password', etc.
  logging: true, // Set to false in production
  synchronize: true, // Set to false in production
  entities: [Expense, User, Budget],
};

export const connData = new DataSource(connectionOptions);

const main = async () => {
  const conn = await connData;
  await conn.initialize();

  // To delete a certain thing in the db, turn synchronize as false when doing this.
  // await User.delete({})

  // const orm = await MikroORM.init(microConfig);
  // await orm.getMigrator().up();

  // // We have to form it or otherwise Entity manager won't work.
  // const emFork = orm.em.fork();

  const app = express();
  // If we want to ignore req, or any other variable we can make it underscore.
  // app.get("/", (_, res) => {
  //   res.send('Hello')
  // });

  // remove (session), it is deperecated in the V7 of reddis-connect.
  const RedisStore = connectRedis;
  // const redisClient = new redis();
  // const redisClient = createClient();

  const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });

  // // Add 'await connect()' to remove the Error: The client is closed error.
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
      name: COOKIE_NAME,
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
      resolvers: [HelloResolver, ExpenseResolver, UserResolver, BudgetResolver],
      validate: false,
    }),
    introspection: true,

    // context is a speacial object that is acessible by all of our resolvers.
    // Adding ': MyContext' for types checking.
    context: ({ req, res }) => ({ req, res, redisClient }),
  });

  await apolloserver.start();
  apolloserver.applyMiddleware({
    app,

    // Adding this to handle cross origin requests that will be going to the apollo studio.

    cors: {
      origin: [
        "https://chippin.vercel.app",
      ],
      
      credentials: true,
    },
  });
  

  const port = process.env.PORT || 4000;

  // Setting proxy for handling cookies
  app.set("trust proxy", 1);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
};

main().catch((err) => {
  console.error(err);
});
