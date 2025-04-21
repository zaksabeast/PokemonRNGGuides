import {
  Radio as AntdRadio,
  RadioGroupProps as AntdRadioGroupProps,
  CheckboxOptionType,
  Tooltip,
} from "antd";
import { useField } from "formik";
import * as tst from "ts-toolbelt";
import { GenericForm } from "~/types/form";
import { withCss } from "./withCss";

export const RadioGroup = withCss(AntdRadio.Group);

type FormikRadioOptions<OptionValues extends string> =
  | OptionValues[]
  | CheckboxOptionType<OptionValues>[];

type FormikRadioProps<
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
> = tst.O.Overwrite<
  Omit<AntdRadioGroupProps, "onChange">,
  {
    name: FieldKey;
    options: FormikRadioOptions<
      FormState[FieldKey] extends string ? FormState[FieldKey] : never
    >;
  }
>;

export const FormikRadio = <
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
>({
  name,
  ...props
}: FormikRadioProps<FormState, FieldKey>) => {
  const [{ value, onChange, onBlur }, { error }] =
    useField<FormState[FieldKey]>(name);

  return (
    <Tooltip color="red" title={error} placement="top">
      <RadioGroup
        optionType="button"
        name={String(name)}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        {...props}
      />
    </Tooltip>
  );
};
