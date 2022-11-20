import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Lazy } from "../types/Lazy";
import { Pacient } from "./Pacient";
import { PrescriptionItem } from "./PrescriptionItem";
import { User } from "./User";

@ObjectType("Prescription")
@Entity()
export class Prescription extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => [PrescriptionItem])
  @OneToMany(() => PrescriptionItem, (item) => item.prescription)
  items: Lazy<PrescriptionItem[]>;

  @Field((type) => Pacient)
  @ManyToOne((type) => Pacient, { eager: true })
  pacient: Pacient;

  @Field((type) => User)
  @ManyToOne((type) => User, { eager: true })
  medic: User;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}
