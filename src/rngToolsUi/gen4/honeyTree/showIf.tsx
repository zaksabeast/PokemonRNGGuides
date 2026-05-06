import { getSeekerTrees, NO_NPC_TREES } from "./constants";
import { useHoneyTreeState, type HoneyTreeState } from "./state";
import { getRecommendedTrees } from "./utils";

type HoneyTreeShowIfProps = {
  // Loosely typed so we handle bad mdx data gracefully
  onlyBadMunchlaxTrees?: boolean;
  unquietableNPCs?: boolean;
  npcTarget?: boolean;
  noNpcTarget?: boolean;
  dp?: boolean;
  pt?: boolean;
  targetLocation?: string;
  children?: React.ReactNode;
};

const hasBadTrees = (state: HoneyTreeState) => {
  const locations = state.munchlaxLocations;
  if (locations == null) {
    return false;
  }

  const recommended = getRecommendedTrees({ game: state.game, locations });
  return recommended == null;
};

type NpcStatus = "none" | "quietable" | "unquietable";

const getNpcStatus = (state: HoneyTreeState): NpcStatus => {
  if (NO_NPC_TREES.includes(state.targetLocation)) {
    return "none";
  }

  if (getSeekerTrees(state.game).includes(state.targetLocation)) {
    return "quietable";
  }

  return "unquietable";
};

export const HoneyTreeShowIf = ({
  onlyBadMunchlaxTrees,
  unquietableNPCs,
  npcTarget,
  noNpcTarget,
  targetLocation,
  dp,
  pt,
  children,
}: HoneyTreeShowIfProps) => {
  const [state] = useHoneyTreeState();

  if (onlyBadMunchlaxTrees && !hasBadTrees(state)) {
    return null;
  }

  const npcStatus = getNpcStatus(state);

  if (npcTarget && npcStatus === "none") {
    return null;
  }

  if (noNpcTarget && npcStatus !== "none") {
    return null;
  }

  if (unquietableNPCs && npcStatus !== "unquietable") {
    return null;
  }

  if (targetLocation != null && targetLocation !== state.targetLocation) {
    return null;
  }

  if (dp && !["Diamond", "Pearl"].includes(state.game)) {
    return null;
  }

  if (pt && state.game !== "Platinum") {
    return null;
  }

  return children;
};
