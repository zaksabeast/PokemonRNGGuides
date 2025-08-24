import {
  Gen3Lead,
  Gender,
  Wild3Action,
  Wild3FeebasState,
  Wild3MassOutbreakState,
  Wild3RoamerState,
} from "~/rngTools";
import { startCase } from "lodash-es";
import { match, P } from "ts-pattern";
import { nature } from "~/types";

export const formatMapName = (label: string) => {
  return label
    .split("_")
    .map((piece) =>
      piece.match(/(?:B)?\d+F/) != null
        ? piece
        : startCase(piece.toLowerCase()),
    )
    .join(" ")
    .replace(/^Map /, "");
};

// order is important and must match rust
export const wild3Actions = [
  "SweetScentLand",
  "SweetScentWater",
  "OldRod",
  "GoodRod",
  "SuperRod",
  "RockSmash",
] as const satisfies readonly Wild3Action[];

export const formatActionName = (action: Wild3Action) => {
  return match(action)
    .with("SweetScentLand", () => "Sweet Scent on Land")
    .with("SweetScentWater", () => "Sweet Scent on Water")
    .with("OldRod", () => "Old Rod")
    .with("GoodRod", () => "Good Rod")
    .with("SuperRod", () => "Super Rod")
    .with("RockSmash", () => "Rock Smash")
    .exhaustive();
};

export const cuteCharmGenders = [
  "Male",
  "Female",
] as const satisfies readonly Gender[];

export const wild3FeebasStates = [
  "NotInMap",
  "OnFeebasTile",
  "InMapButNotOnFeebasTile",
] as const satisfies readonly Wild3FeebasState[];

export const formatFeebasStateName = (state: Wild3FeebasState) => {
  return match(state)
    .with("NotInMap", () => "Not in Route 119")
    .with("OnFeebasTile", () => "On Feebas tile")
    .with(
      "InMapButNotOnFeebasTile",
      () => "In Route 119 but not on Feebas tile",
    )
    .exhaustive();
};

export const wild3RoamerStates = [
  "Inactive",
  "ActiveNotInMap",
  "ActiveInMapLatios",
  "ActiveInMapLatias",
] as const satisfies readonly Wild3RoamerState[];

export const formatRoamerStateName = (state: Wild3RoamerState) => {
  return match(state)
    .with("Inactive", () => "Inactive")
    .with("ActiveNotInMap", () => "Roaming in another map")
    .with("ActiveInMapLatios", () => "Roaming in map (Latios)")
    .with("ActiveInMapLatias", () => "Roaming in map (Latias)")
    .exhaustive();
};

export const gen3Leads = [
  "Vanilla",
  "Egg",
  "MagnetPull",
  "Static",
  "HustleVitalSpiritPressure",
  ...cuteCharmGenders.map((gender) => ({ CuteCharm: gender })),
  ...nature.map((nat) => ({ Synchronize: nat })),
] as const satisfies readonly Gen3Lead[];

export const formatLeadName = (lead: Gen3Lead) => {
  return match(lead)
    .with("Vanilla", () => "Ordinary lead")
    .with(
      { Synchronize: P.string },
      (matched) => `Synchronize (${matched.Synchronize})`,
    )
    .with(
      { CuteCharm: P.string },
      (matched) => `Cute Charm (${matched.CuteCharm})`,
    )
    .with("Egg", () => "Egg lead")
    .with("MagnetPull", () => "Magnet Pull")
    .with("Static", () => "Static")
    .with("HustleVitalSpiritPressure", () => "Hustle, Vital Spirit or Pressure")
    .exhaustive();
};

export const leadsLabels = gen3Leads.map((lead, i) => ({
  label: formatLeadName(lead),
  value: i,
}));

export const wild3MassOutbreakStates = [
  "Inactive",
  "ActiveNotInMap",
  "Route102Seedot",
  "Route114Nuzleaf",
  "Route117Seedot",
  "Route120Seedot",
  "Route116SkittyLvl8",
  "Route116SkittyLvl15",
  "Route102Surkit",
  "Route114Surkit",
  "Route117Surkit",
  "Route120Surkit",
] as const satisfies readonly Wild3MassOutbreakState[];

export const formatMassOutbreakStateName = (state: Wild3MassOutbreakState) => {
  return match(state)
    .with("Inactive", () => "Inactive")
    .with("ActiveNotInMap", () => "Mass outbreak in another map")
    .with("Route102Seedot", () => "Seedot Route 102")
    .with("Route114Nuzleaf", () => "Nuzleaf Route 114)")
    .with("Route117Seedot", () => "Seedot Route 117)")
    .with("Route120Seedot", () => "Seedot Route 120)")
    .with("Route116SkittyLvl8", () => "Skitty Route 116 (Lvl 8)")
    .with("Route116SkittyLvl15", () => "Skitty Route 116 (Lvl 15)")
    .with("Route102Surkit", () => "Surkit Route 102)")
    .with("Route114Surkit", () => "Surkit Route 114)")
    .with("Route117Surkit", () => "Surkit Route 117)")
    .with("Route120Surkit", () => "Surkit Route 120)")
    .exhaustive();
};
