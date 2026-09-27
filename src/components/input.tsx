import { Input as AntdInput, InputProps as AntdInputProps } from "antd";
import styled from "@emotion/styled";
import * as tst from "ts-toolbelt";
import { FormFieldProps, GenericForm } from "~/types/form";
import { useField } from "~/hooks/form";
import { Typography } from "./typography";
import { useSize } from "~/theme/size";

const InputContainer = styled.div<{ textAlign?: "center"; fullFlex: boolean }>(
  ({ textAlign, fullFlex }) => ({
    flex: fullFlex ? 1 : undefined,
    ".ant-input": {
      textAlign,
    },
    ".ant-input, .ant-input-affix-wrapper": {
      borderRadius: 4,
    },
  }),
);

type InputProps = tst.O.Merge<
  {
    textAlign?: "center";
    errorMessage?: string;
    fullFlex?: boolean;
  },
  AntdInputProps
>;

export const Input = ({
  textAlign,
  errorMessage,
  fullFlex = true,
  status,
  ...props
}: InputProps) => {
  const size = useSize();

  return (
    <InputContainer textAlign={textAlign} fullFlex={fullFlex}>
      <AntdInput
        size={size}
        autoComplete="off"
        {...props}
        status={errorMessage != null ? "error" : status}
      />
      {errorMessage != null && (
        <Typography.Text type="danger">{errorMessage}</Typography.Text>
      )}
    </InputContainer>
  );
};

export const FormikInput = <FormState extends GenericForm>({
  name,
  ...props
}: FormFieldProps<FormState, string, InputProps>) => {
  const [field, { error }] = useField<string>(name);
  return <Input {...props} {...field} name={name} errorMessage={error} />;
};
