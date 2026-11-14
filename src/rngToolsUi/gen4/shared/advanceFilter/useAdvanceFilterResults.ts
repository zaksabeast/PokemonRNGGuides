import React from "react";
import { type IndexRange } from "~/utils/findIndexBy";
import {
  advanceFilterValidator,
  decorateAdvanceResultsWithTarget,
  getAdvanceFilterInitialValues,
  initialAdvanceFilterPageSettings,
  markMatchedAdvanceResults,
  shouldDisableAdvanceFilterGenerate,
  type AdvanceFilterMode,
  type AdvanceFilterPageSettings,
  type AdvanceFilterResult,
  type FilterMark,
  type LooseAdvanceFilterFormState,
} from "./utils";

type AdvanceRangeOpts = {
  seed: number;
  initial_advances: number;
  max_advances: number;
};

type Props<T extends { advance: number }> = {
  mode: AdvanceFilterMode;
  seed?: number | null;
  targetAdvance?: number | null;
  minAdvance?: number;
  generate: (opts: AdvanceRangeOpts) => Promise<T[]>;
  filter: string | readonly unknown[];
  findMatches: (results: AdvanceFilterResult<T>[]) => IndexRange[];
  mark: FilterMark;
};

export const useAdvanceFilterResults = <T extends { advance: number }>({
  mode,
  seed: maybeSeed,
  targetAdvance: maybeTargetAdvance,
  minAdvance = 0,
  generate,
  filter,
  findMatches,
  mark,
}: Props<T>) => {
  const seed = maybeSeed ?? null;
  const targetAdvance = maybeTargetAdvance ?? null;
  const [results, setResults] = React.useState<AdvanceFilterResult<T>[]>([]);
  const [pageSettings, setPageSettings] =
    React.useState<AdvanceFilterPageSettings>(initialAdvanceFilterPageSettings);

  React.useEffect(() => {
    setResults([]);
  }, [seed, targetAdvance]);

  const onSubmit = async (opts: LooseAdvanceFilterFormState) => {
    if (opts.targetAdvance == null || opts.seed == null) {
      return;
    }

    const generated = await generate({
      seed: opts.seed,
      initial_advances: opts.minAdvance,
      max_advances: Math.max(opts.maxAdvance - opts.minAdvance, 0),
    });

    setResults(decorateAdvanceResultsWithTarget(generated, opts.targetAdvance));
  };

  const { hasMatch, markedResults, autoCurrentPage } =
    markMatchedAdvanceResults({
      results,
      indices: findMatches(results),
      pageSize: pageSettings.pageSize,
      mark,
    });

  React.useEffect(
    () => {
      setPageSettings((prev) => ({
        ...prev,
        currentPage: autoCurrentPage,
      }));
    },
    // Trigger this on any filter change
    [filter, autoCurrentPage],
  );

  const initialValues = getAdvanceFilterInitialValues(
    seed,
    targetAdvance,
    minAdvance,
  );
  const hasResults = results.length > 0;

  return {
    hasResults,
    resultCount: results.length,
    hasNoMatches: hasResults && filter.length > 0 && !hasMatch,
    toolFormProps: {
      pagination: {
        current: pageSettings.currentPage,
        pageSize: pageSettings.pageSize,
        onChange: (currentPage: number, pageSize: number) => {
          setPageSettings((prev) => ({ ...prev, currentPage, pageSize }));
        },
      },
      results: markedResults,
      initialValues,
      values: initialValues,
      validationSchema: advanceFilterValidator,
      onSubmit,
      rowKey: "advance" as const,
      disableGenerate: shouldDisableAdvanceFilterGenerate(
        mode,
        seed,
        targetAdvance,
      ),
    },
  };
};
