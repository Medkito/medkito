import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DiagnosticSymptom } from "./DiagnosticSymptom";
import { Specialty } from "./Specialty";
import { Symptom } from "./Symptom";

@ObjectType("Diagnostic")
@Entity()
export class Diagnostic extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Specialty, { nullable: true })
  @ManyToOne(() => Specialty, (sp) => sp.diagnostice, { eager: true })
  specialty: Specialty;

  @OneToMany(() => DiagnosticSymptom, (ds) => ds.diagnostic)
  symptomConnection: Promise<DiagnosticSymptom[]>;

  @Field(() => [Symptom], { nullable: true })
  async symptoms(): Promise<Symptom[]> {
    let con = await this.symptomConnection;
    const ids = con.map((link) => link.symptomId);
    return Symptom.findByIds(ids);
  }
}
