import React from "react";
import { Input } from "./input";
import { capPrecision } from "~/utils/number";
import { GenericForm } from "~/types/form";
import { useField } from "~/hooks/form";
import { match, P } from "ts-pattern";
import { InputProps as AntdInputProps } from "antd";
import { Paths } from "~/types";
import * as tst from "ts-toolbelt";

type NumberInputType = "hex" | "hex_bigint" | "decimal" | "float";
type NumericNumberInputType = Exclude<NumberInputType, "hex_bigint">;

const parseHexBigInt = (str: string) => {
  const normalized = str.trim().replace(/^0x/i, "");

  try {
    return BigInt(`0x${normalized}`);
  } catch {
    return Number.NaN;
  }
};

const serializers = {
  hex: (num: number | bigint | null) => num?.toString(16),
  hex_bigint: (num: number | bigint | null) => num?.toString(16),
  decimal: (num: number | bigint | null) => num?.toString(10),
  float: (num: number | bigint | null) => num?.toString(10),
};

const deserializers = {
  hex: (str: string) => parseInt(str, 16),
  hex_bigint: (str: string) => parseHexBigInt(str),
  decimal: (str: string) =>
    parseInt(
      str.replaceAll(",", "").replaceAll(":", "").replaceAll("'", ""),
      10,
    ), // To support formatted large integers and timers.
  float: (str: string) => capPrecision(parseInt(str, 10)),
};

const inputModes = {
  hex: "text",
  hex_bigint: "text",
  decimal: "numeric",
  float: "decimal",
} satisfies Record<
  NumberInputType,
  React.HTMLAttributes<HTMLInputElement>["inputMode"]
>;

type SharedNumberInputProps = {
  disabled?: boolean;
  fullFlex?: boolean;
  name?: string;
  value?: number | bigint | null;
  status?: AntdInputProps["status"];
  numType: NumberInputType;
  onChange?: (value: number | bigint | null) => void;
  errorMessage?: string;
  textAlign?: "center";
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export type NumberInputProps = Omit<
  SharedNumberInputProps,
  "numType" | "value" | "onChange"
> & {
  value?: number | null;
  numType: NumericNumberInputType;
  onChange?: (value: number | null) => void;
};

export type BigIntInputProps = Omit<
  SharedNumberInputProps,
  "numType" | "value" | "onChange"
> & {
  value?: bigint | null;
  numType: "hex_bigint";
  onChange?: (value: bigint | null) => void;
};

const InternalNumberInput = ({
  name,
  numType,
  value: externalValue,
  onChange,
  ...props
}: SharedNumberInputProps) => {
  const serialize = serializers[numType];
  const deserialize = deserializers[numType];
  // Tracking negative allows us to show only '-', which is not a valid number
  const [isNegative, setIsNegative] = React.useState(false);
  const isExternallyControlled = React.useRef(externalValue !== undefined);
  const [internalValue, setInternalValue] = React.useState<
    number | bigint | null
  >(null);

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setIsNegative(value.includes("-"));

    if (value.length === 0 || value === "-") {
      onChange?.(null);
      if (!isExternallyControlled.current) {
        setInternalValue(null);
      }
      return;
    }

    const deserialized = deserialize(value);
    const isValid = typeof deserialized === "bigint" || !isNaN(deserialized);

    if (isValid) {
      onChange?.(deserialized);
      if (!isExternallyControlled.current) {
        setInternalValue(deserialized);
      }
    }
  };

  const value = externalValue === undefined ? internalValue : externalValue;

  const displayedValue = match({ value, isNegative })
    .with({ value: P.nullish, isNegative: false }, () => "")
    .with({ value: P.nullish, isNegative: true }, () => "-")
    .otherwise((matched) => serialize(matched.value ?? null));

  return (
    <Input
      {...props}
      name={name}
      onChange={_onChange}
      value={displayedValue}
      inputMode={inputModes[numType]}
    />
  );
};

type NumberInputComponent = (props: NumberInputProps) => React.JSX.Element;

type BigIntInputComponent = (props: BigIntInputProps) => React.JSX.Element;

export const NumberInput = InternalNumberInput as NumberInputComponent;

export const BigIntInput = InternalNumberInput as BigIntInputComponent;

type FormikNumberInputOverrides<
  FormState extends GenericForm,
  Value extends number | bigint | null,
  NumType extends NumberInputType,
> = {
  name: Paths<FormState, Value>;
  numType: NumType;
  onChange?: (value: Value) => void;
  /*
  - undefined: defaults to form errors
  - null: explicitly no error
  - string: custom error message
  */
  errorMessage?: string | null;
};

type SharedFormikNumberInputProps<FormState extends GenericForm> =
  tst.O.Required<
    tst.O.Overwrite<
      SharedNumberInputProps,
      FormikNumberInputOverrides<
        FormState,
        number | bigint | null,
        NumberInputType
      >
    >,
    "name"
  >;

export type FormikNumberInputProps<FormState extends GenericForm> =
  tst.O.Required<
    tst.O.Overwrite<
      SharedNumberInputProps,
      FormikNumberInputOverrides<
        FormState,
        number | null,
        NumericNumberInputType
      >
    >,
    "name"
  >;

export type FormikBigIntInputProps<FormState extends GenericForm> =
  tst.O.Required<
    tst.O.Overwrite<
      SharedNumberInputProps,
      FormikNumberInputOverrides<FormState, bigint | null, "hex_bigint">
    >,
    "name"
  >;

const InternalFormikNumberInput = <FormState extends GenericForm>({
  name,
  errorMessage,
  onChange: _onChange,
  ...props
}: SharedFormikNumberInputProps<FormState>) => {
  const [{ value, onBlur }, { error, status }, { setValue }] = useField<
    number | bigint | null
  >(name);

  const onChange = (value: number | bigint | null) => {
    setValue(value);
    _onChange?.(value);
  };

  return (
    <InternalNumberInput
      status={status}
      {...props}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      errorMessage={errorMessage === null ? undefined : error}
    />
  );
};

type FormikNumberInputComponent = <FormState extends GenericForm>(
  props: FormikNumberInputProps<FormState>,
) => React.JSX.Element;

type FormikBigIntInputComponent = <FormState extends GenericForm>(
  props: FormikBigIntInputProps<FormState>,
) => React.JSX.Element;

export const FormikNumberInput =
  InternalFormikNumberInput as FormikNumberInputComponent;

export const FormikBigIntInput =
  InternalFormikNumberInput as FormikBigIntInputComponent;
