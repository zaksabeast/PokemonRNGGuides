import React from "react";
import { Input } from "../input";
import { GenericForm } from "~/types/form";
import { useField } from "~/hooks/form";
import { InputProps as AntdInputProps } from "antd";
import { Paths } from "~/types";
import * as tst from "ts-toolbelt";
import {
  getNumberInputBlurValue,
  getNumberInputChangeResult,
  shouldClearTransientValue,
  type NumberInputType,
  type NumericNumberInputType,
} from "./utils";

const serializers = {
  hex: (num: number | bigint | null) => num?.toString(16),
  hex_bigint: (num: number | bigint | null) => num?.toString(16),
  decimal: (num: number | bigint | null) => num?.toString(10),
  float: (num: number | bigint | null) => num?.toString(10),
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
  prefix?: React.ReactNode;
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
  onBlur,
  ...props
}: SharedNumberInputProps) => {
  const serialize = serializers[numType];
  const [transientValue, setTransientValue] = React.useState<string | null>(
    null,
  );
  const isExternallyControlled = React.useRef(externalValue !== undefined);
  const previousExternalValue = React.useRef(externalValue);
  const [internalValue, setInternalValue] = React.useState<
    number | bigint | null
  >(null);

  React.useEffect(() => {
    if (
      shouldClearTransientValue({
        numType,
        transientValue,
        externalValue,
        previousExternalValue: previousExternalValue.current,
      })
    ) {
      setTransientValue(null);
    }

    previousExternalValue.current = externalValue;
  }, [externalValue, numType, transientValue]);

  const setValue = (value: number | bigint | null) => {
    onChange?.(value);
    if (!isExternallyControlled.current) {
      setInternalValue(value);
    }
  };

  const commitTransientValue = (value: string) => {
    const deserialized = getNumberInputBlurValue(numType, value);

    if (deserialized !== undefined) {
      setValue(deserialized);
    }
  };

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = getNumberInputChangeResult(numType, event.target.value);

    if (!result.accepted) {
      return;
    }

    setTransientValue(result.transientValue);

    if (result.nextValue !== undefined) {
      setValue(result.nextValue);
    }
  };

  const _onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (transientValue != null) {
      commitTransientValue(transientValue);
      setTransientValue(null);
    }

    onBlur?.(event);
  };

  const value = externalValue === undefined ? internalValue : externalValue;
  const displayedValue = transientValue ?? serialize(value ?? null) ?? "";

  return (
    <Input
      {...props}
      name={name}
      onChange={_onChange}
      onBlur={_onBlur}
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
  errorMessage: _errorMessage,
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

  const errorMessage = _errorMessage === undefined ? error : _errorMessage;

  return (
    <InternalNumberInput
      status={status}
      {...props}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      errorMessage={errorMessage ?? undefined}
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
