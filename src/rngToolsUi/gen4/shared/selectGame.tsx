import { PrimitiveAtom, useAtom } from "jotai";
import { Gen4GameVersion } from "../gen4types";
import { Select } from "~/components";
import { toOptions } from "~/utils/options";
import { startCase } from "lodash-es";

type SelectGameProps<State extends { game: Gen4GameVersion }> = {
  games: Gen4GameVersion[] | Readonly<Gen4GameVersion[]>;
  stateAtom: PrimitiveAtom<State>;
};

export const SelectGame = <State extends { game: Gen4GameVersion }>({
  games,
  stateAtom,
}: SelectGameProps<State>) => {
  const [state, setState] = useAtom(stateAtom);
  return (
    <Select<Gen4GameVersion>
      options={toOptions(games, startCase)}
      value={state.game}
      onChange={(game) => setState((prev) => ({ ...prev, game }))}
    />
  );
};
