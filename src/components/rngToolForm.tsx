import React from "react";
import { Flex } from "./flex";
import { Form } from "./form";
import { FormFieldTable, Field } from "./formFieldTable";
import { Button } from "./button";
import { FormikResultTable, ResultColumn } from "./resultTable";
import * as tst from "ts-toolbelt";
import { AllOrNone, FeatureConfig, OneOf } from "~/types/utils";
import * as z from "zod";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Translations } from "~/translations";
import {
  useForm,
  FormProvider,
  UseFormSetValue,
  DefaultValues,
  useFormState,
} from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { GenericForm } from "~/types";
import { Typography, Progress } from "antd";

export type RngToolSubmit<FormState extends GenericForm> = (
  values: FormState,
  helpers: { setValue: UseFormSetValue<FormState> },
) => Promise<unknown>;

type Props<FormState extends GenericForm, Result> = {
  submitTrackerId: string;
  initialValues: DefaultValues<FormState>;
  values?: FormState;
  onSubmit: RngToolSubmit<FormState>;
  validationSchema?: z.ZodType<FormState>;
  submitButtonLabel?: string;
  formContainerId?: string;
  filters?: React.ReactNode;
  disableGenerate?: boolean;
  additionalButtons?: React.ReactNode;
  progressPercent?: number;
} & OneOf<{
  fields: Field[];
  getFields: (t: Translations) => Field[];
  children: React.ReactNode;
}> &
  AllOrNone<
    OneOf<{
      columns: ResultColumn<Result>[];
      getColumns: (t: Translations) => ResultColumn<Result>[];
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
  values,
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
  filters,
  resetTrackerId,
  additionalButtons,
  progressPercent,
  allowReset = false,
  disableGenerate = false,
  submitButtonLabel = "Generate",
  cancelButtonLabel = "Cancel",
  allowCancel = false,
  cancelTrackerId,
  onCancel,
}: Props<FormState, Result>) => {
  const t = useActiveRouteTranslations();
  const { handleSubmit, setValue, control, ...form } = useForm<FormState>({
    mode: "onTouched",
    resolver:
      validationSchema === undefined
        ? validationSchema
        : standardSchemaResolver(validationSchema),
    resetOptions: { keepDirtyValues: false },
    defaultValues: initialValues,
    values,
  });
  const { errors } = useFormState({ control });

  const translatedSubmitLabel =
    submitButtonLabel === "Generate" ? t["Generate"] : submitButtonLabel;
  const translatedCancelLabel =
    cancelButtonLabel === "Cancel" ? t["Cancel"] : cancelButtonLabel;

  const fieldsReactNode = (() => {
    if (children != null) {
      return children;
    }
    const fieldsToUse = fields ?? getFields?.(t) ?? [];
    return <FormFieldTable fields={fieldsToUse} />;
  })();

  const columnsToUse = columns ?? getColumns?.(t) ?? null;

  const onValidSubmit = (values: FormState) => {
    return onSubmit(values, {
      setValue,
    });
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <FormProvider
      handleSubmit={handleSubmit}
      setValue={setValue}
      control={control}
      {...form}
    >
      <Flex vertical gap={16} id={formContainerId}>
        <Form onSubmit={handleSubmit(onValidSubmit)} onReset={onReset}>
          <Flex vertical gap={8}>
            {fieldsReactNode}
            {hasErrors && (
              <Typography.Text type="danger">
                {t["At least 1 input field is invalid"]}
              </Typography.Text>
            )}
            <Button
              trackerId={submitTrackerId}
              htmlType="submit"
              disabled={disableGenerate}
            >
              {translatedSubmitLabel}
            </Button>
            {additionalButtons}
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

        {filters != null && (
          <Flex vertical gap={8} mt={24}>
            {filters}
          </Flex>
        )}

        {progressPercent != null && (
          <Flex mv={8} flex={1}>
            <Progress percent={progressPercent} size={["100%", 12]} />
          </Flex>
        )}

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
    </FormProvider>
  );
};
