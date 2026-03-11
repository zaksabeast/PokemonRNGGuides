import {
  Input as AntdInput,
  InputProps as AntdInputProps,
  InputRef,
} from "antd";
import React from "react";
import styled from "@emotion/styled";
import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { useField } from "~/hooks/form";
import * as tst from "ts-toolbelt";
import { Typography } from "./typography";

const InputContainer = styled.div<{ textAlign?: "center" }>(
  ({ textAlign }) => ({
    ".ant-input": {
      textAlign,
    },
  }),
);

type InputProps = tst.O.Merge<
  {
    autoFocus?: boolean;
    textAlign?: "center";
    errorMessage?: string;
  },
  AntdInputProps
>;

export const Input = ({
  autoFocus,
  textAlign,
  errorMessage,
  ...props
}: InputProps) => {
  const inputRef = React.useRef<InputRef>(null);

  const _status = errorMessage != null ? "error" : undefined;

  React.useEffect(() => {
    if (autoFocus && inputRef.current != null) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <InputContainer textAlign={textAlign}>
      <AntdInput
        size="large"
        ref={inputRef}
        autoComplete="off"
        status={_status}
        {...props}
      />
      {errorMessage != null && (
        <Typography.Text type="danger">{errorMessage}</Typography.Text>
      )}
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
  const [{ value, onBlur, onChange }, { error, status }] =
    useField<string>(name);
  return (
    <Input
      status={status}
      errorMessage={error}
      {...props}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
    />
  );
};
