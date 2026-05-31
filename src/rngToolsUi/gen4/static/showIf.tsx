import { useStatic4State } from "./state";
import { normalizeTargetLead } from "./utils";

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
