import React from "react";
import { Typography, Flex, FormFieldTable } from "~/components";
import { rngTools } from "~/rngTools";
import { match, P } from "ts-pattern";
import { formatProbability } from "~/utils/formatProbability";
import { NumberInput } from "~/components/numberInput";

const formatPct = (val: number) => {
  if (val > 0.999999) {
    return "99.9999%";
  }
  if (val > 0.99999) {
    return "99.999%";
  }
  if (val > 0.9999) {
    return "99.99%";
  }
  if (val > 0.999) {
    return "99.9%";
  }
  return formatProbability(val);
};

export const Gen3PidSpeedCalculator = () => {
  const [speed, setSpeed] = React.useState<number | null>(null);
  const [ranking, setRanking] = React.useState<number | null>(null);

  const qualitativeSpeed = React.useMemo(() => {
    if (speed === null || ranking === null) {
      return "";
    }

    return match(speed)
      .with(18, () => "Fastest")
      .with(900, () => "Slowest")
      .otherwise(() => {
        const fasterThan = `Faster than ${formatPct(1 - ranking)} of PIDs.`;
        const slowerThan = `Slower than ${formatPct(ranking)} of PIDs.`;

        const category = match(Math.floor(ranking * 100))
          .with(0, () => `Very Fast`)
          .with(1, () => `Very Fast`)
          .with(98, () => `Slow`)
          .with(P.number.between(99, 100), () => `Very Slow`)
          .otherwise(() => `Common`);

        return `${category}. ${ranking < 0.5 ? fasterThan : slowerThan}`;
      });
  }, [speed, ranking]);

  const [value, setValue] = React.useState<number>(0);
  const fields = React.useMemo(() => {
    return [
      {
        label: "Lead PID",
        input: (
          <NumberInput
            numType="hex"
            value={value}
            onChange={async (pid) => {
              if (pid == null || pid < 0) {
                pid = 0;
              } else if (pid > 0xffffffff) {
                pid = 0xffffffff;
              }
              setValue(pid);

              const pidSpeed = await rngTools.calculate_pid_speed(pid);
              const ranking =
                await rngTools.calculate_pid_speed_ranking(pidSpeed);
              setSpeed(pidSpeed);
              setRanking(ranking);
            }}
          />
        ),
      },
    ];
  }, [setSpeed, setRanking, value, setValue]);

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={5} mv={0}>
        Lead PID Speed Calculator
      </Typography.Title>
      <FormFieldTable fields={fields} />

      {speed !== null && (
        <Typography.Text strong>
          Speed: {speed} cycles ({qualitativeSpeed})
        </Typography.Text>
      )}
    </Flex>
  );
};
