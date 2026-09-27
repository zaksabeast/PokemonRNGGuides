import {
  TimePicker as AntdTimePicker,
  TimePickerProps as AntdTimePickerProps,
  DatePicker as AntdDatePicker,
  DatePickerProps as AntdDatePickerProps,
} from "antd";
import styled from "@emotion/styled";
import { Dayjs } from "dayjs";
import { useField } from "~/hooks/form";
import * as tst from "ts-toolbelt";
import { Flex } from "./flex";
import { Typography } from "./typography";
import { FormFieldProps, GenericForm } from "~/types/form";
import {
  rngChronoFormat,
  toRngDate,
  fromRngDate,
  RngTime,
  fromRngTime,
  toRngTime,
} from "~/utils/time";
import { RngDate } from "~/rngTools";
import { useSize } from "~/theme/size";

const PickerContainer = styled(Flex)(({ theme }) => ({
  "&&&": {
    ".ant-picker": {
      borderRadius: 4,
    },
    ".ant-picker-suffix": {
      color: theme.token.colorTextSecondary,
    },
  },
}));

// Clearing is disabled, so the pickers only emit dates.
type PickerValueProps = {
  onChange?: (date: Dayjs) => void;
  value?: Dayjs | null;
  errorMessage?: string;
};

type TimePickerProps = tst.O.Merge<
  PickerValueProps,
  tst.O.Omit<AntdTimePickerProps, keyof PickerValueProps | "allowClear">
>;

const TimePicker = ({
  showSecond,
  onChange,
  errorMessage,
  status,
  ...props
}: TimePickerProps) => {
  const size = useSize();

  return (
    <PickerContainer vertical>
      <AntdTimePicker
        size={size}
        showHour
        showMinute
        format={
          showSecond
            ? rngChronoFormat.hoursMinutesSeconds
            : rngChronoFormat.hoursMinutes
        }
        // Virtual keyboards get in the way of the popup
        inputReadOnly
        {...props}
        showSecond={showSecond}
        allowClear={false}
        status={errorMessage != null ? "error" : status}
        onChange={(date: Dayjs | null) => {
          if (date != null) {
            onChange?.(showSecond ? date : date.second(0));
          }
        }}
      />
      {errorMessage != null && (
        <Typography.Text type="danger">{errorMessage}</Typography.Text>
      )}
    </PickerContainer>
  );
};

type FormikTimePickerProps<FormState extends GenericForm> = tst.O.Merge<
  { onChange?: (time: RngTime) => void },
  FormFieldProps<FormState, RngTime | null, TimePickerProps>
>;

export const FormikTimePicker = <FormState extends GenericForm>({
  name,
  onChange,
  ...props
}: FormikTimePickerProps<FormState>) => {
  const [{ value }, { error }, { setValue }] = useField<RngTime | null>(name);

  return (
    <TimePicker
      {...props}
      name={name}
      value={value == null ? null : fromRngTime(value)}
      errorMessage={error}
      onChange={(date) => {
        const time = toRngTime(date);
        setValue(time);
        onChange?.(time);
      }}
    />
  );
};

type DatePickerProps = tst.O.Merge<
  PickerValueProps,
  tst.O.Omit<
    AntdDatePickerProps,
    // Time + date doesn't work well on small screens.
    // We'll always want to separate time and date pickers
    "showTime" | keyof PickerValueProps | "allowClear"
  >
>;

export const DatePicker = ({
  onChange,
  errorMessage,
  status,
  ...props
}: DatePickerProps) => {
  const size = useSize();

  return (
    <PickerContainer vertical>
      <AntdDatePicker
        size={size}
        format={
          props.picker === "month"
            ? rngChronoFormat.monthYear
            : rngChronoFormat.date
        }
        // Virtual keyboards get in the way of the popup
        inputReadOnly
        {...props}
        allowClear={false}
        status={errorMessage != null ? "error" : status}
        // antd types lie, so we're fixing them and making them more accurate
        // @ts-expect-error Type '(date: Dayjs | null) => void' is not assignable to type '(date: Dayjs, dateString: string | string[]) => void'.
        onChange={(date: Dayjs | null) => {
          if (date != null) {
            onChange?.(date);
          }
        }}
      />
      {errorMessage != null && (
        <Typography.Text type="danger">{errorMessage}</Typography.Text>
      )}
    </PickerContainer>
  );
};

type FormikDatePickerProps<FormState extends GenericForm> = tst.O.Merge<
  { onChange?: (date: RngDate) => void },
  FormFieldProps<FormState, RngDate | null, DatePickerProps>
>;

export const FormikDatePicker = <FormState extends GenericForm>({
  name,
  onChange,
  ...props
}: FormikDatePickerProps<FormState>) => {
  const [{ value }, { error }, { setValue }] = useField<RngDate | null>(name);

  return (
    <DatePicker
      {...props}
      name={name}
      value={value == null ? null : fromRngDate(value)}
      errorMessage={error}
      onChange={(date) => {
        const rngDate = toRngDate(date);
        setValue(rngDate);
        onChange?.(rngDate);
      }}
    />
  );
};
