import { Nature } from "~/rngTools";
import type {Stat} from "./stat";

export const natures = [
  "Hardy",
  "Lonely",
  "Brave",
  "Adamant",
  "Naughty",
  "Bold",
  "Docile",
  "Relaxed",
  "Impish",
  "Lax",
  "Timid",
  "Hasty",
  "Serious",
  "Jolly",
  "Naive",
  "Modest",
  "Mild",
  "Quiet",
  "Bashful",
  "Rash",
  "Calm",
  "Gentle",
  "Sassy",
  "Careful",
  "Quirky",
] as const satisfies Nature[];

export const getNatureFromStatMoreLess = (statMore:Stat, statLess:Stat) : Nature => {
  if (statMore === "atk") {
    if (statLess === "atk") return "Hardy";
    if (statLess === "def") return "Lonely";
    if (statLess === "spa") return "Adamant";
    if (statLess === "spd") return "Naughty";
    if (statLess === "spe") return "Brave";
  }
  if (statMore === "def") {
    if (statLess === "atk") return "Bold";
    if (statLess === "def") return "Docile";
    if (statLess === "spa") return "Impish";
    if (statLess === "spd") return "Lax";
    if (statLess === "spe") return "Relaxed";
  }
  if (statMore === "spa") {
    if (statLess === "atk") return "Modest";
    if (statLess === "def") return "Mild";
    if (statLess === "spa") return "Bashful";
    if (statLess === "spd") return "Rash";
    if (statLess === "spe") return "Quiet";
  }
  if (statMore === "spd") {
    if (statLess === "atk") return "Calm";
    if (statLess === "def") return "Gentle";
    if (statLess === "spa") return "Careful";
    if (statLess === "spd") return "Quirky";
    if (statLess === "spe") return "Sassy";
  }
  if (statMore === "spe") {
    if (statLess === "atk") return "Timid";
    if (statLess === "def") return "Hasty";
    if (statLess === "spa") return "Jolly";
    if (statLess === "spd") return "Naive";
    if (statLess === "spe") return "Serious";
  }

  throw new Error(`invalid statMore ${statMore} or statLess ${statLess}`);
};

export const getStatMoreLessFromNature = (nature:Nature) : [Stat,Stat] => {
  if (nature === "Hardy") return ["atk","atk"];
  if (nature === "Lonely") return ["atk","def"];
  if (nature === "Adamant") return ["atk","spa"];
  if (nature === "Naughty") return ["atk","spd"];
  if (nature === "Brave") return ["atk","spe"];

  if (nature === "Bold") return ["def","atk"];
  if (nature === "Docile") return ["def","def"];
  if (nature === "Impish") return ["def","spa"];
  if (nature === "Lax") return ["def","spd"];
  if (nature === "Relaxed") return ["def","spe"];

  if (nature === "Modest") return ["spa","atk"];
  if (nature === "Mild") return ["spa","def"];
  if (nature === "Bashful") return ["spa","spa"];
  if (nature === "Rash") return ["spa","spd"];
  if (nature === "Quiet") return ["spa","spe"];

  if (nature === "Calm") return ["spd","atk"];
  if (nature === "Gentle") return ["spd","def"];
  if (nature === "Careful") return ["spd","spa"];
  if (nature === "Quirky") return ["spd","spd"];
  if (nature === "Sassy") return ["spd","spe"];

  if (nature === "Timid") return ["spe","atk"];
  if (nature === "Hasty") return ["spe","def"];
  if (nature === "Jolly") return ["spe","spa"];
  if (nature === "Naive") return ["spe","spd"];
  if (nature === "Serious") return ["spe","spe"];

  throw new Error(`invalid nature ${nature}`);
};