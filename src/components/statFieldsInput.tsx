import { GenericForm, GuaranteeFormNameType } from "~/types/form";
import { Flex } from "./flex";
import { Ivs } from "~/rngTools";
import { FormikNumberInput } from "./numberInput";
import { GlobalError, useFormState, useWatch } from "react-hook-form";
import { map, uniq } from "lodash-es";
import { Typography } from "./typography";
import React from "react";

type StatFieldRecord = Record<keyof Ivs, number | null>;

type SingleFieldProps = {
  parentName: string;
  stat: keyof Ivs;
};

const SingleField = ({ parentName, stat }: SingleFieldProps) => {
  return (
    <Flex minWidth={50}>
      <FormikNumberInput
        name={`${parentName}.${stat}`}
        textAlign="center"
        numType="decimal"
        // Explicitly unset errors and error statuses
        status=""
        errorMessage={null}
      />
    </Flex>
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

  const fieldErrors = uniq(
    map(errors[name], (error: GlobalError) => error.message),
  );

  return (
    <Flex vertical>
      <Flex gap={16}>
        <SingleField stat="hp" parentName={name} />
        <SingleField stat="atk" parentName={name} />
        <SingleField stat="def" parentName={name} />
        <SingleField stat="spa" parentName={name} />
        <SingleField stat="spd" parentName={name} />
        <SingleField stat="spe" parentName={name} />
      </Flex>
      {fieldErrors.length !== 0 && (
        <Typography.Text type="danger">
          {fieldErrors.join(", ")}
        </Typography.Text>
      )}
    </Flex>
  );
};
