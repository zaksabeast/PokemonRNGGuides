import {
  Pokerus3GeneratorResult,
  Pokerus3SearcherForCalibOptions,
  rngTools,
} from "~/rngTools";
import type { CalibrationOptions } from "./pokerus_emerald_calibration";
import type {
  Pokerus3Setup,
  SetupOptions,
  YesNoUnknown,
} from "./pokerus_emerald_select_setup";
import { lcrng_distance } from "~/utils/lcrng";
import { pickupItems_emerald } from "~/types/pickupItems";
import { match } from "ts-pattern";

export type Pokerus3Column = Pokerus3GeneratorResult & {
  advance_before_pickup: number;
  target_advance_before_pickup: number;
  frame_before_painting: number;
  leadPickupLvlIndex: number;
};

let nextUid = 0;

export const estimateSetupWaitFrames = (
  frameBeforePainting: number,
  advancesAfterPainting: number,
  enteredHallOfFame: boolean,
) => {
  if (frameBeforePainting !== 0) {
    return (frameBeforePainting + 3600 * 5) * 10 + advancesAfterPainting / 2;
  }

  return enteredHallOfFame
    ? advancesAfterPainting / 2 + 3600 * 3
    : advancesAfterPainting * 20;
};

const boolTextToVal = (val: YesNoUnknown) => {
  return match(val)
    .with("Yes", () => true)
    .with("No", () => false)
    .with("Unknown", () => null)
    .exhaustive();
};

export const findOptimalSetups = async (
  values: SetupOptions,
): Promise<Pokerus3Setup[]> => {
  const results = await rngTools.gen3_pokerus_search_reverse({
    consider_painting_reseeding: values.consider_painting_reseeding,
    considered_setups: {
      entered_hall_of_fame: values.entered_hall_of_fame,
      can_have_new_mass_outbreak: boolTextToVal(
        values.can_have_new_mass_outbreak,
      ),
      has_empty_pokenews_slot: boolTextToVal(values.has_empty_pokenews_slot),
      permit_level_up: values.permit_level_up,
      // Ignore low pickup_pokemon_count to improve performance. They are unlikely to have good calibration.
      pickup_pokemon_count:
        values.max_pickup_pokemon_count === 6 ? [4, 5, 6] : [3, 4, 5],
    },
    max_result_count: 100,
  });

  return results.map((setup) => ({
    ...setup,
    encounter_type: values.encounter_type,
    uid: nextUid++,
    has_unknown_can_have_new_mass_outbreak:
      values.can_have_new_mass_outbreak === "Unknown",
    has_unknown_has_empty_pokenews_slot:
      values.has_empty_pokenews_slot === "Unknown",
  }));
};

export const generateResults = async (
  values: CalibrationOptions,
  setup: Pokerus3Setup,
  filterActive: boolean,
): Promise<Pokerus3Column[]> => {
  const { leadPickupLvlIndex } = values;

  const advFromPainting = lcrng_distance(
    0,
    setup.target_advs.frame_before_painting,
  );
  const targetAdv = advFromPainting + setup.target_advs.adv_after_painting;

  if (filterActive) {
    const filterItems = [
      values.filter_pickup_items_0,
      values.filter_pickup_items_1,
      values.filter_pickup_items_2,
      values.filter_pickup_items_3,
      values.filter_pickup_items_4,
      values.filter_pickup_items_5,
    ];

    const opts: Pokerus3SearcherForCalibOptions = {
      initial_advance_before_pickup: Math.max(0, targetAdv - 1000),
      max_advances: 110_000,
      gen_opts: setup.gen_opts,
      max_result_count: 110_000,
      filter_pickup_items: filterItems
        .slice(0, setup.gen_opts.pickup_pokemon_count)
        .map((item, slot) =>
          pickupItems_emerald[slot === 0 ? leadPickupLvlIndex : 0].indexOf(
            item,
          ),
        ),
      filter_gives_pokerus: undefined,
    };

    const results = await rngTools.gen3_pokerus_search_for_calib(opts);
    return results
      .map((result) => ({
        ...result,
        advance_before_pickup: lcrng_distance(0, result.seed_at_pickup),
        target_advance_before_pickup: targetAdv,
        frame_before_painting: setup.target_advs.frame_before_painting,
        leadPickupLvlIndex,
      }))
      .sort(
        (res1, res2) =>
          Math.abs(res1.advance_before_pickup - targetAdv) -
          Math.abs(res2.advance_before_pickup - targetAdv),
      );
  }

  const maxCount = Math.max(
    1,
    values.maximum_advances - values.minimum_advances,
  );
  const opts: Pokerus3SearcherForCalibOptions = {
    initial_advance_before_pickup: advFromPainting + values.minimum_advances,
    max_advances: maxCount,
    gen_opts: setup.gen_opts,
    max_result_count: maxCount,
    filter_pickup_items: undefined,
    filter_gives_pokerus: undefined,
  };
  const results = await rngTools.gen3_pokerus_search_for_calib(opts);
  const sortedResults = results
    .map((result) => ({
      ...result,
      advance_before_pickup: lcrng_distance(0, result.seed_at_pickup),
      target_advance_before_pickup: targetAdv,
      frame_before_painting: setup.target_advs.frame_before_painting,
      leadPickupLvlIndex,
    }))
    .sort(
      (res1, res2) => res1.advance_before_pickup - res2.advance_before_pickup,
    );
  return sortedResults;
};
