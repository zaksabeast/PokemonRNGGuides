import React from "react";
import { Flex } from "./flex";
import { Formik, FormikHelpers } from "formik";
import { Form } from "./form";
import { FormFieldTable, Field } from "./formFieldTable";
import { Button } from "./button";
import { FormikResultTable, ResultColumn } from "./resultTable";
import { GenericForm } from "~/types/form";
import * as tst from "ts-toolbelt";
import { AllOrNone, FeatureConfig, OneOf } from "~/types/utils";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

export type RngToolSubmit<Values> = (
  values: Values,
  formikHelpers: FormikHelpers<Values>,
) => Promise<unknown>;

type Props<FormState, Result> = {
  submitTrackerId: string;
  initialValues: FormState;
  onSubmit: RngToolSubmit<FormState>;
  validationSchema?: z.ZodSchema<FormState>;
  submitButtonLabel?: string;
  formContainerId?: string;
} & OneOf<{
  fields: Field[];
  getFields: (values: FormState) => Field[];
  children: React.ReactNode;
}> &
  AllOrNone<
    OneOf<{
      columns: ResultColumn<Result>[];
      getColumns: (values: FormState) => ResultColumn<Result>[];
    }> & {
      results: Result[];
    }
  > &
  AllOrNone<{
    rowKey: keyof Result;
    onClickResultRow?: (record: Result) => void;
  }> &
  FeatureConfig<
    "allowReset",
    { resetTrackerId: string; onReset?: () => void }
  > &
  FeatureConfig<
    "allowCancel",
    {
      cancelTrackerId: string;
      onCancel: () => void;
      cancelButtonLabel?: string;
    }
  >;

export const RngToolForm = <
  FormState extends GenericForm,
  Result extends tst.O.Object,
>({
  submitTrackerId,
  initialValues,
  fields,
  validationSchema,
  getFields,
  columns,
  getColumns,
  onSubmit,
  onReset,
  onClickResultRow,
  rowKey,
  results,
  children,
  formContainerId,
  allowReset = false,
  resetTrackerId,
  submitButtonLabel = "Generate",
  cancelButtonLabel = "Cancel",
  allowCancel = false,
  cancelTrackerId,
  onCancel,
}: Props<FormState, Result>) => {
  const t = useActiveRouteTranslations();
  const _validationSchema = React.useMemo(() => {
    return validationSchema == null
      ? undefined
      : toFormikValidationSchema(validationSchema);
  }, [validationSchema]);

  const translatedSubmitLabel =
    submitButtonLabel === "Generate" ? t["Generate"] : submitButtonLabel;
  const translatedCancelLabel =
    cancelButtonLabel === "Cancel" ? t["Cancel"] : cancelButtonLabel;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      onReset={onReset}
      validationSchema={_validationSchema}
    >
      {(formik) => {
        const fieldsReactNode = (() => {
          if (children != null) {
            return children;
          }
          const fieldsToUse = fields ?? getFields?.(formik.values) ?? [];
          return <FormFieldTable fields={fieldsToUse} />;
        })();

        const columnsToUse = columns ?? getColumns?.(formik.values) ?? null;

        return (
          <Flex vertical gap={16} id={formContainerId}>
            <Form>
              <Flex vertical gap={8}>
                {fieldsReactNode}
                <Button trackerId={submitTrackerId} htmlType="submit">
                  {translatedSubmitLabel}
                </Button>
                {allowCancel && cancelTrackerId != null && (
                  <Button
                    trackerId={cancelTrackerId}
                    htmlType="button"
                    onClick={onCancel}
                  >
                    {translatedCancelLabel}
                  </Button>
                )}
                {allowReset && resetTrackerId != null && (
                  <Button trackerId={resetTrackerId} htmlType="reset">
                    {t["Reset"]}
                  </Button>
                )}
              </Flex>
            </Form>

            {columnsToUse != null && (
              <FormikResultTable<Result>
                columns={columnsToUse}
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
