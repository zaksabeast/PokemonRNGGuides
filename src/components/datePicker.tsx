import {
  TimePicker as AntdTimePicker,
  TimePickerProps as AntdTimePickerProps,
  DatePicker as AntdDatePicker,
  DatePickerProps as AntdDatePickerProps,
  Tooltip,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import styled from "@emotion/styled";
import { useField } from "~/hooks/form";
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
  const [{ value: formTime }, { error, touched }, { setValue }] =
    useField<RngTime | null>(name);
  const value = formTime == null ? null : fromRngTime(formTime);

  return (
    <Tooltip placement="top" color="red" title={error}>
      <TimePicker
        {...props}
        name={name}
        value={value}
        status={error != null && touched ? "error" : ""}
        onChange={(date) => {
          const rngTime = date == null ? null : toRngTime(date);
          setValue(rngTime);
          onChange?.(rngTime ?? null);
        }}
      />
    </Tooltip>
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
  "showTime" | keyof NullableDate | "allowClear"
> &
  NullableDate;

export const DatePicker = ({
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
        allowClear={false}
        {...props}
        // antd types lie, so we're fixing them and making them more accurate
        // @ts-expect-error Type '(date: Dayjs | null, dateString: string) => void' is not assignable to type '(date: Dayjs, dateString: string | string[]) => void'.
        onChange={(date: Dayjs | null, dateString: string) => {
          if (date != null) {
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
  onChange,
  ...props
}: FormikDatePickerProps<FormState>) => {
  const [{ value: formDate }, { error, touched }, { setValue }] =
    useField<RngDate | null>(name);
  const dateValue = match({ formDate })
    .with({ formDate: P.not(P.nullish) }, (matched) =>
      fromRngDate(matched.formDate),
    )
    .otherwise(() => dayjs());

  return (
    <Tooltip placement="top" color="red" title={error}>
      <DatePicker
        {...props}
        name={name}
        fullWidth={fullWidth}
        value={dateValue}
        status={error != null && touched ? "error" : ""}
        onChange={(date) => {
          const rngDate = date == null ? null : toRngDate(date);
          setValue(rngDate);
          onChange?.(rngDate ?? null);
        }}
      />
    </Tooltip>
  );
};
