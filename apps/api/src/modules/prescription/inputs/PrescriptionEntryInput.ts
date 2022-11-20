import { Field, InputType, Int } from "type-graphql";

@InputType("PrescriptionEntry")
export class PrescriptionEntry {
  @Field((type) => Int)
  medicamentId: number;

  @Field((type) => Int)
  zile: number;

  @Field((type) => Int)
  cantitate: number;

  @Field((type) => Int)
  interval: number;
}
