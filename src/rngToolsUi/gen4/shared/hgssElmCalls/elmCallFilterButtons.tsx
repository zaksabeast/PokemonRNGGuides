import React from "react";
import styled from "@emotion/styled";
import { Button, Flex, Input } from "~/components";
import { sanitizeElmCalls } from "./utils";
import { getErrorMessage } from "../advanceFilter/utils";

const ElmButton = styled(Button)({
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 24,
  paddingRight: 24,
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
  const addCall = (call: "E" | "K" | "P") => {
    onElmCallFilterChange(sanitizeElmCalls(`${elmCallFilter}, ${call}`));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onElmCallFilterChange(event.target.value);

  return (
    <Flex vertical gap={8}>
      <Flex gap={8}>
        <ElmButton flex={1} trackerId={eTrackerId} onClick={() => addCall("E")}>
          Evolution
        </ElmButton>

        <ElmButton flex={1} trackerId={kTrackerId} onClick={() => addCall("K")}>
          Kanto
        </ElmButton>

        <ElmButton flex={1} trackerId={pTrackerId} onClick={() => addCall("P")}>
          Pokérus
        </ElmButton>
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
