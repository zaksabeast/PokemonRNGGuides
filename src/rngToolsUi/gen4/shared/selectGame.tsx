import { PrimitiveAtom, useAtom } from "jotai";
import { Gen4GameVersion } from "../gen4types";
import { Select } from "~/components";
import { toOptions } from "~/utils/options";
import { startCase } from "lodash-es";
import { t } from "~/translations";
import { useActiveRouteLanguage } from "~/hooks/useActiveRoute";

type SelectGameProps<State extends { game: Gen4GameVersion }> = {
  games: Gen4GameVersion[] | Readonly<Gen4GameVersion[]>;
  stateAtom: PrimitiveAtom<State>;
};

export const SelectGame = <State extends { game: Gen4GameVersion }>({
  games,
  stateAtom,
}: SelectGameProps<State>) => {
  const language = useActiveRouteLanguage();
  const formatGame = (game: Gen4GameVersion) => {
    return startCase(t(game, language));
  };
  const [state, setState] = useAtom(stateAtom);
  return (
    <Select<Gen4GameVersion>
      options={toOptions(games, formatGame)}
      value={state.game}
      onChange={(game) => setState((prev) => ({ ...prev, game }))}
    />
  );
};
