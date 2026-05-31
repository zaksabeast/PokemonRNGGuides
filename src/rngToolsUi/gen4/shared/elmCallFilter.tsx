import React from "react";
import styled from "@emotion/styled";
import { Button, Flex, Input } from "~/components";
import { sanitizeElmCalls } from "./elmCallUtils";

const ElmButton = styled(Button)({
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 24,
  paddingRight: 24,
  height: "unset",
});

type Props = {
  elmCallFilter: string;
  maxElmCalls: number;
  onElmCallFilterChange: (value: string) => void;
  eTrackerId: string;
  kTrackerId: string;
  pTrackerId: string;
};

export const ElmCallFilter = ({
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
          E
        </ElmButton>

        <ElmButton flex={1} trackerId={kTrackerId} onClick={() => addCall("K")}>
          K
        </ElmButton>

        <ElmButton flex={1} trackerId={pTrackerId} onClick={() => addCall("P")}>
          P
        </ElmButton>
      </Flex>

      <Input
        placeholder="EKP"
        errorMessage={
          elmCallFilter.length > maxElmCalls
            ? `Over max elm call count: ${maxElmCalls}`
            : undefined
        }
        value={elmCallFilter}
        onChange={onInputChange}
      />
    </Flex>
  );
};
