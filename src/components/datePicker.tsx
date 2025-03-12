import {
  Radio,
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
import { GenericForm, GuarnteeFormNameType } from "~/types/form";

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
    ".ant-picker-outlined": {
      background: "none",
    },
    ".ant-picker-input > input": {
      fontSize: 20,
    },
  }),
);

type NullableDate = {
  onChange?: (date: Dayjs | null, dateString: string) => void;
  value?: Dayjs | null;
};

type _DatePickerProps = tst.O.Merge<
  DatePickerContainerProps,
  AntdDatePickerProps
>;

type DatePickerProps = tst.O.Omit<_DatePickerProps, keyof NullableDate> &
  NullableDate;

export const DatePicker = ({
  allowClear,
  onChange,
  fullWidth,
  ...props
}: DatePickerProps) => {
  return (
    <PickerContainer fullWidth={fullWidth}>
      <AntdDatePicker
        size="large"
        format="MMM D, YYYY"
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
  fullWidth,
  onChange,
  ...props
}: TimePickerProps) => {
  return (
    <PickerContainer fullWidth={fullWidth}>
      <AntdTimePicker
        use12Hours
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
        format="h:mm A"
        {...props}
      />
    </PickerContainer>
  );
};

const allDayOptions = [
  { label: "All Day", value: true },
  { label: "Specific Time", value: false },
];

type FormikDatePickerProps<FormState extends GenericForm> = Omit<
  DatePickerProps,
  "onChange"
> & {
  name: GuarnteeFormNameType<FormState, Dayjs | null>;
  showTimePicker?: boolean;
  allDayName?: GuarnteeFormNameType<FormState, boolean>;
  allDayDefaultValue?: boolean;
  onChange?: (date: Dayjs | null) => void;
};

export const FormikDatePicker = <FormState extends GenericForm>({
  name,
  showTimePicker,
  allDayName,
  allDayDefaultValue,
  fullWidth = true,
  allowClear = false,
  onChange,
  ...props
}: FormikDatePickerProps<FormState>) => {
  const { values, setFieldValue } = useFormikContext<FormState>();
  const allDayValue =
    allDayName != null ? Boolean(get(values, allDayName)) : false;
  const _formDate = get(values, name);
  const formDate: Dayjs | null = dayjs.isDayjs(_formDate) ? _formDate : null;
  const dateValue = match({ allowClear, formDate })
    .with({ formDate: P.not(null) }, (matched) => matched.formDate)
    .with({ allowClear: true, formDate: null }, () => null)
    .with({ allowClear: P.not(P.nullish), formDate: null }, () => dayjs())
    .with({ allowClear: undefined, formDate: null }, () => null)
    .exhaustive();

  return (
    <>
      {showTimePicker && (
        <Radio.Group
          block
          name={allDayName}
          options={allDayOptions}
          defaultValue={allDayDefaultValue}
          optionType="button"
          buttonStyle="solid"
          onChange={(event) => {
            const isAllDay = event.target.value;
            if (allDayName != null) {
              setFieldValue(allDayName, isAllDay);
            }
            if (isAllDay && dateValue != null) {
              setFieldValue(name, dateValue.startOf("day"));
            }
          }}
        />
      )}
      {showTimePicker && !allDayValue && (
        <TimePicker
          disabled={allDayValue}
          fullWidth={fullWidth}
          value={dateValue}
          nullable={Boolean(allowClear)}
          onChange={(date) => setFieldValue(name, date)}
        />
      )}
      <DatePicker
        {...props}
        allowClear={allowClear}
        fullWidth={fullWidth}
        value={dateValue}
        onChange={(date) => {
          if (date != null && dateValue != null) {
            const dateWithTime = date
              .set("hour", dateValue.hour())
              .set("minute", dateValue.minute());
            setFieldValue(name, dateWithTime);
            onChange?.(dateWithTime);
          } else {
            setFieldValue(name, date);
            onChange?.(date);
          }
        }}
      />
    </>
  );
};
