import React from "react";
import { rngTools, type SeedTime4 } from "~/rngTools";
import {
  RngToolForm,
  FormikNumberInput,
  type RngToolSubmit,
  type ResultColumn,
  Field,
  MinMaxContainer,
  Button,
} from "~/components";
import { uniqueId } from "lodash-es";
import { z } from "zod";
import { shrinkCoinFlips, matchesCoinFlipFilter, SmallCoinFlip } from "./utils";
import { CoinFlipFilterButtons } from "./coinFlipButtons";
import { rngDate, RngDateSchema, rngTime, RngTimeSchema } from "~/utils/time";
import { gen4StateAtom } from "../state";
import { useAtom } from "jotai";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import { useCurrentStep } from "~/components/stepper/state";
import { Translations } from "~/translations";
import { getFindableSeeds } from "../getFindableSeeds";

type ResultRow = {
  id: string;
  seed: number;
  seedTime: SeedTime4;
  coinFlips: SmallCoinFlip[];
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
  const [state, setState] = useAtom(gen4StateAtom);

  const [, setCurrentStep] = useCurrentStep();

  return (
    <Button
      trackerId="coin_flip_select_seed"
      onClick={() => {
        setState({
          target: {
            seedTime,
            lcrngAdvance: null,
            mtAdvance: null,
            coinFlipCount: state.gameState.coinFlips.length,
          },
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
    render: (coinFlips: SmallCoinFlip[]) => coinFlips.join(", "),
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
    matchesCoinFlipFilter(result.coinFlips, state.gameState.coinFlips),
  );

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    const { seedTimesBySeed, seedList } = await getFindableSeeds(opts);
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
        coinFlips: shrinkCoinFlips(coin_flips),
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
          coinFlipFilter={state.gameState.coinFlips}
          onCoinFlipFilterChange={(coinFlips) =>
            setState({ gameState: { coinFlips } })
          }
          headsTrackerId="hit_seed_add_heads"
          tailsTrackerId="hit_seed_add_tails"
        />
      }
      onSubmit={onSubmit}
      rowKey="id"
      submitTrackerId="coin_flip_seed_search"
    />
  );
};
