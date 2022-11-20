import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Consultation } from "./Consultation";
import { Pacient } from "./Pacient";
import { User } from "./User";

@ObjectType()
@Entity()
export class Programare extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: true })
  @Column({ type: "timestamp with time zone", nullable: false })
  startDate: Date;

  @Field({ nullable: true })
  @Column({ type: "timestamp with time zone", nullable: false })
  endDate: Date;

  @Field((type) => Pacient)
  @ManyToOne((type) => Pacient, { eager: true })
  pacient: Pacient;

  @Field((type) => User)
  @ManyToOne((type) => User, { eager: true })
  medic: User;

  @Field((type) => Consultation, { nullable: true })
  @OneToOne(() => Consultation, (consultation) => consultation.programare, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  consultation: Consultation;
}
