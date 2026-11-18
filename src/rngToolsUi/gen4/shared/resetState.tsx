import React from "react";
import { useSetAtom } from "jotai";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { getGen4GameOptions } from "../gen4types";
import { resetGen4Atom } from "./state/reset";

type Props = {
  games?: string;
};

export const Gen4Reset = ({ games }: Props) => {
  const route = useActiveRoute();
  const resetGen4 = useSetAtom(resetGen4Atom);
  const gameOptions = getGen4GameOptions(games);
  React.useEffect(() => {
    resetGen4(gameOptions);
  }, [route, gameOptions, resetGen4]);
  return null;
};
