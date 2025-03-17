import { Flex } from "./flex";
import { Formik, FormikConfig } from "formik";
import { Form } from "./form";
import { FormFieldTable, Field } from "./formFieldTable";
import { Button } from "./button";
import { ResultTable, ResultColumn } from "./resultTable";
import { GenericForm } from "~/types/form";

export type RngToolSubmit<Values> = FormikConfig<Values>["onSubmit"];

type Props<FormState, Result> = {
  submitTrackerId: string;
  initialValues: FormState;
  fields: Field[];
  onSubmit: RngToolSubmit<FormState>;
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
  );

export const RngToolForm = <FormState extends GenericForm, Result>({
  submitTrackerId,
  initialValues,
  fields,
  columns,
  onSubmit,
  onReset,
  results,
  allowReset = false,
  resetTrackerId,
  submitButtonLabel = "Generate",
}: Props<FormState, Result>) => {
  return (
    <Flex vertical gap={16}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        onReset={onReset}
      >
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
      </Formik>
      {columns != null && (
        <ResultTable columns={columns} dataSource={results} />
      )}
    </Flex>
  );
};
