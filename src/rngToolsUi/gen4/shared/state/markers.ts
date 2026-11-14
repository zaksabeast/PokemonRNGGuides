import { atom } from "jotai";
import { sanitizeFlips } from "../dpptCoinFlip/utils";
import { sanitizeElmCalls } from "../hgssElmCalls/utils";
import { gen4TargetAtom } from "./target";

export type Gen4Markers = {
  coinFlips: string;
  elmCalls: string;
};

type TaggedGen4Markers = Gen4Markers & {
  targetId: string | null;
};

const noGen4Markers: Gen4Markers = {
  coinFlips: "",
  elmCalls: "",
};

const markersAtom = atom<TaggedGen4Markers>({
  ...noGen4Markers,
  targetId: null,
});

export const gen4MarkersAtom = atom((get): Gen4Markers => {
  const { targetId, ...markers } = get(markersAtom);
  const activeTargetId = get(gen4TargetAtom)?.id ?? null;
  return targetId === activeTargetId ? markers : noGen4Markers;
});

export const setGen4MarkersAtom = atom(
  null,
  (get, set, markers: Partial<Gen4Markers>) => {
    const prev = get(gen4MarkersAtom);
    set(markersAtom, {
      coinFlips: sanitizeFlips(markers.coinFlips ?? prev.coinFlips),
      elmCalls: sanitizeElmCalls(markers.elmCalls ?? prev.elmCalls),
      targetId: get(gen4TargetAtom)?.id ?? null,
    });
  },
);

export const clearGen4MarkersAtom = atom(null, (_get, set) => {
  set(markersAtom, { ...noGen4Markers, targetId: null });
});
