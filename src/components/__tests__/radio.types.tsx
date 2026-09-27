import { FormikRadio } from "../radio";

type Gender = "Male" | "Female";

type FormState = {
  gender: Gender;
  nullableGender: Gender | null;
  level: number;
  shiny: boolean;
  nested: { level: number };
};

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
] satisfies { label: string; value: Gender }[];

const levelOptions = [
  { label: "5", value: 5 },
  { label: "6", value: 6 },
];

export const ValidNameTest = () => (
  <>
    <FormikRadio<FormState> name="gender" options={genderOptions} />
    <FormikRadio<FormState> name="nullableGender" options={genderOptions} />
    <FormikRadio<FormState> name="level" options={levelOptions} disabled />
    <FormikRadio<FormState> name="nested.level" options={levelOptions} />
    <FormikRadio<FormState>
      name="gender"
      options={[{ label: "Male", value: "Male" }] as const}
    />
  </>
);

export const OptionTypeTest = () => (
  <>
    {/* @ts-expect-error level options can't be used for gender */}
    <FormikRadio<FormState> name="gender" options={levelOptions} />
    {/* @ts-expect-error gender options can't be used for level */}
    <FormikRadio<FormState> name="level" options={genderOptions} />
    <FormikRadio<FormState>
      name="gender"
      // @ts-expect-error options must match the field type
      options={[{ label: "Unknown", value: "Unknown" }]}
    />
  </>
);

export const WrongFieldTypeTest = () => (
  // @ts-expect-error boolean fields can't be used
  <FormikRadio<FormState> name="shiny" options={genderOptions} />
);

export const UnknownFieldTest = () => (
  // @ts-expect-error name must be a form field
  <FormikRadio<FormState> name="unknown" options={genderOptions} />
);
