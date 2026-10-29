import { EmeraldLang } from "~/rngTools";

export const emeraldLangs = [
  "English",
  "French",
  "Italian",
  "Spanish",
  "German",
  "Japanese",
] as const satisfies EmeraldLang[];

// Japanese isn't supported by ACE yet.
export const aceEmeraldLangs = emeraldLangs.filter(
  (lang): lang is Exclude<EmeraldLang, "Japanese"> => lang !== "Japanese",
);
