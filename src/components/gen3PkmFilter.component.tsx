import { Gen3PidSpeedFilter } from "~/rngTools";
import { Flex, FormikNumberInput, RadioGroup } from "~/components";
import { Paths } from "~/types";
import { Gen3PkmFilterFields } from "./gen3PkmFilter";
import { useFormContext } from "react-hook-form";
import React from "react";

type PidSpeedMode = "any" | "fastest" | "slowest" | "custom";

const pidSpeedModeOptions: { label: string; value: PidSpeedMode }[] = [
  { label: "Any", value: "any" },
  { label: "Fastest", value: "fastest" },
  { label: "Slowest", value: "slowest" },
  { label: "Custom", value: "custom" },
];

type Props<FormState extends Gen3PkmFilterFields> = {
  name: Paths<FormState, Gen3PidSpeedFilter>;
};

export const Gen3PidSpeedInput = <FormState extends Gen3PkmFilterFields>(
  // Keeping props to make sure form state is compatible
  _props: Props<FormState>,
) => {
  const { setValue } = useFormContext<Gen3PkmFilterFields>();
  const [pidSpeedMode, setPidSpeedMode] = React.useState<PidSpeedMode>("any");

  const onPidSpeedModeChange = (value: PidSpeedMode) => {
    setPidSpeedMode(value);
    setValue("filter_pid_speed.active", value !== "any");

    if (value === "any") {
      setValue("filter_pid_speed.min_cycle_count", 18);
      setValue("filter_pid_speed.max_cycle_count", 900);
    } else if (value === "fastest") {
      setValue("filter_pid_speed.min_cycle_count", 18);
      setValue("filter_pid_speed.max_cycle_count", 18);
    } else if (value === "slowest") {
      setValue("filter_pid_speed.min_cycle_count", 900);
      setValue("filter_pid_speed.max_cycle_count", 900);
    }
  };

  return (
    <Flex vertical gap={10}>
      <RadioGroup<PidSpeedMode>
        optionType="button"
        value={pidSpeedMode}
        onChange={(event) => onPidSpeedModeChange(event.target.value)}
        options={pidSpeedModeOptions}
      />
      {pidSpeedMode === "custom" && (
        <Flex align="flex-end" gap={5}>
          Min:
          <FormikNumberInput<Gen3PkmFilterFields>
            name="filter_pid_speed.min_cycle_count"
            numType="decimal"
          />
          Max:
          <FormikNumberInput<Gen3PkmFilterFields>
            name="filter_pid_speed.max_cycle_count"
            numType="decimal"
          />
        </Flex>
      )}
    </Flex>
  );
};
