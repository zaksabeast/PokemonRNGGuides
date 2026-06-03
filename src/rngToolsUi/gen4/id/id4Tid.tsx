import { id4Atom } from "./state";
import { useAtom } from "jotai";

export const Id4Tid = () => {
  const [state] = useAtom(id4Atom);
  return state.id?.tid ?? "???";
};

export const Id4Sid = () => {
  const [state] = useAtom(id4Atom);
  return state.id?.sid ?? "???";
};
