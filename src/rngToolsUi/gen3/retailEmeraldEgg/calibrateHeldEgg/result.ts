import * as tst from "ts-toolbelt";
import { Gen3HeldEgg } from "~/rngTools";

export type HeldEggCalibrationResult = tst.O.Nullable<
  tst.O.Merge<
    tst.O.Required<Partial<Gen3HeldEgg>, "advance" | "match_call">,
    { id: string; advanceOffset: number; redrawOffset: number | null }
  >,
  "redraws"
>;
