import { uniqueId, sortBy } from "lodash-es";
import { z } from "zod";
import { type SeedTime4 } from "~/rngTools";
import { type ResultColumn, Icon } from "~/components";
import { Translations } from "~/translations";
import { formatHex } from "~/utils/formatHex";
import { getSecondOffset } from "~/utils/time";
import { CalibrateTimerButton } from "../calibrateTimerButton";

export type CalibrationRow = {
  id: string;
  seed: number;
  delay: number;
  second: number;
  isTarget: boolean;
  flipDelay: boolean;
  delayOffset: number;
  secondOffset: number;
};

export const seedCalibratorValidator = z.object({
  delayOffset: z.number().int().min(0),
  secondOffset: z.number().int().min(0),
});

export type SeedCalibratorFormState = z.infer<typeof seedCalibratorValidator>;

export const seedCalibratorInitialValues: SeedCalibratorFormState = {
  delayOffset: 1000,
  secondOffset: 5,
};

export const toCalibrationRows = <Result extends SeedTime4, Row>(
  results: Result[],
  target: SeedTime4,
  mapResult: (result: Result) => Row,
): (Row & CalibrationRow)[] => {
  const rows = results.map((result) => ({
    ...mapResult(result),
    id: uniqueId(),
    seed: result.seed,
    delay: result.delay,
    second: result.datetime.second,
    isTarget: result.seed === target.seed,
    flipDelay: target.delay % 2 !== result.delay % 2,
    delayOffset: result.delay - target.delay,
    secondOffset: getSecondOffset(result.datetime, target.datetime),
  }));

  return sortBy(rows, [
    (row) => Math.abs(row.delayOffset),
    (row) => Math.abs(row.secondOffset),
  ]);
};

export const getCalibrationColumns = (
  t: Translations,
): ResultColumn<CalibrationRow>[] => [
  {
    title: t["Calibrate"],
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
    title: t["Is Target"],
    dataIndex: "isTarget",
    render: (isTarget: boolean) =>
      isTarget ? <Icon name="CheckCircle" color="Success" size={30} /> : null,
  },
  {
    title: t["Flip Delay"],
    dataIndex: "flipDelay",
    render: (flipDelay: boolean) =>
      flipDelay ? <Icon name="CheckCircle" color="Warning" size={30} /> : null,
  },
  { title: t["Delay Offset"], dataIndex: "delayOffset" },
  { title: t["Second Offset"], dataIndex: "secondOffset" },
  {
    title: t["Seed"],
    dataIndex: "seed",
    render: (seed: number) => formatHex(seed),
  },
  { title: t["Delay"], dataIndex: "delay" },
  { title: t["Second"], dataIndex: "second" },
];
