import * as tst from "ts-toolbelt";
import { TimePicker as AntdTimePicker } from "antd";
import { useField } from "~/hooks/form";
import { FormFieldProps, GenericForm } from "~/types/form";
import { RngTime, rngChronoFormat, fromRngTime, toRngTime } from "~/utils/time";
import { Icon } from "~/components/icons";
import { LabeledFieldProps, FieldFrame } from "./field";
import { useFieldIds } from "./hooks";
import { PickerContainer } from "./dateField";
import { pickerPlacements } from "./pickerPlacements";

export type TimeFieldProps = LabeledFieldProps & {
  value: RngTime | null;
  onChange?: (value: RngTime) => void;
  onBlur?: () => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Without seconds, emitted times always have 0 seconds */
  showSecond?: boolean;
};

export const TimeField = ({
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
  showSecond = false,
}: TimeFieldProps) => {
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
        <AntdTimePicker
          id={ids.inputId}
          aria-describedby={ids.helperId}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={onBlur}
          builtinPlacements={pickerPlacements}
          showHour
          showMinute
          showSecond={showSecond}
          format={
            showSecond
              ? rngChronoFormat.hoursMinutesSeconds
              : rngChronoFormat.hoursMinutes
          }
          status={
            invalid === true || errorMessage != null ? "error" : undefined
          }
          suffixIcon={<Icon name="Schedule" />}
          // Virtual keyboards get in the way of the popup
          inputReadOnly
          // Clearing is disabled, so only times are emitted
          allowClear={false}
          value={value == null ? null : fromRngTime(value)}
          onChange={(date) => {
            if (date != null) {
              onChange?.(toRngTime(showSecond ? date : date.second(0)));
            }
          }}
        />
      </PickerContainer>
    </FieldFrame>
  );
};

type FormTimeFieldProps<FormState extends GenericForm> = tst.O.Merge<
  { onChange?: (value: RngTime) => void },
  FormFieldProps<FormState, RngTime | null, TimeFieldProps>
>;

export const FormTimeField = <FormState extends GenericForm>({
  name,
  onChange,
  ...props
}: FormTimeFieldProps<FormState>) => {
  const [{ value, onBlur }, { error }, { setValue }] = useField<RngTime | null>(
    name,
  );

  return (
    <TimeField
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
