import { Gen3PkmFilter, Gen3PidSpeedFilter } from "~/rngTools";
import { Field } from "~/components/formFieldTable";
import { FormikSwitch } from "~/components/switch";
import { z } from "zod";
import { FormikNumberInput, FormFieldTable } from "~/components";
import { useField } from "formik";
import React from "react";
import { Paths } from "~/types";

export type Gen3PkmFilterFields = {
  filter_max_size: boolean;
  filter_pid_speed: Gen3PidSpeedFilter;
};

export const gen3PkmFilterSchema = z.object({
  filter_max_size: z.boolean(),
  filter_pid_speed: z.object({
    active: z.boolean(),
    min_cycle_count: z.number().min(18).max(900),
    max_cycle_count: z.number().min(18).max(900),
  }),
});

export const gen3PkmFilterFieldsToRustInput = (
  fields: Gen3PkmFilterFields,
): Gen3PkmFilter => {
  return {
    max_size: fields.filter_max_size,
    pid_speed: fields.filter_pid_speed,
  };
};

type FieldOpts = {
  max_size?: boolean;
  pid_speed?: boolean;
};

export const getGen3PkmFilterInitialValues = (): Gen3PkmFilterFields => ({
  filter_max_size: false,
  filter_pid_speed: {
    active: false,
    min_cycle_count: 18,
    max_cycle_count: 900,
  },
});

const optOut = <T,>(condition: boolean | undefined, value: T): T | null => {
  return condition === false ? null : value;
};

const optIn = <T,>(condition: boolean | undefined, value: T): T | null => {
  return condition === true ? value : null;
};

const _getGen3PkmFilterFields = (opts: FieldOpts = {}): Field[] =>
  [
    optIn(opts?.max_size, {
      label: "Max size",
      input: <FormikSwitch<Gen3PkmFilterFields> name="filter_max_size" />,
    }),
    optOut(opts?.pid_speed, {
      label: "PID cycle speed",
      input: (
        <FormikSwitch<Gen3PkmFilterFields> name="filter_pid_speed.active" />
      ),
    }),
    optOut(opts?.pid_speed, {
      label: "",
      direction: "column",
      input: <Gen3PidSpeedInput<Gen3PkmFilterFields> name="filter_pid_speed" />,
    }),
  ].filter((field) => field !== null);

export const getGen3PkmFilterFields = <FormField,>(
  opts?: FieldOpts,
): FormField extends Gen3PkmFilterFields ? Field[] : never => {
  return _getGen3PkmFilterFields(opts) as FormField extends Gen3PkmFilterFields
    ? Field[]
    : never;
};

type Props<FormState extends Gen3PkmFilterFields> = {
  name: Paths<FormState, Gen3PidSpeedFilter>;
};

export const Gen3PidSpeedInput = <FormState extends Gen3PkmFilterFields>({
  name,
}: Props<FormState>) => {
  const [{ value: active }] = useField<Gen3PidSpeedFilter["active"]>(
    `${name}.active`,
  );
  const fields = React.useMemo(
    () => [
      {
        label: "Min cycle count",
        input: (
          <FormikNumberInput<Gen3PkmFilterFields>
            name="filter_pid_speed.min_cycle_count"
            numType="decimal"
          />
        ),
      },
      {
        label: "Max cycle count",
        input: (
          <FormikNumberInput<Gen3PkmFilterFields>
            name="filter_pid_speed.max_cycle_count"
            numType="decimal"
          />
        ),
      },
    ],
    [],
  );

  // Eslint is asking this to be a strict check
  if (active === true) {
    return <FormFieldTable fields={fields} />;
  }

  return null;
};
