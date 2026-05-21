import { PickUpItem } from "~/rngTools";
import { match } from "ts-pattern";

export const pickupItems = [
  "None",
  "SuperPotion",
  "FullHeal",
  "UltraBall",
  "RareCandy",
  "FullRestore",
  "Revive",
  "Nugget",
  "Protein",
  "PpUp",
  "KingsRock",
] as const satisfies PickUpItem[];

export const pickupIdToName = (id: PickUpItem) => {
  return match(id)
    .with("None", () => "None")
    .with("SuperPotion", () => "Super Potion")
    .with("FullHeal", () => "Full Heal")
    .with("UltraBall", () => "Ultra Ball")
    .with("RareCandy", () => "Rare Candy")
    .with("FullRestore", () => "Full Restore")
    .with("Revive", () => "Revive")
    .with("Nugget", () => "Nugget")
    .with("Protein", () => "Protein")
    .with("PpUp", () => "PP Up")
    .with("KingsRock", () => "King's Rock")
    .otherwise(() => "Unknown Item");
};
