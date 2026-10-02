import React from "react";
import { useFormContext } from "react-hook-form";
import { type Gen3PkmFilterFields } from "~/components/gen3PkmFilter";
import { Link } from "~/components/link";
import { GenericForm, type RequireFormFields } from "~/types/form";
import { FieldRow } from "~/components/form/base/layout";
import { FormNumberField } from "~/components/form/base/numberField";
import {
  RadioField,
  type RadioOption,
} from "~/components/form/base/radioField";
import { FormSwitchField } from "~/components/form/base/switchField";

type PidSpeedMode = "any" | "fastest" | "slowest" | "custom";

const pidSpeedModeOptions: RadioOption<PidSpeedMode>[] = [
  { label: "Any", value: "any" },
  { label: "Fastest", value: "fastest" },
  { label: "Slowest", value: "slowest" },
  { label: "Custom", value: "custom" },
];

const FASTEST_CYCLE_COUNT = 18;
const SLOWEST_CYCLE_COUNT = 900;

const PidSpeedField = () => {
  const { setValue } = useFormContext<Gen3PkmFilterFields>();
  const [pidSpeedMode, setPidSpeedMode] = React.useState<PidSpeedMode>("any");

  const onPidSpeedModeChange = (mode: PidSpeedMode) => {
    setPidSpeedMode(mode);
    setValue("filter_pid_speed.active", mode !== "any");

    if (mode === "any") {
      setValue("filter_pid_speed.min_cycle_count", FASTEST_CYCLE_COUNT);
      setValue("filter_pid_speed.max_cycle_count", SLOWEST_CYCLE_COUNT);
    } else if (mode === "fastest") {
      setValue("filter_pid_speed.min_cycle_count", FASTEST_CYCLE_COUNT);
      setValue("filter_pid_speed.max_cycle_count", FASTEST_CYCLE_COUNT);
    } else if (mode === "slowest") {
      setValue("filter_pid_speed.min_cycle_count", SLOWEST_CYCLE_COUNT);
      setValue("filter_pid_speed.max_cycle_count", SLOWEST_CYCLE_COUNT);
    }
  };

  return (
    <>
      <RadioField<PidSpeedMode>
        label="PID cycle speed"
        tooltip={{
          title: "PID cycle speed",
          description: (
            <>
              For advanced users. Owning Pokémon with very fast or very low PID
              cycle speed is used to influence the triggered method of wild
              encounters. Learn more about{" "}
              <Link newTab href="/gba-methods-lead-impact/">
                Methods & Leads
              </Link>
              .
            </>
          ),
        }}
        cellSize="word"
        value={pidSpeedMode}
        options={pidSpeedModeOptions}
        onChange={onPidSpeedModeChange}
      />
      {pidSpeedMode === "custom" && (
        <FieldRow>
          <FormNumberField<Gen3PkmFilterFields>
            name="filter_pid_speed.min_cycle_count"
            label="Min cycles"
            numType="decimal"
          />
          <FormNumberField<Gen3PkmFilterFields>
            name="filter_pid_speed.max_cycle_count"
            label="Max cycles"
            numType="decimal"
          />
        </FieldRow>
      )}
    </>
  );
};

type Gen3PkmFilterProps = {
  displayLevel?: boolean;
  displayMaxSize?: boolean;
  displayPidSpeed?: boolean;
};

type Props<FormState extends GenericForm> = Gen3PkmFilterProps &
  RequireFormFields<FormState, Gen3PkmFilterFields>;

export const Gen3PkmFilter = <FormState extends GenericForm>({
  displayLevel = false,
  displayMaxSize = false,
  displayPidSpeed = true,
}: Props<FormState>) => (
  <>
    {displayLevel && (
      <FormNumberField<Gen3PkmFilterFields>
        name="filter_lvl"
        label="Level"
        numType="decimal"
      />
    )}
    {displayMaxSize && (
      <FormSwitchField<Gen3PkmFilterFields>
        name="filter_max_size"
        label="Max size"
        tooltip={{
          title: "Max size",
          description: "To show to the Sootopolis City's brothers.",
        }}
      />
    )}
    {displayPidSpeed && <PidSpeedField />}
  </>
);
