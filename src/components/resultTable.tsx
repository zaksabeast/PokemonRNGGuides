import React from "react";
import { Typography } from "./typography";
import { Table, TableProps, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ClassNames } from "@emotion/react";
import * as tst from "ts-toolbelt";
import { useFormContext, useFormState } from "react-hook-form";
import { identity } from "lodash-es";
import { MaxWidthToggleButton } from "./maxWidthToggleButton";

export type SingleResultColumn<T> = keyof T extends string
  ? {
      [K in keyof T]: {
        type?: "single";
        dataIndex: K;
        monospace?: boolean;
        show?: boolean;
        disableVerticalPadding?: boolean;
        tooltip?: React.ReactNode;
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
  tooltip?: React.ReactNode;
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

const TABLE_SCROLL = { x: true } as const;

type FormikResultTableProps<Record extends tst.O.Object> = tst.O.Overwrite<
  TableProps<Record>,
  { columns: ResultColumn<Record>[] }
> & {
  onClickResultRow?: (record: Record | null) => void;
};

export const ResultTable = <Record extends tst.O.Object>(
  props: FormikResultTableProps<Record>,
) => {
  const columns = (props.columns ?? []).map(applyMonospace);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  const titleWithTooltip = (
    title: React.ReactNode,
    tooltip?: React.ReactNode,
  ) => {
    if (tooltip == null) {
      return title;
    }
    return (
      <Tooltip title={tooltip}>
        {title} <QuestionCircleOutlined />
      </Tooltip>
    );
  };
  const children = columns.map((column) => {
    if (column.show === false) {
      return null;
    }

    if (column.type === "group") {
      const groupKey = column.key == null ? column.title : column.key;
      return (
        <Table.ColumnGroup
          title={titleWithTooltip(column.title, column.tooltip)}
          key={groupKey}
        >
          {column.columns.map((subColumn) => {
            const colKey =
              subColumn.key == null
                ? subColumn.dataIndex + " " + subColumn.title
                : subColumn.key;
            return (
              <Table.Column
                {...subColumn}
                title={titleWithTooltip(subColumn.title, subColumn.tooltip)}
                key={colKey}
              />
            );
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
        title={titleWithTooltip(column.title, column.tooltip)}
        className={
          column.disableVerticalPadding ? "disable-vertical-padding" : undefined
        }
      />
    );
  });

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    columns: _,
    onClickResultRow,
    pagination,
    rowSelection,
    ...propsForTable
  } = props;

  const paginationToUse =
    pagination === false
      ? false
      : {
          ...pagination,
          showTotal: (total: number, range: [number, number]) => (
            <>
              <MaxWidthToggleButton />
              {typeof pagination === "object" &&
                pagination.showTotal?.(total, range)}
            </>
          ),
        };

  const rowSelectionToUse: FormikResultTableProps<Record>["rowSelection"] =
    rowSelection ??
    (onClickResultRow != null
      ? {
          type: "checkbox",
          selectedRowKeys,
          hideSelectAll: true,
          onChange: (newSelectedRowKeys, selectedRows) => {
            const latestKey = newSelectedRowKeys.slice(-1);
            const latestRows = selectedRows.slice(-1);
            setSelectedRowKeys(latestKey);
            onClickResultRow(latestRows[0] ?? null);
          },
        }
      : undefined);

  return (
    <ClassNames>
      {({ css }) => (
        <Table
          scroll={TABLE_SCROLL}
          {...propsForTable}
          rowSelection={rowSelectionToUse}
          pagination={paginationToUse}
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
              ".ant-pagination-total-text": {
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
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
