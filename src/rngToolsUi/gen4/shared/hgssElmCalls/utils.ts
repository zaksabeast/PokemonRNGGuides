import { type ElmCall } from "~/rngTools";
import { findSubArrayIndices, type IndexRange } from "~/utils/findIndexBy";
import { matchesSubsequence } from "~/utils/matchesSubsequence";

export type SmallElmCall = "E" | "K" | "P";

export const shrinkElmCalls = (elmCalls: ElmCall[]): SmallElmCall[] => {
  return elmCalls.map((call) => call as SmallElmCall);
};

const joinElmCalls = (calls: SmallElmCall[]): string => {
  return calls.join("");
};

export const splitElmCalls = (input: string): SmallElmCall[] => {
  return input
    .split("")
    .filter((c): c is SmallElmCall => c === "E" || c === "K" || c === "P");
};

export const sanitizeElmCalls = (input: string): string => {
  return joinElmCalls(splitElmCalls(input));
};

export const isSmallElmCallEqual = (
  elmCall: ElmCall | SmallElmCall,
  filterCall: SmallElmCall,
): boolean => {
  return elmCall === filterCall;
};

export const findElmCallSequenceIndices = (
  elmCalls: Array<ElmCall | SmallElmCall>,
  filterString: string,
): IndexRange[] => {
  const filterList = splitElmCalls(filterString);
  return findSubArrayIndices(elmCalls, filterList, isSmallElmCallEqual);
};

export const matchesElmCallFilter = (
  elmCalls: SmallElmCall[],
  filterString: string,
): boolean => {
  const filterList = splitElmCalls(filterString);
  return matchesSubsequence(elmCalls, filterList);
};