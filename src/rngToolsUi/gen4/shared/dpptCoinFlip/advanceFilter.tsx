import { Alert, Flex, PixelImage, type ResultColumn } from "~/components";
import { ToolForm } from "~/components/form";
import { useAtomValue, useSetAtom } from "jotai";
import { gen4TargetAtom } from "../state/target";
import { gen4MarkersAtom, setGen4MarkersAtom } from "../state/markers";
import { rngTools, type CoinFlip, type CoinFlipAdvanceState } from "~/rngTools";
import { type Translations } from "~/translations";
import { findCoinFlipSequenceIndices } from "./utils";
import { CoinFlipFilterButtons } from "./coinFlipButtons";
import {
  LooseAdvanceFilterFormState,
  renderAdvanceFilterStatus,
  type AdvanceFilterResult,
} from "../advanceFilter/utils";
import { AdvanceFilterFields } from "../advanceFilter/fields";
import { useAdvanceFilterResults } from "../advanceFilter/useAdvanceFilterResults";

type Result = AdvanceFilterResult<CoinFlipAdvanceState>;

const getCoinFlipImageName = (coinFlip: CoinFlip) => {
  return coinFlip === "Heads" ? "DpptHeads" : "DpptTails";
};

const getColumns = (t: Translations): ResultColumn<Result>[] => [
  {
    title: t["Target/Seen"],
    dataIndex: "status",
    render: renderAdvanceFilterStatus,
  },
  {
    title: t["Advance"],
    dataIndex: "advance",
  },
  {
    title: t["Coin Flips"],
    dataIndex: "coin_flip",
    disableVerticalPadding: true,
    render: (coinFlip: CoinFlip) => (
      <Flex align="center" gap={8}>
        <PixelImage name={getCoinFlipImageName(coinFlip)} />
      </Flex>
    ),
  },
];

export const DpptCoinFlipAdvanceFilter = () => {
  const mode = "embedded" as const;
  const target = useAtomValue(gen4TargetAtom);
  const markers = useAtomValue(gen4MarkersAtom);
  const setMarkers = useSetAtom(setGen4MarkersAtom);
  const targetAdvance = target?.mtAdvance ?? null;

  const { hasResults, resultCount, hasNoMatches, toolFormProps } =
    useAdvanceFilterResults({
      mode,
      seed: target?.seedTime.seed ?? null,
      targetAdvance,
      generate: (opts) => rngTools.get_coin_flips(opts),
      filter: markers.coinFlips,
      findMatches: (results) =>
        findCoinFlipSequenceIndices(
          results.map((result) => result.coin_flip),
          markers.coinFlips,
        ),
      mark: "Seen",
    });

  return (
    <ToolForm<LooseAdvanceFilterFormState, Result>
      {...toolFormProps}
      getColumns={getColumns}
      submitTrackerId="coin_flip_advance_filter_generate"
      filters={
        <>
          <CoinFlipFilterButtons
            hasResults={hasResults}
            maxCoinFlips={resultCount}
            coinFlipFilter={markers.coinFlips}
            onCoinFlipFilterChange={(coinFlips) => {
              setMarkers({ coinFlips });
            }}
            headsTrackerId="coin_flip_advance_filter_heads"
            tailsTrackerId="coin_flip_advance_filter_tails"
          />
          {hasNoMatches && (
            <Alert
              showIcon
              type="error"
              title="No matches found"
              description="A coin flip may be incorrect, or the advance range may be too small. Try increasing the advance range."
            />
          )}
        </>
      }
    >
      <AdvanceFilterFields mode={mode} targetAdvance={targetAdvance} />
    </ToolForm>
  );
};
