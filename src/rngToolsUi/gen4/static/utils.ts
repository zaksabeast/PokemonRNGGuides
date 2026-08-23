import { LeadAbility } from "~/rngTools";
import { match, P } from "ts-pattern";

type NormalizedLead = "Cutecharm" | "Synchronize" | "None" | "Pressure";

export const normalizeTargetLead = (lead: LeadAbility): NormalizedLead => {
  return match<LeadAbility, NormalizedLead>(lead)
    .with("CutecharmF", () => "Cutecharm")
    .with("CutecharmM", () => "Cutecharm")
    .with("None", () => "None")
    .with("Pressure", () => "Pressure")
    .with({ Synchronize: P.any }, () => "Synchronize")
    .exhaustive();
};
