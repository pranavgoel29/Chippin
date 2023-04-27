import { Budget } from "../entities/Budget";

import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
} from "type-graphql";
import { MyContext } from "./types";
import { isAuth } from "../middleware/isAuth";
import { connData } from "../index";

@InputType()
class BudgetInput {
  @Field()
  title: string;

  @Field()
  price: string;
}

@Resolver()
export class BudgetResolver {
  // All Budget query
  @Query(() => [Budget])
  async budgets(@Ctx() { req }: MyContext): Promise<Budget[]> {
    const qb = await connData
      .getRepository(Budget)
      .createQueryBuilder("p")
      .orderBy("created_at", "DESC");

    if (req.session.userId) {
      qb.where("creator_id = :user_id", {
        user_id: req.session.userId,
      });
    }

    return qb.getMany();
  }

  // Single Budget query
  @Query(() => Budget, { nullable: true })
  // destructuring the ctx as it will provide cleaner syntax.
  budget(@Arg("id") id: number): Promise<Budget | undefined> {
    //@ts-ignore
    return Budget.findOne({ where: { id: id } });
  }

  // Creating Budget
  @Mutation(() => Budget)
  @UseMiddleware(isAuth) // Any where we want to check anything we can just have this middleware check there and pass the function that will return the values and based on that it will run the following mutations or queries.
  async createBudget(
    @Arg("input") input: BudgetInput, // The string type will get Infered here.
    @Ctx() { req }: MyContext
  ): Promise<Budget> {
    return Budget.create({ ...input, creator_id: req.session.userId }).save();
  }

  // Updating Budget
  @Mutation(() => Budget, { nullable: true })
  async updateBudget(
    @Arg("id") id: number,
    // For making a field optional we have to make it 'nullable' and to make it nullable, we have to explicitly set the type.
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Budget | null> {
    const budget = await Budget.findOne({ where: { id: id } });
    if (!budget) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Budget.update({ id }, { title });
    }
    return budget;
  }

  // Delete Budget
  @Mutation(() => Boolean) // returning boolean to just get whether it worked or not.
  async deleteBudget(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Budget.delete(id);
    return true;
  }
}
