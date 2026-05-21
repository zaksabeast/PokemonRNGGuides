import {
  TimePicker as AntdTimePicker,
  TimePickerProps as AntdTimePickerProps,
  DatePicker as AntdDatePicker,
  DatePickerProps as AntdDatePickerProps,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useField } from "~/hooks/form";
import * as tst from "ts-toolbelt";
import { match, P } from "ts-pattern";
import { Flex } from "./flex";
import { Typography } from "./typography";
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

type TimePickerProps = tst.O.Omit<
  AntdTimePickerProps,
  keyof NullableDate | "allowClear"
> &
  NullableDate & { nullable?: boolean };

const TimePicker = ({
  nullable,
  showSecond,
  onChange,
  ...props
}: TimePickerProps) => {
  return (
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
  const [{ value: formTime }, { error, status }, { setValue }] =
    useField<RngTime | null>(name);
  const value = formTime == null ? null : fromRngTime(formTime);

  return (
    <Flex vertical>
      <TimePicker
        {...props}
        name={name}
        value={value}
        size="large"
        status={status}
        onChange={(date) => {
          const rngTime = date == null ? null : toRngTime(date);
          setValue(rngTime);
          onChange?.(rngTime ?? null);
        }}
      />
      {error != null && (
        <Typography.Text type="danger">{error}</Typography.Text>
      )}
    </Flex>
  );
};

type NullableDate = {
  onChange?: (date: Dayjs | null, dateString: string) => void;
  value?: Dayjs | null;
};

type DatePickerProps = tst.O.Omit<
  AntdDatePickerProps,
  // Time + date doesn't work well on small screens.
  // We'll always want to separate time and date pickers
  "showTime" | keyof NullableDate | "allowClear"
> &
  NullableDate;

export const DatePicker = ({ onChange, picker, ...props }: DatePickerProps) => {
  return (
    <AntdDatePicker
      picker={picker}
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
  onChange,
  ...props
}: FormikDatePickerProps<FormState>) => {
  const [{ value: formDate }, { error, status }, { setValue }] =
    useField<RngDate | null>(name);
  const dateValue = match({ formDate })
    .with({ formDate: P.not(P.nullish) }, (matched) =>
      fromRngDate(matched.formDate),
    )
    .otherwise(() => dayjs());

  return (
    <Flex vertical>
      <DatePicker
        {...props}
        name={name}
        size="large"
        value={dateValue}
        status={status}
        onChange={(date) => {
          const rngDate = date == null ? null : toRngDate(date);
          setValue(rngDate);
          onChange?.(rngDate ?? null);
        }}
      />
      {error != null && (
        <Typography.Text type="danger">{error}</Typography.Text>
      )}
    </Flex>
  );
};
