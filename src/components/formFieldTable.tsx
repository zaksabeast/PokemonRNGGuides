import { Flex } from "./flex";
import { Icon } from "./icons";
import { Typography } from "./typography";
import styled from "@emotion/styled";
import { Tooltip } from "antd";

const LabelTd = styled.td({
  whiteSpace: "nowrap",
  paddingRight: 24,
  paddingTop: 10,
  paddingBottom: 10,
});

export type Field = {
  label: string;
  hide?: boolean;
  tooltip?: string;
  input: React.ReactNode;
  direction?: "row" | "column";
};

type Props = {
  fields: Field[];
};

export const FormFieldTable = ({ fields }: Props) => {
  return (
    <table>
      <tbody>
        {fields.map(({ hide, label, tooltip, input, direction = "row" }) => {
          if (hide) {
            return null;
          }

          const labelWithTooltip =
            tooltip == null ? (
              label
            ) : (
              <Tooltip title={tooltip}>
                <Flex gap={8}>
                  <div>{label}</div>
                  <Icon name="InformationCircle" size={16} />
                </Flex>
              </Tooltip>
            );
          if (direction === "row") {
            return (
              <tr key={label}>
                <LabelTd>
                  <Typography.Text strong>{labelWithTooltip}</Typography.Text>
                </LabelTd>
                <td>{input}</td>
              </tr>
            );
          }
          return (
            <tr key={label}>
              <LabelTd colSpan={2}>
                <Typography.Text strong>{labelWithTooltip}</Typography.Text>
                <Flex pl={30} vertical>
                  {input}
                </Flex>
              </LabelTd>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
