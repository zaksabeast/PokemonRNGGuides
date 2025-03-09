import { Table } from "antd";
import styled from "@emotion/styled";

export const ResultTable = styled(Table)({
  "&&&": {
    width: "100%",
    ".ant-table-container": {
      overflowX: "scroll",
    },
  },
});
