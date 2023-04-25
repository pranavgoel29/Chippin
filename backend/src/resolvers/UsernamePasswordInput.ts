import { InputType, Field } from "type-graphql";

// import { COOKIE } from "../constants";
@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}
