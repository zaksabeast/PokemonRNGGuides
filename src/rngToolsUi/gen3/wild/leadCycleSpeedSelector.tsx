import { rngTools } from "~/rngTools";
import { useFormContext } from "~/hooks/form";
import {
  FormFieldTable,
  Icon,
  Link,
  NumberInput,
  RadioGroup,
} from "~/components";
import { Tooltip } from "antd";
import { match } from "ts-pattern";
import React from "react";
import clamp from "lodash-es/clamp";

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

export const LeadCycleSpeedLabel = () => {
  return (
    <>
      <Link newTab href="/gba-methods-lead-impact/">
        Lead Speed
      </Link>{" "}
      <Tooltip title="The PID of the first Pokémon in the party impacts the RNG.">
        <Icon name="InformationCircle" size={16} />
      </Tooltip>
    </>
  );
};

export const AVERAGE_LEAD_CYCLE_SPEED = 775;
export const SLOWEST_LEAD_CYCLE_SPEED = 900;

const calculateLeadCycleSpeed = async (
  leadSpeedType: LeadSpeedType,
  leadCycleSpeedCustom: number,
  leadPID: number,
  idealLeadCycleSpeed: number | null,
) => {
  return match(leadSpeedType)
    .with("Fastest", () => 18)
    .with("Slowest", () => SLOWEST_LEAD_CYCLE_SPEED)
    .with("Average", () => AVERAGE_LEAD_CYCLE_SPEED)
    .with("Custom", () => leadCycleSpeedCustom)
    .with("From PID", () => rngTools.calculate_pid_speed(leadPID))
    .with("Ideal", () => idealLeadCycleSpeed ?? AVERAGE_LEAD_CYCLE_SPEED) // Technically not possible to choose Ideal if idealLeadCycleSpeed is null.
    .exhaustive();
};

export const LeadCycleSpeedSelector = ({
  idealLeadCycleSpeed,
}: {
  idealLeadCycleSpeed: number | null;
}) => {
  const { setFieldValue } = useFormContext<{
    leadCycleSpeed: number;
  }>();
  const [leadSpeedType, setLeadSpeedType] =
    React.useState<LeadSpeedType>("Average");
  const [leadCycleSpeedCustom, setLeadCycleSpeedCustom] = React.useState<
    number | null
  >(AVERAGE_LEAD_CYCLE_SPEED);
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
      setFieldValue("leadCycleSpeed", val);
    });
  }, [
    idealLeadCycleSpeed,
    leadCycleSpeedCustom,
    leadPID,
    leadSpeedType,
    setComputedLeadCycleSpeed,
    setFieldValue,
  ]);

  const fields = [
    {
      label: "Lead PID:",
      input: (
        <NumberInput
          name="leadPID"
          onChange={(val) => {
            const val2 = val == null ? null : clamp(val, 0, 0xffffffff);
            setLeadPID(val2);
          }}
          numType="hex"
          value={leadPID}
        />
      ),
      show: leadSpeedType === "From PID",
    },
    {
      label: "Cycle count for operation (PID modulo 25):",
      input: (
        <NumberInput
          name="leadCycleSpeedCustom"
          onChange={(val) => {
            const val2 = val == null ? null : clamp(val, 0, 900);
            setLeadCycleSpeedCustom(val2);
          }}
          numType="decimal"
          value={leadCycleSpeedCustom}
        />
      ),
      show: leadSpeedType === "Custom",
    },
    {
      label: "Cycle count for operation (PID modulo 25):",
      input: `${computedLeadCycleSpeed} cycles`,
      show: leadSpeedType !== "Custom",
    },
  ];

  return (
    <>
      <RadioGroup
        optionType="button"
        name="leadSpeedType"
        onChange={(evt) => {
          setLeadSpeedType(evt.target.value);
        }}
        value={leadSpeedType}
        options={
          idealLeadCycleSpeed != null
            ? leadSpeedTypes.slice(0)
            : leadSpeedTypes.filter((el) => el !== "Ideal")
        }
      />
      <br />
      <br />
      <FormFieldTable fields={fields} />
    </>
  );
};
