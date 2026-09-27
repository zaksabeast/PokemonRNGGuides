import { Input as AntdInput } from "antd";
import { withCss } from "./withCss";
import { FormFieldProps, GenericForm } from "~/types";
import { useField } from "~/hooks/form";
import { Flex } from "./flex";
import { Typography } from "./typography";

export const TextArea = withCss(AntdInput.TextArea);
type TextAreaProps = React.ComponentProps<typeof TextArea>;

export const FormikTextArea = <FormState extends GenericForm>({
  name,
  ...props
}: FormFieldProps<FormState, string, TextAreaProps>) => {
  const [field, { error }] = useField<string>(name);

  return (
    <Flex flex={1} vertical>
      <TextArea
        height="100%"
        {...props}
        {...field}
        name={name}
        status={error != null ? "error" : undefined}
      />
      {error != null && (
        <Typography.Text type="danger">{error}</Typography.Text>
      )}
    </Flex>
  );
};
