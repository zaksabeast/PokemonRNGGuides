import { LeadAbility } from "~/rngTools";
import { Gen4ShowIf, Gen4ShowIfProps } from "../shared/gen4ShowIf";
import { Static4State, useStatic4State } from "./state";
import { match, P } from "ts-pattern";

type Static4ShowIfProps = Gen4ShowIfProps<Static4State>;

export const Static4ShowIf = (props: Omit<Static4ShowIfProps, "state">) => {
  const [state] = useStatic4State();
  return <Gen4ShowIf state={state} {...props} />;
};

type NormalizedLead = "Cutecharm" | "Synchronize" | "None";

const normalizeTargetLead = (lead: LeadAbility): NormalizedLead => {
  return match<LeadAbility, NormalizedLead>(lead)
    .with("CutecharmF", () => "Cutecharm")
    .with("CutecharmM", () => "Cutecharm")
    .with("None", () => "None")
    .with({ Synchronize: P.any }, () => "Synchronize")
    .exhaustive();
};

type Static4ShowIfLeadSyncProps = {
  lead?: string; // Not a strict type in case mdx has bad value
  children?: React.ReactNode;
};

export const Static4ShowIfLead = ({
  lead,
  children,
}: Static4ShowIfLeadSyncProps) => {
  const [state] = useStatic4State();
  const normalizedLead = normalizeTargetLead(state.target?.lead ?? "None");

  if (lead === normalizedLead) {
    return <>{children}</>;
  }

  return null;
};
