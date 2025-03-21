import {
  MarkdownBreak,
  MarkdownH1,
  MarkdownH2,
  MarkdownH3,
  MarkdownH4,
  MarkdownH5,
  MarkdownH6,
  MarkdownParagraph,
  MarkdownList,
  MarkdownListItem,
  MarkdownDivider,
  MarkdownCode,
  MarkdownPre,
  MarkdownImage,
  MarkdownTable,
  MarkdownTd,
  MarkdownTh,
  MarkdownTr,
  MarkdownOList,
  MarkdownA,
} from "./components";
import { Alert } from "antd";
import {
  Flex,
  YouTubeVideo,
  PixelImage,
  IpsMerger,
  Countdown,
  ShowIf,
  LanguageButton,
} from "~/components";
import { Gen2PokemonRng } from "~/rngTools/gen2/crystalPokemon";
import { Gen2Rng } from "~/rngTools/gen2/gen2Rng";
import { Gen3Sid } from "~/rngTools/gen3/sid";
import { Gen4Timer } from "~/rngTools/timer/gen4";
import { EmeraldHeldEgg } from "~/rngTools/gen3/emeraldHeldEgg";
import { EmeraldPickupEgg } from "~/rngTools/gen3/emeraldPickupEgg";
import { OrAsMirageSpot } from "~/rngTools/gen6/orasMirageSpot";
import { RngTimer } from "~/rngTools/timer";
import { OrasId } from "~/rngTools/gen6/orasId";
import { DpptSeed } from "~/rngTools/gen4/dpptSeed";
import { DpptId } from "~/rngTools/gen4/dpptId";

export const markdownComponents = {
  br: MarkdownBreak,
  h1: MarkdownH1,
  h2: MarkdownH2,
  h3: MarkdownH3,
  h4: MarkdownH4,
  h5: MarkdownH5,
  h6: MarkdownH6,
  p: MarkdownParagraph,
  ul: MarkdownList,
  ol: MarkdownOList,
  li: MarkdownListItem,
  hr: MarkdownDivider,
  pre: MarkdownPre,
  code: MarkdownCode,
  img: MarkdownImage,
  table: MarkdownTable,
  th: MarkdownTh,
  tr: MarkdownTr,
  td: MarkdownTd,
  a: MarkdownA,
  YouTubeVideo,
  PixelImage,
  Alert,
  IpsMerger,
  Countdown,
  Flex,
  Gen2PokemonRng,
  Gen2Rng,
  Gen3Sid,
  EmeraldHeldEgg,
  EmeraldPickupEgg,
  OrAsMirageSpot,
  ShowIf,
  LanguageButton,
  Gen4Timer,
  RngTimer,
  OrasId,
  DpptSeed,
  DpptId,
};
