import { z } from "zod";
import { orderBy, uniq } from "lodash-es";
import { isSynchronizeLead } from "~/types/lead";
import {
  rngTools,
  type Wild3MapSetups,
  type Wild3SearcherOptions,
  type Species,
  type Gen3Lead,
} from "~/rngTools";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import {
  getGen3PkmFilterInitialValues,
  gen3PkmFilterFieldsToRustInput,
} from "~/components/gen3PkmFilter";
import { getWild3EmeraldGameData } from "./data/wild3GameData";
import { gen3Leads, wild3Actions, isFishingAction } from "./utils";
import { AVERAGE_LEAD_CYCLE_SPEED } from "./wild3LeadCycleSpeedInput";
import type { TargetSetup } from "./wild3TargetSetupInput";
import { doesRockSmashSetupRequireWhiteFlute } from "./searchWild3Target";

export const simplifiedLeads = gen3Leads.filter(
  (lead) => lead === "Vanilla" || lead === "Egg" || isSynchronizeLead(lead),
);

export const simplifiedLeadKeys = ["Vanilla", "Egg", "Synchronize"] as const;

export const getSimplifiedLeadSpeed = (lead: Gen3Lead): number =>
  lead === "Egg" ? 0 : AVERAGE_LEAD_CYCLE_SPEED;

export const getSimplifiedMapSetups = (species: Species): Wild3MapSetups[] => {
  if (species === "Feebas") {
    // Exclude Feebas, because catching Feebas is complex.
    return [];
  }
  return (getWild3EmeraldGameData().mapSetupsBySpecies.get(species) ?? [])
    .map(
      (setup): Wild3MapSetups => ({
        ...setup,
        actions: setup.actions.filter(
          (action) =>
            !(setup.map_data.feebas != null && isFishingAction(action)) &&
            setup.map_data.slots_by_action[wild3Actions.indexOf(action)]?.some(
              (slot) => slot.species_data.species === species,
            ),
        ),
        roamer_states: ["Inactive"],
        mass_outbreak_states: ["Inactive"],
        feebas_states: ["NotInMap"],
      }),
    )
    .filter((setup) => setup.actions.length > 0);
};

export const simplifiedSpecies = getWild3EmeraldGameData().species.filter(
  (species) => getSimplifiedMapSetups(species).length > 0,
);

const trainerIdSchema = z.number().int().min(0).max(0xffff);

export const simplifiedSearchSchema = z
  .object({
    species: z.enum(simplifiedSpecies),
    tid: trainerIdSchema
      .nullable()
      .refine((value) => value !== null, "TID is required."),
    sid: trainerIdSchema
      .nullable()
      .refine((value) => value !== null, "SID is required."),
    recommendedSetups: z.boolean(),
    maps: z.array(z.string()),
    actions: z.array(z.enum(wild3Actions)),
    leadKeys: z.array(z.string()),
  })
  .refine(
    (values) =>
      values.recommendedSetups ||
      (values.maps.length > 0 &&
        values.actions.length > 0 &&
        values.leadKeys.length > 0),
    { message: "Select at least one map, action, and lead.", path: ["maps"] },
  );

export type FormState = z.infer<typeof simplifiedSearchSchema>;
export const getSimplifiedChoices = (species: Species) => {
  const setups = getSimplifiedMapSetups(species);
  return {
    maps: uniq(setups.map((setup) => setup.map_data.map_id)),
    actions: uniq(setups.flatMap((setup) => setup.actions)),
  };
};
export const getSimplifiedInitialValues = (): FormState => ({
  species: "Abra",
  tid: null,
  sid: null,
  recommendedSetups: true,
  ...getSimplifiedChoices("Abra"),
  leadKeys: [...simplifiedLeadKeys],
});

export const buildSimplifiedSearchOptions = (
  values: FormState,
): Wild3SearcherOptions => ({
  initial_seed: 0,
  tid: trainerIdSchema.parse(values.tid),
  sid: trainerIdSchema.parse(values.sid),
  initial_advances: 1000,
  max_advances: 10_000_000,
  max_result_count: 100,
  filter: pkmFilterFieldsToRustInput({
    ...getPkmFilterInitialValues(),
    filter_shiny: "AnyShiny",
  }),
  gen3_filter: gen3PkmFilterFieldsToRustInput(
    getGen3PkmFilterInitialValues(),
    values.species,
  ),
  leads: simplifiedLeads.filter(
    (lead) =>
      values.recommendedSetups ||
      values.leadKeys.includes(isSynchronizeLead(lead) ? "Synchronize" : lead),
  ),
  map_setups: getSimplifiedMapSetups(values.species)
    .filter(
      (setup) =>
        values.recommendedSetups || values.maps.includes(setup.map_data.map_id),
    )
    .map((setup) => ({
      ...setup,
      actions: setup.actions.filter(
        (action) => values.recommendedSetups || values.actions.includes(action),
      ),
    }))
    .filter((setup) => setup.actions.length > 0),
  methods: ["Wild1", "Wild2", "Wild4"],
  cycle_opts: {
    SearchNewTarget: {
      consider_rng_manipulated_lead_pid: false,
      generate_even_if_impossible: false,
    },
  },
  painting_opts: null,
  using_white_flute: true,
  considered_safari_pokeblocks: "None",
  feebas_cycles: [0],
});

export type SelectedWildSetup = {
  targetSetup: TargetSetup;
  probability: number;
  leadCycleSpeed: number;
};

type Candidate = SelectedWildSetup & { leadOrder: number };
export const selectSimplifiedCandidate = (
  candidates: Candidate[],
): SelectedWildSetup | null => {
  // Pick the first result with probability >= 0.5.
  // If none, pick the result with highest priority.
  return (
    candidates.find((candidate) => candidate.probability > 0.5) ??
    orderBy(candidates, ["probability"], ["desc"])[0] ??
    null
  );
};

export const searchSimplifiedWild = async (
  values: FormState,
): Promise<SelectedWildSetup | null> => {
  const opts = buildSimplifiedSearchOptions(values);
  if (opts.map_setups.length === 0 || opts.leads.length === 0) {
    return null;
  }
  const groups = await rngTools.search_wild3(opts);
  const results = groups.flatMap((group) => group.vec);

  const candidates: Candidate[] = [];
  for (const res of results) {
    if (res.cycle_instability !== 0 || res.cycle_data_by_lead == null) {
      continue;
    }
    const leadCycleSpeed = getSimplifiedLeadSpeed(res.lead);
    const cycleData = await rngTools.calculate_cycle_data(
      res.cycle_data_by_lead.post_sweet_scent_range,
      res.action,
      leadCycleSpeed,
    );
    const map = opts.map_setups[res.map_idx].map_data;
    candidates.push({
      probability: cycleData.method_probability,
      leadCycleSpeed,
      leadOrder: simplifiedLeads.findIndex(
        (lead) => JSON.stringify(lead) === JSON.stringify(res.lead),
      ),
      targetSetup: {
        map: map.map_id,
        action: res.action,
        lead: res.lead,
        feebasState: res.feebas_state,
        feebasCycles: res.feebas_cycles,
        roamerState: res.roamer_state,
        massOutbreakState: res.mass_outbreak_state,
        targetPaintingAdvs: { before: 0, after: res.advance },
        targetMethod: res.method,
        requiresWhiteFlute:
          res.action === "RockSmash" &&
          doesRockSmashSetupRequireWhiteFlute(res.seed, map.rock_smash_rate),
        safariPokeblock: null,
        aceSid: null,
      },
    });
  }
  return selectSimplifiedCandidate(candidates);
};
