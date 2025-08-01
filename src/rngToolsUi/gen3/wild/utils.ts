import { Gender, Gen3EncounterType } from "~/rngTools";
import { match } from "ts-pattern";

import { getWild3GameData } from "./wild3GameData";
import emerald_wild3_game_data from "~/__generated__/emerald_wild3_game_data";
import { startCase } from "lodash-es";

export const gen3EncounterTypes = [
  "Land",
  "Water",
  "OldRod",
  "GoodRod",
  "SuperRod",
  "RockSmash",
] as const satisfies readonly Gen3EncounterType[];

export const cuteCharmGenders = [
  "Male",
  "Female",
] as const satisfies readonly Gender[];

export const emeraldWildGameData = getWild3GameData(emerald_wild3_game_data);

export const formatMapName = (label: string) => {
  return label
    .split("_")
    .map((piece) =>
      piece.match(/(?:B)?\d+F/) != null
        ? piece
        : startCase(piece.toLowerCase()),
    )
    .join(" ")
    .replace(/^Map /, "");
};

export const formatEncounterTypeName = (encounterType: Gen3EncounterType) => {
  return match(encounterType)
    .with("OldRod", () => "Old Rod")
    .with("GoodRod", () => "Good Rod")
    .with("SuperRod", () => "Super Rod")
    .with("RockSmash", () => "Rock Smash")
    .otherwise(() => encounterType);
};
