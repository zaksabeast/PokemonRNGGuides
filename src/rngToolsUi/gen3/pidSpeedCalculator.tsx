import React from "react";
import { Typography, Flex, FormFieldTable, Field } from "~/components";
import { rngTools } from "~/rngTools";
import { match, P } from "ts-pattern";
import { formatProbability } from "~/utils/formatProbability";
import { NumberInput } from "~/components/numberInput";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

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
  if (val > 0.99) {
    return "99%";
  }
  return formatProbability(val);
};

export const Gen3PidSpeedCalculator = () => {
  const t = useActiveRouteTranslations();
  const [speed, setSpeed] = React.useState<number | null>(null);
  const [ranking, setRanking] = React.useState<number | null>(null);

  const qualitativeSpeed = match({ speed, ranking })
    .with({ speed: 18 }, () => t["Fastest"])
    .with({ speed: 900 }, () => t["Slowest"])
    .otherwise(({ speed, ranking }) => {
      if (speed == null || ranking == null) {
        return "";
      }

      const fasterThanPercent = formatPct(1 - ranking);
      const slowerThanPercent = formatPct(ranking);
      const fasterThan = t["Faster than {percent} of PIDs"].replace(
        "{percent}",
        fasterThanPercent,
      );
      const slowerThan = t["Slower than {percent} of PIDs"].replace(
        "{percent}",
        slowerThanPercent,
      );

      const category = match(Math.floor(ranking * 100))
        .with(0, () => t["Very Fast"])
        .with(1, () => t["Very Fast"])
        .with(98, () => t["Slow"])
        .with(P.number.between(99, 100), () => t["Very Slow"])
        .otherwise(() => t["Common"]);

      return `${category}. ${ranking < 0.5 ? fasterThan : slowerThan}`;
    });

  const [value, setValue] = React.useState<number>(0);
  const fields: Field[] = [
    {
      label: t["Lead PID"],
      input: (
        <NumberInput
          numType="hex"
          value={value}
          onChange={async (pid) => {
            let newPid = pid;
            if (newPid == null || newPid < 0) {
              newPid = 0;
            } else if (newPid > 0xffffffff) {
              newPid = 0xffffffff;
            }
            setValue(newPid);

            const pidSpeed = await rngTools.calculate_pid_speed(newPid);
            const ranking =
              await rngTools.calculate_pid_speed_ranking(pidSpeed);
            setSpeed(pidSpeed);
            setRanking(ranking);
          }}
        />
      ),
    },
  ];

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={5} mv={0}>
        {t["Lead PID Speed Calculator"]}
      </Typography.Title>
      <FormFieldTable fields={fields} />

      {speed !== null && (
        <Typography.Text strong>
          {t["Speed: {speed} cycles ({cycles})"]
            .replace("{speed}", speed.toString())
            .replace("{cycles}", qualitativeSpeed.toString())}
        </Typography.Text>
      )}
    </Flex>
  );
};
