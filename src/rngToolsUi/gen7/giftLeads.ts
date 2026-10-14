import { Nature } from "~/rngTools";
import { Translations } from "~/translations";
import { nature } from "~/types/nature";

export const ORDINARY_LEAD_IDX = 0;

// Limitation: a Select value must be a primitive, so leads are picked by index.
// Index 0 is an ordinary lead, then one Synchronize lead per nature.
export const GEN7_GIFT_LEAD_COUNT = nature.length + 1;

export const getGen7GiftLeadOptions = (t: Translations) => [
  { label: t["Ordinary lead"], value: ORDINARY_LEAD_IDX },
  ...nature.map((syncNature, index) => ({
    label: t["Synchronize ({nature})"].replace("{nature}", syncNature),
    value: index + 1,
  })),
];

export const getSyncNature = (leadIdx: number): Nature | null =>
  leadIdx === ORDINARY_LEAD_IDX ? null : (nature[leadIdx - 1] ?? null);
