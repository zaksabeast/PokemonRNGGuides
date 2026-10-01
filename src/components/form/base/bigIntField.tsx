import React from "react";
import * as tst from "ts-toolbelt";
import { useField } from "~/hooks/form";
import { FormFieldProps, GenericForm } from "~/types/form";
import {
  getNumberInputChangeResult,
  serializers,
} from "~/components/numberInput/utils";
import { LabeledFieldProps, FieldFrame } from "./field";
import { useFieldIds } from "./hooks";
import { FieldInput } from "./textField";

export type BigIntFieldProps = LabeledFieldProps & {
  value: bigint | null;
  onChange?: (value: bigint | null) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
};

export const BigIntField = ({
  label,
  tooltip,
  helperText,
  errorMessage,
  invalid,
  value,
  onChange,
  ...inputProps
}: BigIntFieldProps) => {
  const ids = useFieldIds();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = getNumberInputChangeResult("hex_bigint", event.target.value);

    // Hex bigints have no transient text, so every accepted change has a value
    if (!result.accepted || typeof result.nextValue === "number") {
      return;
    }

    if (result.nextValue !== undefined) {
      onChange?.(result.nextValue);
    }
  };

  return (
    <FieldFrame
      ids={ids}
      label={label}
      tooltip={tooltip}
      helperText={helperText}
      errorMessage={errorMessage}
      invalid={invalid}
    >
      <FieldInput
        {...inputProps}
        id={ids.inputId}
        type="text"
        autoComplete="off"
        inputMode="text"
        aria-invalid={invalid === true || errorMessage != null}
        aria-describedby={ids.helperId}
        value={serializers.hex_bigint(value) ?? ""}
        onChange={handleChange}
      />
    </FieldFrame>
  );
};

type FormBigIntFieldProps<FormState extends GenericForm> = tst.O.Merge<
  { onChange?: (value: bigint | null) => void },
  FormFieldProps<FormState, bigint | null, BigIntFieldProps>
>;

export const FormBigIntField = <FormState extends GenericForm>({
  name,
  onChange,
  ...props
}: FormBigIntFieldProps<FormState>) => {
  const [{ value, onBlur }, { error }, { setValue }] = useField<bigint | null>(
    name,
  );

  return (
    <BigIntField
      {...props}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={(updatedValue) => {
        setValue(updatedValue);
        onChange?.(updatedValue);
      }}
      errorMessage={error}
    />
  );
};
