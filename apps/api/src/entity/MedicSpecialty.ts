import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Specialty } from "./Specialty";
import { User } from "./User";

@Entity()
export class MedicSpecialty extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  specialtyId: number;

  @ManyToOne(() => Specialty, (sp) => sp.medicConnection, {
    primary: true,
  })
  @JoinColumn({ name: "specialtyId" })
  specialty: Promise<Specialty>;

  @ManyToOne(() => User, (user) => user.specialtyConnection, {
    primary: true,
  })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;
}
