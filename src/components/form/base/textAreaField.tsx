import React from "react";
import styled from "@emotion/styled";
import { LabeledFieldProps, FieldFrame } from "./field";
import { useFieldIds } from "./hooks";
import { textFieldStyles } from "./styles";

const FieldTextArea = styled.textarea<{ $monospace: boolean }>(
  ({ theme, $monospace }) => ({
    ...textFieldStyles(theme),
    paddingBlock: 12,
    resize: "vertical",
    ...($monospace && { fontFamily: "monospace" }),
  }),
);

export type TextAreaFieldProps = LabeledFieldProps & {
  value: string;
  onChange?: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  monospace?: boolean;
};

export const TextAreaField = ({
  label,
  tooltip,
  helperText,
  errorMessage,
  invalid,
  value,
  onChange,
  rows = 4,
  monospace = false,
  ...inputProps
}: TextAreaFieldProps) => {
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
      <FieldTextArea
        {...inputProps}
        id={ids.inputId}
        rows={rows}
        $monospace={monospace}
        autoComplete="off"
        aria-invalid={invalid === true || errorMessage != null}
        aria-describedby={ids.helperId}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </FieldFrame>
  );
};
