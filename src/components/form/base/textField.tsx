import React from "react";
import styled from "@emotion/styled";
import { Icon, type IconName } from "~/components/icons";
import { useField } from "~/hooks/form";
import { FormFieldProps, GenericForm } from "~/types/form";
import { LabeledFieldProps, FieldFrame } from "./field";
import { useFieldIds } from "./hooks";
import { textFieldStyles } from "./styles";

export const FieldInput = styled.input(({ theme }) => textFieldStyles(theme));

const TrailingIconLayout = styled.div({
  position: "relative",
  "& > input": {
    paddingInlineEnd: 48,
  },
});

const TrailingIconSlot = styled.span(({ theme }) => ({
  position: "absolute",
  insetBlock: 0,
  insetInlineEnd: 12,
  display: "flex",
  alignItems: "center",
  color: theme.token.colorTextSecondary,
  fontSize: 24,
  pointerEvents: "none",
}));

type TextInputProps = React.ComponentProps<typeof FieldInput> & {
  trailingIcon?: IconName;
};

const TextInput = ({ trailingIcon, ...inputProps }: TextInputProps) => {
  if (trailingIcon == null) {
    return <FieldInput {...inputProps} />;
  }

  return (
    <TrailingIconLayout>
      <FieldInput {...inputProps} />
      <TrailingIconSlot aria-hidden>
        <Icon name={trailingIcon} />
      </TrailingIconSlot>
    </TrailingIconLayout>
  );
};

type SharedInputProps = {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export type TextFieldProps = LabeledFieldProps &
  SharedInputProps & {
    value: string;
    onChange?: (value: string) => void;
    trailingIcon?: IconName;
  };

export const TextField = ({
  label,
  tooltip,
  helperText,
  errorMessage,
  invalid,
  value,
  onChange,
  ...inputProps
}: TextFieldProps) => {
  const ids = useFieldIds();

  return (
    <FieldFrame
      ids={ids}
      label={label}
      tooltip={tooltip}
      helperText={helperText}
      errorMessage={errorMessage}
      invalid={invalid}
    >
      <TextInput
        {...inputProps}
        id={ids.inputId}
        type="text"
        autoComplete="off"
        aria-invalid={invalid === true || errorMessage != null}
        aria-describedby={ids.helperId}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </FieldFrame>
  );
};

type FormTextFieldProps<FormState extends GenericForm> = FormFieldProps<
  FormState,
  string,
  TextFieldProps
>;

export const FormTextField = <FormState extends GenericForm>({
  name,
  ...props
}: FormTextFieldProps<FormState>) => {
  const [{ value, onBlur }, { error }, { setValue }] = useField<string>(name);

  return (
    <TextField
      {...props}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={setValue}
      errorMessage={error}
    />
  );
};
