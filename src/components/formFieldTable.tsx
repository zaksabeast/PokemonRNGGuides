import { Flex } from "./flex";
import { Typography } from "./typography";
import { Form as AntdForm } from "antd";
import styled from "@emotion/styled";

type IndentProps = {
  indent?: number;
};

const FormItem = styled(AntdForm.Item)<IndentProps>(({ indent = 0 }) => ({
  paddingLeft: `${indent * 20}px`,
}));

export type Field = {
  show?: boolean;
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
      {fields.map(
        ({ show, key, label, tooltip, input, direction = "row", indent }) => {
          if (show === false) {
            return null;
          }

          const keyToUse = key == null ? label : key;
          if (direction === "row") {
            return (
              <FormItem
                key={keyToUse}
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
            <FormItem
              key={keyToUse}
              colon={false}
              tooltip={tooltip}
              indent={indent}
            >
              <Flex vertical gap={4}>
                <Typography.Text strong whiteSpace="break-spaces">
                  {label}
                </Typography.Text>
                {input}
              </Flex>
            </FormItem>
          );
        },
      )}
    </AntdForm>
  );
};
