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
import { Gen2PokemonRng } from "~/rngTools/gen2Pokemon";
import { Gen2Rng } from "~/rngTools/gen2Rng";
import { Gen3Sid } from "~/rngTools/gen3Sid";
import { Gen4Timer } from "~/rngTools/timer/gen4";
import { EmeraldHeldEgg } from "~/rngTools/emeraldHeldEgg";
import { EmeraldPickupEgg } from "~/rngTools/emeraldPickupEgg";
import { OrAsMirageSpot } from "~/rngTools/orasMirageSpot";
import { RngTimer } from "~/rngTools/timer";
import { OrasId } from "~/rngTools/orasId";
import { DpptSeedSearch } from "~/rngTools/dpptSeedSearch";

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
  DpptSeedSearch,
};
