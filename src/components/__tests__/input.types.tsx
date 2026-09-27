import { FormikInput } from "../input";
import { FormFieldProps } from "~/types/form";
import { check, Pass } from "~/typeTest";

type FormState = {
  name: string;
  count: number;
  nullableName: string | null;
  nested: { label: string };
};

export const FieldNameTest = () => {
  type Result = FormFieldProps<FormState, string, { placeholder?: string }>;
  type Expected = { name: "name" | "nested.label"; placeholder?: string };
  check<Result, Expected>(Pass);
};

export const ValidNameTest = () => (
  <>
    <FormikInput<FormState> name="name" placeholder="Name" />
    <FormikInput<FormState> name="nested.label" />
  </>
);

export const NonStringFieldTest = () => (
  <>
    {/* @ts-expect-error number fields can't be used */}
    <FormikInput<FormState> name="count" />
    {/* @ts-expect-error nullable fields can't be used */}
    <FormikInput<FormState> name="nullableName" />
  </>
);

export const UnknownFieldTest = () => (
  // @ts-expect-error name must be a form field
  <FormikInput<FormState> name="unknown" />
);

export const RequiredNameTest = () => (
  // @ts-expect-error name is required
  <FormikInput<FormState> />
);
