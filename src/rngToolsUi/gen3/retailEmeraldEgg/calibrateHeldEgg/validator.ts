import { z } from "zod";
import { pokeNavTrainers } from "../constants";
import { gender, nature } from "~/types";

export const Validator = z.object({
  pokeNavCall: z.enum([...pokeNavTrainers, "None"]),
  hasEgg: z.enum(["true", "false"]),
  gender: z.enum(gender),
  nature: z.enum(nature),
  advanceRange: z.number().min(0),
  redrawRange: z.number().min(0),
  calibration: z.number().nullable(),
});

export type HeldEggCalibrationFilters = z.infer<typeof Validator>;
