import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Pacient } from "./Pacient";
import { Programare } from "./Programare";
import { User } from "./User";

@ObjectType("Consultation")
@Entity()
export class Consultation extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => Pacient)
  @ManyToOne((type) => Pacient, { eager: true })
  pacient: Pacient;

  @Field((type) => User)
  @ManyToOne((type) => User, { eager: true })
  medic: User;

  @Field()
  @Column("bool", { default: false })
  isClosed: boolean;

  @OneToOne(() => Programare, (programare) => programare.consultation, {
    nullable: true,
  })
  programare: Programare;

  @Field({ nullable: true })
  @Column({ type: "timestamp with time zone", nullable: true })
  closedAt: Date;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  rezumat: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}
