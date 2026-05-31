import React from "react";
import {
  Alert,
  Flex,
  PixelImage,
  type ResultColumn,
  RngToolForm,
} from "~/components";
import { rngTools, type CoinFlip, type CoinFlipAdvanceState } from "~/rngTools";
import { type Translations } from "~/translations";
import { findCoinFlipSequenceIndices, sanitizeFlips } from "./coinFlipUtils";
import { CoinFlipFilterButtons } from "./dpptCoinFlipButtons";
import {
  advanceFilterValidator,
  decorateAdvanceResultsWithTarget,
  getAdvanceFilterInitialValues,
  initialAdvanceFilterPageSettings,
  LooseAdvanceFilterFormState,
  markMatchedAdvanceResults,
  renderAdvanceFilterStatus,
  shouldDisableAdvanceFilterGenerate,
  type AdvanceFilterBaseProps,
  type AdvanceFilterPageSettings,
  type AdvanceFilterResult,
} from "./advanceFilter/utils";
import { AdvanceFilterFields } from "./advanceFilter/fields";

type Result = AdvanceFilterResult<CoinFlipAdvanceState>;

const getCoinFlipImageName = (coinFlip: CoinFlip) => {
  return coinFlip === "Heads" ? "DpptHeads" : "DpptTails";
};

const markResultsWithCoinFlips = ({
  results,
  filter,
  pageSize,
}: {
  results: Result[];
  filter: string;
  pageSize: number;
}) => {
  const indices = findCoinFlipSequenceIndices(
    results.map((result) => result.coin_flip),
    filter,
  );

  return markMatchedAdvanceResults({
    results,
    indices,
    pageSize,
    mark: "Seen",
  });
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

export const DpptCoinFlipAdvanceFilterBase = ({
  seed,
  targetAdvance,
  submitTrackerId,
  mode,
}: AdvanceFilterBaseProps) => {
  const resolvedSeed = seed ?? null;
  const resolvedTargetAdvance = targetAdvance ?? null;
  const [filter, setFilter] = React.useState("");
  const [results, setResults] = React.useState<Result[]>([]);
  const [pageSettings, setPageSettings] =
    React.useState<AdvanceFilterPageSettings>(initialAdvanceFilterPageSettings);

  React.useEffect(() => {
    setFilter("");
    setResults([]);
  }, [seed, targetAdvance]);

  const onSubmit = async (opts: LooseAdvanceFilterFormState) => {
    if (opts.targetAdvance == null || opts.seed == null) {
      return;
    }

    const coinFlips = await rngTools.get_coin_flips({
      seed: opts.seed,
      initial_advances: opts.minAdvance,
      max_advances: Math.max(opts.maxAdvance - opts.minAdvance, 0),
    });

    setResults(decorateAdvanceResultsWithTarget(coinFlips, opts.targetAdvance));
  };

  const { hasMatch, markedResults, autoCurrentPage } = markResultsWithCoinFlips(
    {
      results,
      filter,
      pageSize: pageSettings.pageSize,
    },
  );

  React.useEffect(() => {
    setPageSettings((prev) => ({
      ...prev,
      currentPage: autoCurrentPage,
    }));
  }, [filter, autoCurrentPage]);

  const initialValues = getAdvanceFilterInitialValues(
    resolvedSeed,
    resolvedTargetAdvance,
  );

  return (
    <RngToolForm<LooseAdvanceFilterFormState, Result>
      additionalButtons={
        filter.length > 0 && hasMatch === false ? (
          <Alert
            showIcon
            type="error"
            title="No matches found"
            description="A coin flip may be incorrect, or the advance range may be too small. Try increasing the advance range."
          />
        ) : null
      }
      pagination={{
        current: pageSettings.currentPage,
        pageSize: pageSettings.pageSize,
        onChange: (currentPage, pageSize) => {
          setPageSettings((prev) => ({ ...prev, currentPage, pageSize }));
        },
      }}
      getColumns={getColumns}
      results={markedResults}
      initialValues={initialValues}
      values={initialValues}
      validationSchema={advanceFilterValidator}
      onSubmit={onSubmit}
      rowKey="advance"
      disableGenerate={shouldDisableAdvanceFilterGenerate(
        mode,
        resolvedSeed,
        resolvedTargetAdvance,
      )}
      submitTrackerId={submitTrackerId}
      filters={
        <CoinFlipFilterButtons
          maxCoinFlips={Math.max(results.length, 1)}
          coinFlipFilter={filter}
          onCoinFlipFilterChange={(value) => setFilter(sanitizeFlips(value))}
          headsTrackerId="coin_flip_advance_filter_heads"
          tailsTrackerId="coin_flip_advance_filter_tails"
        />
      }
    >
      <AdvanceFilterFields mode={mode} />
    </RngToolForm>
  );
};
