import { FormikDatePicker, FormikTimePicker } from "../datePicker";
import { RngDate } from "~/rngTools";
import { RngTime } from "~/utils/time";

type FormState = {
  date: RngDate;
  nullableDate: RngDate | null;
  time: RngTime;
  nullableTime: RngTime | null;
  count: number;
  nested: { date: RngDate; time: RngTime };
};

export const ValidNameTest = () => (
  <>
    <FormikDatePicker<FormState> name="date" />
    <FormikDatePicker<FormState> name="nullableDate" picker="month" />
    <FormikDatePicker<FormState> name="nested.date" />
    <FormikTimePicker<FormState> name="time" showSecond />
    <FormikTimePicker<FormState> name="nullableTime" />
    <FormikTimePicker<FormState> name="nested.time" />
  </>
);

export const WrongFieldTypeTest = () => (
  <>
    {/* @ts-expect-error time fields can't be used */}
    <FormikDatePicker<FormState> name="time" />
    {/* @ts-expect-error number fields can't be used */}
    <FormikDatePicker<FormState> name="count" />
    {/* @ts-expect-error date fields can't be used */}
    <FormikTimePicker<FormState> name="date" />
    {/* @ts-expect-error number fields can't be used */}
    <FormikTimePicker<FormState> name="count" />
  </>
);

export const UnknownFieldTest = () => (
  <>
    {/* @ts-expect-error name must be a form field */}
    <FormikDatePicker<FormState> name="unknown" />
    {/* @ts-expect-error name must be a form field */}
    <FormikTimePicker<FormState> name="unknown" />
  </>
);
