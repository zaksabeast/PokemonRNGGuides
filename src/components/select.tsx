import * as tst from "ts-toolbelt";
import { ClassNames } from "@emotion/react";
import styled from "@emotion/styled";
import { Select as AntdSelect, SelectProps as AntdSelectProps } from "antd";
import { useFormikContext } from "formik";
import { GenericForm } from "~/types/form";
import { Flex } from "./flex";

const SelectContainer = styled(Flex)({
  ".ant-select": {
    width: "100%",
    outline: "none",
    boxShadow: "none",
    ".ant-select-selector": {
      fontSize: 18,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      outline: "none",
      boxShadow: "none !important",
      borderRadius: 0,
    },
    ".ant-select-selection-search-input": {
      fontSize: 18,
    },
  },
});

type SelectProps<ValueType> = {
  fullWidth?: boolean;
  fullFlex?: boolean;
} & AntdSelectProps<ValueType>;

export const Select = <ValueType,>({
  fullWidth,
  fullFlex,
  ...props
}: SelectProps<ValueType>) => {
  return (
    <SelectContainer flex={fullFlex ? 1 : undefined}>
      <ClassNames>
        {({ css }) => (
          <AntdSelect
            size="large"
            {...props}
            className={css({
              width: fullWidth ? "100%" : undefined,
              flex: fullFlex ? 1 : undefined,
            })}
          />
        )}
      </ClassNames>
    </SelectContainer>
  );
};

type FormikSelectValue<
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
> = FormState[FieldKey] extends string
  ? { label: string; value: FormState[FieldKey] }[]
  : never;

type FormikSelectProps<
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
> = tst.O.Merge<
  Omit<
    SelectProps<FormikSelectValue<FormState, FieldKey>>,
    "onChange" | "defaultValue" | "options"
  >,
  {
    name: FieldKey;
    options: FormikSelectValue<FormState, FieldKey>;
  }
>;

export const FormikSelect = <
  FormState extends GenericForm,
  FieldKey extends keyof FormState,
>({
  name,
  ...props
}: FormikSelectProps<FormState, FieldKey>) => {
  const formik = useFormikContext<FormState>();
  return (
    <Select
      {...props}
      onChange={(value) => formik.setFieldValue(String(name), value)}
      // @ts-expect-error -- prop types guarantee this is correct
      value={formik.values[name]}
    />
  );
};
