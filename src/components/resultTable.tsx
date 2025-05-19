import React from "react";
import { Typography } from "./typography";
import { Table, TableProps } from "antd";
import { ClassNames } from "@emotion/react";
import * as tst from "ts-toolbelt";
import { useFormikContext } from "formik";
import { identity } from "lodash-es";

export type ResultColumn<T> = keyof T extends string
  ? {
      [K in keyof T]: {
        title: string;
        dataIndex: K;
        monospace?: boolean;
        render?: (value: T[K], values: T) => React.ReactNode;
      };
    }[keyof T]
  : never;

const applyMonospace = <Record extends tst.O.Object>(
  column: ResultColumn<Record>,
) => {
  if (!column.monospace) {
    return column;
  }

  const render = column.render ?? identity;

  return {
    ...column,
    render: (value: Record[string & keyof Record], values: Record) => (
      <Typography.Text fontFamily="monospace" key={column.dataIndex}>
        {render(value, values)}
      </Typography.Text>
    ),
  };
};

type FormikResultTableProps<Record extends tst.O.Object> = tst.O.Overwrite<
  TableProps<Record>,
  { columns: ResultColumn<Record>[] }
>;

export const ResultTable = <Record extends tst.O.Object>(
  props: FormikResultTableProps<Record>,
) => {
  const columns = React.useMemo(
    () => (props.columns ?? []).map(applyMonospace),
    [props.columns],
  );

  return (
    <ClassNames>
      {({ css }) => (
        <Table
          {...props}
          columns={columns}
          className={css({
            "&&&": {
              width: "100%",
              ".ant-table-container": {
                overflowX: "scroll",
              },
              ".ant-table-cell": {
                whiteSpace: "nowrap",
                width: "auto",
              },
            },
          })}
        />
      )}
    </ClassNames>
  );
};

export const FormikResultTable = <Record extends tst.O.Object>(
  props: FormikResultTableProps<Record>,
) => {
  const { isSubmitting } = useFormikContext();
  return <ResultTable {...props} loading={isSubmitting} />;
};
