import React from "react";
import {
  FormSection,
  OutlinedButton,
  RadioField,
  TextField,
  type RadioOption,
} from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { sanitizeElmCalls } from "./utils";
import { getErrorMessage } from "../advanceFilter/utils";
import { SequenceButtons } from "../advanceFilter/sequenceButtons";

type Caller = "elm" | "irwin";
type CallType = "E" | "K" | "P";

const callerOptions: RadioOption<Caller>[] = [
  { label: "Elm", value: "elm" },
  { label: "Irwin", value: "irwin" },
];

const labels: Record<Caller, Record<CallType, string>> = {
  elm: {
    // eslint-disable-next-line id-length
    E: "Evolution",
    // eslint-disable-next-line id-length
    K: "Kanto",
    // eslint-disable-next-line id-length
    P: "Pokérus",
  },
  irwin: {
    // eslint-disable-next-line id-length
    E: "Glad (E)",
    // eslint-disable-next-line id-length
    K: "Escapades (K)",
    // eslint-disable-next-line id-length
    P: "Questions (P)",
  },
};

type Props = {
  hasResults: boolean;
  elmCallFilter: string;
  maxElmCalls: number;
  onElmCallFilterChange: (value: string) => void;
  eTrackerId: string;
  kTrackerId: string;
  pTrackerId: string;
};

export const ElmCallFilterButtons = ({
  hasResults,
  elmCallFilter,
  maxElmCalls,
  onElmCallFilterChange,
  eTrackerId,
  kTrackerId,
  pTrackerId,
}: Props) => {
  const t = useActiveRouteTranslations();
  const [callType, setCallType] = React.useState<Caller>("elm");
  const addCall = (call: CallType) => {
    onElmCallFilterChange(sanitizeElmCalls(`${elmCallFilter}, ${call}`));
  };

  return (
    <FormSection>
      <RadioField<Caller>
        label={t["Caller"]}
        cellSize="word"
        value={callType}
        onChange={setCallType}
        options={callerOptions}
      />
      <SequenceButtons>
        <OutlinedButton trackerId={eTrackerId} onClick={() => addCall("E")}>
          {labels[callType]["E"]}
        </OutlinedButton>
        <OutlinedButton trackerId={kTrackerId} onClick={() => addCall("K")}>
          {labels[callType]["K"]}
        </OutlinedButton>
        <OutlinedButton trackerId={pTrackerId} onClick={() => addCall("P")}>
          {labels[callType]["P"]}
        </OutlinedButton>
      </SequenceButtons>
      <TextField
        label={t["Elm Calls"]}
        placeholder="EKP"
        errorMessage={getErrorMessage({
          hasResults,
          filter: elmCallFilter,
          maxResults: maxElmCalls,
          unitName: "elm calls",
        })}
        value={elmCallFilter}
        onChange={onElmCallFilterChange}
      />
    </FormSection>
  );
};
