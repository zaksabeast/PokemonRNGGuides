import { match } from "ts-pattern";
import {
  Static4LeadInput,
  Static4Method,
  LeadAbility,
  Nature,
} from "~/rngTools";
import { z } from "zod";

const leadInputs = [
  "None",
  "CutecharmF",
  "CutecharmM",
  "Synchronize",
] as const satisfies Static4LeadInput[];

export const static4LeadSchema = z.enum(leadInputs);

type LeadOption = { label: string; value: Static4LeadInput };

export const leadOptions = [
  { label: "No Lead", value: "None" },
  { label: "Cute Charm (Female)", value: "CutecharmF" },
  { label: "Cute Charm (Male)", value: "CutecharmM" },
  { label: "Synchronize", value: "Synchronize" },
] as const satisfies LeadOption[];

const noLeadOptions = [
  { label: "No Lead", value: "None" },
] as const satisfies LeadOption[];

export const getLeadOptions = (method: Static4Method) => {
  if (method === "One") {
    return noLeadOptions;
  }

  return leadOptions;
};

export const leadOptionToRust = ({
  lead,
  syncNature,
}: {
  lead: Static4LeadInput;
  syncNature: Nature;
}) => {
  return match<Static4LeadInput, LeadAbility>(lead)
    .with("None", () => "None")
    .with("CutecharmF", () => "CutecharmF")
    .with("CutecharmM", () => "CutecharmM")
    .with("Synchronize", () => ({ Synchronize: syncNature }))
    .with("Pressure", () => "Pressure")
    .exhaustive();
};
