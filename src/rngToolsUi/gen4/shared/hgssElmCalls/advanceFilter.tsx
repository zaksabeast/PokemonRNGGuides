import React from "react";
import { Alert, Flex, type ResultColumn, RngToolForm } from "~/components";
import { useAtom } from "jotai";
import { gen4StateAtom } from "../state";
import { rngTools, type ElmCall, type ElmCallAdvanceState } from "~/rngTools";
import { type Translations } from "~/translations";
import { findElmCallSequenceIndices } from "./utils";
import { ElmCallFilterButtons } from "./elmCallFilterButtons";
import {
  advanceFilterValidator,
  decorateAdvanceResultsWithTarget,
  getAdvanceFilterInitialValues,
  initialAdvanceFilterPageSettings,
  LooseAdvanceFilterFormState,
  markMatchedAdvanceResults,
  renderAdvanceFilterStatus,
  shouldDisableAdvanceFilterGenerate,
  type AdvanceFilterPageSettings,
  type AdvanceFilterResult,
} from "../advanceFilter/utils";
import { AdvanceFilterFields } from "../advanceFilter/fields";

type Result = AdvanceFilterResult<ElmCallAdvanceState>;

const markResultsWithElmCalls = ({
  results,
  filter,
  pageSize,
}: {
  results: Result[];
  filter: string;
  pageSize: number;
}) => {
  const indices = findElmCallSequenceIndices(
    results.map((result) => result.elm_call),
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
    title: t["Elm Call"],
    dataIndex: "elm_call",
    disableVerticalPadding: true,
    render: (elmCall: ElmCall) => (
      <Flex align="center" gap={8}>
        {elmCall}
      </Flex>
    ),
  },
];

export const HgssCallAdvanceFilter = () => {
  const mode = "standalone" as const;
  const [state, setState] = useAtom(gen4StateAtom);
  const [results, setResults] = React.useState<Result[]>([]);
  const [pageSettings, setPageSettings] =
    React.useState<AdvanceFilterPageSettings>(initialAdvanceFilterPageSettings);

  const hasResults = results.length > 0;
  const resolvedSeed = state.target.seedTime?.seed ?? null;
  const resolvedTargetAdvance = state.target.mtAdvance;

  React.useEffect(() => {
    setResults([]);
  }, [resolvedSeed, resolvedTargetAdvance, setState]);

  const onSubmit = async (opts: LooseAdvanceFilterFormState) => {
    if (opts.targetAdvance == null || opts.seed == null) {
      return;
    }

    const elmCalls = await rngTools.get_elm_calls({
      seed: opts.seed,
      initial_advances: opts.minAdvance,
      max_advances: Math.max(opts.maxAdvance - opts.minAdvance, 0),
    });

    setResults(decorateAdvanceResultsWithTarget(elmCalls, opts.targetAdvance));
  };

  const { hasMatch, markedResults, autoCurrentPage } = markResultsWithElmCalls({
    results,
    filter: state.gameState.elmCalls,
    pageSize: pageSettings.pageSize,
  });

  React.useEffect(() => {
    setPageSettings((prev) => ({
      ...prev,
      currentPage: autoCurrentPage,
    }));
  }, [state.gameState.elmCalls, autoCurrentPage]);

  const initialValues = getAdvanceFilterInitialValues(
    resolvedSeed,
    resolvedTargetAdvance,
  );

  return (
    <RngToolForm<LooseAdvanceFilterFormState, Result>
      additionalButtons={
        hasResults &&
        state.gameState.elmCalls.length > 0 &&
        hasMatch === false ? (
          <Alert
            showIcon
            type="error"
            title="No matches found"
            description="An Elm Call may be incorrect, or the advance range may be too small. Try increasing the advance range."
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
      submitTrackerId="elm_call_advance_filter_generate"
      filters={
        <ElmCallFilterButtons
          hasResults={hasResults}
          maxElmCalls={results.length}
          elmCallFilter={state.gameState.elmCalls}
          onElmCallFilterChange={(elmCalls) => {
            setState({ gameState: { elmCalls } });
          }}
          eTrackerId="elm_call_advance_filter_e"
          kTrackerId="elm_call_advance_filter_k"
          pTrackerId="elm_call_advance_filter_p"
        />
      }
    >
      <AdvanceFilterFields mode={mode} targetAdvance={resolvedTargetAdvance} />
    </RngToolForm>
  );
};
