import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from "antd";
import { useFormikContext } from "formik";
import * as tst from "ts-toolbelt";
import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { get } from "lodash-es";
import { withCss } from "./withCss";

export const Switch = withCss(AntdSwitch);

type FormikSwitchProps<
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
> = tst.O.Merge<
  Omit<AntdSwitchProps, "onChange" | "value">,
  {
    name: FieldKey extends GuaranteeFormNameType<FormState, boolean>
      ? FieldKey
      : never;
  }
>;

export const FormikSwitch = <
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
>({
  name,
  ...props
}: FormikSwitchProps<FormState, FieldKey>) => {
  const formik = useFormikContext<FormState>();
  const value = get(formik.values, name);
  return (
    <Switch
      data-name={name}
      onChange={(value) => formik.setFieldValue(name, value)}
      value={Boolean(value)}
      {...props}
    />
  );
};
