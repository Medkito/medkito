import { Max, Min } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Sex } from "../../../types/types";

@InputType()
export class EditPacientInput {
    @Field(() => Sex)
    sex: Sex;

    @Field()
    @Min(100)
    @Max(250)
    height: number;

    @Field()
    @Min(30)
    @Max(300)
    weight: number;

    @Field()
    birthDate: Date;
}
