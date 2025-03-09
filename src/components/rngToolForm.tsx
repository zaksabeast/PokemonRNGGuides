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
  columns: ResultColumn<Result>[];
  results: Result[];
  onSubmit: RngToolSubmit<FormState>;
};

export const RngToolForm = <FormState extends GenericForm, Result>({
  submitTrackerId,
  initialValues,
  fields,
  columns,
  onSubmit,
  results,
}: Props<FormState, Result>) => {
  return (
    <Flex vertical gap={16}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Flex vertical gap={8}>
            <FormFieldTable fields={fields} />
            <Button trackerId={submitTrackerId} htmlType="submit">
              Generate
            </Button>
          </Flex>
        </Form>
      </Formik>
      <ResultTable columns={columns} dataSource={results} />
    </Flex>
  );
};
