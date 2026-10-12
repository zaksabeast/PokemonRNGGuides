import { FormikSwitch } from "../switch";

type FormState = {
  enabled: boolean;
  name: string;
  nullableEnabled: boolean | null;
  nested: { active: boolean };
};

export const ValidNameTest = () => (
  <>
    <FormikSwitch<FormState> name="enabled" disabled />
    <FormikSwitch<FormState> name="nested.active" />
  </>
);

export const NonBooleanFieldTest = () => (
  <>
    {/* @ts-expect-error string fields can't be used */}
    <FormikSwitch<FormState> name="name" />
    {/* @ts-expect-error nullable fields can't be used */}
    <FormikSwitch<FormState> name="nullableEnabled" />
  </>
);
