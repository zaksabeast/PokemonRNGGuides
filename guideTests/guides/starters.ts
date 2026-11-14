import { sortBy } from "lodash-es";
import { renderGuide } from "../utils/render";
import {
  getButton,
  getByLabel,
  getSelectByLabel,
  getStep,
  selectOption,
  typeInto,
  waitFor,
  waitForSearchResults,
  type TableRow,
} from "../utils/dom";
import { createGoToStep } from "../utils/stepper";
import {
  toIvs,
  typeIvFilter,
  type IvFilterInputs,
  type Stats,
} from "./pokemonFilter";

export type StarterSearch = {
  game: string;
  species: string;
  tid: string;
  sid: string;
  minDelay: string;
  maxDelay: string;
  ivFilter: IvFilterInputs;
};

export type StarterResult = {
  nature: string;
  ability: string;
  gender: string;
  ivs: Stats;
  pid: string;
  delay: string;
  seed: string;
};

const STEPS = { setUp: 0, pickStarter: 1 };

const toStarterResult = ({ cells }: TableRow): StarterResult => ({
  nature: cells.Nature,
  ability: cells.Ability,
  gender: cells.Gender,
  ivs: toIvs(cells),
  pid: cells.PID,
  delay: cells.Delay,
  seed: cells.Seed,
});

export const openStartersGuide = async () => {
  const container = renderGuide("/retail-hgss-starter/");
  const setUp = await waitFor(() => getStep(container, STEPS.setUp));
  const pickStarter = getStep(container, STEPS.pickStarter);
  const goToStep = createGoToStep(container, [setUp, pickStarter]);

  return {
    /** Results come back in the order the search workers finish, so they're sorted by seed */
    searchStarters: async ({
      game,
      species,
      tid,
      sid,
      minDelay,
      maxDelay,
      ivFilter,
    }: StarterSearch): Promise<StarterResult[]> => {
      await selectOption(getSelectByLabel(setUp, "Game"), game);
      await goToStep(STEPS.pickStarter);
      await selectOption(getSelectByLabel(pickStarter, "Species"), species);
      typeInto(getByLabel(pickStarter, "TID"), tid);
      typeInto(getByLabel(pickStarter, "SID"), sid);
      typeInto(getByLabel(pickStarter, "Min Delay"), minDelay);
      typeInto(getByLabel(pickStarter, "Max Delay"), maxDelay);
      typeIvFilter(pickStarter, ivFilter);

      getButton(pickStarter, "Generate").click();
      const rows = await waitForSearchResults(pickStarter);

      return sortBy(rows.map(toStarterResult), (result) => result.seed);
    },
  };
};
