import { Table, TableProps } from "antd";
import { ClassNames } from "@emotion/react";
import * as tst from "ts-toolbelt";
import { useFormikContext } from "formik";

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

export const FormikResultTable = <Record extends tst.O.Object>(
  props: TableProps<Record>,
) => {
  const { isSubmitting } = useFormikContext();
  return (
    <ClassNames>
      {({ css }) => (
        <Table
          {...props}
          loading={isSubmitting}
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
