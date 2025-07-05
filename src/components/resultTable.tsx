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
      } & (T[K] extends string | number | undefined
        ? { render?: (value: T[K], values: T) => React.ReactNode }
        : { render: (value: T[K], values: T) => React.ReactNode });
    }[keyof T]
  : never;

export type ResultColumnGroup<T> = {
  title: string;
  columns: ResultColumn<T>[];
};

export type ResultColumnsType<T> = (ResultColumn<T> | ResultColumnGroup<T>)[];

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
  { columns: ResultColumnsType<Record> }
>;

export const ResultTable = <Record extends tst.O.Object>(
  props: FormikResultTableProps<Record>,
) => {
  const columns = React.useMemo(() => {
    return (props.columns ?? []).map((column) => {
      if ("columns" in column) {
        column.columns = column.columns.map(applyMonospace);
        return column;
      }
      return applyMonospace(column);
    });
  }, [props.columns]);

  const children = React.useMemo(() => {
    return columns.map((column) => {
      if ("columns" in column) {
        return (
          <Table.ColumnGroup title={column.title} key={column.title}>
            {column.columns.map((subColumn) => (
              <Table.Column
                {...subColumn}
                key={subColumn.dataIndex + " " + subColumn.title}
              />
            ))}
          </Table.ColumnGroup>
        );
      }
      return (
        <Table.Column {...column} key={column.dataIndex + " " + column.title} />
      );
    });
  }, [columns]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { columns: _, ...propsWithColumns } = props;

  return (
    <ClassNames>
      {({ css }) => (
        <Table
          {...propsWithColumns}
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
        >
          {children}
        </Table>
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
