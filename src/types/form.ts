import { FieldValues } from "react-hook-form";

export type GenericForm = FieldValues;

export type GuaranteeFormNameType<FormState extends GenericForm, Type> = {
  [K in keyof FormState]: FormState[K] extends Type
    ? K extends string
      ? K
      : never
    : never;
}[keyof FormState];
