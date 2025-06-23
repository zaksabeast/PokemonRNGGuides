import { PrimitiveAtom, useAtom } from "jotai";
import { Switch } from "~/components";

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
