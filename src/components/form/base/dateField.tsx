import styled from "@emotion/styled";
import * as tst from "ts-toolbelt";
import { DatePicker as AntdDatePicker } from "antd";
import { useField } from "~/hooks/form";
import { FormFieldProps, GenericForm } from "~/types/form";
import { RngDate } from "~/rngTools";
import { rngChronoFormat, fromRngDate, toRngDate } from "~/utils/time";
import { Icon } from "~/components/icons";
import { LabeledFieldProps, FieldFrame } from "./field";
import { useFieldIds } from "./hooks";
import { focusRing } from "./styles";
import { pickerPlacements } from "./pickerPlacements";

export const PickerContainer = styled.div(({ theme }) => ({
  "&&& .ant-picker": {
    display: "flex",
    width: "100%",
    minHeight: theme.size.field,
    [theme.mediaQueries.dense]: {
      minHeight: theme.size.dense.field,
    },
    boxSizing: "border-box",
    paddingBlock: 0,
    paddingInlineStart: 16,
    paddingInlineEnd: 12,
    borderColor: theme.token.colorBorder,
    borderRadius: theme.shape.medium,
    backgroundColor: theme.token.colorBgContainer,
    boxShadow: "none",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
    ":hover": {
      borderColor: theme.token.colorText,
    },
    "&.ant-picker-focused": focusRing(theme.token.colorPrimary),
    "&.ant-picker-status-error": {
      borderColor: theme.token.colorError,
      "&.ant-picker-focused": focusRing(theme.token.colorError),
    },
    "&.ant-picker-disabled": {
      borderColor: theme.token.colorBorderSecondary,
      backgroundColor: theme.token.colorBgContainer,
      cursor: "not-allowed",
    },
  },
  "&&& .ant-picker-input > input": {
    ...theme.typography.bodyLarge,
    color: theme.token.colorText,
    // The input is read only, so it acts like a button that opens the popup
    cursor: "pointer",
    "::placeholder": {
      color: theme.token.colorTextTertiary,
      opacity: 1,
    },
  },
  "&&& .ant-picker-disabled .ant-picker-input > input": {
    color: theme.token.colorTextTertiary,
    cursor: "not-allowed",
  },
  "&&& .ant-picker-suffix": {
    display: "flex",
    marginInlineStart: 8,
    color: theme.token.colorTextSecondary,
    fontSize: 24,
  },
}));

export type DateFieldProps = LabeledFieldProps & {
  value: RngDate | null;
  onChange?: (value: RngDate) => void;
  onBlur?: () => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  picker?: "date" | "month";
};

export const DateField = ({
  label,
  tooltip,
  helperText,
  errorMessage,
  invalid,
  value,
  onChange,
  onBlur,
  name,
  placeholder,
  disabled,
  picker = "date",
}: DateFieldProps) => {
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
      <PickerContainer data-name={name}>
        <AntdDatePicker
          id={ids.inputId}
          aria-describedby={ids.helperId}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={onBlur}
          picker={picker}
          builtinPlacements={pickerPlacements}
          format={
            picker === "month"
              ? rngChronoFormat.monthYear
              : rngChronoFormat.date
          }
          status={
            invalid === true || errorMessage != null ? "error" : undefined
          }
          suffixIcon={<Icon name="Calendar" />}
          // Virtual keyboards get in the way of the popup
          inputReadOnly
          // Clearing is disabled, so only dates are emitted
          allowClear={false}
          value={value == null ? null : fromRngDate(value)}
          onChange={(date) => {
            if (date != null) {
              onChange?.(toRngDate(date));
            }
          }}
        />
      </PickerContainer>
    </FieldFrame>
  );
};

type FormDateFieldProps<FormState extends GenericForm> = tst.O.Merge<
  { onChange?: (value: RngDate) => void },
  FormFieldProps<FormState, RngDate | null, DateFieldProps>
>;

export const FormDateField = <FormState extends GenericForm>({
  name,
  onChange,
  ...props
}: FormDateFieldProps<FormState>) => {
  const [{ value, onBlur }, { error }, { setValue }] = useField<RngDate | null>(
    name,
  );

  return (
    <DateField
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
