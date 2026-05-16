import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { Flex } from "./flex";
import { Grid } from "./grid";
import { Ivs } from "~/rngTools";
import { FormikNumberInput } from "./numberInput";
import { useFormState, useWatch } from "react-hook-form";
import { uniq } from "lodash-es";
import { Typography } from "./typography";
import React from "react";
import { z } from "zod";

type StatFieldRecord = Record<keyof Ivs, number | null>;

// The entire field or individual IVs can have error messages,
// so we need to handle both cases.
// The error message can either be a string or an object with the same keys as Ivs, where each key has a message string.
const errorSchema = z.object({ message: z.string() });
const errorObjectSchema = z.record(z.string(), errorSchema);
const errorsSchema = z.union([errorObjectSchema, errorSchema]).optional();

const getErrorMessages = (error: unknown): string[] => {
  const parsedErrors = errorsSchema.safeParse(error);

  if (!parsedErrors.success) {
    return ["Unknown error"];
  }

  if (parsedErrors.data == null) {
    return [];
  }

  if (typeof parsedErrors.data.message === "string") {
    return [parsedErrors.data.message];
  }

  return Object.values(parsedErrors.data).flatMap(getErrorMessages);
};

type SingleFieldProps = {
  parentName: string;
  stat: keyof Ivs;
};

const SingleField = ({ parentName, stat }: SingleFieldProps) => {
  return (
    <FormikNumberInput
      name={`${parentName}.${stat}`}
      prefix={
        <Typography.Text color="TextDisabled" width={30}>
          {stat.toUpperCase()}
        </Typography.Text>
      }
      textAlign="center"
      numType="decimal"
      // Explicitly unset errors and error statuses
      status=""
      errorMessage={null}
    />
  );
};

export type StatFieldsInputProps<
  FormState extends GenericForm,
  FieldType extends StatFieldRecord,
> = {
  name: GuaranteeFormNameType<FormState, FieldType>;
  onChange?: (value: FieldType) => void;
};

export const StatFieldsInput = <
  FormState extends GenericForm,
  FieldType extends StatFieldRecord = StatFieldRecord,
>({
  name,
  onChange,
}: StatFieldsInputProps<FormState, FieldType>) => {
  const { errors } = useFormState<FormState>();
  const watchedValue = useWatch({ name });

  React.useEffect(() => {
    if (onChange == null || watchedValue == null) {
      return;
    }

    // Only call onChange if all values are defined
    const hasAllValues = Object.values(watchedValue).every(
      (val) => val != null,
    );

    if (hasAllValues) {
      onChange(watchedValue);
    }
  }, [watchedValue, onChange]);

  const fieldErrors = uniq(getErrorMessages(errors[name]));

  return (
    <Flex vertical>
      <Grid mobile={2} smallTablet={3} tablet={6} gap={4}>
        <SingleField stat="hp" parentName={name} />
        <SingleField stat="atk" parentName={name} />
        <SingleField stat="def" parentName={name} />
        <SingleField stat="spa" parentName={name} />
        <SingleField stat="spd" parentName={name} />
        <SingleField stat="spe" parentName={name} />
      </Grid>
      {fieldErrors.length !== 0 && (
        <Typography.Text type="danger">
          {fieldErrors.join(", ")}
        </Typography.Text>
      )}
    </Flex>
  );
};
