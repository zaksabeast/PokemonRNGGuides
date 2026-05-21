import {
  rngTools,
  Species,
  Wild3Action,
  Wild3GeneratorOptions,
  Wild3GeneratorResult,
} from "~/rngTools";
<<<<<<< HEAD
import { AVERAGE_LEAD_CYCLE_SPEED } from "./leadCycleSpeedSelector";
import { TargetSetup } from "./wild3CalibTargetSetupInput";
=======
<<<<<<< HEAD
import { AVERAGE_LEAD_CYCLE_SPEED } from "./wild3LeadCycleSpeedInput";
import { TargetSetup } from "./wild3TargetSetupInput";
=======
import { AVERAGE_LEAD_CYCLE_SPEED } from "./leadCycleSpeedSelector";
import { TargetSetup } from "./wild3CalibTargetSetupInput";
>>>>>>> 02fe5e09 (Removed generate_<game>_swarm and formatted the rng_tools folder)
>>>>>>> swarm2
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import {
  gen3PkmFilterFieldsToRustInput,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";
import { emeraldWildGameData } from "./wild3CalibCaughtMon";
import { nature_from_pid } from "~/types";
import { formatProbability } from "~/utils/formatProbability";
import { formatHex } from "~/utils/formatHex";
import { Flex } from "~/components";

<<<<<<< HEAD
=======
<<<<<<< HEAD
const getProbabilityInfo = async (
  res: Wild3GeneratorResult,
  action: Wild3Action,
  lead_cycle_speed: number | null,
) => {
  if (lead_cycle_speed == null || res.cycle_range == null) {
=======
>>>>>>> swarm2
const getLeadCycleSpeed = (values: TargetSetup) => {
  if (values.lead === "Egg") {
    return 0;
  }

  return values.usingAverageLeadCycleSpeed
    ? AVERAGE_LEAD_CYCLE_SPEED
    : values.leadCycleSpeed;
};

const getProbabilityInfo = async (
  res: Wild3GeneratorResult,
  action: Wild3Action,
  lead_cycle_speed: number,
) => {
  if (res.cycle_range == null) {
<<<<<<< HEAD
=======
>>>>>>> 02fe5e09 (Removed generate_<game>_swarm and formatted the rng_tools folder)
>>>>>>> swarm2
    return null;
  }

  const info = await rngTools.calculate_cycle_data(
    res.cycle_range,
    action,
    lead_cycle_speed,
  );

  const ideal_lead_spd = await rngTools.calculate_ideal_lead_pid_cycle_count(
    res.cycle_range,
  );

  const ideal_info = await rngTools.calculate_cycle_data(
    res.cycle_range,
    action,
    ideal_lead_spd,
  );

  const leadDesc =
    lead_cycle_speed === AVERAGE_LEAD_CYCLE_SPEED
      ? "with average lead cycle speed"
      : lead_cycle_speed === 0
        ? "with Egg lead"
        : `with lead cycle speed ${lead_cycle_speed}`;

  const showIdealInfo =
    info.method_probability < 0.99 && lead_cycle_speed !== ideal_lead_spd;

  return (
    <Flex mt={10} vertical>
      <div>
        {`${formatProbability(info.method_probability)} likelihood to hit
      method ${res.method} ${leadDesc}.`}
      </div>
      {showIdealInfo && (
        <div>
          Note: Ideal lead cycle speed to hit the target Pokémon is{" "}
          {ideal_lead_spd}. ({formatProbability(ideal_info.method_probability)}{" "}
          likelihood)
        </div>
      )}
    </Flex>
  );
};

/** Example of return values: Sturdy, Sturdy (1), Sturdy (2), First, Second */
const getAbilityDisplayStr = async (species: Species, pid: number) => {
  const abilities = await rngTools.get_species_abilities(species);
  const abilityType = await rngTools.get_ability_type_from_gen3_pid(pid);

  const suffix =
    abilities[0] === abilities[1]
      ? ` (${abilityType === "First" ? 1 : 2})`
      : ``;
  if (abilityType === "First") {
    return abilities[0] == null ? abilityType : `${abilities[0]}${suffix}`;
  }
  if (abilityType === "Second") {
    return abilities[0] == null && abilities[1] == null
      ? abilityType
      : `${abilities[1] ?? abilities[0]}${suffix}`;
  }
  return "";
};

<<<<<<< HEAD
export const calculateTargetSetupResult = async (targetSetup: TargetSetup) => {
  const lead_cycle_speed = getLeadCycleSpeed(targetSetup);

=======
<<<<<<< HEAD
export const calculateTargetSetupResult = async (
  targetSetup: TargetSetup,
  lead_cycle_speed: number | null,
) => {
=======
export const calculateTargetSetupResult = async (targetSetup: TargetSetup) => {
  const lead_cycle_speed = getLeadCycleSpeed(targetSetup);

>>>>>>> 02fe5e09 (Removed generate_<game>_swarm and formatted the rng_tools folder)
>>>>>>> swarm2
  const opts: Wild3GeneratorOptions = {
    tid: 0,
    sid: 0,
    map_idx: 0,
    action: targetSetup.action,
    methods: [targetSetup.targetMethod],
    lead: targetSetup.lead,
    filter: pkmFilterFieldsToRustInput(getPkmFilterInitialValues()),
    gen3_filter: gen3PkmFilterFieldsToRustInput(
      getGen3PkmFilterInitialValues(),
      null,
    ),
    consider_cycles: true,
    consider_rng_manipulated_lead_pid: true,
    generate_even_if_impossible: true,
    using_white_flute: targetSetup.requiresWhiteFlute,
    roamer_state: targetSetup.roamerState,
    mass_outbreak_state: targetSetup.massOutbreakState,
    feebas_state: targetSetup.feebasState,
    lead_cycle_speed,
    safari_pokeblock:
      targetSetup.safariPokeblock != null
        ? {
            Specific: targetSetup.safariPokeblock,
          }
        : null,
  };

  const map_data = emeraldWildGameData.maps_data.find(
    (table) => table.map_id === targetSetup.map,
  );
  if (map_data == null) {
    return { content: null, hasEncounter: false };
  }

  const results = await rngTools.generate_gen3_wild_wasm(
    targetSetup.targetPaintingAdvs.before,
    targetSetup.targetPaintingAdvs.after,
    opts,
    map_data,
  );

  if (results.length === 0) {
    if (targetSetup.action === "RockSmash") {
      return {
        content: (
          <div>No Pokémon encounter when using Rock Smash with that setup.</div>
        ),
        hasEncounter: false,
      };
    }
    return { content: null, hasEncounter: false };
  }

  const res = results[0];
  const encounter = await rngTools.get_encounter_for_wild3_map_game_data(
    map_data,
    targetSetup.action,
    res.encounter_idx,
  );
  if (encounter == null) {
    return { content: null, hasEncounter: false };
  }

  const { species } = encounter.species_data;

  const nature = nature_from_pid(res.pid);

  const stats = await rngTools.calculate_stats(
    species,
    res.lvl,
    nature,
    res.ivs,
    { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  );

  const gender = await rngTools.get_species_gender_from_pid(species, res.pid);
  const { ivs } = res;

  const probabilityInfo = await getProbabilityInfo(
    res,
    targetSetup.action,
    lead_cycle_speed,
  );
  const abilityStr = await getAbilityDisplayStr(species, res.pid);

  return {
    content: (
      <Flex vertical>
        <div>
          {species}, Lvl {res.lvl}, {gender}, {abilityStr}, {nature}, HP{" "}
          {stats.hp}, ATK {stats.atk}, DEF {stats.def}, SPA {stats.spa}, SPD{" "}
          {stats.spd}, SPE {stats.spe}
        </div>
        <div>
          PID: {formatHex(res.pid)}, IVS: {ivs.hp}/{ivs.atk}/{ivs.def}/{ivs.spa}
          /{ivs.spd}/{ivs.spe}
        </div>
        {probabilityInfo}
      </Flex>
    ),
    hasEncounter: true,
  };
};
