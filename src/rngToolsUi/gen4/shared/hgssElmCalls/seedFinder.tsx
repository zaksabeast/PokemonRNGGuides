import React from "react";
import { type ElmCall } from "~/rngTools";
import { ToolForm, type ToolFormSubmit } from "~/components/form";
import { ElmCallFilterButtons } from "./elmCallFilterButtons";
import { gen4SetupAtom, getGen4Roamers } from "../state/setup";
import { gen4MarkersAtom, setGen4MarkersAtom } from "../state/markers";
import { useAtomValue, useSetAtom } from "jotai";
import { matchesElmCallFilter } from "./utils";
import { getSeedTime4WithMarkers } from "../getFindableSeeds";
import {
  type SeedTimeSearchFormState,
  type SeedTimeSearchRow,
  getSeedTimeSearchColumns,
  seedTimeSearchInitialValues,
  seedTimeSearchValidator,
} from "../seedTimeSearch/utils";
import { SeedTimeSearchFields } from "../seedTimeSearch/fields";

type ResultRow = SeedTimeSearchRow & {
  elmCalls: ElmCall[];
};

export const HgssElmCallSeedFinder = () => {
  const [allResults, setAllResults] = React.useState<ResultRow[]>([]);
  const markers = useAtomValue(gen4MarkersAtom);
  const setMarkers = useSetAtom(setGen4MarkersAtom);
  const setup = useAtomValue(gen4SetupAtom);
  const [filterItemCount, setFilterItemCount] = React.useState(
    seedTimeSearchInitialValues.filterItemCount,
  );

  const filteredResults = allResults.filter((result) =>
    matchesElmCallFilter(result.elmCalls, markers.elmCalls),
  );

  const onSubmit: ToolFormSubmit<SeedTimeSearchFormState> = async (opts) => {
    const results = await getSeedTime4WithMarkers({
      ...opts,
      includeCoinFlips: false,
      includeElmCalls: true,
      roamers: getGen4Roamers(setup),
    });
    setFilterItemCount(opts.filterItemCount);
    setAllResults(results);
  };

  return (
    <ToolForm<SeedTimeSearchFormState, ResultRow>
      getColumns={(t) => [
        ...getSeedTimeSearchColumns(t, { trackerId: "elm_call_select_seed" }),
        {
          title: t["Elm Call Count"],
          dataIndex: "elmCalls",
          render: (elmCalls: ElmCall[]) => elmCalls.join(", "),
        },
      ]}
      results={filteredResults}
      initialValues={seedTimeSearchInitialValues}
      validationSchema={seedTimeSearchValidator}
      filters={
        <ElmCallFilterButtons
          hasResults={allResults.length > 0}
          maxElmCalls={filterItemCount}
          elmCallFilter={markers.elmCalls}
          onElmCallFilterChange={(elmCalls) => setMarkers({ elmCalls })}
          eTrackerId="hgss_elm_call_seed_add_e"
          kTrackerId="hgss_elm_call_seed_add_k"
          pTrackerId="hgss_elm_call_seed_add_p"
        />
      }
      onSubmit={onSubmit}
      rowKey="id"
      submitTrackerId="hit_elm_call_seed_search"
    >
      <SeedTimeSearchFields filterItemCountLabel="Elm Call Count" />
    </ToolForm>
  );
};
