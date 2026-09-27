import { FormikTextArea } from "../textArea";

type FormState = {
  notes: string;
  count: number;
  nullableNotes: string | null;
  nested: { notes: string };
};

export const ValidNameTest = () => (
  <>
    <FormikTextArea<FormState> name="notes" placeholder="Notes" rows={4} />
    <FormikTextArea<FormState> name="nested.notes" />
  </>
);

export const NonStringFieldTest = () => (
  <>
    {/* @ts-expect-error number fields can't be used */}
    <FormikTextArea<FormState> name="count" />
    {/* @ts-expect-error nullable fields can't be used */}
    <FormikTextArea<FormState> name="nullableNotes" />
  </>
);

export const UnknownFieldTest = () => (
  // @ts-expect-error name must be a form field
  <FormikTextArea<FormState> name="unknown" />
);
