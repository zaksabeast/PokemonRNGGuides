import { writeFile } from "node:fs/promises";
import prettier from "prettier";
import type { Wild3InitialCycleDistribution } from "../../src/rngTools";
import {
  emerald_wild_encounters,
  isValidMap,
} from "../../src/rngToolsUi/gen3/wild/data/emerald_wild_encounters";
import {
  getPossiblePlayingSongs,
  getPossibleWeathers,
} from "../../src/rngToolsUi/gen3/wild/data/initial_cycle/initial_cycle_map_game_data";
import { getInitialCycleInfo } from "../../src/rngToolsUi/gen3/wild/data/initial_cycle/initial_cycle_info";
import { wild3Actions } from "../../src/rngToolsUi/gen3/wild/utils";

type Distribution = Pick<
  Wild3InitialCycleDistribution,
  "min" | "max" | "distribution"
>;

const distributions: Distribution[] = [];
const distributionIndexes = new Map<string, number>();
const distributionBySetupMap: Record<string, Record<string, number>> = {};

const getDistributionIndex = (distribution: Distribution): number => {
  const key = JSON.stringify(distribution);
  const existing = distributionIndexes.get(key);
  if (existing != null) {
    return existing;
  }

  const index = distributions.length;
  distributionIndexes.set(key, index);
  distributions.push(distribution);

  return index;
};

const maps = emerald_wild_encounters.wild_encounter_groups.flatMap((group) =>
  group.encounters.flatMap((map) => {
    if (!isValidMap(map)) {
      return [];
    }

    const encountersByAction = {
      SweetScentLand: map.land_mons?.mons,
      SweetScentWater: map.water_mons?.mons,
      OldRod: map.fishing_mons?.mons.slice(0, 2),
      GoodRod: map.fishing_mons?.mons.slice(2, 5),
      SuperRod: map.fishing_mons?.mons.slice(5, 10),
      RockSmash: map.rock_smash_mons?.mons,
    };

    return [
      {
        map_id: map.map,
        actions: wild3Actions.filter(
          (action) => (encountersByAction[action]?.length ?? 0) > 0,
        ),
      },
    ];
  }),
);

const generateMapSetups = (map: (typeof maps)[number]): void => {
  const mapSetups: Record<string, number> = {};
  const combinations = map.actions.flatMap((action) =>
    getPossibleWeathers(map.map_id, action).flatMap((weather) =>
      getPossiblePlayingSongs(map.map_id, action).map((playingSong) => ({
        action,
        weather,
        playingSong,
      })),
    ),
  );

  for (const { action, weather, playingSong } of combinations) {
    const info = getInitialCycleInfo(map.map_id, weather, playingSong, action);
    if (info == null) {
      throw new Error(
        `Missing initial-cycle data for ${map.map_id}:${action}:${weather}:${playingSong}`,
      );
    }

    mapSetups[`${action}:${weather}:${playingSong}`] = getDistributionIndex({
      min: info.summary.min,
      max: info.summary.max,
      distribution: info.distribution,
    });
  }

  distributionBySetupMap[map.map_id] = mapSetups;
};

maps.forEach(generateMapSetups);

const output = new URL(
  "../../src/rngToolsUi/gen3/wild/data/initial_cycle/initial_cycle_distributions.ts",
  import.meta.url,
);
const contents = await prettier.format(
  `// Do not edit manually. Run bun run build:wild3:initial-cycles to update this file.
export const initial_cycle_distributions = ${JSON.stringify({ distributions, setups: distributionBySetupMap })};`,
  {
    parser: "typescript",
  },
);
await writeFile(output, contents);
console.log(
  `Generated ${distributions.length} distributions for ${maps.length} maps.`,
);
