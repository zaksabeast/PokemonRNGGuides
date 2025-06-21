import React from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { Switch, Flex, Typography } from "~/components";

type Is3dsSwitchProps<State extends { is3ds: boolean }> = {
  disabled?: boolean;
  stateAtom: PrimitiveAtom<State>;
};

export const Is3dsSwitch = <State extends { is3ds: boolean }>({
  disabled,
  stateAtom,
}: Is3dsSwitchProps<State>) => {
  const [state, setState] = useAtom(stateAtom);
  return (
    <Switch
      disabled={disabled}
      value={state.is3ds}
      onChange={(is3ds: boolean) => setState((prev) => ({ ...prev, is3ds }))}
    />
  );
};

export const TestMode3dsSwitch = <State extends { is3ds: boolean }>({
  stateAtom,
  disabled,
}: Is3dsSwitchProps<State>) => {
  const [clickCount, setClickCount] = React.useState(0);
  const isActive = clickCount >= 7;
  return (
    <Flex onClick={() => setClickCount((prev) => prev + 1)} gap={16}>
      <Is3dsSwitch stateAtom={stateAtom} disabled={!disabled && !isActive} />
      {isActive && (
        <Typography.Text type="secondary">Test Mode Activated</Typography.Text>
      )}
    </Flex>
  );
};
