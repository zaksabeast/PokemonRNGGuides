import React from "react";
import { Button, Flex, Input, RadioGroup } from "~/components";
import { sanitizeElmCalls } from "./utils";
import { getErrorMessage } from "../advanceFilter/utils";

type Caller = "elm" | "irwin";
type CallType = "E" | "K" | "P";

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
  const [callType, setCallType] = React.useState<Caller>("elm");
  const addCall = (call: CallType) => {
    onElmCallFilterChange(sanitizeElmCalls(`${elmCallFilter}, ${call}`));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onElmCallFilterChange(event.target.value);

  return (
    <Flex vertical gap={8}>
      <RadioGroup
        optionType="button"
        value={callType}
        onChange={(event) => setCallType(event.target.value)}
        options={[
          { label: "Elm", value: "elm" },
          { label: "Irwin", value: "irwin" },
        ]}
      />
      <Flex gap={8}>
        <Button flex={1} trackerId={eTrackerId} onClick={() => addCall("E")}>
          {labels[callType]["E"]}
        </Button>

        <Button flex={1} trackerId={kTrackerId} onClick={() => addCall("K")}>
          {labels[callType]["K"]}
        </Button>

        <Button flex={1} trackerId={pTrackerId} onClick={() => addCall("P")}>
          {labels[callType]["P"]}
        </Button>
      </Flex>

      <Input
        placeholder="EKP"
        errorMessage={getErrorMessage({
          hasResults,
          filter: elmCallFilter,
          maxResults: maxElmCalls,
          unitName: "elm calls",
        })}
        value={elmCallFilter}
        onChange={onInputChange}
      />
    </Flex>
  );
};
