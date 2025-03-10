import { Table } from "antd";
import styled from "@emotion/styled";

export type ResultColumn<T> = keyof T extends string
  ? {
      [K in keyof T]: {
        title: string;
        dataIndex: K;
        key: K;
        render?: (value: T[K]) => React.ReactNode;
      };
    }[keyof T]
  : never;

export const ResultTable = styled(Table)({
  "&&&": {
    width: "100%",
    ".ant-table-container": {
      overflowX: "scroll",
    },
  },
});
