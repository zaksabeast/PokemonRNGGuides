import {
  Input as AntdInput,
  InputProps as AntdInputProps,
  InputRef,
  Tooltip,
} from "antd";
import React from "react";
import styled from "@emotion/styled";
import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { useField } from "formik";
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
    ".ant-input-outlined.ant-input-status-error": {
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      ":focus": {
        boxShadow: "none",
      },
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
    errorMessage?: string;
  },
  AntdInputProps
>;

export const Input = ({
  fullFlex,
  autoFocus,
  textAlign,
  status,
  errorMessage,
  ...props
}: InputProps) => {
  const inputRef = React.useRef<InputRef>(null);

  const _status = (status ?? errorMessage != null) ? "error" : undefined;

  React.useEffect(() => {
    if (autoFocus && inputRef.current != null) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <InputContainer fullFlex={fullFlex} textAlign={textAlign}>
      <Tooltip color="red" title={errorMessage} placement="top">
        <AntdInput
          size="large"
          ref={inputRef}
          autoComplete="off"
          {...props}
          status={_status}
        />
      </Tooltip>
    </InputContainer>
  );
};

type FormikInputProps<FormState extends GenericForm> = tst.O.Merge<
  Omit<InputProps, "onChange" | "defaultValue" | "name">,
  { name: GuaranteeFormNameType<FormState, string> }
>;

export const FormikInput = <FormState extends GenericForm>({
  name,
  ...props
}: FormikInputProps<FormState>) => {
  const [{ value, onBlur, onChange }, { error }] = useField<string>(name);
  return (
    <Input
      {...props}
      name={name}
      errorMessage={error}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
    />
  );
};
