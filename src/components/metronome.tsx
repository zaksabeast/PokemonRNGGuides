import styled from "@emotion/styled";
import { Tooltip } from "antd";
import { Flex } from "./flex";
import { Icon } from "./icons";
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
      <Flex gap={16} align="center">
        <Tooltip title="Enable this only if you have a second offset of 1 after several RNG attempts.">
          <Flex gap={8}>
            <Typography.Text strong>Metronome offset</Typography.Text>
            <Icon name="InformationCircle" size={16} />
          </Flex>
        </Tooltip>
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
