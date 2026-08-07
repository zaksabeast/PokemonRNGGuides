import React from "react";
import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import {
  Descriptions,
  Field,
} from "~/rngToolsUi/workbench/components/descriptions";
import {
  FormikDatePicker,
  FormikTimePicker,
  FormikNumberInput,
  MinMaxContainer,
  Select,
  Flex,
} from "~/components";
import { ResultColumn } from "~/components/resultTable";
import { z } from "zod";
import {
  getSeedTime4WithMarkers,
  SeedTime4WithMarkers,
} from "~/rngToolsUi/gen4/shared/getFindableSeeds";
import {
  rngDate,
  RngDateSchema,
  rngTime,
  RngTimeSchema,
  formatRngDateTime,
} from "~/utils/time";
import { matchesCoinFlipFilter } from "~/rngToolsUi/gen4/shared/dpptCoinFlip/utils";
import { matchesElmCallFilter } from "~/rngToolsUi/gen4/shared/hgssElmCalls/utils";
import { CoinFlipFilterButtons } from "~/rngToolsUi/gen4/shared/dpptCoinFlip/coinFlipButtons";
import { useWatch } from "~/hooks/form";
import { Gen4GameVersion, Gen4GameVersions, DpPt } from "~/types/games";
import { toOptions } from "~/utils/options";
import { isIn } from "~/utils/isIn";
import { ElmCallFilterButtons } from "~/rngToolsUi/gen4/shared/hgssElmCalls/elmCallFilterButtons";

const Validator = z.object({
  date: RngDateSchema,
  time: RngTimeSchema,
  minDelay: z.number().int().min(0),
  maxDelay: z.number().int().min(0),
  minSeconds: z.number().int().min(0).max(59),
  maxSeconds: z.number().int().min(0).max(60),
  filterItemCount: z.number().int().min(1).max(50),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  date: rngDate(),
  time: rngTime(),
  minDelay: 600,
  maxDelay: 800,
  minSeconds: 0,
  maxSeconds: 0,
  filterItemCount: 20,
};

type Result = SeedTime4WithMarkers;

type FilterFieldsProps = {
  isDppt: boolean;
  coinFlipFilter: string;
  onCoinFlipFilterChange: (filter: string) => void;
  elmCallFilter: string;
  onElmCallFilterChange: (filter: string) => void;
};

const FilterFields = ({
  isDppt,
  coinFlipFilter,
  onCoinFlipFilterChange,
  elmCallFilter,
  onElmCallFilterChange,
}: FilterFieldsProps) => {
  const { filterItemCount } = useWatch({
    validationSchema: Validator,
    names: { filterItemCount: true },
  });

  const filter = isDppt ? (
    <CoinFlipFilterButtons
      hasResults
      maxCoinFlips={filterItemCount ?? 0}
      coinFlipFilter={coinFlipFilter}
      onCoinFlipFilterChange={onCoinFlipFilterChange}
      headsTrackerId="experiment_seed_add_heads"
      tailsTrackerId="experiment_seed_add_tails"
    />
  ) : (
    <ElmCallFilterButtons
      hasResults
      maxElmCalls={filterItemCount ?? 0}
      elmCallFilter={elmCallFilter}
      onElmCallFilterChange={onElmCallFilterChange}
      eTrackerId="experiment_seed_add_elm_call_e"
      kTrackerId="experiment_seed_add_elm_call_k"
      pTrackerId="experiment_seed_add_elm_call_p"
    />
  );

  return (
    <Flex vertical gap={8}>
      <Descriptions bordered title="Filters" column={1} />
      {filter}
    </Flex>
  );
};

type RngInfoFieldsProps = {
  game: Gen4GameVersion;
  onGameChange: (game: Gen4GameVersion) => void;
};

const RngInfoFields = ({ game, onGameChange }: RngInfoFieldsProps) => {
  const fields: Field[] = [
    {
      label: "Game",
      children: (
        <Select<Gen4GameVersion>
          name="game"
          options={toOptions(Gen4GameVersions)}
          value={game}
          onChange={onGameChange}
        />
      ),
    },
    {
      label: "Date",
      children: <FormikDatePicker<FormState> name="date" />,
    },
    {
      label: "Time",
      children: <FormikTimePicker<FormState> name="time" />,
    },
    {
      label: "Seconds",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState> name="minSeconds" numType="decimal" />
          }
          max={
            <FormikNumberInput<FormState> name="maxSeconds" numType="decimal" />
          }
        />
      ),
    },
    {
      label: "Delay",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState> name="minDelay" numType="decimal" />
          }
          max={
            <FormikNumberInput<FormState> name="maxDelay" numType="decimal" />
          }
        />
      ),
    },
    {
      label: "Coin/Elm Count",
      children: (
        <FormikNumberInput<FormState>
          name="filterItemCount"
          numType="decimal"
        />
      ),
    },
  ];
  return <Descriptions bordered title="RNG Info" items={fields} column={1} />;
};

export const SeedTime4Calibrator = () => {
  const [results, setResults] = React.useState<Result[]>([]);
  const [coinFlipFilter, setCoinFlipFilter] = React.useState<string>("");
  const [elmCallFilter, setElmCallFilter] = React.useState<string>("");
  const [game, setGame] = React.useState<Gen4GameVersion>("Diamond");

  const isDppt = isIn(DpPt, game);

  const filteredResults = isDppt
    ? results.filter((result) =>
        matchesCoinFlipFilter(result.coinFlips, coinFlipFilter),
      )
    : results.filter((result) =>
        matchesElmCallFilter(result.elmCalls, elmCallFilter),
      );

  const onSubmit = async (opts: FormState) => {
    const results = await getSeedTime4WithMarkers({
      ...opts,
      includeElmCalls: true,
      includeCoinFlips: true,
    });
    setResults(results);
  };

  const columns: ResultColumn<Result>[] = [
    {
      title: "Seed",
      dataIndex: "seed",
      render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
    },
    {
      title: "Date Time",
      dataIndex: "seedTime",
      render: (seedTime) =>
        formatRngDateTime(seedTime.datetime, { seconds: true }),
    },
    {
      title: "Delay",
      dataIndex: "seedTime",
      render: (seedTime) => seedTime.delay,
    },
    {
      title: "Coin Flips",
      dataIndex: "coinFlips",
      monospace: true,
      show: isDppt,
      render: (coinFlips) => coinFlips.join(", "),
    },
    {
      title: "Elm Calls",
      dataIndex: "elmCalls",
      monospace: true,
      show: !isDppt,
      render: (elmCalls) => elmCalls.join(", "),
    },
  ];

  return (
    <ToolLayout<FormState, Result>
      initialValues={initialValues}
      validationSchema={Validator}
      loading={false}
      results={filteredResults}
      progressPercent={results.length === 0 ? 0 : 100}
      columns={columns}
      onSubmit={onSubmit}
      cancel={() => {}}
      slots={{
        filterFields: (
          <FilterFields
            isDppt={isDppt}
            coinFlipFilter={coinFlipFilter}
            onCoinFlipFilterChange={setCoinFlipFilter}
            elmCallFilter={elmCallFilter}
            onElmCallFilterChange={setElmCallFilter}
          />
        ),
        rngInfoFields: <RngInfoFields game={game} onGameChange={setGame} />,
      }}
    />
  );
};
