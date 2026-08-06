import React from "react";
import { Patch, PokeRadarPatch } from "~/rngTools";
import { PokeRadarPatches } from "~/rngToolsUi/gen6/xyPokeRadar/patch";

const toXyPatchFormat = (patches: Patch[]): PokeRadarPatch[] =>
  patches.map((p) => ({
    x: p.gx,
    y: p.gz,
    state: p.is_shiny ? "Shiny" : p.continue_chain ? "Good" : "Bad",
  }));

type PokeRadar4PatchGridProps = {
  patches: Patch[];
};

export const PokeRadar4PatchGrid: React.FC<PokeRadar4PatchGridProps> = ({
  patches,
}) => <PokeRadarPatches patches={toXyPatchFormat(patches)} />;