import React from "react";
import { gen4SetupAtom, getGen4Roamers } from "../state/setup";
import { gen4TargetAtom } from "../state/target";
import { gen4MarkersAtom, setGen4MarkersAtom } from "../state/markers";
import { useAtomValue, useSetAtom } from "jotai";
import {
  rngTools,
  type ElmCall,
  type HgssRoamerResult,
  type JohtoRoamerRoute,
  type KantoRoamerRoute,
} from "~/rngTools";
import type { Translations } from "~/translations";
import { ToolForm, type ToolFormSubmit } from "~/components/form";
import { matchesElmCallFilter } from "./utils";
import { ElmCallFilterButtons } from "./elmCallFilterButtons";
import {
  type CalibrationRow,
  type SeedCalibratorFormState,
  getCalibrationColumns,
  seedCalibratorInitialValues,
  seedCalibratorValidator,
  toCalibrationRows,
} from "../seedTimeCalibration/utils";
import { SeedCalibratorFields } from "../seedTimeCalibration/fields";

const ELM_CALLS = 20;

type ResultRow = CalibrationRow &
  Pick<HgssRoamerResult, "raikou" | "entei" | "lati"> & {
    elmCalls: ElmCall[];
  };

const getRouteLabel = (
  t: Translations,
  route: JohtoRoamerRoute | KantoRoamerRoute | undefined,
) => {
  return route == null ? null : t[route];
};

export const HgssElmCallSeedCalibrator = () => {
  const target = useAtomValue(gen4TargetAtom);
  const markers = useAtomValue(gen4MarkersAtom);
  const setMarkers = useSetAtom(setGen4MarkersAtom);
  const setup = useAtomValue(gen4SetupAtom);
  const roamers = getGen4Roamers(setup);
  const [allResults, setAllResults] = React.useState<ResultRow[]>([]);

  const filteredResults = allResults.filter((result) =>
    matchesElmCallFilter(result.elmCalls, markers.elmCalls),
  );

  const onSubmit: ToolFormSubmit<SeedCalibratorFormState> = async (
    formState,
  ) => {
    if (target == null) {
      return;
    }

    const { seedTime } = target;

    const searchResults = await rngTools.get_relative_hgss_seedtimes({
      seedtime: seedTime,
      delay_offset: formState.delayOffset,
      second_offset: formState.secondOffset,
      elm_call_count: ELM_CALLS,
      roamers,
    });

    setAllResults(
      toCalibrationRows(searchResults, seedTime, (result) => ({
        elmCalls: result.elm_calls,
        raikou: result.roamers.raikou,
        entei: result.roamers.entei,
        lati: result.roamers.lati,
      })),
    );
    setMarkers({ elmCalls: "" });
  };

  return (
    <ToolForm<SeedCalibratorFormState, ResultRow>
      getColumns={(t) => [
        ...getCalibrationColumns(t),
        {
          title: t.Calls,
          dataIndex: "elmCalls",
          render: (elmCalls: ElmCall[]) => elmCalls.join(", "),
        },
        {
          title: t["Raikou"],
          dataIndex: "raikou",
          show: roamers.raikou != null,
          render: (raikou) => getRouteLabel(t, raikou),
        },
        {
          title: t["Entei"],
          dataIndex: "entei",
          show: roamers.entei != null,
          render: (entei) => getRouteLabel(t, entei),
        },
        {
          title: t["Latias/Latios"],
          dataIndex: "lati",
          show: roamers.lati != null,
          render: (lati) => getRouteLabel(t, lati),
        },
      ]}
      results={filteredResults}
      initialValues={seedCalibratorInitialValues}
      validationSchema={seedCalibratorValidator}
      disableGenerate={target == null}
      filters={
        <ElmCallFilterButtons
          maxElmCalls={ELM_CALLS}
          hasResults={allResults.length > 0}
          elmCallFilter={markers.elmCalls}
          onElmCallFilterChange={(elmCalls) => {
            setMarkers({ elmCalls });
          }}
          eTrackerId="hgss_elm_call_seed_calibrator_add_e"
          kTrackerId="hgss_elm_call_seed_calibrator_add_k"
          pTrackerId="hgss_elm_call_seed_calibrator_add_p"
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
