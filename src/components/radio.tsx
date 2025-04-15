import {
  Radio as AntdRadio,
  RadioGroupProps as AntdRadioGroupProps,
  CheckboxOptionType,
} from "antd";
import { useFormikContext } from "formik";
import * as tst from "ts-toolbelt";
import { GenericForm } from "~/types/form";
import { get } from "lodash-es";
import { withCss } from "./withCss";

export const RadioGroup = withCss(AntdRadio.Group);

type FormikRadioOptions<OptionValues extends string | number> =
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
      FormState[FieldKey] extends string | number ? FormState[FieldKey] : never
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
  const formik = useFormikContext<FormState>();
  const value = name != null ? get(formik.values, name) : null;
  return (
    <RadioGroup
      optionType="button"
      name={String(name)}
      onChange={formik.handleChange}
      value={value}
      {...props}
    />
  );
};
