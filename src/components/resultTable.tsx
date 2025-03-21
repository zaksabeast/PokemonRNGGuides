import { Table, TableProps } from "antd";
import { ClassNames } from "@emotion/react";
import * as tst from "ts-toolbelt";

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

export const ResultTable = <Record extends tst.O.Object>(
  props: TableProps<Record>,
) => {
  return (
    <ClassNames>
      {({ css }) => (
        <Table
          {...props}
          className={css({
            "&&&": {
              width: "100%",
              ".ant-table-container": {
                overflowX: "scroll",
              },
            },
          })}
        />
      )}
    </ClassNames>
  );
};
