import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Diagnostic } from "./Diagnostic";
import { DiagnosticSymptom } from "./DiagnosticSymptom";
import { Specialty } from "./Specialty";

@ObjectType("Symptom")
@Entity()
export class Symptom extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => Specialty, (sp) => sp.diagnostice)
  specialty: Specialty;

  @OneToMany(() => DiagnosticSymptom, (ds) => ds.symptom)
  diagnosticConnection: Promise<DiagnosticSymptom[]>;

  @Field(() => [Diagnostic], { nullable: true })
  async diagnostice(): Promise<Diagnostic[]> {
    let con = await this.diagnosticConnection;
    const ids = con.map((link) => link.diagnosticId);
    return Diagnostic.findByIds(ids);
  }
}
