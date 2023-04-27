import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Budget extends BaseEntity {
  // 'Field' exposes the data for the query, removing it will result in not able to query it.
  // @Field(() => Int)
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  price!: string;

  @Field()
  @Column()
  creator_id: number;

  @ManyToOne(() => User, (user) => user.budgets)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated_at: Date;
}
