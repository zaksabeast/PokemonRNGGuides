import { SinnohMap } from "../shared/sinnohMap";
import { useHoneyTreeState } from "./state";
import { type HoneyTreeLocation } from "~/rngTools";
import { getRecommendedTrees } from "./utils";

export const HoneyTreeMap = () => {
  const [state, setState] = useHoneyTreeState();
  const { showTrees, showMunchlax, showRecommended } = state.honeyTreeMap;

  const onClickHoneyTree = (targetLocation: HoneyTreeLocation) =>
    setState((prev) => ({ ...prev, targetLocation }));

  const recommendedTrees =
    getRecommendedTrees({
      game: state.game,
      locations: state.munchlaxLocations,
    })?.locations ?? [];

  return (
    <SinnohMap
      honeyTree={{
        show: showTrees,
        munchlaxTrees: showMunchlax ? (state.munchlaxLocations ?? []) : [],
        recommendedTrees: showRecommended
          ? // Always recommend Floaroma Meadow
            // It's the earliest tree and does not have NPC noise
            [...recommendedTrees, "FloaromaMeadow"]
          : [],
        onClickHoneyTree,
      }}
    />
  );
};
