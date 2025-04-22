import React from "react";
import { Input } from "./input";
import { capPrecision } from "~/utils/number";
import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { useFormikContext } from "formik";
import { match, P } from "ts-pattern";

const serializers = {
  hex: (num: number | null) => num?.toString(16),
  decimal: (num: number | null) => num?.toString(10),
  float: (num: number | null) => num?.toString(10),
};

const deserializers = {
  hex: (str: string) => parseInt(str, 16),
  decimal: (str: string) => parseInt(str, 10),
  float: (str: string) => capPrecision(parseInt(str, 10)),
};

type NumberInputProps = {
  disabled?: boolean;
  fullFlex?: boolean;
  name?: string;
  value?: number | null;
  numType: "hex" | "decimal" | "float";
  onChange: (value: number | null) => void;
};

export const NumberInput = ({
  name,
  numType,
  value,
  onChange,
  ...props
}: NumberInputProps) => {
  const serialize = serializers[numType];
  const deserialize = deserializers[numType];
  // Tracking negative allows us to show only '-', which is not a valid number
  const [isNegative, setIsNegative] = React.useState(false);

  const _onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setIsNegative(value.includes("-"));

      if (value.length === 0 || value === "-") {
        onChange(null);
        return;
      }

      const deserialized = deserialize(value);

      if (!isNaN(deserialized)) {
        onChange(deserialized);
      }
    },
    [deserialize, onChange],
  );

  const displayedValue = match({ value, isNegative })
    .with({ value: P.nullish, isNegative: false }, () => "")
    .with({ value: P.nullish, isNegative: true }, () => "-")
    .otherwise((matched) => serialize(matched.value ?? null));

  return (
    <Input {...props} name={name} onChange={_onChange} value={displayedValue} />
  );
};

type FormikNumberInputProps<FormState extends GenericForm> = {
  disabled?: boolean;
  numType: "hex" | "decimal" | "float";
  name: GuaranteeFormNameType<FormState, number | null>;
};

export const FormikNumberInput = <FormState extends GenericForm>({
  name,
  ...props
}: FormikNumberInputProps<FormState>) => {
  type Name = typeof name;
  const { values, setFieldValue } =
    useFormikContext<Record<Name, number | null>>();

  const value = values[name];

  const onChange = React.useCallback(
    (value: number | null) => {
      setFieldValue(name, value);
    },
    [setFieldValue, name],
  );

  return (
    <NumberInput {...props} name={name} onChange={onChange} value={value} />
  );
};
