import React from "react";
import { useAtom } from "jotai";
import { gen4StateAtom } from "../shared/state";
import { Alert, Button, Flex, Typography } from "~/components";

export const HgssSwarmAdvanceTracker = () => {
  const [state] = useAtom(gen4StateAtom);

  const [currentAdvance, setCurrentAdvance] = React.useState(0);
  const [history, setHistory] = React.useState<number[]>([]);

  const seed = state.target.seedTime?.seed ?? null;
  const targetAdvance = state.target.mtAdvance ?? null;

  React.useEffect(() => {
    setCurrentAdvance(0);
    setHistory([]);
  }, [seed, targetAdvance]);

  const remaining =
    targetAdvance != null ? targetAdvance - currentAdvance : null;

  const reached = remaining != null && remaining <= 0;

  const addAdvance = (amount: number) => {
    setHistory((prev) => [...prev, amount]);
    setCurrentAdvance((prev) => prev + amount);
  };

  const undo = () => {
    if (history.length === 0) {
      return;
    }

    const lastAdvance = history[history.length - 1];

    setCurrentAdvance((prev) => Math.max(0, prev - lastAdvance));
    setHistory((prev) => prev.slice(0, -1));
  };

  return (
    <Flex vertical gap={16}>
      <Flex gap={8}>
        <Typography.Text>Seed:</Typography.Text>
        <Typography.Text>
          {seed != null
            ? seed.toString(16).toUpperCase().padStart(8, "0")
            : "—"}
        </Typography.Text>
      </Flex>

      <Flex gap={8}>
        <Typography.Text>Target Advance:</Typography.Text>
        <Typography.Text>
          {targetAdvance ?? "Select an advance first"}
        </Typography.Text>
      </Flex>

      <Flex gap={8}>
        <Typography.Text>Current Advance:</Typography.Text>
        <Typography.Text>{currentAdvance}</Typography.Text>
      </Flex>

      {remaining != null && !reached && (
        <Flex gap={8}>
          <Typography.Text>Remaining:</Typography.Text>
          <Typography.Text>{remaining}</Typography.Text>
        </Flex>
      )}

      {reached && (
        <Alert
          showIcon
          type="success"
          title="Target reached!"
          description="Talk to the NPC to form a new group or check the radio."
        />
      )}

      <Flex gap={8}>
        <Button
          trackerId="hgss_swarm_advance_joey"
          disabled={targetAdvance == null || reached}
          onClick={() => addAdvance(2)}
        >
          Called Youngster Joey
        </Button>

        <Button
          trackerId="hgss_swarm_advance_group"
          disabled={targetAdvance == null || reached}
          onClick={() => addAdvance(1)}
        >
          Formed Group
        </Button>

        <Button
          disabled={history.length === 0}
          onClick={undo}
        >
          Undo
        </Button>
      </Flex>
    </Flex>
  );
};