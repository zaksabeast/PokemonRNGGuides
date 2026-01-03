import { Gen3PkmFilter, Gen3PidSpeedFilter, Species } from "~/rngTools";
import { Field } from "~/components/formFieldTable";
import { FormikSwitch } from "~/components/switch";
import { z } from "zod";
import { optIn, optOut } from "~/utils/options";
import { Gen3PidSpeedInput } from "./gen3PkmFilter.component";
import { FormikNumberInput } from "./numberInput";

export type Gen3PkmFilterFields = {
  filter_max_size: boolean;
  filter_pid_speed: Gen3PidSpeedFilter;
  filter_lvl: number | null;
};

export const gen3PkmFilterSchema = z.object({
  filter_max_size: z.boolean(),
  filter_pid_speed: z.object({
    active: z.boolean(),
    min_cycle_count: z.number().int().min(18).max(900),
    max_cycle_count: z.number().int().min(18).max(900),
  }),
  filter_lvl: z.number().int().min(1).max(100).nullable(),
});

export const gen3PkmFilterFieldsToRustInput = (
  fields: Gen3PkmFilterFields,
  species: Species | null,
): Gen3PkmFilter => {
  return {
    max_size: fields.filter_max_size,
    pid_speed: fields.filter_pid_speed,
    lvl: fields.filter_lvl,
    species,
  };
};

type FieldOpts = {
  max_size?: boolean;
  pid_speed?: boolean;
  lvl?: boolean;
};

export const getGen3PkmFilterInitialValues = (): Gen3PkmFilterFields => ({
  filter_max_size: false,
  filter_pid_speed: {
    active: false,
    min_cycle_count: 18,
    max_cycle_count: 900,
  },
  filter_lvl: null,
});

const _getGen3PkmFilterFields = (opts: FieldOpts = {}): Field[] =>
  [
    optIn(opts?.lvl, {
      label: "Level",
      input: (
        <FormikNumberInput<Gen3PkmFilterFields>
          name="filter_lvl"
          numType="decimal"
        />
      ),
    }),
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
      key: "_getGen3PkmFilterFields.pid_speed",
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
