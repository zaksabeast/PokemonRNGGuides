import {
  Switch as AntdSwitch,
  SwitchProps as AntdSwitchProps,
  Tooltip,
} from "antd";
import { useField } from "formik";
import * as tst from "ts-toolbelt";
import { GenericForm, GuaranteeFormNameType } from "~/types/form";
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
  const [{ value }, { error }, { setValue, setTouched }] =
    useField<boolean>(name);

  return (
    <Tooltip color="red" title={error} placement="top">
      <Switch
        data-name={name}
        onChange={(updatedValue) => {
          setValue(updatedValue);
          setTouched(true, false);
        }}
        value={value}
        {...props}
      />
    </Tooltip>
  );
};
