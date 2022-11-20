import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Diagnostic } from "./Diagnostic";
import { MedicSpecialty } from "./MedicSpecialty";

@ObjectType("Specialty")
@Entity()
export class Specialty extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  denumire: string;

  @Field({ nullable: false })
  @Column({ default: false, nullable: false })
  isRoot: boolean;

  @OneToMany(() => MedicSpecialty, (ms) => ms.specialty)
  medicConnection: Promise<MedicSpecialty[]>;

  @OneToMany(() => Diagnostic, (diag) => diag.specialty)
  diagnostice: Diagnostic[];
}
