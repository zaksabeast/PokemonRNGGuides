import { intersection } from "lodash-es";
import { type HoneyTreeLocation } from "~/rngTools";
import { NO_NPC_TREES, getSeekerTrees } from "./constants";
import { type DpPt } from "../gen4types";

type HoneyTreeRecomendation = {
  type: "NoNpc" | "VsSeeker";
  locations: HoneyTreeLocation[];
};

export const getRecommendedTrees = ({
  game,
  locations,
}: {
  game: DpPt;
  locations: HoneyTreeLocation[] | null;
}): HoneyTreeRecomendation | null => {
  if (locations == null) {
    return null;
  }

  const noNpcTrees = intersection(locations, NO_NPC_TREES);
  if (noNpcTrees.length > 0) {
    return { type: "NoNpc", locations: noNpcTrees };
  }

  const vsSeekerTrees = intersection(locations, getSeekerTrees(game));
  if (vsSeekerTrees.length > 0) {
    return { type: "VsSeeker", locations: vsSeekerTrees };
  }

  return null;
};
