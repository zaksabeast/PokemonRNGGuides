import React from "react";
import { useSwarmState } from "./state";

type SwarmShowIfProps = {
  game?: "dppt" | "hgss";
  children?: React.ReactNode;
};

const isDppt = (game: string) =>
  game === "Diamond" || game === "Pearl" || game === "Platinum";

export const SwarmShowIf = ({ game, children }: SwarmShowIfProps) => {
  const [state] = useSwarmState();

  if (game === "dppt" && !isDppt(state.game)) {
    return null;
  }

  if (game === "hgss" && isDppt(state.game)) {
    return null;
  }

  return <>{children}</>;
};