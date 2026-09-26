import { type IconName } from "./icons";

export const consoleIcons = {
  GB: "VideogameAsset",
  GBA: "Gamepad",
  Gamecube: "GameController",
  NDS: "Laptop",
  "3DS": "LaptopMedical",
  Switch: "OutlineTablet",
} as const satisfies Record<string, IconName>;

export type Console = keyof typeof consoleIcons;
