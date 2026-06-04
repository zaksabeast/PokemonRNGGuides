import React from "react";
import { useAtom } from "jotai";
import { gen4StateAtom } from "../shared/state";

type SwarmShowIfProps = {
  game?: "dppt" | "hgss";
  children?: React.ReactNode;
};

const isDppt = (game: string) =>
  game === "Diamond" || game === "Pearl" || game === "Platinum";

export const SwarmShowIf = ({ game, children }: SwarmShowIfProps) => {
  const [state] = useAtom(gen4StateAtom);
  const currentGame = state.config.game;

  if (game === "dppt" && !isDppt(currentGame)) {
    return null;
  }

  if (game === "hgss" && isDppt(currentGame)) {
    return null;
  }

  return <>{children}</>;
};