import { atom, useAtom } from "jotai";
import {
  PokeNavTrainer,
  Gen3HeldEgg,
  Nature,
  Species,
  Compatability,
  Gen3PickupMethod,
} from "~/rngTools";
import { atomWithPersistence } from "~/state/localStorage";
import { maxIvs } from "~/types/ivs";
import { z } from "zod";
import { NullableIvs } from "~/components/ivInput";

// This is the order shown by the game
const trainers = [
  "AromaLadyRose",
  "RuinManiacAndres",
  "RuinManiacDusty",
  "TuberLola",
  "TuberRicky",
  "SisAndBroLilaRoy",
  "CoolTrainerCristin",
  "CoolTrainerBrooke",
  "CoolTrainerWilton",
  "HexManiacValerie",
  "LadyCindy",
  "BeautyThalia",
  "BeautyJessica",
  "RichBoyWinston",
  "PokemaniacSteve",
  "SwimmerTony",
  "BlackBeltNob",
  "BlackBeltKoji",
  "GuitaristFernando",
  "GuitaristDalton",
  "KindlerBernie",
  "CamperEthan",
  "OldCoupleJohnJay",
  "BugManiacJeffrey",
  "PsychicCameron",
  "PsychicJacki",
  "GentlemanWalter",
  "SchoolKidKaren",
  "SchoolKidJerry",
  "SrAndJrAnnaMeg",
  "PokefanIsabel",
  "PokefanMiguel",
  "ExpertTimothy",
  "ExpertShelby",
  "YoungsterCalvin",
  "FishermanElliot",
  "TriathleteIsaiah",
  "TriathleteMaria",
  "TriathleteAbigail",
  "TriathleteDylan",
  "TriathleteKatelyn",
  "TriathleteBenjamin",
  "TriathletePablo",
  "DragonTamerNicolas",
  "BirdKeeperRobert",
  "NinjaBoyLao",
  "BattleGirlCyndy",
  "ParasolLadyMadeline",
  "SwimmerJenny",
  "PicknickerDiana",
  "TwinsAmyLiv",
  "SailorErnest",
  "SailorCory",
  "CollectorEdwin",
  "PkmnBreederLydia",
  "PkmnBreederIsaac",
  "PkmnBreederGabrielle",
  "PkmnRangerCatherine",
  "PkmnRangerJackson",
  "LassHaley",
  "BugCatcherJames",
  "HikerTrent",
  "HikerSawyer",
  "YoungCoupleKiraDan",
] as const satisfies PokeNavTrainer[];

export const pokeNavTrainers = trainers;

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
  female_nature: Nature;
  female_has_everstone: boolean;
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
    female_has_everstone: false,
    female_nature: "Adamant",
    has_lightning_rod: false,
    has_roamer: false,
  },
};

const heldEggAtom = atom(initialHeldState);

export const useHeldEggState = () => useAtom(heldEggAtom);

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
