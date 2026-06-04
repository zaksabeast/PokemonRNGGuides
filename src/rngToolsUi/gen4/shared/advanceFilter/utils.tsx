import * as tst from "ts-toolbelt";
import { uniqueId } from "lodash-es";
import { Icon } from "~/components";
import { match } from "ts-pattern";
import { z } from "zod";
import { type IndexRange } from "~/utils/findIndexBy";

type FilterMark = "Heard" | "Seen";
export type AdvanceFilterStatus = "Target" | FilterMark | null;

export type AdvanceFilterPageSettings = {
  currentPage: number;
  pageSize: number;
};

export type AdvanceFilterBaseProps =
  | {
      seed: number | null;
      targetAdvance: number | null;
      submitTrackerId: string;
      mode: "embedded";
    }
  | {
      seed?: null;
      targetAdvance?: null;
      submitTrackerId: string;
      mode: "standalone";
    };

export type AdvanceFilterMode = AdvanceFilterBaseProps["mode"];

export type AdvanceFilterResult<T extends { advance: number }> = T & {
  id: string;
  status: AdvanceFilterStatus;
};

export const advanceFilterValidator = z.object({
  seed: z.number().int().min(0).max(0xffffffff),
  minAdvance: z.number().int().min(0),
  maxAdvance: z.number().int().min(0),
  targetAdvance: z.number().int().min(0).nullable(),
});

export type AdvanceFilterFormState = z.infer<typeof advanceFilterValidator>;
export type LooseAdvanceFilterFormState = tst.O.Nullable<
  AdvanceFilterFormState,
  "seed"
>;

export const initialAdvanceFilterPageSettings: AdvanceFilterPageSettings = {
  currentPage: 1,
  pageSize: 10,
};

export const renderAdvanceFilterStatus = (status: AdvanceFilterStatus) => {
  return match(status)
    .with("Target", () => <Icon name="CheckCircle" color="Success" size={30} />)
    .with("Heard", () => <Icon name="Ear" color="Info" size={18} />)
    .with("Seen", () => <Icon name="Eye" color="Info" size={18} />)
    .with(null, () => null)
    .exhaustive();
};

const isIndexInRange = (index: number, ranges: IndexRange[]): boolean => {
  return ranges.some(({ start, end }) => index >= start && index <= end);
};

export const markMatchedAdvanceResults = <
  T extends { status: AdvanceFilterStatus },
>({
  results,
  indices,
  pageSize,
  mark,
}: {
  results: T[];
  indices: IndexRange[];
  pageSize: number;
  mark: FilterMark;
}): {
  hasMatch: boolean;
  markedResults: T[];
  autoCurrentPage: number;
} => {
  const hasMatch = indices.length > 0;
  const markedResults = results.map(
    (result, index): T => ({
      ...result,
      status:
        result.status === null && isIndexInRange(index, indices)
          ? mark
          : result.status,
    }),
  );
  const endIndex = hasMatch ? indices[0].end : 0;

  return {
    hasMatch,
    markedResults,
    autoCurrentPage: Math.max(1, Math.ceil((endIndex + 1) / pageSize)),
  };
};

export const decorateAdvanceResultsWithTarget = <T extends { advance: number }>(
  results: T[],
  targetAdvance: number,
): AdvanceFilterResult<T>[] => {
  return results.map((result) => ({
    ...result,
    id: uniqueId(),
    status: result.advance === targetAdvance ? "Target" : null,
  }));
};

export const getAdvanceFilterInitialValues = (
  seed: number | null,
  targetAdvance: number | null,
): LooseAdvanceFilterFormState => ({
  seed,
  minAdvance: 0,
  maxAdvance: (targetAdvance ?? 0) + 10,
  targetAdvance: targetAdvance ?? 0,
});

export const shouldDisableAdvanceFilterGenerate = (
  mode: AdvanceFilterBaseProps["mode"],
  seed: number | null,
  targetAdvance: number | null,
) => {
  return mode === "embedded" && (seed == null || targetAdvance == null);
};

export const getErrorMessage = ({
  filter,
  hasResults,
  maxResults,
  unitName,
}: {
  filter: string;
  hasResults: boolean;
  maxResults: number;
  unitName: "elm calls" | "coin flips";
}) => {
  if (filter.length === 0) {
    return undefined;
  }

  if (!hasResults) {
    return 'Click "Generate" to generate coin flips';
  }

  if (filter.length > maxResults) {
    return `Over max ${unitName} count: ${maxResults}`;
  }

  return undefined;
};
