import React from "react";
import styled from "@emotion/styled";
import * as tst from "ts-toolbelt";
import * as z from "zod";
import {
  useForm,
  FormProvider,
  UseFormSetValue,
  DefaultValues,
  useFormState,
} from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Progress, TableProps } from "antd";
import { Card } from "~/components/card";
import { Flex } from "~/components/flex";
import { Icon, type IconName } from "~/components/icons";
import { FormikResultTable, ResultColumn } from "~/components/resultTable";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { Translations } from "~/translations";
import { GenericForm } from "~/types";
import { AllOrNone, FeatureConfig, OneOf } from "~/types/utils";
import { OutlinedButton, PrimaryButton } from "./actionButtons";

export type ToolFormSubmit<FormState extends GenericForm> = (
  values: FormState,
  helpers: { setValue: UseFormSetValue<FormState> },
) => Promise<unknown>;

type Props<FormState extends GenericForm, Result> = {
  initialValues: DefaultValues<FormState>;
  values?: FormState;
  validationSchema?: z.ZodType<FormState>;
  submitButtonLabel?: string;
  submitButtonIcon?: IconName | null;
  formContainerId?: string;
  filters?: React.ReactNode;
  disableGenerate?: boolean;
  additionalButtons?: React.ReactNode;
  progressPercent?: number;
  pagination?: TableProps["pagination"];
  /** Form sections and fields */
  children: React.ReactNode;
} & AllOrNone<
  OneOf<{
    columns: ResultColumn<Result>[];
    getColumns: (t: Translations) => ResultColumn<Result>[];
  }> & {
    results: Result[];
  }
> &
  AllOrNone<{
    rowKey: keyof Result;
    onClickResultRow?: (record: Result | null) => void;
  }> &
  AllOrNone<{ submitTrackerId: string; onSubmit: ToolFormSubmit<FormState> }> &
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

const Form = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: 28,
  minWidth: 0,
});

const Actions = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const ButtonRow = styled.div({
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
});

const ErrorText = styled.div(({ theme }) => ({
  ...theme.typography.bodyMedium,
  color: theme.token.colorError,
}));

export const ToolForm = <
  FormState extends GenericForm,
  Result extends tst.O.Object,
>({
  submitTrackerId,
  initialValues,
  values,
  validationSchema,
  columns,
  getColumns,
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
  onSubmit = async () => {},
  submitButtonLabel = "Generate",
  submitButtonIcon = "Search",
  cancelButtonLabel = "Cancel",
  allowCancel = false,
  cancelTrackerId,
  pagination,
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

  const columnsToUse = columns ?? getColumns?.(t) ?? null;

  const onValidSubmit = (values: FormState) => {
    return onSubmit(values, {
      setValue,
    });
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Card>
      <FormProvider
        handleSubmit={handleSubmit}
        setValue={setValue}
        control={control}
        {...form}
      >
        <Flex vertical gap={16} id={formContainerId}>
          <Form
            onSubmit={handleSubmit(onValidSubmit)}
            onReset={(event) => {
              // A native reset unchecks controlled radios without updating form state
              event.preventDefault();
              onReset?.();
            }}
          >
            {children}
            <Actions>
              {hasErrors && (
                <ErrorText role="alert">
                  {t["At least 1 input field is invalid"]}
                </ErrorText>
              )}
              <ButtonRow>
                {submitTrackerId != null && (
                  <PrimaryButton
                    trackerId={submitTrackerId}
                    htmlType="submit"
                    disabled={disableGenerate}
                    icon={
                      submitButtonIcon == null ? undefined : (
                        <Icon name={submitButtonIcon} />
                      )
                    }
                  >
                    {translatedSubmitLabel}
                  </PrimaryButton>
                )}
                {additionalButtons}
                {allowCancel && cancelTrackerId != null && (
                  <OutlinedButton
                    trackerId={cancelTrackerId}
                    htmlType="button"
                    onClick={onCancel}
                  >
                    {translatedCancelLabel}
                  </OutlinedButton>
                )}
                {allowReset && resetTrackerId != null && (
                  <OutlinedButton trackerId={resetTrackerId} htmlType="reset">
                    {t["Reset"]}
                  </OutlinedButton>
                )}
              </ButtonRow>
            </Actions>
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
              pagination={pagination}
              onClickResultRow={onClickResultRow}
            />
          )}
        </Flex>
      </FormProvider>
    </Card>
  );
};
