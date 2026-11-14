import React from "react";
import { ToolForm, type ToolFormSubmit } from "~/components/form";
import { matchesCoinFlipFilter, SmallCoinFlip } from "./utils";
import { CoinFlipFilterButtons } from "./coinFlipButtons";
import { gen4MarkersAtom, setGen4MarkersAtom } from "../state/markers";
import { useAtomValue, useSetAtom } from "jotai";
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
  coinFlips: SmallCoinFlip[];
};

export const DpptCoinFlipSeedFinder = () => {
  const [allResults, setAllResults] = React.useState<ResultRow[]>([]);
  const markers = useAtomValue(gen4MarkersAtom);
  const setMarkers = useSetAtom(setGen4MarkersAtom);
  const [filterItemCount, setFilterItemCount] = React.useState(
    seedTimeSearchInitialValues.filterItemCount,
  );

  const filteredResults = allResults.filter((result) =>
    matchesCoinFlipFilter(result.coinFlips, markers.coinFlips),
  );

  const onSubmit: ToolFormSubmit<SeedTimeSearchFormState> = async (opts) => {
    const results = await getSeedTime4WithMarkers({
      ...opts,
      includeCoinFlips: true,
      includeElmCalls: false,
    });
    setFilterItemCount(opts.filterItemCount);
    setAllResults(results);
  };

  return (
    <ToolForm<SeedTimeSearchFormState, ResultRow>
      getColumns={(t) => [
        ...getSeedTimeSearchColumns(t, {
          trackerId: "coin_flip_select_seed",
          coinFlipCount: markers.coinFlips.length,
        }),
        {
          title: t["Coin Flips"],
          dataIndex: "coinFlips",
          render: (coinFlips: SmallCoinFlip[]) => coinFlips.join(", "),
        },
      ]}
      results={filteredResults}
      initialValues={seedTimeSearchInitialValues}
      validationSchema={seedTimeSearchValidator}
      filters={
        <CoinFlipFilterButtons
          hasResults={allResults.length > 0}
          maxCoinFlips={filterItemCount}
          coinFlipFilter={markers.coinFlips}
          onCoinFlipFilterChange={(coinFlips) => setMarkers({ coinFlips })}
          headsTrackerId="hit_seed_add_heads"
          tailsTrackerId="hit_seed_add_tails"
        />
      }
      onSubmit={onSubmit}
      rowKey="id"
      submitTrackerId="coin_flip_seed_search"
    >
      <SeedTimeSearchFields filterItemCountLabel="Coin Flip Count" />
    </ToolForm>
  );
};
