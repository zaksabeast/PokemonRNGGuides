import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { Ivs } from "~/rngTools";
import { z } from "zod";
import { StatFieldsInput } from "./statFieldsInput";

const IvSchema = z.number().int().min(0).max(31);

export const IvsSchema: z.Schema<Ivs> = z.object({
  hp: IvSchema,
  atk: IvSchema,
  def: IvSchema,
  spa: IvSchema,
  spd: IvSchema,
  spe: IvSchema,
});

export const NullableIvsSchema: z.Schema<{
  [key in keyof Ivs]: Ivs[key] | null;
}> = z.object({
  hp: IvSchema.nullable(),
  atk: IvSchema.nullable(),
  def: IvSchema.nullable(),
  spa: IvSchema.nullable(),
  spd: IvSchema.nullable(),
  spe: IvSchema.nullable(),
});

type Nullability = "nullable" | "non-nullable";

export type NullableIvs = z.infer<typeof NullableIvsSchema>;

type Props<FormState extends GenericForm, IvNullability extends Nullability> = {
  name: GuaranteeFormNameType<
    FormState,
    IvNullability extends "nullable" ? NullableIvs : Ivs
  >;
};

export const IvInput = <
  FormState extends GenericForm,
  IvNullability extends Nullability = "non-nullable",
>({
  name,
}: Props<FormState, IvNullability>) => {
  type FieldType = IvNullability extends "nullable" ? NullableIvs : Ivs;
  return <StatFieldsInput<FormState, FieldType> name={name} />;
};
