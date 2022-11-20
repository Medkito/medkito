import { registerEnumType } from "type-graphql";

export type Maybe<T> = null | undefined | T;

export enum Sex {
  MASCULIN = "MASCULIN",
  FEMININ = "FEMININ",
}

registerEnumType(Sex, {
  name: "Sex", // this one is mandatory
  description: "sex types", // this one is optional
});
