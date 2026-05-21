import { useId4State } from "./state";

export const Id4Tid = () => {
  const [state] = useId4State();
  return state.target?.tid ?? "???";
};

export const Id4Sid = () => {
  const [state] = useId4State();
  return state.target?.sid ?? "???";
};
