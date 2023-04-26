import {
  Resolver,
  Mutation,
  Arg,
  Field,
  Ctx,
  ObjectType,
  Query,
} from "type-graphql";
import { MyContext } from "./types";
import { User } from "../entities/User";
import { RequiredEntityData } from "@mikro-orm/core";
import argon2 from "argon2";
import { EntityManager } from "@mikro-orm/postgresql";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import validateRegister from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";

// This will just import v4 of uuid creator
import { v4 } from "uuid";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  // We have to explicitly set the type here because we are using nullable here
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { em, req, redisClient }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Length must be greater than 2",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    // Looking up the token in redis
    const userId = await redisClient.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Token Expired",
          },
        ],
      };
    }

    const user = await em.findOne(User, { id: parseInt(userId) });

    if (!user) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "User no longer exists",
          },
        ],
      };
    }

    user.password = await argon2.hash(newPassword);
    await em.persistAndFlush(user);

    await redisClient.del(key);
    console.log("delete", redisClient.del(key));

    // login the user after the password has been set
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { em, redisClient }: MyContext
  ) {
    const user = await em.findOne(User, { email });
    // console.log(user);
    if (!user) {
      // email is not there in the database
      return true;
    }

    const token = v4();

    await redisClient.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "PX",

      // Setting expiration time of the forgot password token
      1000 * 60 * 60 * 24 // 1 day
    );

    await sendEmail(
      email,
      `<a href="http://127.0.0.1:5173/change-password/${token}">Reset Password</a>`
    );

    return true;
  }

  // me query
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    console.log("Session: ", req.session);
    // /Not logged-in
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    console.log("user", user);
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);

    let user;
    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          username: options.username,
          email: options.email,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        } as any)
        .returning("*");
      user = result[0];
    } catch (err) {
      console.log(err);
      if (err.code === "23505") {
        // duplicate username error
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
      //   console.log("message: ", err.message);
    }

    // Store user Id session
    // This will set a cokkie on the user.
    // It will help us to keep them logged in.
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(
      User,
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : ({ username: usernameOrEmail } as RequiredEntityData<User>)
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "That username doesn't exists.",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [{ field: "password", message: "Incorrect password" }],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    // console.log("cookie deleted");
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        //   res.cookie("qid", "", { expires: new Date() })

        res.clearCookie(COOKIE_NAME);
        console.log("cookie deleted");
        resolve(true);
      })
    );
  }
}
