import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lazy } from "../types/Lazy";
import { Medicament } from "./Medicament";
import { Prescription } from "./Prescription";

@ObjectType("PrescriptionItem")
@Entity()
export class PrescriptionItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  prescriptionId!: string;

  @Column()
  medicamentId!: number;

  @Field()
  @Column()
  zile!: number;

  @Field()
  @Column()
  cantitate!: number;

  @Field()
  @Column() //ore
  interval!: number;

  @ManyToOne(() => Prescription, (prescription) => prescription.items)
  prescription!: Prescription;

  @Field((type) => Medicament)
  @ManyToOne(() => Medicament, (medicament) => medicament.prescriptionItems)
  medicament!: Lazy<Medicament>;
}
