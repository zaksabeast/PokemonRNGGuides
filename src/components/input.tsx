import {
  Input as AntdInput,
  InputProps as AntdInputProps,
  InputRef,
} from "antd";
import React from "react";
import styled from "@emotion/styled";
import { GenericForm, GuarnteeFormNameType } from "~/types/form";
import { useFormikContext } from "formik";
import * as tst from "ts-toolbelt";

const InputContainer = styled.div<{ fullFlex?: boolean; textAlign?: "center" }>(
  ({ fullFlex, textAlign }) => ({
    flex: fullFlex ? 1 : undefined,
    ".ant-input": {
      fontSize: 18,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      outline: "none",
      boxShadow: "none",
      borderRadius: 0,
      paddingTop: 0,
      textAlign,
    },
    ".ant-input-group-addon": {
      fontSize: 18,
      backgroundColor: "unset",
      border: "unset",
      borderRadius: "unset",
    },
  }),
);

type InputProps = tst.O.Merge<
  {
    fullFlex?: boolean;
    autoFocus?: boolean;
    textAlign?: "center";
  },
  AntdInputProps
>;

export const Input = ({
  fullFlex,
  autoFocus,
  textAlign,
  ...props
}: InputProps) => {
  const inputRef = React.useRef<InputRef>(null);

  React.useEffect(() => {
    if (autoFocus && inputRef.current != null) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <InputContainer fullFlex={fullFlex} textAlign={textAlign}>
      <AntdInput size="large" ref={inputRef} autoComplete="off" {...props} />
    </InputContainer>
  );
};

type FormikInputProps<FormState extends GenericForm> = tst.O.Merge<
  Omit<InputProps, "onChange" | "defaultValue" | "name">,
  { name: GuarnteeFormNameType<FormState, string> }
>;

export const FormikInput = <FormState extends GenericForm>(
  props: FormikInputProps<FormState>,
) => {
  type Name = (typeof props)["name"];
  const formik = useFormikContext<Record<Name, string>>();
  return (
    <Input
      {...props}
      onChange={formik.handleChange}
      defaultValue={formik.initialValues[props.name]}
    />
  );
};
