import { z } from "zod";
import { type SeedTime4 } from "~/rngTools";
import { type ResultColumn } from "~/components";
import { Translations } from "~/translations";
import { rngDate, RngDateSchema, rngTime, RngTimeSchema } from "~/utils/time";
import {
  type SelectGen4SeedOpts,
  SelectGen4SeedButton,
} from "./selectSeedButton";

export type SeedTimeSearchRow = {
  id: string;
  seed: number;
  seedTime: SeedTime4;
};

export const seedTimeSearchValidator = z.object({
  date: RngDateSchema,
  time: RngTimeSchema,
  minDelay: z.number().int().min(0),
  maxDelay: z.number().int().min(0),
  minSeconds: z.number().int().min(0).max(59),
  maxSeconds: z.number().int().min(0).max(60),
  filterItemCount: z.number().int().min(0),
});

export type SeedTimeSearchFormState = z.infer<typeof seedTimeSearchValidator>;

export const seedTimeSearchInitialValues: SeedTimeSearchFormState = {
  date: rngDate(),
  time: rngTime(),
  minDelay: 600,
  maxDelay: 800,
  minSeconds: 0,
  maxSeconds: 0,
  filterItemCount: 20,
};

export const getSeedTimeSearchColumns = (
  t: Translations,
  selectOpts: SelectGen4SeedOpts,
): ResultColumn<SeedTimeSearchRow>[] => [
  {
    title: t["Select"],
    dataIndex: "id",
    render: (_, record) => (
      <SelectGen4SeedButton seedTime={record.seedTime} {...selectOpts} />
    ),
  },
  {
    title: t["Seed"],
    dataIndex: "seed",
    render: (seed) => seed.toString(16).toUpperCase().padStart(8, "0"),
  },
];
