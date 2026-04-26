import { Flex } from "./flex";
import { Typography } from "./typography";
import { Form as AntdForm } from "antd";
import styled from "@emotion/styled";
import { useWatch } from "react-hook-form";

type IndentProps = {
  indent?: number;
};

const FormItem = styled(AntdForm.Item)<IndentProps>(({ indent = 0 }) => ({
  paddingLeft: `${indent * 20}px`,
}));

export type Field = {
  show?: boolean;
  showWhen?: {
    fieldName: string;
    when: (value: unknown) => boolean;
  };
  tooltip?: string;
  input: React.ReactNode;
  direction?: "row" | "column";
} & IndentProps &
  (
    | {
        label: React.ReactNode;
        key: string;
      }
    | {
        label: string;
        key?: undefined; // title will be used as the key
      }
  );

type Props = {
  fields: Field[];
};

const MOBILE_LABEL_COL_WIDTH = "130px";
const DEFAULT_LABEL_COL_WIDTH = "190px";

const FormFieldRow = ({
  show,
  label,
  tooltip,
  input,
  direction = "row",
  indent,
}: Field) => {
  if (show === false) {
    return null;
  }

  if (direction === "row") {
    return (
      <FormItem
        tooltip={tooltip}
        indent={indent}
        label={
          <Typography.Text strong whiteSpace="break-spaces">
            {label}
          </Typography.Text>
        }
      >
        {input}
      </FormItem>
    );
  }

  return (
    <FormItem colon={false} tooltip={tooltip} indent={indent}>
      <Flex vertical gap={4}>
        <Typography.Text strong whiteSpace="break-spaces">
          {label}
        </Typography.Text>
        {input}
      </Flex>
    </FormItem>
  );
};

const WatchedFormFieldRow = ({ showWhen, ...field }: Field) => {
  const watchedValue = useWatch({
    name: showWhen?.fieldName as never,
  });

  if (showWhen?.when(watchedValue) === false) {
    return null;
  }

  return <FormFieldRow {...field} />;
};

export const FormFieldTable = ({ fields }: Props) => {
  return (
    <AntdForm
      component={false}
      layout="horizontal"
      labelAlign="left"
      labelCol={{
        xs: { flex: MOBILE_LABEL_COL_WIDTH },
        md: { flex: DEFAULT_LABEL_COL_WIDTH },
      }}
      wrapperCol={{ flex: "1 1 0" }}
      colon={false}
    >
      {fields.map((field) => {
        if (field.showWhen != null) {
          return (
            <WatchedFormFieldRow {...field} key={field.key ?? field.label} />
          );
        }

        return <FormFieldRow {...field} key={field.key ?? field.label} />;
      })}
    </AntdForm>
  );
};
