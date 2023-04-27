import { MyContext } from "src/resolvers/types";
import { MiddlewareFn } from "type-graphql";


// Auth check middleware
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not Authenticated");
  }

  return next();
};
