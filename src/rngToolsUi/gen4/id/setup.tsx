import { Field, FormFieldTable, Select, Switch } from "~/components";
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

const Is3dsSwitch = () => {
  const [state, setState] = useId4State();
  return (
    <Switch
      // Disabled until more testing is done
      disabled
      value={state.is3ds}
      onChange={(is3ds) => setState((prev) => ({ ...prev, is3ds }))}
    />
  );
};

const fields: Field[] = [
  {
    label: "Game",
    input: <SelectGen4Game />,
  },
  {
    label: "Using 3ds? (Coming soon)",
    input: <Is3dsSwitch />,
  },
];

export const Gen4IdSetup = () => {
  return <FormFieldTable fields={fields} />;
};
