import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  // 'Field' exposes the data for the query, removing it will result in not able to query it.
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  created_at = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updated_at = new Date();

  @Field()
  @Property({ type: "text", unique: true })
  username!: string;

  @Property({ type: "text" })
  password!: string;
}
