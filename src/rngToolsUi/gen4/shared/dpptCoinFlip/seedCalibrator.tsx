import React from "react";
import { gen4TargetAtom } from "../state/target";
import { gen4MarkersAtom, setGen4MarkersAtom } from "../state/markers";
import { useAtomValue, useSetAtom } from "jotai";
import { rngTools } from "~/rngTools";
import { ToolForm, type ToolFormSubmit } from "~/components/form";
import { matchesCoinFlipFilter, shrinkCoinFlips, SmallCoinFlip } from "./utils";
import { CoinFlipFilterButtons } from "./coinFlipButtons";
import {
  type CalibrationRow,
  type SeedCalibratorFormState,
  getCalibrationColumns,
  seedCalibratorInitialValues,
  seedCalibratorValidator,
  toCalibrationRows,
} from "../seedTimeCalibration/utils";
import { SeedCalibratorFields } from "../seedTimeCalibration/fields";

const COIN_FLIPS = 20;

type ResultRow = CalibrationRow & {
  coinFlips: SmallCoinFlip[];
};

export const DpptCoinFlipSeedCalibrator = () => {
  const target = useAtomValue(gen4TargetAtom);
  const markers = useAtomValue(gen4MarkersAtom);
  const setMarkers = useSetAtom(setGen4MarkersAtom);
  const [allResults, setAllResults] = React.useState<ResultRow[]>([]);

  const filteredResults = allResults.filter((result) =>
    matchesCoinFlipFilter(result.coinFlips, markers.coinFlips),
  );

  const onSubmit: ToolFormSubmit<SeedCalibratorFormState> = async (
    formState,
  ) => {
    if (target == null) {
      return;
    }

    const { seedTime } = target;

    const searchResults = await rngTools.get_relative_dppt_seedtimes({
      seedtime: seedTime,
      delay_offset: formState.delayOffset,
      second_offset: formState.secondOffset,
      coin_flip_count: COIN_FLIPS,
    });

    setAllResults(
      toCalibrationRows(searchResults, seedTime, (result) => ({
        coinFlips: shrinkCoinFlips(result.coin_flips),
      })),
    );
    setMarkers({ coinFlips: "" });
  };

  return (
    <ToolForm<SeedCalibratorFormState, ResultRow>
      getColumns={(t) => [
        ...getCalibrationColumns(t),
        {
          title: t["Coin Flips"],
          dataIndex: "coinFlips",
          render: (coinFlips: SmallCoinFlip[]) => coinFlips.join(", "),
        },
      ]}
      results={filteredResults}
      initialValues={seedCalibratorInitialValues}
      validationSchema={seedCalibratorValidator}
      disableGenerate={target == null}
      filters={
        <CoinFlipFilterButtons
          maxCoinFlips={COIN_FLIPS}
          hasResults={allResults.length > 0}
          coinFlipFilter={markers.coinFlips}
          onCoinFlipFilterChange={(coinFlips) => {
            setMarkers({ coinFlips });
          }}
          headsTrackerId="seed_calibrator_add_heads"
          tailsTrackerId="seed_calibrator_add_tails"
        />
      }
      onSubmit={onSubmit}
      rowKey="id"
      submitTrackerId="gen4_generate_calibration_seeds"
    >
      <SeedCalibratorFields />
    </ToolForm>
  );
};
