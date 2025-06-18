import styled from "@emotion/styled";
import { Flex } from "./flex";
import { Button } from "./button";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { Switch } from "./switch";
import { Typography } from "./typography";
import { Metronome } from "~/hooks/useMetronome";

const NoTransitionButton = styled(Button)({
  transition: "none",
});

type MetronomeProps = Metronome;

export const MetronomeButton = ({
  setOffset,
  justTicked,
  isRunning,
  runMetronome,
}: MetronomeProps) => {
  const route = useActiveRoute();

  return (
    <Flex gap={16} justify="space-between" align="center">
      <Flex gap={16}>
        <Typography.Text strong>Metronome offset</Typography.Text>
        <Switch onChange={() => setOffset((prev) => (prev === 0 ? 500 : 0))} />
      </Flex>
      <NoTransitionButton
        flex={1}
        backgroundColor={justTicked ? "SuccessBg" : "BgBase"}
        backgroundHoverColor={justTicked ? "SuccessBg" : "BgBase"}
        color="TextBase"
        trackerId={`${route}-metronome`}
        onClick={() => runMetronome(!isRunning)}
      >
        {isRunning ? "Stop" : "Start"} Metronome
      </NoTransitionButton>
    </Flex>
  );
};
