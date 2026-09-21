import { z } from "zod";

export const TimerStateSchema = z.object({
  milliseconds: z.array(z.number()),
  minutesBeforeTarget: z.number(),
});

export type TimerState = z.infer<typeof TimerStateSchema>;

export const initialTimerState: TimerState = {
  milliseconds: [],
  minutesBeforeTarget: 0,
};
