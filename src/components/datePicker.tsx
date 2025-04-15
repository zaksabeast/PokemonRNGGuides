import {
  TimePicker as AntdTimePicker,
  TimePickerProps as AntdTimePickerProps,
  DatePicker as AntdDatePicker,
  DatePickerProps as AntdDatePickerProps,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { get } from "lodash-es";
import styled from "@emotion/styled";
import { useFormikContext } from "formik";
import * as tst from "ts-toolbelt";
import { match, P } from "ts-pattern";
import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { rngChronoFormat } from "~/utils/time";

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
  "onChange"
> & {
  name: GuaranteeFormNameType<FormState, Dayjs | null>;
  onChange?: (date: Dayjs | null) => void;
};

export const FormikTimePicker = <FormState extends GenericForm>({
  name,
  onChange,
  ...props
}: FormikTimePickerProps<FormState>) => {
  const { values, setFieldValue } = useFormikContext<FormState>();
  const _formDate = get(values, name);
  const dateValue: Dayjs | null = dayjs.isDayjs(_formDate) ? _formDate : null;

  return (
    <TimePicker
      {...props}
      name={name}
      value={dateValue}
      onChange={(date) => {
        setFieldValue(name, date);
        onChange?.(date);
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
  "onChange"
> & {
  name: GuaranteeFormNameType<FormState, Dayjs | null>;
  onChange?: (date: Dayjs | null) => void;
};

export const FormikDatePicker = <FormState extends GenericForm>({
  name,
  fullWidth = true,
  allowClear = false,
  onChange,
  ...props
}: FormikDatePickerProps<FormState>) => {
  const { values, setFieldValue } = useFormikContext<FormState>();
  const _formDate = get(values, name);
  const formDate: Dayjs | null = dayjs.isDayjs(_formDate) ? _formDate : null;
  const dateValue = match({ allowClear, formDate })
    .with({ formDate: P.not(null) }, (matched) => matched.formDate)
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
        setFieldValue(name, date);
        onChange?.(date);
      }}
    />
  );
};
