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
};

type Props = {
  fields: Field[];
};

export const FormFieldTable = ({ fields }: Props) => {
  return (
    <table>
      <tbody>
        {fields.map(({ label, input }) => (
          <tr key={label}>
            <LabelTd>
              <Typography.Text strong>{label}</Typography.Text>
            </LabelTd>
            <td>{input}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
