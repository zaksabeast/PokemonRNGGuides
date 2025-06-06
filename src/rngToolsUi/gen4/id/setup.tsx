import { Field, FormFieldTable, Select } from "~/components";
import { games, useId4State, Game } from "./state";
import { toOptions } from "~/utils/options";
import { startCase } from "lodash-es";

const gameOptions = toOptions(games, startCase);

const SelectGen4Game = () => {
  const [state, setState] = useId4State();
  return (
    <Select<Game>
      options={gameOptions}
      value={state.game}
      onChange={(game) => setState((prev) => ({ ...prev, game }))}
    />
  );
};

const fields: Field[] = [
  {
    label: "Game",
    input: <SelectGen4Game />,
  },
];

export const Gen4IdSetup = () => {
  return <FormFieldTable fields={fields} />;
};
