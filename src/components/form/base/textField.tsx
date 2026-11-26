import React from "react";
import styled from "@emotion/styled";
import { Icon, type IconName } from "~/components/icons";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useField } from "~/hooks/form";
import { FormFieldProps, GenericForm } from "~/types/form";
import { LabeledFieldProps, FieldFrame } from "./field";
import { useFieldIds } from "./hooks";
import { CenteredIconButton, textFieldStyles } from "./styles";

export const FieldInput = styled.input(({ theme }) => textFieldStyles(theme));

const TrailingIconLayout = styled.div({
  position: "relative",
  "& > input": {
    paddingInlineEnd: 48,
  },
});

const TRAILING_ICON_SIZE = 24;
const CLEAR_HOVER_INDICATOR_SIZE = 32;

const TrailingIconSlot = styled.span(({ theme }) => ({
  position: "absolute",
  insetBlock: 0,
  insetInlineEnd: 12,
  display: "flex",
  alignItems: "center",
  color: theme.token.colorTextSecondary,
  fontSize: TRAILING_ICON_SIZE,
  pointerEvents: "none",
}));

const TrailingActionSlot = styled(TrailingIconSlot)({
  width: TRAILING_ICON_SIZE,
});

const ClearIconButton = styled(CenteredIconButton)(({ theme }) => ({
  width: theme.size.touchTarget,
  height: theme.size.touchTarget,
  [theme.mediaQueries.dense]: {
    width: theme.size.dense.touchTarget,
    height: theme.size.dense.touchTarget,
  },
  pointerEvents: "auto",
  ":focus-visible": {
    outline: "none",
    "& > span": theme.interactive[":focus-visible"],
  },
  "& > span": {
    display: "grid",
    placeItems: "center",
    width: CLEAR_HOVER_INDICATOR_SIZE,
    height: CLEAR_HOVER_INDICATOR_SIZE,
    borderRadius: theme.shape.full,
  },
  ":hover > span": {
    backgroundColor: theme.token.colorStateLayerHover,
  },
}));

type ClearButtonProps = {
  onClear: () => void;
};

const ClearButton = ({ onClear }: ClearButtonProps) => {
  const t = useActiveRouteTranslations();

  return (
    <ClearIconButton type="button" aria-label={t["Clear"]} onClick={onClear}>
      <span>
        <Icon name="Close" />
      </span>
    </ClearIconButton>
  );
};

type TextInputProps = React.ComponentProps<typeof FieldInput> & {
  trailingIcon?: IconName;
  onClear?: () => void;
  isEmpty: boolean;
};

const TextInput = ({
  trailingIcon,
  onClear,
  isEmpty,
  ...inputProps
}: TextInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  if (onClear != null) {
    const clearAndFocusInput = () => {
      onClear();
      inputRef.current?.focus();
    };

    return (
      <TrailingIconLayout>
        <FieldInput {...inputProps} ref={inputRef} />
        {!isEmpty && (
          <TrailingActionSlot>
            <ClearButton onClear={clearAndFocusInput} />
          </TrailingActionSlot>
        )}
      </TrailingIconLayout>
    );
  }

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
    /** Adds a clear button that replaces the trailing icon, and shows only while the field has a value */
    onClear?: () => void;
  };

export const TextField = ({
  label,
  tooltip,
  helperText,
  errorMessage,
  invalid,
  value,
  onChange,
  onClear,
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
        onClear={onClear}
        isEmpty={value === ""}
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
