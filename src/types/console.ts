import { GBA_FPS, NDS_SLOT2_FPS } from "../utils/consts";

export type Gen3Console = "GBA" | "NDS" | "mGBA_60" | "mGBA_Native";

export const gen3Consoles = [
  "GBA",
  "NDS",
  "mGBA_60",
  "mGBA_Native",
] as const satisfies Gen3Console[];

export const gen3ConsoleFpsMap = {
  GBA: GBA_FPS,
  NDS: NDS_SLOT2_FPS,
  mGBA_60: 60,
  mGBA_Native: GBA_FPS,
} as const satisfies Record<Gen3Console, number>;

export const gen3ConsoleOptions: {
  label: string;
  value: Gen3Console;
}[] = [
  { label: "GBA", value: "GBA" },
  { label: "NDS - GBA Slot", value: "NDS" },
  { label: "mGBA (60 FPS target)", value: "mGBA_60" },
  { label: "mGBA (Native FPS target)", value: "mGBA_Native" },
];
