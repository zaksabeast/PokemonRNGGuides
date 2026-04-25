import {
  Gen3Lead,
  Gen3Method,
  Wild3Action,
  Wild3FeebasState,
  Wild3MassOutbreakState,
  Wild3RoamerState,
} from "~/rngTools";

export type TargetSetup = {
  map: string;
  action: Wild3Action;
  feebasState: Wild3FeebasState;
  roamerState: Wild3RoamerState;
  massOutbreakState: Wild3MassOutbreakState;
  lead: Gen3Lead;
  targetPaintingAdvs: { before: number; after: number };
  targetMethod: Gen3Method;
  usingAverageLeadCycleSpeed: boolean;
  leadCycleSpeed: number;
};
