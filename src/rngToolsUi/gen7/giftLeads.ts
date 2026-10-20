import { match } from "ts-pattern";
import { z } from "zod";
import { Nature } from "~/rngTools";
import { Translations } from "~/translations";

const gen7GiftLeads = ["None", "Synchronize"] as const;

export const gen7GiftLeadSchema = z.enum(gen7GiftLeads);

type Gen7GiftLead = z.infer<typeof gen7GiftLeadSchema>;

export const getGen7GiftLeadOptions = (t: Translations) =>
  [
    { label: t["Ordinary lead"], value: "None" },
    { label: t["Synchronize"], value: "Synchronize" },
  ] as const satisfies { label: string; value: Gen7GiftLead }[];

export const getSyncNature = ({
  lead,
  syncNature,
}: {
  lead: Gen7GiftLead;
  syncNature: Nature;
}): Nature | null =>
  match(lead)
    .with("None", () => null)
    .with("Synchronize", () => syncNature)
    .exhaustive();
