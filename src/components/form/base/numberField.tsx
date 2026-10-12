import React from "react";
import * as tst from "ts-toolbelt";
import { useField } from "~/hooks/form";
import { FormFieldProps, GenericForm } from "~/types/form";
import {
  getNumberInputBlurValue,
  getNumberInputChangeResult,
  serializers,
  shouldClearTransientValue,
  type NumericNumberInputType,
} from "~/components/numberInput/utils";
import { LabeledFieldProps, FieldFrame } from "./field";
import { useFieldIds } from "./hooks";
import { FieldInput } from "./textField";

const inputModes = {
  hex: "text",
  decimal: "numeric",
  float: "decimal",
} satisfies Record<
  NumericNumberInputType,
  React.HTMLAttributes<HTMLInputElement>["inputMode"]
>;

// Numeric input types never produce bigints, this just narrows the shared helpers' return type
const toNumber = (value: number | bigint | null) => {
  return typeof value === "bigint" ? Number(value) : value;
};

export type NumberFieldProps = LabeledFieldProps & {
  numType: NumericNumberInputType;
  value: number | null;
  onChange?: (value: number | null) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
};

export const NumberField = ({
  label,
  tooltip,
  helperText,
  errorMessage,
  invalid,
  numType,
  value,
  onChange,
  onBlur,
  ...inputProps
}: NumberFieldProps) => {
  const ids = useFieldIds();

  // Text that isn't a complete number yet, like "-" or "1.", kept until blur
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = getNumberInputChangeResult(numType, event.target.value);

    if (!result.accepted) {
      return;
    }

    setTransientValue(result.transientValue);

    if (result.nextValue !== undefined) {
      onChange?.(toNumber(result.nextValue));
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (transientValue != null) {
      const committed = getNumberInputBlurValue(numType, transientValue);

      if (committed !== undefined) {
        onChange?.(toNumber(committed));
      }

      setTransientValue(null);
    }

    onBlur?.(event);
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
        inputMode={inputModes[numType]}
        aria-invalid={invalid === true || errorMessage != null}
        aria-describedby={ids.helperId}
        value={transientValue ?? serializers[numType](value) ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </FieldFrame>
  );
};

type FormNumberFieldProps<FormState extends GenericForm> = tst.O.Merge<
  {
    onChange?: (value: number | null) => void;
    /*
    - undefined: defaults to form errors
    - null: explicitly no error, e.g. when a parent shows one combined error
    - string: custom error message
    */
    errorMessage?: string | null;
  },
  FormFieldProps<FormState, number | null, NumberFieldProps>
>;

export const FormNumberField = <FormState extends GenericForm>({
  name,
  errorMessage,
  onChange,
  ...props
}: FormNumberFieldProps<FormState>) => {
  const [{ value, onBlur }, { error }, { setValue }] = useField<number | null>(
    name,
  );

  return (
    <NumberField
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
