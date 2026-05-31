import React from "react";
import {
  rngTools,
  type CoinFlip,
  type ElmCall,
} from "~/rngTools";
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
import {
  shrinkCoinFlips,
  matchesCoinFlipFilter,
  sanitizeFlips,
} from "../shared/coinFlipUtils";
import { CoinFlipFilter } from "../shared/coinFlipFilter";
import { ElmCallFilter } from "../shared/elmCallFilter";
import { sanitizeElmCalls, matchesElmCallFilter } from "../shared/elmCallUtils";
import {
  addRngTime,
  rngDate,
  RngDateSchema,
  rngTime,
  RngTimeSchema,
} from "~/utils/time";
import { useSwarmState } from "./state";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import { useCurrentStep } from "~/components/stepper/state";
import { Translations } from "~/translations";

const isHgss = (game: string) => game === "HeartGold" || game === "SoulSilver";

type ResultRow = {
  id: string;
  seed: number;
  coinFlips: CoinFlip[] | ElmCall[];
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
  seed: number;
};

const SelectButton = ({ seed }: SelectButtonProps) => {
  const [, setState] = useSwarmState();
  const [, setCurrentStep] = useCurrentStep();

  return (
    <Button
      trackerId="swarm_select_seed"
      onClick={() => {
        setState((prev) => ({
          ...prev,
          seed,
          targetAdvance: null,
        }));
        setCurrentStep((step) => step + 1);
      }}
    >
      Select
    </Button>
  );
};

const getColumns = (
  t: Translations,
  hgss: boolean,
): ResultColumn<ResultRow>[] => [
  {
    title: t["Select"],
    dataIndex: "id",
    render: (_, record) => <SelectButton seed={record.seed} />,
  },
  {
    title: t["Seed"],
    dataIndex: "seed",
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: hgss ? t["Calls"] : t["Coin Flips"],
    dataIndex: "coinFlips",
    render: (values: string[]) =>
      hgss
        ? values.join(", ")
        : shrinkCoinFlips(values as CoinFlip[]).join(", "),
  },
];

const getFields = (t: Translations, hgss: boolean): Field[] => [
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
    label: hgss ? t["Calls"] : t["Coin Flip Count"],
    input: (
      <FormikNumberInput<FormState> name="coinFlipCount" numType="decimal" />
    ),
  },
];

export const SwarmCoinFlipper = () => {
  const [state] = useSwarmState();
  const [allResults, setAllResults] = React.useState<ResultRow[]>([]);
  const [flipFilter, setFlipFilter] = React.useState("");
  const [coinFlipCount, setCoinFlipCount] = React.useState(
    initialValues.coinFlipCount,
  );

  const hgss = isHgss(state.game);

  const filteredResults = allResults.filter((result) => {
    if (hgss) {
      return matchesElmCallFilter(
        result.coinFlips as ElmCall[],
        flipFilter,
      );
    }

    return matchesCoinFlipFilter(
      result.coinFlips as CoinFlip[],
      flipFilter,
    );
  });

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    const seeds = await rngTools.calc_gen4_seeds({
      min_delay: opts.minDelay,
      max_delay: opts.maxDelay,
      seconds_increment: Math.max(opts.maxSeconds - opts.minSeconds, 0),
      datetime: addRngTime(opts.date, {
        ...opts.time,
        second: opts.minSeconds,
      }),
    });

    const seedList = new Uint32Array(seeds.map(({ seed }) => seed));

    setCoinFlipCount(opts.coinFlipCount);

    let results: ResultRow[];

    if (hgss) {
      const elmCalls = await rngTools.elm_calls_for_seeds(
        seedList,
        opts.coinFlipCount,
      );

      results = elmCalls.map(
        ({ seed, elm_calls }): ResultRow => ({
          id: uniqueId(),
          seed,
          coinFlips: elm_calls,
        }),
      );
    } else {
      const coinFlips = await rngTools.coin_flips_for_seeds(
        seedList,
        opts.coinFlipCount,
      );

      results = coinFlips.map(
        ({ seed, coin_flips }): ResultRow => ({
          id: uniqueId(),
          seed,
          coinFlips: coin_flips,
        }),
      );
    }

    setAllResults(results);
  };

  const filter = hgss ? (
    <ElmCallFilter
      maxElmCalls={coinFlipCount}
      elmCallFilter={flipFilter}
      onElmCallFilterChange={(value) => setFlipFilter(sanitizeElmCalls(value))}
      eTrackerId="swarm_seed_add_e"
      kTrackerId="swarm_seed_add_k"
      pTrackerId="swarm_seed_add_p"
    />
  ) : (
    <CoinFlipFilter
      maxCoinFlips={coinFlipCount}
      coinFlipFilter={flipFilter}
      onCoinFlipFilterChange={(value) => setFlipFilter(sanitizeFlips(value))}
      headsTrackerId="swarm_seed_add_heads"
      tailsTrackerId="swarm_seed_add_tails"
    />
  );

  return (
    <>
      <RngToolForm<FormState, ResultRow>
        getFields={(t) => getFields(t, hgss)}
        getColumns={(t) => getColumns(t, hgss)}
        results={filteredResults}
        initialValues={initialValues}
        validationSchema={Validator}
        filters={filter}
        onSubmit={onSubmit}
        rowKey="id"
        submitTrackerId="swarm_seed_search"
      />
    </>
  );
};