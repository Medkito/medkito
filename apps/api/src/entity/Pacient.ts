import moment from "moment";
import { Field, ID, Int, ObjectType, Root } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Sex } from "../types/types";
import { User } from "./User";

@ObjectType("Pacient")
@Entity()
export class Pacient extends BaseEntity {
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

  @Field(() => Sex, { nullable: true })
  @Column("text", { nullable: true })
  sex: Sex;

  @Field({ nullable: true })
  @Column({ nullable: true })
  height: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  weight: number;

  @Field({ nullable: true })
  @Column({ type: "timestamp with time zone", nullable: true })
  birthDate: Date;

  @Field(() => Int, { nullable: true })
  async age(): Promise<number> {
    if (this.birthDate) {
      return moment().diff(this.birthDate, "years");
    }

    return null;
  }

  @Field(() => String, { nullable: true })
  async avatarUrl(): Promise<String> {
    if (this.profilePicture) {
      return this.profilePicture;
    }
    const defaultAvatar =
      "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png";

    return defaultAvatar;
  }

  @Field({ complexity: 3 })
  name(@Root() parent: Pacient): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  profilePicture: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Field((type) => User)
  @ManyToOne((type) => User, { eager: true })
  medicPrincipal: User;
}
