import {
  BigIntInput,
  FormikBigIntInput,
  FormikNumberInput,
  NumberInput,
} from "../numberInput";

type FormState = {
  count: number;
  nullableCount: number | null;
  seed: bigint | null;
  name: string;
  nested: { count: number };
};

export const ValidNameTest = () => (
  <>
    <FormikNumberInput<FormState> name="count" numType="decimal" />
    <FormikNumberInput<FormState> name="nullableCount" numType="hex" />
    <FormikNumberInput<FormState> name="nested.count" numType="float" />
    <FormikBigIntInput<FormState> name="seed" numType="hex_bigint" />
  </>
);

export const WrongFieldTypeTest = () => (
  <>
    {/* @ts-expect-error string fields can't be used */}
    <FormikNumberInput<FormState> name="name" numType="decimal" />
    {/* @ts-expect-error bigint fields need FormikBigIntInput */}
    <FormikNumberInput<FormState> name="seed" numType="decimal" />
    {/* @ts-expect-error number fields need FormikNumberInput */}
    <FormikBigIntInput<FormState> name="count" numType="hex_bigint" />
  </>
);

export const NumTypeTest = () => (
  <>
    {/* @ts-expect-error hex_bigint needs FormikBigIntInput */}
    <FormikNumberInput<FormState> name="count" numType="hex_bigint" />
    {/* @ts-expect-error FormikBigIntInput only supports hex_bigint */}
    <FormikBigIntInput<FormState> name="seed" numType="hex" />
    {/* @ts-expect-error hex_bigint needs BigIntInput */}
    <NumberInput value={1} numType="hex_bigint" />
    {/* @ts-expect-error BigIntInput only supports hex_bigint */}
    <BigIntInput value={1n} numType="hex" />
  </>
);

export const UnknownFieldTest = () => (
  // @ts-expect-error name must be a form field
  <FormikNumberInput<FormState> name="unknown" numType="decimal" />
);
