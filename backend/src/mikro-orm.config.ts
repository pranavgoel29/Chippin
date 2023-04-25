import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";



export default {
  migrations: {
    // Making sure we are using the right path, creating a absolute path.
    path: path.join(__dirname, "./migrations"),
    // regex pattern for migration files, [tj] allows us to have both 'ts' and 'js' files.
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: "lireddit",
  user: "postgres",
  password: "admin",
  type: "postgresql",
  debug: __prod__,
} as Parameters<typeof MikroORM.init>[0];
