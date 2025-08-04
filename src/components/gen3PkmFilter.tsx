import { Gen3PkmFilter, Gen3PidSpeedFilter } from "~/rngTools";
import { Field } from "~/components/formFieldTable";
import { FormikSwitch } from "~/components/switch";
import { z } from "zod";
import { optIn, optOut } from "~/utils/options";
import { Gen3PidSpeedInput } from "./gen3PkmFilter.component";

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
