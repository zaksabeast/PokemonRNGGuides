import React from "react";
import { gen4StateAtom } from "./state";
import { useAtom } from "jotai";
import { rngTools, DpptSeedTime4, type CoinFlip } from "~/rngTools";
import {
  RngToolForm,
  FormikNumberInput,
  type RngToolSubmit,
  type ResultColumn,
  Icon,
  Field,
} from "~/components";
import { uniqueId, sortBy } from "lodash-es";
import { CalibrateTimerButton } from "./calibrateTimerButton";
import { z } from "zod";
import { shrinkCoinFlips, matchesCoinFlipFilter } from "./coinFlipUtils";
import { CoinFlipFilterButtons } from "./dpptCoinFlipButtons";

const COIN_FLIPS = 20;

type ResultRow = DpptSeedTime4 & {
  id: string;
  isTarget: boolean;
  flipDelay: boolean;
  delayOffset: number;
  secondOffset: number;
  second: number;
};

type FormState = {
  delayOffset: number;
  secondOffset: number;
};

const Validator = z.object({
  delayOffset: z.number().int().min(0),
  secondOffset: z.number().int().min(0),
});

const initialValues: FormState = {
  delayOffset: 1000,
  secondOffset: 5,
};

const columns: ResultColumn<ResultRow>[] = [
  {
    title: "Calibrate",
    dataIndex: "id",
    disableVerticalPadding: true,
    render: (_, target) => (
      <CalibrateTimerButton
        hitDelay={target.delay}
        trackerId="calibrate_gen4_seed"
        lastStepOnClick={0}
      />
    ),
  },
  {
    title: "Is Target",
    dataIndex: "isTarget",
    key: "isTarget",
    render: (isTarget: boolean) =>
      isTarget ? <Icon name="CheckCircle" color="Success" size={30} /> : null,
  },
  {
    title: "Flip Delay",
    dataIndex: "flipDelay",
    render: (flipDelay) =>
      flipDelay ? <Icon name="CheckCircle" color="Warning" size={30} /> : null,
  },
  {
    title: "Delay Offset",
    dataIndex: "delayOffset",
    key: "delayOffset",
  },
  {
    title: "Second Offset",
    dataIndex: "secondOffset",
    key: "secondOffset",
  },
  {
    title: "Seed",
    dataIndex: "seed",
    key: "seed",
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
  {
    title: "Delay",
    dataIndex: "delay",
    key: "delay",
  },
  {
    title: "Second",
    dataIndex: "second",
    key: "second",
  },
  {
    title: "Coin Flips",
    dataIndex: "coin_flips",
    key: "coin_flips",
    render: (coinFlips: CoinFlip[]) => shrinkCoinFlips(coinFlips).join(", "),
  },
];

const fields: Field[] = [
  {
    label: "Delay Offset",
    input: (
      <FormikNumberInput<FormState> name="delayOffset" numType="decimal" />
    ),
  },
  {
    label: "Second Offset",
    input: (
      <FormikNumberInput<FormState> name="secondOffset" numType="decimal" />
    ),
  },
];

export const DpptCoinFlipSeedCalibrator = () => {
  const [state, setState] = useAtom(gen4StateAtom);
  const [allResults, setAllResults] = React.useState<ResultRow[]>([]);

  const filteredResults = allResults.filter((result) =>
    matchesCoinFlipFilter(result.coin_flips, state.coinFlipFilter),
  );

  const onSubmit: RngToolSubmit<FormState> = async (formState) => {
    const seedTime = state.target.seedTime;
    if (seedTime == null) {
      return;
    }

    const searchResults = await rngTools.calc_dppt_seedtimes({
      seedtime: seedTime,
      delay_offset: formState.delayOffset,
      second_offset: formState.secondOffset,
      coin_flip_count: COIN_FLIPS,
    });

    const { datetime: targetDateTime, delay: targetDelay } = seedTime;

    const mappedResults = searchResults.map((result) => {
      const secondOffset = result.datetime.second - targetDateTime.second;
      return {
        ...result,
        id: uniqueId(),
        isTarget: result.seed === seedTime.seed,
        delayOffset: result.delay - targetDelay,
        secondOffset,
        second: result.datetime.second,
        flipDelay:
          secondOffset % 2 === 0 && targetDelay % 2 !== result.delay % 2,
      };
    });
    const sortedResults = sortBy(mappedResults, [
      (res) => Math.abs(res.delayOffset),
      (res) => Math.abs(res.secondOffset),
    ]);

    setAllResults(sortedResults);
    setState({ coinFlipFilter: "" });
  };

  return (
    <RngToolForm<FormState, ResultRow>
      fields={fields}
      columns={columns}
      results={filteredResults}
      initialValues={initialValues}
      validationSchema={Validator}
      disableGenerate={state.target == null}
      filters={
        <CoinFlipFilterButtons
          maxCoinFlips={COIN_FLIPS}
          hasResults={allResults.length > 0}
          coinFlipFilter={state.coinFlipFilter}
          onCoinFlipFilterChange={(coinFlipFilter) => {
            setState({ coinFlipFilter });
          }}
          headsTrackerId="seed_calibrator_add_heads"
          tailsTrackerId="seed_calibrator_add_tails"
        />
      }
      onSubmit={onSubmit}
      rowKey="id"
      submitTrackerId="gen4_generate_calibration_seeds"
    />
  );
};
