import { z } from "zod";
import { Calibrator, newCalibrator } from "./calibrator";

const GBA_FPS: number = 59.7275;
const NDS_SLOT1_FPS: number = 59.8261;
const NDS_SLOT2_FPS: number = 59.6555;

const MS_PER_GBA_FRAME: number = 1000 / GBA_FPS;
const MS_PER_NDS_SLOT1_FRAME: number = 1000 / NDS_SLOT1_FPS;
const MS_PER_NDS_SLOT2_FRAME: number = 1000 / NDS_SLOT2_FPS;

const CONSOLE_MS_PER_FRAME = {
  Gba: MS_PER_GBA_FRAME,
  NdsSlot1: MS_PER_NDS_SLOT1_FRAME,
  NdsSlot2: MS_PER_NDS_SLOT2_FRAME,
  Dsi: MS_PER_NDS_SLOT1_FRAME,
  ThreeDs: MS_PER_NDS_SLOT1_FRAME,
} as const satisfies Record<string, number>;

export type GameConsole = keyof typeof CONSOLE_MS_PER_FRAME;

export const getConsoleCalibrator = (console: GameConsole): Calibrator => {
  return newCalibrator(CONSOLE_MS_PER_FRAME[console]);
};

export const ZodConsole = z.enum([
  "NdsSlot1",
  "Dsi",
  "ThreeDs",
  "Gba",
  "NdsSlot2",
]) satisfies z.Schema<GameConsole>;
