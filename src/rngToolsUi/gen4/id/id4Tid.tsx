import { useAtomValue } from "jotai";
import { gen4TargetAtom } from "../shared/state/target";

const useSelectedId4 = () => {
  const details = useAtomValue(gen4TargetAtom)?.details;
  return details?.tool === "id" ? details.id : null;
};

export const Id4Tid = () => {
  const id = useSelectedId4();
  return id?.tid ?? "???";
};

export const Id4Sid = () => {
  const id = useSelectedId4();
  return id?.sid ?? "???";
};
