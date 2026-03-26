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

  const _onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [deserialize, onChange],
  );

  const value = externalValue === undefined ? internalValue : externalValue;

  const displayedValue = match({ value, isNegative })
    .with({ value: P.nullish, isNegative: false }, () => "")
    .with({ value: P.nullish, isNegative: true }, () => "-")
    .otherwise((matched) => serialize(matched.value ?? null));

  return (
    <Input {...props} name={name} onChange={_onChange} value={displayedValue} />
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

  const onChange = React.useCallback(
    (value: number | null) => {
      setValue(value);
      _onChange?.(value);
    },
    [setValue, _onChange],
  );

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
