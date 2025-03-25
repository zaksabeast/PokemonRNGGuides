import { Flex } from "./flex";
import { Formik, FormikConfig } from "formik";
import { Form } from "./form";
import { FormFieldTable, Field } from "./formFieldTable";
import { Button } from "./button";
import { FormikResultTable, ResultColumn } from "./resultTable";
import { GenericForm } from "~/types/form";
import * as tst from "ts-toolbelt";

export type RngToolSubmit<Values> = FormikConfig<Values>["onSubmit"];

type Props<FormState, Result> = {
  submitTrackerId: string;
  initialValues: FormState;
  fields: Field[];
  onSubmit: RngToolSubmit<FormState>;
  onClickResultRow?: (record: Result) => void;
  submitButtonLabel?: string;
} & (
  | { columns: ResultColumn<Result>[]; results: Result[] }
  | {
      columns?: never;
      results?: never;
    }
) &
  (
    | { allowReset: true; resetTrackerId: string; onReset?: () => void }
    | { allowReset?: false; resetTrackerId?: never; onReset?: never }
  ) &
  (
    | {
        rowKey: keyof Result;
        onClickResultRow: (record: Result) => void;
      }
    | {
        rowKey?: keyof Result;
        onClickResultRow?: never;
      }
  );

export const RngToolForm = <
  FormState extends GenericForm,
  Result extends tst.O.Object,
>({
  submitTrackerId,
  initialValues,
  fields,
  columns,
  onSubmit,
  onReset,
  onClickResultRow,
  rowKey,
  results,
  allowReset = false,
  resetTrackerId,
  submitButtonLabel = "Generate",
}: Props<FormState, Result>) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <Flex vertical gap={16}>
        <Form>
          <Flex vertical gap={8}>
            <FormFieldTable fields={fields} />
            <Button trackerId={submitTrackerId} htmlType="submit">
              {submitButtonLabel}
            </Button>
            {allowReset && resetTrackerId != null && (
              <Button trackerId={resetTrackerId} htmlType="reset">
                Reset
              </Button>
            )}
          </Flex>
        </Form>

        {columns != null && (
          <FormikResultTable<Result>
            columns={columns}
            rowKey={rowKey}
            dataSource={results}
            rowSelection={
              onClickResultRow == null
                ? undefined
                : {
                    type: "radio",
                    onSelect: (record) => onClickResultRow?.(record),
                  }
            }
          />
        )}
      </Flex>
    </Formik>
  );
};
