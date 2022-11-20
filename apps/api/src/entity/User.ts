import { Field, ID, ObjectType, Root } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MedicSpecialty } from "./MedicSpecialty";
import { ProgramMedic } from "./ProgramMedic";
import { Specialty } from "./Specialty";

@ObjectType("User")
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field({ complexity: 3 })
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field(() => String, { nullable: true })
  async avatarUrl(): Promise<String> {
    if (this.profilePicture) {
      return this.profilePicture;
    }
    const defaultAvatar = null;

    return defaultAvatar;
  }

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  profilePicture: string;

  @Column()
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  // CONFIRMED DEFAULT TESTING
  @Column("bool", { default: false })
  confirmed: boolean;

  @Column("bool", { default: false })
  isAdmin: boolean;

  @Field(() => [Specialty], { nullable: true })
  async specialties(): Promise<Specialty[]> {
    try {
      const sp = await MedicSpecialty.find({
        where: { userId: this.id },
        select: ["specialtyId"],
      });
      const ids = sp.map((ms) => ms.specialtyId);
      const res = await Specialty.findByIds(ids);
      return res;
    } catch (error) {
      return null;
    }
  }

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @OneToMany(() => MedicSpecialty, (ms) => ms.user)
  specialtyConnection: Promise<MedicSpecialty[]>;

  @OneToMany(() => ProgramMedic, (prog) => prog.medic)
  programe: ProgramMedic[];
}
