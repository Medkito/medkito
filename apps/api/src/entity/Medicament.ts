import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PrescriptionItem } from "./PrescriptionItem";

@ObjectType("Medicament")
@Entity()
export class Medicament extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => PrescriptionItem, (pi) => pi.medicament)
  public prescriptionItems!: PrescriptionItem[];
}
