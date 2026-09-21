import { z } from "zod";
import { atomWithPersistence } from "./localStorage";

const MultiTimerStateSchema = z
  .object({
    showAllTimers: z.boolean(),
    maxBeepCount: z.number().optional(),
  })
  .transform((obj) => ({
    ...obj,
    maxBeepCount: obj.maxBeepCount ?? 5,
  }));

export type MultiTimerState = z.infer<typeof MultiTimerStateSchema>;

export const multiTimerStateAtom = atomWithPersistence(
  "multiTimerState",
  MultiTimerStateSchema,
  { showAllTimers: false, maxBeepCount: 5 },
);
