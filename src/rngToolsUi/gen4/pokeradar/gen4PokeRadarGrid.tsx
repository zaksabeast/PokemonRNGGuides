import React from "react";
import { Patch, PokeRadarPatch } from "~/rngTools";
import { PokeRadarPatches } from "~/rngToolsUi/gen6/xyPokeRadar/patch";

// Adapter: PokeRadarPatches è stato scritto per il tool XY (griglia 0-8 con
// { x, y, state: "Empty"|"Shiny"|"Good"|"Bad" }), mentre i Patch Gen4 hanno
// { ring, gx, gz, continue_chain, is_shiny, shake_type }. Verifica che
// gx/gz siano effettivamente coordinate 0-8 sulla griglia: se la
// visualizzazione risulta sbagliata, questo è il punto da rivedere.
const toXyPatchFormat = (patches: Patch[]): PokeRadarPatch[] =>
  patches.map((p) => ({
    x: p.gx,
    y: p.gz,
    state: p.is_shiny ? "Shiny" : p.continue_chain ? "Good" : "Bad",
  }));

type Gen4PokeRadarGridProps = {
  patches: Patch[];
};

export const Gen4PokeRadarGrid = ({ patches }: Gen4PokeRadarGridProps) => (
  <PokeRadarPatches patches={toXyPatchFormat(patches)} />
);