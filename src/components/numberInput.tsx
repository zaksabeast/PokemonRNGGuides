import React from "react";
import { Input } from "./input";
import { capPrecision } from "~/utils/number";
import { GenericForm } from "~/types/form";
import { useField } from "~/hooks/form";
import { match, P } from "ts-pattern";
import { Flex } from "./flex";
import { InputProps as AntdInputProps } from "antd";
import { Paths } from "~/types";
import * as tst from "ts-toolbelt";
import { formatHex } from "~/utils/formatHex";
import { RadioGroup } from "./radio";
import { formatLargeInteger } from "~/utils/formatLargeInteger";

const serializers = {
  hex: (num: number | null) => num?.toString(16),
  decimal: (num: number | null) => num?.toString(10),
  float: (num: number | null) => num?.toString(10),
};

const deserializers = {
  hex: (str: string) => parseInt(str, 16),
  decimal: (str: string) =>
    parseInt(
      str.replaceAll(",", "").replaceAll(":", "").replaceAll("'", ""),
      10,
    ), // To support formatted large integers and timers.
  float: (str: string) => capPrecision(parseInt(str, 10)),
};

const inputModes = {
  hex: "text",
  decimal: "numeric",
  float: "decimal",
} satisfies Record<
  NumberInputProps["numType"],
  React.HTMLAttributes<HTMLInputElement>["inputMode"]
>;

type NumberInputProps = {
  disabled?: boolean;
  fullFlex?: boolean;
  name?: string;
  value?: number | null;
  status?: AntdInputProps["status"];
  numType: "hex" | "decimal" | "float";
  onChange?: (value: number | null) => void;
  errorMessage?: string;
  textAlign?: "center";
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const NumberInput = ({
  name,
  numType,
  value: externalValue,
  onChange,
  ...props
}: NumberInputProps) => {
  const serialize = serializers[numType];
  const deserialize = deserializers[numType];
  // Tracking negative allows us to show only '-', which is not a valid number
  const [isNegative, setIsNegative] = React.useState(false);
  const isExternallyControlled = React.useRef(externalValue !== undefined);
  const [internalValue, setInternalValue] = React.useState<number | null>(null);

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

    if (!isNaN(deserialized)) {
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

type FormikNumberInputProps<FormState extends GenericForm> = tst.O.Required<
  tst.O.Overwrite<
    NumberInputProps,
    {
      name: Paths<FormState, number | null>;
      /*
        - undefined: defaults to form errors
        - null: explicitly no error
        - string: custom error message
      */
      errorMessage?: string | null;
    }
  >,
  "name"
>;

export const FormikNumberInput = <FormState extends GenericForm>({
  name,
  errorMessage,
  onChange: _onChange,
  ...props
}: FormikNumberInputProps<FormState>) => {
  const [{ value, onBlur }, { error, status }, { setValue }] = useField<
    number | null
  >(name);

  const onChange = (value: number | null) => {
    setValue(value);
    _onChange?.(value);
  };

  return (
    <Flex vertical>
      <NumberInput
        status={status}
        {...props}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        errorMessage={errorMessage === null ? undefined : error}
      />
    </Flex>
  );
};

type NumType = "hex" | "decimal";

type FormikNumberDecimalHexInputProps<FormState extends GenericForm> = Omit<
  FormikNumberInputProps<FormState>,
  "numType"
> & {
  initialNumType: NumType;
  byteCount: number;
};

export const FormikNumberDecimalHexInput = <FormState extends GenericForm>({
  name,
  errorMessage,
  onChange: _onChange,
  byteCount,
  initialNumType,
  ...props
}: FormikNumberDecimalHexInputProps<FormState>) => {
  const [{ value, onBlur }, { error, status }, { setValue }] = useField<
    number | null
  >(name);

  const onChange = (value: number | null) => {
    setValue(value);
    _onChange?.(value);
  };

  const [numType, setNumType] = React.useState<NumType>(initialNumType);
  const options = [
    { label: "Decimal", value: "decimal" } as const,
    { label: "Hex", value: "hex" } as const,
  ];

  return (
    <Flex dir="row" align="center" gap={10}>
      <RadioGroup
        value={numType}
        options={options}
        onChange={(val) => {
          setNumType(val.target.value as "hex" | "decimal");
        }}
        optionType="button"
      />
      {match(numType)
        .with("hex", () => {
          return (
            <>
              <NumberInput
                status={status}
                {...props}
                numType="hex"
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                errorMessage={errorMessage === null ? undefined : error}
              />
              {value != null && `Decimal: ${formatLargeInteger(value)}`}
            </>
          );
        })
        .with("decimal", () => {
          return (
            <>
              <NumberInput
                status={status}
                {...props}
                numType="decimal"
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                errorMessage={errorMessage === null ? undefined : error}
              />
              {value != null && `Hex: ${formatHex(value, byteCount)}`}
            </>
          );
        })
        .exhaustive()}
    </Flex>
  );
};
