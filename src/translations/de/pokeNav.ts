import type {
  PokeNavTrainerTranslationPair,
  PokeNavTrainerTranslations,
} from "../en/pokeNav";

const withTitle: PokeNavTrainerTranslations = {
  None: "Niemand",
  AromaLadyRose: "Aromalady Rosemarie",
  RuinManiacAndres: "Ruinenmaniac Maik",
  RuinManiacDusty: "Ruinenmaniac Rüdiger",
  TuberLola: "Planscher Lola",
  TuberRicky: "Planscher Günther",
  SisAndBroLilaRoy: "Geschwister Karl & Maria",
  CoolTrainerCristin: "Ass-Trainer Rebecca",
  CoolTrainerBrooke: "Ass-Trainer Veronika",
  CoolTrainerWilton: "Ass-Trainer Pascal",
  HexManiacValerie: "Hexe Tabitha",
  LadyCindy: "Lady Patrizia",
  BeautyThalia: "Schönheit Halle",
  BeautyJessica: "Schönheit Germaine",
  RichBoyWinston: "Schnösel Rene",
  PokemaniacSteve: "Pokémaniac Hiro",
  SwimmerTony: "Schwimmer Kevin",
  BlackBeltNob: "Schwarzgurt Minoru",
  BlackBeltKoji: "Schwarzgurt Remigius",
  GuitaristFernando: "Gitarrist Kerry",
  GuitaristDalton: "Gitarrist Bob",
  KindlerBernie: "Hitzkopf Hasso",
  CamperEthan: "Camper Ewald",
  OldCoupleJohnJay: "Altes Paar Urs & Evi",
  BugManiacJeffrey: "Käfermaniac Bruno",
  PsychicCameron: "Psycho Maximilian",
  PsychicJacki: "Psycho Kornelia",
  GentlemanWalter: "Gentleman Abraham",
  SchoolKidKaren: "Schulkind Kerstin",
  SchoolKidJerry: "Schulkind Orlando",
  SrAndJrAnnaMeg: "Sen. & Jun. Irm & Ida",
  PokefanIsabel: "Pokéfan Isabel",
  PokefanMiguel: "Pokéfan Miguel",
  ExpertTimothy: "Experte Theobald",
  ExpertShelby: "Experte Waltraud",
  YoungsterCalvin: "Teenager Ansgar",
  FishermanElliot: "Angler Alois",
  TriathleteIsaiah: "Triathlet Kaspar",
  TriathleteMaria: "Triathlet Jutta",
  TriathleteAbigail: "Triathlet Irmgard",
  TriathleteDylan: "Triathlet Igor",
  TriathleteKatelyn: "Triathlet Mechthild",
  TriathleteBenjamin: "Triathlet Egidius",
  TriathletePablo: "Triathlet Pablo",
  DragonTamerNicolas: "Drachenprofi Alfons",
  BirdKeeperRobert: "Vogelfänger Fritjof",
  NinjaBoyLao: "Ninjajunge Eduard",
  BattleGirlCyndy: "Kämpferin Elfi",
  ParasolLadyMadeline: "Schirmdame Saskia",
  SwimmerJenny: "Schwimmerin Monika",
  PicknickerDiana: "Picknicker Gwendolin",
  TwinsAmyLiv: "Zwillinge Nora & Jo",
  SailorErnest: "Matrose Elert",
  SailorCory: "Matrose Mario",
  CollectorEdwin: "PKMN-Sammler Edwin",
  PkmnBreederLydia: "PKMN-Züchter Lydia",
  PkmnBreederIsaac: "PKMN-Züchter Blasius",
  PkmnBreederGabrielle: "PKMN-Züchter Agnes",
  PkmnRangerCatherine: "PKMN-Ranger Hannelore",
  PkmnRangerJackson: "PKMN-Ranger Eckbert",
  LassHaley: "Göre Elisa",
  BugCatcherJames: "Käfersammler Gernot",
  HikerTrent: "Wanderer Heimke",
  HikerSawyer: "Wanderer Alex",
  YoungCoupleKiraDan: "Junges Glück Jule & Max",
};

const withoutTitle: PokeNavTrainerTranslations = {
  None: "Niemand",
  AromaLadyRose: "Rosemarie",
  RuinManiacAndres: "Maik",
  RuinManiacDusty: "Rüdiger",
  TuberLola: "Lola",
  TuberRicky: "Günther",
  SisAndBroLilaRoy: "Karl & Maria",
  CoolTrainerCristin: "Rebecca",
  CoolTrainerBrooke: "Veronika",
  CoolTrainerWilton: "Pascal",
  HexManiacValerie: "Tabitha",
  LadyCindy: "Patrizia",
  BeautyThalia: "Halle",
  BeautyJessica: "Germaine",
  RichBoyWinston: "Rene",
  PokemaniacSteve: "Hiro",
  SwimmerTony: "Kevin",
  BlackBeltNob: "Minoru",
  BlackBeltKoji: "Remigius",
  GuitaristFernando: "Kerry",
  GuitaristDalton: "Bob",
  KindlerBernie: "Hasso",
  CamperEthan: "Ewald",
  OldCoupleJohnJay: "Urs & Evi",
  BugManiacJeffrey: "Bruno",
  PsychicCameron: "Maximilian",
  PsychicJacki: "Kornelia",
  GentlemanWalter: "Abraham",
  SchoolKidKaren: "Kerstin",
  SchoolKidJerry: "Orlando",
  SrAndJrAnnaMeg: "Irm & Ida",
  PokefanIsabel: "Isabel",
  PokefanMiguel: "Miguel",
  ExpertTimothy: "Theobald",
  ExpertShelby: "Waltraud",
  YoungsterCalvin: "Ansgar",
  FishermanElliot: "Alois",
  TriathleteIsaiah: "Kaspar",
  TriathleteMaria: "Jutta",
  TriathleteAbigail: "Irmgard",
  TriathleteDylan: "Igor",
  TriathleteKatelyn: "Mechthild",
  TriathleteBenjamin: "Egidius",
  TriathletePablo: "Pablo",
  DragonTamerNicolas: "Alfons",
  BirdKeeperRobert: "Fritjof",
  NinjaBoyLao: "Eduard",
  BattleGirlCyndy: "Elfi",
  ParasolLadyMadeline: "Saskia",
  SwimmerJenny: "Monika",
  PicknickerDiana: "Gwendolin",
  TwinsAmyLiv: "Nora & Jo",
  SailorErnest: "Elert",
  SailorCory: "Mario",
  CollectorEdwin: "Edwin",
  PkmnBreederLydia: "Lydia",
  PkmnBreederIsaac: "Blasius",
  PkmnBreederGabrielle: "Agnes",
  PkmnRangerCatherine: "Hannelore",
  PkmnRangerJackson: "Eckbert",
  LassHaley: "Elisa",
  BugCatcherJames: "Gernot",
  HikerTrent: "Heimke",
  HikerSawyer: "Alex",
  YoungCoupleKiraDan: "Jule & Max",
};

export const pokeNavTrainers: PokeNavTrainerTranslationPair = {
  withTitle,
  withoutTitle,
};
