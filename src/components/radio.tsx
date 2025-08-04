import {
  Radio as AntdRadio,
  RadioGroupProps as AntdRadioGroupProps,
  CheckboxOptionType,
  Tooltip,
} from "antd";
import { useField } from "~/hooks/form";
import * as tst from "ts-toolbelt";
import { GenericForm } from "~/types/form";
import { withCss } from "./withCss";
import { Path, Paths } from "~/types";

export const RadioGroup = withCss(AntdRadio.Group);

type FormikRadioOptions<OptionValues extends string | number> =
  | OptionValues[]
  | CheckboxOptionType<OptionValues>[];

type FormikRadioProps<
  FormState extends GenericForm,
  FieldKey extends Paths<FormState, string | number | null> = Paths<
    FormState,
    string | number | null
  >,
> = tst.O.Overwrite<
  tst.O.Omit<tst.O.Required<AntdRadioGroupProps, "name">, "onChange">,
  {
    name: FieldKey;
    options: FormikRadioOptions<
      Path<FormState, FieldKey> extends string | number | null
        ? tst.U.Exclude<Path<FormState, FieldKey>, null>
        : never
    >;
  }
>;

export const FormikRadio = <FormState extends GenericForm>({
  name,
  ...props
}: FormikRadioProps<FormState>) => {
  type FieldKey = typeof name;
  const [{ value, onChange, onBlur }, { error }] =
    useField<Path<FormState, FieldKey>>(name);

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
