import { Species } from "~/rngTools";
import { useAtomValue } from "jotai";
import { gen4TargetAtom } from "../shared/state/target";

export const dpptStarters = ["Turtwig", "Chimchar", "Piplup"] as const;
export const hgssStarters = ["Chikorita", "Cyndaquil", "Totodile"] as const;
export const allStarters = [...dpptStarters, ...hgssStarters] as const;

export const useStarterSpecies = (): Species | null => {
  const details = useAtomValue(gen4TargetAtom)?.details;
  return details?.tool === "starter" ? details.species : null;
};
