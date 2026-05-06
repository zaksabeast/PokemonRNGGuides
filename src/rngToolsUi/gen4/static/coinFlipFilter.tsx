import { useStatic4State } from "./state";
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

export const CoinFlipFilter = () => {
  const [state, setState] = useStatic4State();
  const handleAddHeads = () => {
    setState((prev) => ({
      ...prev,
      coinFlipFilter: sanitizeFlips(`${prev.coinFlipFilter}, H`),
    }));
  };

  const handleAddTails = () => {
    setState((prev) => ({
      ...prev,
      coinFlipFilter: sanitizeFlips(`${prev.coinFlipFilter}, T`),
    }));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState((prev) => ({
      ...prev,
      coinFlipFilter: event.target.value,
    }));

  return (
    <Flex vertical gap={8}>
      <Flex gap={8}>
        <CoinButton
          flex={1}
          trackerId="hit_seed_add_heads"
          onClick={handleAddHeads}
        >
          <PixelImage name="DpptHeads" />
        </CoinButton>
        <CoinButton
          flex={1}
          trackerId="hit_seed_add_tails"
          onClick={handleAddTails}
        >
          <PixelImage name="DpptTails" />
        </CoinButton>
      </Flex>
      <Input value={state.coinFlipFilter} onChange={onInputChange} />
    </Flex>
  );
};
