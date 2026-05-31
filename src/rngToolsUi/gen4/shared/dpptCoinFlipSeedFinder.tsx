import React from "react";
import { rngTools, type CoinFlip, type SeedTime4 } from "~/rngTools";
import {
  RngToolForm,
  FormikNumberInput,
  type RngToolSubmit,
  type ResultColumn,
  Field,
  MinMaxContainer,
  Button,
} from "~/components";
import { uniqueId, keyBy } from "lodash-es";
import { z } from "zod";
import { shrinkCoinFlips, matchesCoinFlipFilter } from "./coinFlipUtils";
import { CoinFlipFilterButtons } from "./dpptCoinFlipButtons";
import {
  addRngTime,
  rngDate,
  RngDateSchema,
  rngTime,
  RngTimeSchema,
} from "~/utils/time";
import { gen4StateAtom } from "./state";
import { useAtom } from "jotai";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import { useCurrentStep } from "~/components/stepper/state";
import { Translations } from "~/translations";

type ResultRow = {
  id: string;
  seed: number;
  seedTime: SeedTime4;
  coinFlips: CoinFlip[];
};

const Validator = z.object({
  date: RngDateSchema,
  time: RngTimeSchema,
  minDelay: z.number().int().min(0),
  maxDelay: z.number().int().min(0),
  minSeconds: z.number().int().min(0).max(59),
  maxSeconds: z.number().int().min(0).max(60),
  coinFlipCount: z.number().int().min(0),
});

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  date: rngDate(),
  time: rngTime(),
  minDelay: 600,
  maxDelay: 800,
  minSeconds: 0,
  maxSeconds: 0,
  coinFlipCount: 20,
};

type SelectButtonProps = {
  seedTime: SeedTime4;
};

const SelectButton = ({ seedTime }: SelectButtonProps) => {
  const [, setState] = useAtom(gen4StateAtom);
  const [, setCurrentStep] = useCurrentStep();

  return (
    <Button
      trackerId="honey_tree_select_seed"
      onClick={() => {
        setState({
          target: { seedTime, lcrngAdvance: null, mtAdvance: null },
        });
        setCurrentStep((step) => step + 1);
      }}
    >
      Select
    </Button>
  );
};

const getColumns = (t: Translations): ResultColumn<ResultRow>[] => [
  {
    title: t["Select"],
    dataIndex: "id",
    render: (_, record) => <SelectButton seedTime={record.seedTime} />,
  },
  {
    title: t["Seed"],
    dataIndex: "seed",
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: t["Coin Flips"],
    dataIndex: "coinFlips",
    render: (coinFlips: CoinFlip[]) => shrinkCoinFlips(coinFlips).join(", "),
  },
];

const getFields = (t: Translations): Field[] => [
  {
    label: t["Date"],
    input: <FormikDatePicker<FormState> name="date" />,
  },
  {
    label: t["Time"],
    input: <FormikTimePicker<FormState> name="time" />,
  },
  {
    label: t["Seconds"],
    input: (
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
    label: t["Delay"],
    input: (
      <MinMaxContainer
        min={<FormikNumberInput<FormState> name="minDelay" numType="decimal" />}
        max={<FormikNumberInput<FormState> name="maxDelay" numType="decimal" />}
      />
    ),
  },
  {
    label: t["Coin Flip Count"],
    input: (
      <FormikNumberInput<FormState> name="coinFlipCount" numType="decimal" />
    ),
  },
];

export const DpptCoinFlipSeedFinder = () => {
  const [allResults, setAllResults] = React.useState<ResultRow[]>([]);
  const [state, setState] = useAtom(gen4StateAtom);
  const [coinFlipCount, setCoinFlipCount] = React.useState(
    initialValues.coinFlipCount,
  );

  const filteredResults = allResults.filter((result) =>
    matchesCoinFlipFilter(result.coinFlips, state.coinFlipFilter),
  );

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    const seedTimes = await rngTools.calc_gen4_seeds({
      min_delay: opts.minDelay,
      max_delay: opts.maxDelay,
      seconds_increment: Math.max(opts.maxSeconds - opts.minSeconds, 0),
      datetime: addRngTime(opts.date, {
        ...opts.time,
        second: opts.minSeconds,
      }),
    });
    const seedTimesBySeed = keyBy(seedTimes, ({ seed }) => seed);
    const seedList = new Uint32Array(seedTimes.map(({ seed }) => seed));
    setCoinFlipCount(opts.coinFlipCount);
    const coinFlips = await rngTools.coin_flips_for_seeds(
      seedList,
      opts.coinFlipCount,
    );

    const results = coinFlips.map(({ seed, coin_flips }): ResultRow => {
      return {
        id: uniqueId(),
        seed,
        seedTime: seedTimesBySeed[seed],
        coinFlips: coin_flips,
      };
    });

    setAllResults(results);
  };

  return (
    <RngToolForm<FormState, ResultRow>
      getFields={getFields}
      getColumns={getColumns}
      results={filteredResults}
      initialValues={initialValues}
      validationSchema={Validator}
      filters={
        <CoinFlipFilterButtons
          hasResults={allResults.length > 0}
          maxCoinFlips={coinFlipCount}
          coinFlipFilter={state.coinFlipFilter}
          onCoinFlipFilterChange={(coinFlipFilter) =>
            setState({ coinFlipFilter })
          }
          headsTrackerId="hit_seed_add_heads"
          tailsTrackerId="hit_seed_add_tails"
        />
      }
      onSubmit={onSubmit}
      rowKey="id"
      submitTrackerId="hit_seed_search"
    />
  );
};
