import { z } from "zod";
import { RngDateSchema, RngTimeSchema } from "~/utils/time";
import { GEN5_BUTTONS } from "~/rngToolsUi/gen5/constants";

export const Profile5Validator = z.object({
  mac: z.number(),
  max_timer0: z.number().min(0).max(0xffff, "Must be between 0 and 0xffff"),
  min_timer0: z.number().min(0).max(0xffff, "Must be between 0 and 0xffff"),
  max_gx_stat: z.number().min(0).max(0x63, "Must be between 0 and 0x63"),
  min_gx_stat: z.number().min(0).max(0x63, "Must be between 0 and 0x63"),
  max_seconds: z.number().min(0).max(60),
  min_seconds: z.number().min(0).max(60),
  max_v_count: z.number().min(0).max(0xff, "Must be between 0 and 0xff"),
  min_v_count: z.number().min(0).max(0xff, "Must be between 0 and 0xff"),
  min_v_frame: z.number().min(0).max(0x63, "Must be between 0 and 0x63"),
  max_v_frame: z.number().min(0).max(0x63, "Must be between 0 and 0x63"),
  date: RngDateSchema,
  time: RngTimeSchema,
  buttons: z.enum(GEN5_BUTTONS).array(),
});

export type Profile5ValidatorFormState = z.infer<typeof Profile5Validator>;

export const initialProfile5Values: Profile5ValidatorFormState = {
  mac: 0,
  max_timer0: 0,
  min_timer0: 0,
  max_gx_stat: 0,
  min_gx_stat: 0,
  max_seconds: 0,
  min_seconds: 0,
  max_v_count: 0,
  min_v_count: 0,
  min_v_frame: 0,
  max_v_frame: 0,
  buttons: [],
  date: {
    day: 1,
    month: 1,
    year: 2000,
  },
  time: {
    hour: 0,
    minute: 0,
    second: 0,
  },
};
