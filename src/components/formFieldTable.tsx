import { Flex } from "./flex";
import { Typography } from "./typography";
import { Form as AntdForm } from "antd";

export type Field = {
  show?: boolean;
  tooltip?: string;
  input: React.ReactNode;
  direction?: "row" | "column";
  indent?: number;
} & (
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
        ({
          show,
          key,
          label,
          tooltip,
          input,
          direction = "row",
          indent = 0,
        }) => {
          if (show === false) {
            return null;
          }

          const keyToUse = key == null ? label : key;
          if (direction === "row") {
            return (
              <AntdForm.Item
                key={keyToUse}
                tooltip={tooltip}
                label={
                  <Typography.Text strong whiteSpace="break-spaces">
                    {label}
                  </Typography.Text>
                }
                style={{ paddingLeft: `${indent * 20}px` }}
              >
                {input}
              </AntdForm.Item>
            );
          }

          return (
            <AntdForm.Item
              key={keyToUse}
              colon={false}
              tooltip={tooltip}
              style={{ paddingLeft: `${indent * 20}px` }}
            >
              <Flex vertical gap={4}>
                <Typography.Text strong whiteSpace="break-spaces">
                  {label}
                </Typography.Text>
                {input}
              </Flex>
            </AntdForm.Item>
          );
        },
      )}
    </AntdForm>
  );
};
