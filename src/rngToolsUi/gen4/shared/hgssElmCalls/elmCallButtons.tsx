import React from "react";
import { Button, Input, Flex } from "~/components";
import styled from "@emotion/styled";
import { sanitizeElmCalls } from "./utils";
import { getErrorMessage } from "../advanceFilter/utils";

const ElmButton = styled(Button)({
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 40,
  paddingRight: 40,
  height: "unset",
});

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
  const handleAdd = (call: "E" | "K" | "P") => {
    onElmCallFilterChange(sanitizeElmCalls(`${elmCallFilter}${call}`));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onElmCallFilterChange(event.target.value);

  return (
    <Flex vertical gap={8}>
      <Flex gap={8}>
        <ElmButton flex={1} trackerId={eTrackerId} onClick={() => handleAdd("E")}>
          E
        </ElmButton>
        <ElmButton flex={1} trackerId={kTrackerId} onClick={() => handleAdd("K")}>
          K
        </ElmButton>
        <ElmButton flex={1} trackerId={pTrackerId} onClick={() => handleAdd("P")}>
          P
        </ElmButton>
      </Flex>
      <Input
        placeholder="EKP"
        errorMessage={getErrorMessage({
          filter: elmCallFilter,
          hasResults,
          maxResults: maxElmCalls,
          unitName: "elm calls",
        })}
        value={elmCallFilter}
        onChange={onInputChange}
      />
    </Flex>
  );
};