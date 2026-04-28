import React from "react";
import { Typography } from "./typography";
import { Table, TableProps } from "antd";
import { ClassNames } from "@emotion/react";
import * as tst from "ts-toolbelt";
import { useFormContext, useFormState } from "react-hook-form";
import { identity } from "lodash-es";

export type SingleResultColumn<T> = keyof T extends string
  ? {
      [K in keyof T]: {
        type?: "single";
        dataIndex: K;
        monospace?: boolean;
        show?: boolean;
        disableVerticalPadding?: boolean;
      } & (
        | {
            title: React.ReactNode;
            key: string;
          }
        | {
            title: string;
            key?: undefined; // dataIndex + title will be used as the key
          }
      ) &
        (T[K] extends string | number | undefined
          ? { render?: (value: T[K], values: T) => React.ReactNode }
          : { render: (value: T[K], values: T) => React.ReactNode });
    }[keyof T]
  : never;

export type ResultColumnGroup<T> = {
  type: "group";
  columns: SingleResultColumn<T>[];
  show?: boolean;
} & (
  | {
      title: React.ReactNode;
      key: string;
    }
  | {
      title: string;
      key?: string; // title will be used as the key
    }
);

export type ResultColumn<T> = SingleResultColumn<T> | ResultColumnGroup<T>;

const applyMonospace = <Record extends tst.O.Object>(
  column: ResultColumn<Record>,
) => {
  if (column.type === "group") {
    return {
      ...column,
      columns: column.columns.map(applyMonospaceSingleColumn),
    };
  }
  return applyMonospaceSingleColumn(column);
};

const applyMonospaceSingleColumn = <Record extends tst.O.Object>(
  column: SingleResultColumn<Record>,
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

// eslint-disable-next-line id-length
const TABLE_SCROLL = { x: true } as const;

type FormikResultTableProps<Record extends tst.O.Object> = tst.O.Overwrite<
  TableProps<Record>,
  { columns: ResultColumn<Record>[] }
>;

export const ResultTable = <Record extends tst.O.Object>(
  props: FormikResultTableProps<Record>,
) => {
  const columns = (props.columns ?? []).map(applyMonospace);

  const children = columns.map((column) => {
    if (column.show === false) {
      return null;
    }

    if (column.type === "group") {
      const groupKey = column.key == null ? column.title : column.key;
      return (
        <Table.ColumnGroup title={column.title} key={groupKey}>
          {column.columns.map((subColumn) => {
            const colKey =
              subColumn.key == null
                ? subColumn.dataIndex + " " + subColumn.title
                : subColumn.key;
            return <Table.Column {...subColumn} key={colKey} />;
          })}
        </Table.ColumnGroup>
      );
    }

    const colKey =
      column.key == null ? column.dataIndex + " " + column.title : column.key;
    return (
      <Table.Column
        {...column}
        key={colKey}
        className={
          column.disableVerticalPadding ? "disable-vertical-padding" : undefined
        }
      />
    );
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { columns: _, ...propsWithColumns } = props;

  return (
    <ClassNames>
      {({ css }) => (
        <Table
          scroll={TABLE_SCROLL}
          {...propsWithColumns}
          className={css({
            "&&&": {
              width: "100%",
              ".ant-table-cell": {
                whiteSpace: "nowrap",
                width: "auto",
              },
              "& span": {
                verticalAlign: "middle",
              },
              ".disable-vertical-padding": {
                paddingTop: 0,
                paddingBottom: 0,
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
  const { control } = useFormContext();
  const { isSubmitting } = useFormState({ control });
  return <ResultTable {...props} loading={isSubmitting} />;
};
