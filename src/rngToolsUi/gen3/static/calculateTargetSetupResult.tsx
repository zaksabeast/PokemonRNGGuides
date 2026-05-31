import {
  getGen3PkmFilterInitialValues,
  gen3PkmFilterFieldsToRustInput,
} from "~/components/gen3PkmFilter";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { PokemonInfo } from "~/rngToolsUi/gen3/pokemonRng/ResultPokemonInfo";
import { rngTools } from "~/rngTools";

import { encounterContextToLvl, TargetSetup } from "./static3TargetSetupInput";

export const calculateTargetSetupResult = async (targetSetup: TargetSetup) => {
  const encounterGenderRatio = await rngTools.get_species_gender_ratio(
    targetSetup.species,
  );

  const opts = {
    bugged_roamer: false,
    methods: [targetSetup.targetMethod],
    tid: 0,
    sid: 0,
    filter: pkmFilterFieldsToRustInput(getPkmFilterInitialValues()),
    gen3_filter: gen3PkmFilterFieldsToRustInput(
      getGen3PkmFilterInitialValues(),
      null,
    ),
    encounter_gender_ratio: encounterGenderRatio,
  };

  const results = await rngTools.generate_gen3_static_wasm(
    targetSetup.targetPaintingAdvs.before,
    targetSetup.targetPaintingAdvs.after,
    opts,
  );

  const result = results[0];
  if (result == null) {
    return { content: null };
  }

  return {
    content: (
      <PokemonInfo
        species={targetSetup.species}
        pid={result.pid}
        ivs={result.ivs}
        lvl={encounterContextToLvl(targetSetup.encounterContext)}
      />
    ),
  };
};
