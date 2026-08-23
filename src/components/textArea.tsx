import { Input as AntdInput } from "antd";
import { withCss } from "./withCss";
import { GenericForm, GuaranteeFormNameType } from "~/types";
import * as tst from "ts-toolbelt";
import { useField } from "~/hooks/form";
import { Flex } from "./flex";
import { Typography } from "./typography";

export const TextArea = withCss(AntdInput.TextArea);
type TextAreaProps = React.ComponentProps<typeof TextArea>;

type FormikInputProps<FormState extends GenericForm> = tst.O.Merge<
  Omit<TextAreaProps, "onChange" | "defaultValue" | "name">,
  { name: GuaranteeFormNameType<FormState, string> }
>;

export const FormikTextArea = <FormState extends GenericForm>({
  name,
  ...props
}: FormikInputProps<FormState>) => {
  const [{ value, onBlur, onChange }, { error, status }] =
    useField<string>(name);

  return (
    <Flex flex={1} vertical>
      <TextArea
        status={status}
        height="100%"
        {...props}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      />
      {error != null && (
        <Typography.Text type="danger">{error}</Typography.Text>
      )}
    </Flex>
  );
};
