import { rngTools } from "~/rngTools";
import {
  FormSummary,
  NumberField,
  SelectField,
  type InfoTooltipContent,
} from "~/components/form";
import { match } from "ts-pattern";
import React from "react";
import clamp from "lodash-es/clamp";
import { toOptions } from "~/utils/options";

type LeadSpeedType =
  | "Ideal"
  | "Fastest"
  | "Average"
  | "Slowest"
  | "From PID"
  | "Custom";

const leadSpeedTypes = [
  "Ideal",
  "Fastest",
  "Average",
  "Slowest",
  "From PID",
  "Custom",
] as const satisfies readonly LeadSpeedType[];

export const FASTEST_LEAD_CYCLE_SPEED = 18;
export const AVERAGE_LEAD_CYCLE_SPEED = 775;
export const SLOWEST_LEAD_CYCLE_SPEED = 900;

const calculateLeadCycleSpeed = async (
  leadSpeedType: LeadSpeedType,
  leadCycleSpeedCustom: number,
  leadPID: number,
  idealLeadCycleSpeed: number | null,
) => {
  return match(leadSpeedType)
    .with("Fastest", () => FASTEST_LEAD_CYCLE_SPEED)
    .with("Slowest", () => SLOWEST_LEAD_CYCLE_SPEED)
    .with("Average", () => AVERAGE_LEAD_CYCLE_SPEED)
    .with("Custom", () => leadCycleSpeedCustom)
    .with("From PID", () => rngTools.calculate_pid_speed(leadPID))
    .with("Ideal", () => idealLeadCycleSpeed ?? AVERAGE_LEAD_CYCLE_SPEED) // Technically not possible to choose Ideal if idealLeadCycleSpeed is null.
    .exhaustive();
};

export const Wild3LeadCycleSpeedInput = ({
  label,
  tooltip,
  idealLeadCycleSpeed,
  leadCycleSpeed,
  setLeadCycleSpeed,
}: {
  label: React.ReactNode;
  tooltip?: InfoTooltipContent;
  idealLeadCycleSpeed: number | null;
  leadCycleSpeed: number;
  setLeadCycleSpeed?: (leadCycleSpeed: number) => void;
}) => {
  const [leadSpeedType, setLeadSpeedType] =
    React.useState<LeadSpeedType>("Average");
  const [leadCycleSpeedCustom, setLeadCycleSpeedCustom] = React.useState<
    number | null
  >(leadCycleSpeed);
  const [leadPID, setLeadPID] = React.useState<number | null>(0);

  const [computedLeadCycleSpeed, setComputedLeadCycleSpeed] =
    React.useState<number>(AVERAGE_LEAD_CYCLE_SPEED);

  React.useEffect(() => {
    calculateLeadCycleSpeed(
      leadSpeedType,
      leadCycleSpeedCustom ?? AVERAGE_LEAD_CYCLE_SPEED,
      leadPID ?? 0,
      idealLeadCycleSpeed,
    ).then((val) => {
      setComputedLeadCycleSpeed(val);
      setLeadCycleSpeed?.(val);
    });
  }, [
    idealLeadCycleSpeed,
    leadCycleSpeedCustom,
    leadPID,
    leadSpeedType,
    setComputedLeadCycleSpeed,
    setLeadCycleSpeed,
  ]);

  const cycleCountLabel = "Cycle count for operation (PID modulo 25)";

  return (
    <>
      <SelectField<LeadSpeedType>
        name="leadSpeedType"
        label={label}
        tooltip={tooltip}
        onChange={setLeadSpeedType}
        value={leadSpeedType}
        options={toOptions(
          idealLeadCycleSpeed != null
            ? leadSpeedTypes.slice(0)
            : leadSpeedTypes.filter((el) => el !== "Ideal"),
        )}
      />
      {leadSpeedType === "From PID" && (
        <NumberField
          name="leadPID"
          label="Lead PID"
          onChange={(val) => {
            const val2 = val == null ? null : clamp(val, 0, 0xffffffff);
            setLeadPID(val2);
          }}
          numType="hex"
          value={leadPID}
        />
      )}
      {leadSpeedType === "Custom" ? (
        <NumberField
          name="leadCycleSpeedCustom"
          label={cycleCountLabel}
          onChange={(val) => {
            const val2 = val == null ? null : clamp(val, 0, 900);
            setLeadCycleSpeedCustom(val2);
          }}
          numType="decimal"
          value={leadCycleSpeedCustom}
        />
      ) : (
        <FormSummary
          rows={[
            {
              label: cycleCountLabel,
              value: `${computedLeadCycleSpeed} cycles`,
            },
          ]}
        />
      )}
    </>
  );
};
