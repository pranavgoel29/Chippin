import { Expense } from "../entities/Expense";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "./types";
import { isAuth } from "../middleware/isAuth";

@InputType()
class ExpenseInput {
  @Field()
  title: string;

  @Field()
  price: number;
}

@Resolver()
export class ExpenseResolver {
  // All Expenses query
  @Query(() => [Expense])
  // destructuring the ctx as it will provide cleaner syntax.
  async expenses(): Promise<Expense[]> {
    // find will return a promise of expenses.
    return Expense.find();
  }

  // Single Expense query
  @Query(() => Expense, { nullable: true })
  // destructuring the ctx as it will provide cleaner syntax.
  expense(
    // Taking argument 'id' for returning a single expense.
    @Arg("id") id: number
  ): Promise<Expense | undefined> {
    // findOne will return a single one expense, giving 'id' in curly braces simply says where id id equal to this.
    //@ts-ignore
    return Expense.findOne({ where: { id: id } });
  }

  // Creating Expense
  @Mutation(() => Expense)
  @UseMiddleware(isAuth) // Any where we want to check anything we can just have this middleware check there and pass the function that will return the values and based on that it will run the following mutations or queries.
  async createPost(
    // Taking argument 'title' for new expense
    @Arg("input") input: ExpenseInput, // The string type will get Infered here.
    @Ctx() { req }: MyContext
  ): Promise<Expense> {
    return Expense.create({ ...input, creatorId: req.session.userId }).save();
  }

  // Updating Expense
  @Mutation(() => Expense, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    // For making a field optional we have to make it 'nullable' and to make it nullable, we have to exxplicitly set the type.
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Expense | null> {
    // fetching the expense to update.
    const expense = await Expense.findOne({ where: { id: id } });
    if (!expense) {
      // If we can't find the id of the expense, means expense is not there return 'null'.
      return null;
    }
    if (typeof title !== "undefined") {
      await Expense.update({ id }, { title });
    }
    return expense;
  }

  // Delete Expense
  @Mutation(() => Boolean) // returning boolean to just get whether it worked or not.
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    await Expense.delete(id);
    return true;
  }
}
