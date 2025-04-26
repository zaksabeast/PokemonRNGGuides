import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { Flex } from "./flex";
import { useField } from "formik";
import { Ivs } from "~/rngTools";
import { NumberInput } from "./numberInput";
import { z } from "zod";
import { get } from "lodash-es";

export const IvSchema: z.Schema<Ivs> = z.object({
  hp: z.number().int().min(0).max(31),
  atk: z.number().int().min(0).max(31),
  def: z.number().int().min(0).max(31),
  spa: z.number().int().min(0).max(31),
  spd: z.number().int().min(0).max(31),
  spe: z.number().int().min(0).max(31),
});

type SingleIvFieldProps<FormState extends GenericForm> = {
  parentName: GuaranteeFormNameType<FormState, Ivs>;
  stat: keyof Ivs;
};

const SingleIvField = <FormState extends GenericForm>({
  parentName,
  stat,
}: SingleIvFieldProps<FormState>) => {
  const [{ value, onBlur }, { error }, { setValue }] =
    useField<Ivs>(parentName);
  const errorMessage = error == null ? undefined : get(error, stat);

  return (
    <Flex minWidth={50}>
      <NumberInput
        name={`${parentName}_${stat}`}
        value={value[stat]}
        textAlign="center"
        errorMessage={errorMessage}
        numType="decimal"
        onBlur={onBlur}
        onChange={(newValue) => {
          setValue({
            ...value,
            [stat]: newValue,
          });
        }}
      />
    </Flex>
  );
};

type Props<FormState extends GenericForm> = {
  name: GuaranteeFormNameType<FormState, Ivs>;
};

export const IvInput = <FormState extends GenericForm>({
  name,
}: Props<FormState>) => {
  return (
    <Flex gap={16}>
      <SingleIvField<FormState> stat="hp" parentName={name} />
      <SingleIvField<FormState> stat="atk" parentName={name} />
      <SingleIvField<FormState> stat="def" parentName={name} />
      <SingleIvField<FormState> stat="spa" parentName={name} />
      <SingleIvField<FormState> stat="spd" parentName={name} />
      <SingleIvField<FormState> stat="spe" parentName={name} />
    </Flex>
  );
};
