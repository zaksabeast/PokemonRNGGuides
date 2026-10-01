import { atom, useAtom, SetStateAction } from "jotai";
import {
  Gen3HeldEgg,
  Species,
  Compatability,
  Gen3PickupMethod,
} from "~/rngTools";
import { atomWithPersistence } from "~/state/localStorage";
import { maxIvs } from "~/types/ivs";
import { z } from "zod";
import { NullableIvs } from "~/components/ivInput";
import type { HeldEggCalibrationResult } from "./calibrateHeldEgg/result";
import type { HeldEggCalibrationFilters } from "./calibrateHeldEgg/validator";
import { pokeNavTrainers as trainers } from "./constants";

export const RegisteredPokeNavTrainersSchema = z.object({
  registeredTrainers: z.enum(trainers).array(),
});

export type RegisteredPokeNavTrainers = z.infer<
  typeof RegisteredPokeNavTrainersSchema
>;

const initialTrainers: RegisteredPokeNavTrainers = {
  registeredTrainers: [],
};

const registeredTrainers = atomWithPersistence(
  "emerald_pokenav_trainers",
  RegisteredPokeNavTrainersSchema,
  initialTrainers,
);

export const useRegisteredTrainers = () => useAtom(registeredTrainers);

type HeldEggSettings = {
  compatability: Compatability;
  egg_species: Species;
  has_lightning_rod: boolean;
  has_roamer: boolean;
};

export type HeldEggState = {
  seed: number;
  target: Gen3HeldEgg | null;
  eggSettings: HeldEggSettings;
};

const initialHeldState: HeldEggState = {
  seed: 0,
  target: null,
  eggSettings: {
    compatability: "DontLikeEachOther",
    egg_species: "Bulbasaur",
    has_lightning_rod: false,
    has_roamer: false,
  },
};

export type HeldEggCalibrationSearch = {
  calibration: number;
  initialAdvances: number;
  maxAdvances: number;
  minRedraw: number | null;
  maxRedraw: number | null;
};

export type HeldEggCalibrationState = {
  // These values are only for debug purposes.
  // They might be out of sync with the user's display.
  debug: {
    filters: HeldEggCalibrationFilters | null;
    search: HeldEggCalibrationSearch | null;
  } | null;
  results: HeldEggCalibrationResult[] | null;
  previousOffsets: number[] | null;
};

export const initialCalibrationState: HeldEggCalibrationState = {
  debug: null,
  results: null,
  previousOffsets: null,
};

const heldEggCalibrationAtom = atom(initialCalibrationState);

const baseHeldEggAtom = atom(initialHeldState);

// Calibration results are relative to the held egg state,
// so changing the state invalidates them.
const heldEggAtom = atom(
  (get) => get(baseHeldEggAtom),
  (get, set, update: SetStateAction<HeldEggState>) => {
    const prev = get(baseHeldEggAtom);
    const next = typeof update === "function" ? update(prev) : update;
    set(baseHeldEggAtom, next);
    set(heldEggCalibrationAtom, initialCalibrationState);
  },
);

export const useHeldEggState = () => useAtom(heldEggAtom);

export const useHeldEggCalibrationState = () => useAtom(heldEggCalibrationAtom);

export type PickupEggState = {
  seed: number;
  targetAdvance: number;
  targetMethod: Gen3PickupMethod;
  parentIvs: [NullableIvs, NullableIvs];
};

const initialPickupState: PickupEggState = {
  seed: 0,
  targetAdvance: 0,
  targetMethod: "EmeraldBred",
  parentIvs: [maxIvs, maxIvs],
};

const pickupEggAtom = atom(initialPickupState);

export const usePickupEggState = () => useAtom(pickupEggAtom);
