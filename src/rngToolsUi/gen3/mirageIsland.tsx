import { ResultColumn } from "~/components";
import {
  FormNumberField,
  FormRadioField,
  FormSection,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { rngTools, MirageIslandResult } from "~/rngTools";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import React from "react";
import { clamp } from "lodash-es";
import { z } from "zod";
import { useWatch_UNSAFE } from "~/hooks/form";
import { toOptions } from "~/utils/options";

type Game = "emerald" | "rs";

const getColumns = (
  game: Game,
  resultsBattery: Battery,
): ResultColumn<MirageIslandResult>[] => {
  const columns: ResultColumn<MirageIslandResult>[] = [];
  if (resultsBattery === "Live") {
    columns.push(
      {
        title: "Day",
        dataIndex: "day",
        render: (dayDiff) => `${dayDiff + 1}`,
      },
      {
        title: "Time To Wait",
        dataIndex: "day_diff",
        render: (dayDiff) => `${dayDiff} day${dayDiff === 1 ? "" : "s"}`,
      },
    );
  }
  columns.push({
    title: "PID Pattern",
    dataIndex: "pid_pattern",
    render: (pid_pattern) =>
      `****${pid_pattern.toString(16).toUpperCase().padStart(4, "0")}`,
    monospace: true,
  });

  const fixedInitialSeedForMethod1 =
    game === "emerald" || resultsBattery === "Dead";
  if (fixedInitialSeedForMethod1) {
    columns.push({
      title: "Method-1 Earliest RNG Advance matching PID Pattern",
      dataIndex: "earliest_adv",
      render: (earliestAdv) => formatLargeInteger(earliestAdv),
    });
  }
  return columns;
};

const Validator = z.object({
  battery: z.enum(["Live", "Dead"]),
  rocketLaunchedCount: z.number().int().min(0).max(0xffff),
});

export type FormState = z.infer<typeof Validator>;
type Battery = FormState["battery"];

const initialValues: FormState = {
  battery: "Live",
  rocketLaunchedCount: 0,
};

const generateResults = (
  game: Game,
  values: FormState,
): Promise<MirageIslandResult[]> => {
  const initialSeed = game === "emerald" ? 0 : 0x5a0;
  if (values.battery === "Dead") {
    return rngTools.mirage_island_calculate(initialSeed, 0, 0);
  }

  const RESULT_COUNT = 100;
  const currentDay = clamp(values.rocketLaunchedCount * 7, 0, 0xffff);
  const lastDay = clamp(currentDay + RESULT_COUNT - 1, 0, 0xffff);

  return rngTools.mirage_island_calculate(initialSeed, currentDay, lastDay);
};

type Props = {
  game?: Game;
};

const Fields = () => {
  const t = useActiveRouteTranslations();
  const battery = useWatch_UNSAFE<FormState, "battery">({
    name: "battery",
  });

  return (
    <FormSection title={t["Your game"]}>
      <FormRadioField<FormState>
        name="battery"
        label="Battery"
        cellSize="word"
        options={toOptions(["Live", "Dead"] as const)}
      />
      {battery === "Live" && (
        <FormNumberField<FormState>
          name="rocketLaunchedCount"
          label="Rocket Launched"
          numType="decimal"
        />
      )}
    </FormSection>
  );
};

export const Gen3MirageIsland = ({ game = "emerald" }: Props) => {
  const [results, setResults] = React.useState<MirageIslandResult[]>([]);
  const [resultsBattery, setResultsBattery] = React.useState<Battery>("Live");

  const onSubmit: ToolFormSubmit<FormState> = async (values) => {
    const { battery } = values;
    const res = await generateResults(game, values);
    setResults(res);
    setResultsBattery(battery);
  };

  const columns = getColumns(game, resultsBattery);

  return (
    <ToolForm<FormState, MirageIslandResult>
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      rowKey="day"
      submitTrackerId="mirage_island"
    >
      <Fields />
    </ToolForm>
  );
};
