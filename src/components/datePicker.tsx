import {
  TimePicker as AntdTimePicker,
  TimePickerProps as AntdTimePickerProps,
  DatePicker as AntdDatePicker,
  DatePickerProps as AntdDatePickerProps,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import styled from "@emotion/styled";
import { useFormikContext } from "formik";
import * as tst from "ts-toolbelt";
import { match, P } from "ts-pattern";
import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import {
  rngChronoFormat,
  toRngDate,
  fromRngDate,
  RngTime,
  fromRngTime,
  toRngTime,
} from "~/utils/time";
import { RngDate } from "~/rngTools";

type DatePickerContainerProps = { fullWidth?: boolean };

const PickerContainer = styled.div<DatePickerContainerProps>(
  ({ fullWidth }) => ({
    ".ant-picker": {
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      outline: "none",
      boxShadow: "none",
      borderRadius: 0,
      width: fullWidth ? "100%" : undefined,
    },
    ".ant-picker-input > input": {
      fontSize: 20,
    },
  }),
);

type _TimePickerProps = tst.O.Merge<
  DatePickerContainerProps,
  AntdTimePickerProps
>;

type TimePickerProps = tst.O.Omit<
  _TimePickerProps,
  keyof NullableDate | "allowClear"
> &
  NullableDate & { nullable?: boolean };

const TimePicker = ({
  nullable,
  fullWidth = true,
  showSecond,
  onChange,
  ...props
}: TimePickerProps) => {
  return (
    <PickerContainer fullWidth={fullWidth}>
      <AntdTimePicker
        showMinute
        showHour
        showSecond={showSecond}
        // Virtual keyboards get in the way of the pop
        inputReadOnly
        allowClear={false}
        // antd types lie, so we're fixing them and making them more accurate
        // @ts-expect-error Type '(date: Dayjs | null, dateString: string) => void' is not assignable to type '(date: Dayjs, dateString: string | string[]) => void'.
        onChange={(date: Dayjs | null, dateString: string) => {
          if (nullable || date != null) {
            onChange?.(date, dateString);
          }
        }}
        format={
          showSecond
            ? rngChronoFormat.hoursMinutesSeconds
            : rngChronoFormat.hoursMinutes
        }
        {...props}
      />
    </PickerContainer>
  );
};

type FormikTimePickerProps<FormState extends GenericForm> = Omit<
  TimePickerProps,
  "onChange" | "value"
> & {
  name: GuaranteeFormNameType<FormState, RngTime | null>;
  value?: RngTime;
  onChange?: (date: RngTime | null) => void;
};

export const FormikTimePicker = <FormState extends GenericForm>({
  name,
  onChange,
  ...props
}: FormikTimePickerProps<FormState>) => {
  const { values, setFieldValue } =
    useFormikContext<Record<typeof name, RngTime | null>>();
  const formTime: RngTime | null = values[name];
  const value = formTime == null ? null : fromRngTime(formTime);

  return (
    <TimePicker
      {...props}
      name={name}
      value={value}
      onChange={(date) => {
        const rngTime = date == null ? null : toRngTime(date);
        setFieldValue(name, rngTime);
        onChange?.(rngTime);
      }}
    />
  );
};

type NullableDate = {
  onChange?: (date: Dayjs | null, dateString: string) => void;
  value?: Dayjs | null;
};

type _DatePickerProps = tst.O.Merge<
  DatePickerContainerProps,
  AntdDatePickerProps
>;

type DatePickerProps = tst.O.Omit<
  _DatePickerProps,
  // Time + date doesn't work well on small screens.
  // We'll always want to separate time and date pickers
  "showTime" | keyof NullableDate
> &
  NullableDate;

export const DatePicker = ({
  allowClear,
  onChange,
  fullWidth,
  picker,
  ...props
}: DatePickerProps) => {
  return (
    <PickerContainer fullWidth={fullWidth}>
      <AntdDatePicker
        picker={picker}
        size="large"
        format={
          picker === "month" ? rngChronoFormat.monthYear : rngChronoFormat.date
        }
        // Virtual keyboards get in the way of the pop
        inputReadOnly
        allowClear={allowClear}
        {...props}
        // antd types lie, so we're fixing them and making them more accurate
        // @ts-expect-error Type '(date: Dayjs | null, dateString: string) => void' is not assignable to type '(date: Dayjs, dateString: string | string[]) => void'.
        onChange={(date: Dayjs | null, dateString: string) => {
          if (allowClear || date != null) {
            onChange?.(date, dateString);
          }
        }}
      />
    </PickerContainer>
  );
};

type FormikDatePickerProps<FormState extends GenericForm> = Omit<
  DatePickerProps,
  "onChange" | "value"
> & {
  name: GuaranteeFormNameType<FormState, RngDate | null>;
  value?: RngDate;
  onChange?: (date: RngDate | null) => void;
};

export const FormikDatePicker = <FormState extends GenericForm>({
  name,
  fullWidth = true,
  allowClear = false,
  onChange,
  ...props
}: FormikDatePickerProps<FormState>) => {
  const { values, setFieldValue } =
    useFormikContext<Record<typeof name, RngDate | null>>();
  const formDate: RngDate | null = values[name];
  const dateValue = match({ allowClear, formDate })
    .with({ formDate: P.not(null) }, (matched) => fromRngDate(matched.formDate))
    .with({ allowClear: true, formDate: null }, () => null)
    .with({ allowClear: P.not(P.nullish), formDate: null }, () => dayjs())
    .with({ allowClear: undefined, formDate: null }, () => null)
    .exhaustive();

  return (
    <DatePicker
      {...props}
      name={name}
      allowClear={allowClear}
      fullWidth={fullWidth}
      value={dateValue}
      onChange={(date) => {
        const rngDate = date == null ? null : toRngDate(date);
        setFieldValue(name, rngDate);
        onChange?.(rngDate);
      }}
    />
  );
};
