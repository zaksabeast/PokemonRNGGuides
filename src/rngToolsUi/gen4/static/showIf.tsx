import { useStatic4Target } from "./state";
import { normalizeTargetLead } from "./utils";

type Static4ShowIfLeadSyncProps = {
  lead?: string; // Not a strict type in case mdx has bad value
  children?: React.ReactNode;
};

export const Static4ShowIfLead = ({
  lead,
  children,
}: Static4ShowIfLeadSyncProps) => {
  const static4Target = useStatic4Target();
  const normalizedLead = normalizeTargetLead(
    static4Target?.details.lead ?? "None",
  );

  if (lead === normalizedLead) {
    return <>{children}</>;
  }

  return null;
};
