import {
  Field,
  FormikSelect,
  FormikNumberInput,
  MinMaxContainer,
} from "~/components";
import { GEN5_BUTTONS } from "~/rngToolsUi/gen5/constants";
import { toOptions } from "~/utils/options";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import { Profile5ValidatorFormState } from "./validator";

type FormState = Profile5ValidatorFormState;

export const profile5Fields: Field[] = [
  {
    label: "Buttons",
    input: (
      <FormikSelect<FormState, "buttons">
        name="buttons"
        options={toOptions(GEN5_BUTTONS)}
        mode="multiple"
      />
    ),
  },
  {
    label: "MAC Address",
    input: <FormikNumberInput<FormState> name="mac" numType="hex" />,
  },
  {
    label: "Seconds",
    input: (
      <MinMaxContainer
        min={
          <FormikNumberInput<FormState> name="min_seconds" numType="decimal" />
        }
        max={
          <FormikNumberInput<FormState> name="max_seconds" numType="decimal" />
        }
      />
    ),
  },
  {
    label: "VCount",
    input: (
      <MinMaxContainer
        min={<FormikNumberInput<FormState> name="min_v_count" numType="hex" />}
        max={<FormikNumberInput<FormState> name="max_v_count" numType="hex" />}
      />
    ),
  },
  {
    label: "Timer0",
    input: (
      <MinMaxContainer
        min={<FormikNumberInput<FormState> name="min_timer0" numType="hex" />}
        max={<FormikNumberInput<FormState> name="max_timer0" numType="hex" />}
      />
    ),
  },
  {
    label: "GxStat",
    input: (
      <MinMaxContainer
        min={<FormikNumberInput<FormState> name="min_gx_stat" numType="hex" />}
        max={<FormikNumberInput<FormState> name="max_gx_stat" numType="hex" />}
      />
    ),
  },
  {
    label: "VFrame",
    input: (
      <MinMaxContainer
        min={<FormikNumberInput<FormState> name="min_v_frame" numType="hex" />}
        max={<FormikNumberInput<FormState> name="max_v_frame" numType="hex" />}
      />
    ),
  },
  {
    label: "Boot Date",
    input: <FormikDatePicker<FormState> name="date" />,
  },
  {
    label: "Boot Time",
    input: <FormikTimePicker<FormState> name="time" />,
  },
];
