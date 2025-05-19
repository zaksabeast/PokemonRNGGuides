import { Flex } from "~/components";
import { Typography } from "./typography";
import styled from "@emotion/styled";

const LabelTd = styled.td({
  whiteSpace: "nowrap",
  paddingRight: 24,
  paddingTop: 10,
  paddingBottom: 10,
});

export type Field = {
  label: string;
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
        {fields.map(({ label, input, direction = "row" }) => {
          if (direction === "row") {
            return (
              <tr key={label}>
                <LabelTd>
                  <Typography.Text strong>{label}</Typography.Text>
                </LabelTd>
                <td>{input}</td>
              </tr>
            );
          }
          return (
            <tr key={label}>
              <LabelTd colSpan={2}>
                <Typography.Text strong>{label}</Typography.Text>
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
