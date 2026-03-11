import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { Flex } from "./flex";
import { Ivs } from "~/rngTools";
import { FormikNumberInput } from "./numberInput";
import { z } from "zod";
import { GlobalError, useFormState } from "react-hook-form";
import { map, uniq } from "lodash-es";
import { Typography } from "./typography";

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

type SingleIvFieldProps<
  FormState extends GenericForm,
  IvNullability extends Nullability,
> = {
  parentName: GuaranteeFormNameType<
    FormState,
    IvNullability extends "nullable" ? NullableIvs : Ivs
  >;
  stat: keyof Ivs;
};

const SingleIvField = <
  FormState extends GenericForm,
  IvNullability extends Nullability,
>({
  parentName,
  stat,
}: SingleIvFieldProps<FormState, IvNullability>) => {
  return (
    <Flex minWidth={50}>
      <FormikNumberInput
        name={`${parentName}.${stat}`}
        textAlign="center"
        numType="decimal"
        // Explicitly unset errors and error statuses
        status=""
        errorMessage={null}
      />
    </Flex>
  );
};

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
  const { errors } = useFormState<FormState>();

  const ivErrors = uniq(
    map(errors[name], (error: GlobalError) => error.message),
  );

  return (
    <Flex vertical>
      <Flex gap={16}>
        <SingleIvField<FormState, IvNullability> stat="hp" parentName={name} />
        <SingleIvField<FormState, IvNullability> stat="atk" parentName={name} />
        <SingleIvField<FormState, IvNullability> stat="def" parentName={name} />
        <SingleIvField<FormState, IvNullability> stat="spa" parentName={name} />
        <SingleIvField<FormState, IvNullability> stat="spd" parentName={name} />
        <SingleIvField<FormState, IvNullability> stat="spe" parentName={name} />
      </Flex>
      {ivErrors.length !== 0 && (
        <Typography.Text type="danger">{ivErrors.join(", ")}</Typography.Text>
      )}
    </Flex>
  );
};
