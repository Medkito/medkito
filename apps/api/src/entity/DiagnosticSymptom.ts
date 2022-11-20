import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Diagnostic } from "./Diagnostic";
import { Symptom } from "./Symptom";

@Entity()
export class DiagnosticSymptom extends BaseEntity {
  @PrimaryColumn()
  diagnosticId: number;

  @PrimaryColumn()
  symptomId: number;

  @ManyToOne(() => Diagnostic, (diag) => diag.symptomConnection, {
    primary: true,
  })
  @JoinColumn({ name: "diagnosticId" })
  diagnostic: Promise<Diagnostic>;

  @ManyToOne(() => Symptom, (sym) => sym.diagnosticConnection, {
    primary: true,
  })
  @JoinColumn({ name: "symptomId" })
  symptom: Promise<Symptom>;
}
