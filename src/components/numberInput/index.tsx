import React from "react";
import { Input } from "../input";
import { FormFieldProps, GenericForm } from "~/types/form";
import { useField } from "~/hooks/form";
import { InputProps as AntdInputProps } from "antd";
import * as tst from "ts-toolbelt";
import {
  getNumberInputBlurValue,
  getNumberInputChangeResult,
  shouldClearTransientValue,
  serializers,
  type NumberInputType,
  type NumericNumberInputType,
} from "./utils";

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
  value: number | bigint | null;
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
  value: number | null;
  numType: NumericNumberInputType;
  onChange?: (value: number | null) => void;
};

export type BigIntInputProps = Omit<
  SharedNumberInputProps,
  "numType" | "value" | "onChange"
> & {
  value: bigint | null;
  numType: "hex_bigint";
  onChange?: (value: bigint | null) => void;
};

const InternalNumberInput = ({
  name,
  numType,
  value,
  onChange,
  onBlur,
  ...props
}: SharedNumberInputProps) => {
  const serialize = serializers[numType];
  const [transientValue, setTransientValue] = React.useState<string | null>(
    null,
  );
  const [previousValue, setPreviousValue] = React.useState(value);

  // Adjusting state during render avoids an effect and a stale render.
  if (!Object.is(value, previousValue)) {
    setPreviousValue(value);

    if (
      shouldClearTransientValue({
        numType,
        transientValue,
        externalValue: value,
        previousExternalValue: previousValue,
      })
    ) {
      setTransientValue(null);
    }
  }

  const commitTransientValue = (transient: string) => {
    const deserialized = getNumberInputBlurValue(numType, transient);

    if (deserialized !== undefined) {
      onChange?.(deserialized);
    }
  };

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = getNumberInputChangeResult(numType, event.target.value);

    if (!result.accepted) {
      return;
    }

    setTransientValue(result.transientValue);

    if (result.nextValue !== undefined) {
      onChange?.(result.nextValue);
    }
  };

  const _onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (transientValue != null) {
      commitTransientValue(transientValue);
      setTransientValue(null);
    }

    onBlur?.(event);
  };

  const displayedValue = transientValue ?? serialize(value) ?? "";

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
  Value extends number | bigint | null,
  NumType extends NumberInputType,
> = {
  numType: NumType;
  onChange?: (value: Value) => void;
  /*
  - undefined: defaults to form errors
  - null: explicitly no error
  - string: custom error message
  */
  errorMessage?: string | null;
};

type SharedFormikNumberInputProps<FormState extends GenericForm> = tst.O.Merge<
  FormikNumberInputOverrides<number | bigint | null, NumberInputType>,
  FormFieldProps<FormState, number | bigint | null, SharedNumberInputProps>
>;

export type FormikNumberInputProps<FormState extends GenericForm> = tst.O.Merge<
  FormikNumberInputOverrides<number | null, NumericNumberInputType>,
  FormFieldProps<FormState, number | null, NumberInputProps>
>;

export type FormikBigIntInputProps<FormState extends GenericForm> = tst.O.Merge<
  FormikNumberInputOverrides<bigint | null, "hex_bigint">,
  FormFieldProps<FormState, bigint | null, BigIntInputProps>
>;

const InternalFormikNumberInput = <FormState extends GenericForm>({
  name,
  errorMessage,
  onChange,
  ...props
}: SharedFormikNumberInputProps<FormState>) => {
  const [{ value, onBlur }, { error }, { setValue }] = useField<
    number | bigint | null
  >(name);

  return (
    <InternalNumberInput
      {...props}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={(updatedValue) => {
        setValue(updatedValue);
        onChange?.(updatedValue);
      }}
      errorMessage={
        (errorMessage === undefined ? error : errorMessage) ?? undefined
      }
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
