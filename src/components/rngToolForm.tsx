import { Flex } from "./flex";
import { Formik, FormikProps, FormikConfig } from "formik";
import { Form } from "./form";
import { FormFieldTable, Field } from "./formFieldTable";
import { Button } from "./button";
import { FormikResultTable, ResultColumn } from "./resultTable";
import { GenericForm } from "~/types/form";
import * as tst from "ts-toolbelt";
import { noop } from "lodash-es";
import { AllOrNone, FeatureConfig, OneOf } from "~/types/utils";

export type RngToolSubmit<Values> = FormikConfig<Values>["onSubmit"];
export type RngToolUpdate<Values> = (values: Values) => void;

type Props<FormState, Result> = {
  initialValues: FormState;
  onSubmit: RngToolSubmit<FormState>;
  submitButtonLabel?: string;
  formContainerId?: string;
} & OneOf<{
  fields: Field[];
  getFields: (values: FormikProps<FormState>) => Field[];
}> &
  AllOrNone<{ columns: ResultColumn<Result>[]; results: Result[] }> &
  AllOrNone<{
    rowKey: keyof Result;
    onClickResultRow?: (record: Result) => void;
  }> &
  AllOrNone<{
    submitTrackerId: string;
    onSubmit: RngToolSubmit<FormState>;
    submitButtonLabel?: string;
  }> &
  FeatureConfig<"allowReset", { resetTrackerId: string; onReset?: () => void }>;

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
  onUpdate,
  rowKey,
  results,
  formContainerId,
  allowReset = false,
  resetTrackerId,
  submitButtonLabel = "Generate",
}: Props<FormState, Result>) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit ?? noop}
      onReset={onReset}
    >
      {(formik) => {
        const fieldsToUse = fields || getFields(formik);
        onUpdate?.(formik.values);

        return (
          <Flex vertical gap={16} id={formContainerId}>
            <Form>
              <Flex vertical gap={8}>
                <FormFieldTable fields={fieldsToUse} />
                {onSubmit != null && submitTrackerId != null && (
                  <Button trackerId={submitTrackerId} htmlType="submit">
                    {submitButtonLabel}
                  </Button>
                )}
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
