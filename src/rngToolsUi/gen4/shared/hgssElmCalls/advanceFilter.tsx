import { Alert, Flex, type ResultColumn } from "~/components";
import { ToolForm } from "~/components/form";
import { useAtomValue, useSetAtom } from "jotai";
import { gen4MarkersAtom, setGen4MarkersAtom } from "../state/markers";
import { rngTools, type ElmCall, type ElmCallAdvanceState } from "~/rngTools";
import { type Translations } from "~/translations";
import { findElmCallSequenceIndices } from "./utils";
import { ElmCallFilterButtons } from "./elmCallFilterButtons";
import {
  LooseAdvanceFilterFormState,
  renderAdvanceFilterStatus,
  type AdvanceFilterBaseProps,
  type AdvanceFilterResult,
} from "../advanceFilter/utils";
import { AdvanceFilterFields } from "../advanceFilter/fields";
import { useAdvanceFilterResults } from "../advanceFilter/useAdvanceFilterResults";

type Result = AdvanceFilterResult<ElmCallAdvanceState>;

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

export const HgssElmCallAdvanceFilterBase = ({
  seed,
  targetAdvance,
  minAdvance,
  submitTrackerId,
  mode,
}: AdvanceFilterBaseProps) => {
  const markers = useAtomValue(gen4MarkersAtom);
  const setMarkers = useSetAtom(setGen4MarkersAtom);

  const { hasResults, resultCount, hasNoMatches, toolFormProps } =
    useAdvanceFilterResults({
      mode,
      seed,
      targetAdvance,
      minAdvance,
      generate: (opts) => rngTools.get_elm_calls(opts),
      filter: markers.elmCalls,
      findMatches: (results) =>
        findElmCallSequenceIndices(
          results.map((result) => result.elm_call),
          markers.elmCalls,
        ),
      mark: "Seen",
    });

  return (
    <ToolForm<LooseAdvanceFilterFormState, Result>
      {...toolFormProps}
      getColumns={getColumns}
      submitTrackerId={submitTrackerId}
      filters={
        <>
          <ElmCallFilterButtons
            hasResults={hasResults}
            maxElmCalls={resultCount}
            elmCallFilter={markers.elmCalls}
            onElmCallFilterChange={(elmCalls) => {
              setMarkers({ elmCalls });
            }}
            eTrackerId="elm_call_advance_filter_e"
            kTrackerId="elm_call_advance_filter_k"
            pTrackerId="elm_call_advance_filter_p"
          />
          {hasNoMatches && (
            <Alert
              showIcon
              type="error"
              title="No matches found"
              description="An Elm Call may be incorrect, or the advance range may be too small. Try increasing the advance range."
            />
          )}
        </>
      }
    >
      <AdvanceFilterFields mode={mode} targetAdvance={targetAdvance} />
    </ToolForm>
  );
};
