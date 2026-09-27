import {
  FormDateField,
  FormNumberField,
  FormRadioField,
  FormMultiSelectField,
  FormSelectField,
  FormSwitchField,
  FormTextField,
  FormTimeField,
} from "../form";
import { RngDate } from "~/rngTools";
import { RngTime } from "~/utils/time";

type Gender = "Male" | "Female";
type Action = "walk" | "fish";

type FormState = {
  count: number;
  nullableCount: number | null;
  name: string;
  gender: Gender;
  nullableGender: Gender | null;
  actions: Action[];
  enabled: boolean;
  date: RngDate;
  nullableDate: RngDate | null;
  time: RngTime;
  nullableTime: RngTime | null;
  nested: {
    count: number;
    name: string;
    active: boolean;
    date: RngDate;
    time: RngTime;
  };
};

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
] satisfies { label: string; value: Gender }[];

const actionOptions = [
  { label: "Walk", value: "walk" },
  { label: "Fish", value: "fish" },
] satisfies { label: string; value: Action }[];

const countOptions = [
  { label: "5", value: 5 },
  { label: "6", value: 6 },
];

export const TextFieldNameTest = () => (
  <>
    <FormTextField<FormState> name="name" label="Name" />
    <FormTextField<FormState> name="nested.name" label="Name" />
    {/* @ts-expect-error number fields can't be used */}
    <FormTextField<FormState> name="count" label="Count" />
    {/* @ts-expect-error name must be a form field */}
    <FormTextField<FormState> name="unknown" label="Unknown" />
  </>
);

export const NumberFieldNameTest = () => (
  <>
    <FormNumberField<FormState> name="count" label="Count" numType="decimal" />
    <FormNumberField<FormState>
      name="nullableCount"
      label="Count"
      numType="hex"
    />
    <FormNumberField<FormState>
      name="nested.count"
      label="Count"
      numType="float"
    />
    {/* @ts-expect-error string fields can't be used */}
    <FormNumberField<FormState> name="name" label="Name" numType="decimal" />
    <FormNumberField<FormState>
      name="count"
      label="Count"
      // @ts-expect-error hex_bigint isn't supported
      numType="hex_bigint"
    />
  </>
);

export const FormControlledPropsTest = () => (
  <>
    {/* @ts-expect-error the form owns the value */}
    <FormTextField<FormState> name="name" label="Name" value="" />
    <FormNumberField<FormState>
      name="count"
      label="Count"
      numType="decimal"
      // @ts-expect-error the form owns the value
      value={1}
    />
    {/* @ts-expect-error label is required */}
    <FormTextField<FormState> name="name" />
  </>
);

export const SelectFieldTest = () => (
  <>
    <FormSelectField<FormState>
      name="gender"
      label="Gender"
      options={genderOptions}
    />
    <FormSelectField<FormState>
      name="nullableGender"
      label="Gender"
      options={[{ label: "Any", value: null, muted: true }, ...genderOptions]}
    />
    <FormSelectField<FormState>
      name="count"
      label="Count"
      options={countOptions}
    />
    <FormMultiSelectField<FormState>
      name="actions"
      label="Actions"
      options={actionOptions}
    />
    {/* @ts-expect-error options must match the field type */}
    <FormSelectField<FormState>
      name="gender"
      label="Gender"
      options={actionOptions}
    />
    {/* @ts-expect-error null options need a nullable field */}
    <FormSelectField<FormState>
      name="gender"
      label="Gender"
      options={[{ label: "Any", value: null }, ...genderOptions]}
    />
    <FormSelectField<FormState>
      // @ts-expect-error array fields need FormMultiSelectField
      name="actions"
      label="Actions"
      options={actionOptions}
    />
    <FormMultiSelectField<FormState>
      // @ts-expect-error FormMultiSelectField needs an array field
      name="gender"
      label="Gender"
      options={actionOptions}
    />
    <FormMultiSelectField<FormState>
      name="actions"
      label="Actions"
      // @ts-expect-error options must match the array's item type
      options={genderOptions}
    />
  </>
);

export const RadioFieldTest = () => (
  <>
    <FormRadioField<FormState>
      name="gender"
      label="Gender"
      cellSize="word"
      options={genderOptions}
    />
    <FormRadioField<FormState>
      name="nullableGender"
      label="Gender"
      cellSize="word"
      options={[{ label: "Any", value: null }, ...genderOptions]}
    />
    <FormRadioField<FormState>
      name="nested.count"
      label="Count"
      cellSize="number"
      options={countOptions}
    />
    {/* @ts-expect-error cellSize is required */}
    <FormRadioField<FormState>
      name="gender"
      label="Gender"
      options={genderOptions}
    />
    {/* @ts-expect-error options must match the field type */}
    <FormRadioField<FormState>
      name="gender"
      label="Gender"
      cellSize="number"
      options={countOptions}
    />
    {/* @ts-expect-error null options need a nullable field */}
    <FormRadioField<FormState>
      name="gender"
      label="Gender"
      cellSize="word"
      options={[{ label: "Any", value: null }, ...genderOptions]}
    />
    <FormRadioField<FormState>
      // @ts-expect-error boolean fields can't be used
      name="enabled"
      label="On"
      cellSize="word"
      options={[]}
    />
  </>
);

export const SwitchFieldTest = () => (
  <>
    <FormSwitchField<FormState> name="enabled" label="Enabled" />
    <FormSwitchField<FormState> name="nested.active" label="Active">
      <FormNumberField<FormState>
        name="nested.count"
        label="Count"
        numType="decimal"
      />
    </FormSwitchField>
    {/* @ts-expect-error string fields can't be used */}
    <FormSwitchField<FormState> name="name" label="Name" />
  </>
);

export const DateFieldTest = () => (
  <>
    <FormDateField<FormState> name="date" label="Date" />
    <FormDateField<FormState>
      name="nullableDate"
      label="Month"
      picker="month"
    />
    <FormDateField<FormState> name="nested.date" label="Date" />
    {/* @ts-expect-error time fields can't be used */}
    <FormDateField<FormState> name="time" label="Time" />
    {/* @ts-expect-error number fields can't be used */}
    <FormDateField<FormState> name="count" label="Count" />
    {/* @ts-expect-error name must be a form field */}
    <FormDateField<FormState> name="unknown" label="Unknown" />
    {/* @ts-expect-error label is required */}
    <FormDateField<FormState> name="date" />
  </>
);

export const TimeFieldTest = () => (
  <>
    <FormTimeField<FormState> name="time" label="Time" showSecond />
    <FormTimeField<FormState> name="nullableTime" label="Time" />
    <FormTimeField<FormState> name="nested.time" label="Time" />
    {/* @ts-expect-error date fields can't be used */}
    <FormTimeField<FormState> name="date" label="Date" />
    {/* @ts-expect-error number fields can't be used */}
    <FormTimeField<FormState> name="count" label="Count" />
    {/* @ts-expect-error name must be a form field */}
    <FormTimeField<FormState> name="unknown" label="Unknown" />
  </>
);
