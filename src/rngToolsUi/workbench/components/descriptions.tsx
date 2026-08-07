import * as tst from "ts-toolbelt";
import {
  Descriptions as AntdDescriptions,
  DescriptionsProps,
  Tooltip,
} from "antd";
import { Flex, Icon } from "~/components";
import styled from "@emotion/styled";

type BaseField = tst.U.Exclude<DescriptionsProps["items"], undefined>[number];

export type Field = tst.O.Merge<
  BaseField,
  { show?: boolean; tooltip?: React.ReactNode }
>;

const StyledDescriptions = styled(AntdDescriptions)({
  ".ant-descriptions-view": { border: "none !important" },
  ".ant-descriptions-row": { border: "none !important" },
  ".ant-descriptions-item-content": {
    padding: "0 !important",
    border: "none !important",
  },
  ".ant-descriptions-item-label": {
    backgroundColor: "unset !important",
    border: "none !important",
    paddingTop: "10px !important",
    paddingBottom: "10px !important",
    paddingLeft: "24px !important",
    paddingRight: "24px !important",
  },
});

export const Descriptions = ({
  items,
  ...props
}: tst.O.Overwrite<DescriptionsProps, { items: Field[] }>) => {
  const filteredItems: BaseField[] = (items ?? [])
    .filter((item) => item.show !== false)
    .map((item) => ({
      children: item.children,
      label:
        item.tooltip == null ? (
          item.label
        ) : (
          <Flex gap={4}>
            {item.label}
            <Tooltip title={item.tooltip}>
              <Icon color="TextDescription" name="Question" cursor="help" />
            </Tooltip>
          </Flex>
        ),
    }));
  return <StyledDescriptions items={filteredItems} {...props} />;
};
