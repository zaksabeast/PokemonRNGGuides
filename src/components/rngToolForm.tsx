import { Flex } from "./flex";
import { Formik, FormikConfig } from "formik";
import { Form } from "./form";
import { FormFieldTable, Field } from "./formFieldTable";
import { Button } from "./button";
import { FormikResultTable, ResultColumn } from "./resultTable";
import { GenericForm } from "~/types/form";
import * as tst from "ts-toolbelt";

export type RngToolSubmit<Values> = FormikConfig<Values>["onSubmit"];

type OneOf<T extends Record<string, unknown>> = tst.O.Either<
  T,
  tst.O.RequiredKeys<T>
>;

type Props<FormState, Result> = {
  submitTrackerId: string;
  initialValues: FormState;
  onSubmit: RngToolSubmit<FormState>;
  submitButtonLabel?: string;
} & OneOf<{
    fields: Field[], 
    getFields: (values: FormState) => Field[]
  }> &
  (
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
        onClickResultRow?: (record: Result) => void;
      }
    | {
        rowKey?: keyof Result;
        onClickResultRow?: undefined;
      }
  );

export const RngToolForm = <
  FormState extends GenericForm,
  Result extends tst.O.Object,
>({
  submitTrackerId,
  initialValues,
  fields,
  getFields,
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
      {(formik) => {
        const fieldsToUse =
          fields || (getFields ? getFields(formik.values) : []);

        return (
          <Flex vertical gap={16}>
            <Form>
              <Flex vertical gap={8}>
                <FormFieldTable fields={fieldsToUse} />
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
        );
      }}
    </Formik>
  );
};
