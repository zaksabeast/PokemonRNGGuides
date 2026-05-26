import { Button, Input, Flex, PixelImage } from "~/components";
import styled from "@emotion/styled";
import { sanitizeFlips } from "./coinFlipUtils";
import React from "react";

const CoinButton = styled(Button)({
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 40,
  paddingRight: 40,
  height: "unset",
});

type Props = {
  coinFlipFilter: string;
  maxCoinFlips: number;
  onCoinFlipFilterChange: (value: string) => void;
  headsTrackerId: string;
  tailsTrackerId: string;
};

export const CoinFlipFilter = ({
  coinFlipFilter,
  maxCoinFlips,
  onCoinFlipFilterChange,
  headsTrackerId,
  tailsTrackerId,
}: Props) => {
  const handleAddHeads = () => {
    onCoinFlipFilterChange(sanitizeFlips(`${coinFlipFilter}, H`));
  };

  const handleAddTails = () => {
    onCoinFlipFilterChange(sanitizeFlips(`${coinFlipFilter}, T`));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onCoinFlipFilterChange(event.target.value);

  return (
    <Flex vertical gap={8}>
      <Flex gap={8}>
        <CoinButton
          flex={1}
          trackerId={headsTrackerId}
          onClick={handleAddHeads}
        >
          <PixelImage name="DpptHeads" />
        </CoinButton>
        <CoinButton
          flex={1}
          trackerId={tailsTrackerId}
          onClick={handleAddTails}
        >
          <PixelImage name="DpptTails" />
        </CoinButton>
      </Flex>
      <Input
        placeholder="HTH"
        errorMessage={
          coinFlipFilter.length > maxCoinFlips
            ? `Over max coin flip count: ${maxCoinFlips}`
            : undefined
        }
        value={coinFlipFilter}
        onChange={onInputChange}
      />
    </Flex>
  );
};
