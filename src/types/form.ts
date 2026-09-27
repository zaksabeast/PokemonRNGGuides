import { FieldValues } from "react-hook-form";
import * as tst from "ts-toolbelt";
import { Paths } from "./utils";

export type GenericForm = FieldValues;

// Props the form owns, so form-connected components shouldn't accept them.
export type FormControlledProps =
  | "name"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onBlur"
  | "status"
  | "errorMessage";

/**
 * Props for a form-connected wrapper around `Props`.
 * `name` is restricted to form fields whose value is `Value`.
 */
export type FormFieldProps<
  FormState extends GenericForm,
  Value,
  Props extends object,
> = tst.O.Merge<
  Omit<Props, FormControlledProps>,
  { name: Paths<FormState, Value> }
>;

export type GuaranteeFormNameType<FormState extends GenericForm, Type> = {
  [K in keyof FormState]: FormState[K] extends Type
    ? K extends string
      ? K
      : never
    : never;
}[keyof FormState];
