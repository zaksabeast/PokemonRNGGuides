import { type ElmCall } from "~/rngTools";
import { findSubArrayIndices, type IndexRange } from "~/utils/findIndexBy";
import { matchesSubsequence } from "~/utils/matchesSubsequence";

export const shrinkElmCalls = (elmCalls: ElmCall[]): ElmCall[] => {
  return elmCalls;
};

const joinElmCalls = (calls: ElmCall[]): string => {
  return calls.join("");
};

export const splitElmCalls = (input: string): ElmCall[] => {
  return input
    .split("")
    .filter((c): c is ElmCall => c === "E" || c === "K" || c === "P");
};

export const sanitizeElmCalls = (input: string): string => {
  return joinElmCalls(splitElmCalls(input));
};

export const isElmCallEqual = (
  elmCall: ElmCall,
  filterCall: ElmCall,
): boolean => {
  return elmCall === filterCall;
};

export const findElmCallSequenceIndices = (
  elmCalls: ElmCall[],
  filterString: string,
): IndexRange[] => {
  const filterList = splitElmCalls(filterString);
  return findSubArrayIndices(elmCalls, filterList, isElmCallEqual);
};

export const matchesElmCallFilter = (
  elmCalls: ElmCall[],
  filterString: string,
): boolean => {
  const filterList = splitElmCalls(filterString);
  return matchesSubsequence(elmCalls, filterList);
};