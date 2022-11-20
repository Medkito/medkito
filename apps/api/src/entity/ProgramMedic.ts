import GraphQLJSON from "graphql-type-json";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

export interface Interval {
  oraInceput: string;
  oraSfarsit: string;
}

export interface ZiDeLucru {
  workingHours: Interval;
  pauze: Interval[];
}

@ObjectType()
@Entity()
export class ProgramMedic extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => GraphQLJSON)
  @Column("jsonb", { nullable: false })
  luni: ZiDeLucru;

  @Field(() => GraphQLJSON)
  @Column("jsonb", { nullable: false })
  marti: ZiDeLucru;

  @Field(() => GraphQLJSON)
  @Column("jsonb", { nullable: false })
  miercuri: ZiDeLucru;

  @Field(() => GraphQLJSON)
  @Column("jsonb", { nullable: false })
  joi: ZiDeLucru;

  @Field(() => GraphQLJSON)
  @Column("jsonb", { nullable: false })
  vineri: ZiDeLucru;

  @Field()
  @Column("boolean", { default: false })
  isException: boolean;

  @Field({ nullable: true })
  @Column({ type: "timestamp with time zone", nullable: true })
  exceptionStart: Date;

  @Field({ nullable: true })
  @Column({ type: "timestamp with time zone", nullable: true })
  exceptionEnd: Date;

  @Field({ nullable: false })
  @Column("int", { default: 60 })
  durataConsultatie: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.programe, { eager: true })
  medic: User;
}
