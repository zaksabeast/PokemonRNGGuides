import React from "react";
import { useStatic4State, static4TimerAtom } from "./state";
import { rngTools, DpptSeedTime4, type CoinFlip } from "~/rngTools";
import {
  RngToolForm,
  FormikNumberInput,
  type RngToolSubmit,
  type ResultColumn,
  Icon,
  CalibrateTimerButton,
} from "~/components";
import { uniqueId } from "lodash-es";
import { z } from "zod";
import { joinCoinFlips, shrinkCoinFlips } from "./coinFlipUtils";
import { CoinFlipFilter } from "./coinFlipFilter";

type ResultRow = DpptSeedTime4 & {
  id: string;
  isTarget: boolean;
  flipDelay: boolean;
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
    render: (_, target) => (
      <CalibrateTimerButton
        type="gen4"
        calibration={{ hit_delay: target.delay }}
        timer={static4TimerAtom}
        trackerId="calibrate_gen4_static_hitseed"
        previousStepOnClick
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
    title: "Coin Flips",
    dataIndex: "coin_flips",
    key: "coin_flips",
    render: (coinFlips: CoinFlip[]) =>
      joinCoinFlips(shrinkCoinFlips(coinFlips)),
  },
];

const fields = [
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

export const Static4HitSeed = () => {
  const [state, setState] = useStatic4State();
  const [allResults, setAllResults] = React.useState<ResultRow[]>([]);

  const coinFlipFilter = state.coinFlipFilter;

  const filteredResults = React.useMemo(() => {
    return allResults.filter((result) => {
      if (coinFlipFilter.length === 0) {
        return true;
      }

      const coinFlipString = joinCoinFlips(shrinkCoinFlips(result.coin_flips));
      return coinFlipString.includes(coinFlipFilter);
    });
  }, [allResults, coinFlipFilter]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (formState) => {
      if (state.target == null) {
        return;
      }

      const seedTime = state.target.seed_time;
      const searchResults = await rngTools.calc_dppt_seedtimes({
        seedtime: seedTime,
        delay_offset: formState.delayOffset,
        second_offset: formState.secondOffset,
      });

      const { datetime: targetDateTime, delay: targetDelay } =
        state.target.seed_time;

      const mappedResults = searchResults.map((result) => {
        const secondOffset = result.datetime.second - targetDateTime.second;
        return {
          ...result,
          id: uniqueId(),
          isTarget: result.seed === seedTime.seed,
          flipDelay:
            secondOffset % 2 === 0 && targetDelay % 2 !== result.delay % 2,
        };
      });

      setAllResults(mappedResults);
      setState((prev) => ({ ...prev, coinFlipFilter: "" }));
    },
    [state, setState],
  );

  return (
    <RngToolForm<FormState, ResultRow>
      fields={fields}
      columns={columns}
      results={filteredResults}
      initialValues={initialValues}
      validationSchema={Validator}
      disableGenerate={state.target == null}
      filters={<CoinFlipFilter />}
      onSubmit={onSubmit}
      rowKey="id"
      submitTrackerId="hit_seed_search"
    />
  );
};
