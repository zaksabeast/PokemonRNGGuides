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
import {
  Flex,
  Gist,
  YouTubeVideo,
  PixelImage,
  IpsMerger,
  Countdown,
  ShowIf,
  Alert,
} from "~/components";
import { Gen2PokemonRng } from "~/rngToolsUi/gen2/crystalPokemon";
import { Gen2Rng } from "~/rngToolsUi/gen2/gen2Rng";
import { Gen3Sid } from "~/rngToolsUi/gen3/sid";
import { Gen4Timer } from "~/rngToolsUi/timer/gen4";
import { EmeraldHeldEgg } from "~/rngToolsUi/gen3/emeraldHeldEgg";
//import { Gen3ShinyStarter } from "~/rngToolsUi/gen3/shinyStarter/shinyStarter";
import { EmeraldPickupEgg } from "~/rngToolsUi/gen3/emeraldPickupEgg";
import { Gen3TidSidGenerator } from "~/rngToolsUi/gen3/tidsid";
import { Gen3MirageIsland } from "~/rngToolsUi/gen3/mirageIsland";
import { OrAsMirageSpot } from "~/rngToolsUi/gen6/orasMirageSpot";
import { RngTimer } from "~/rngToolsUi/timer";
import { OrasId } from "~/rngToolsUi/gen6/orasId";
import { DpptSeed } from "~/rngToolsUi/gen4/dpptSeed";
import { DpptId } from "~/rngToolsUi/gen4/dpptId";
import { XyPokeRadar } from "~/rngToolsUi/gen6/xyPokeRadar";
import { Static3 } from "~/rngToolsUi/gen3/static/static3";
import { ShinyStarter } from "~/rngToolsUi/gen3/shinyStarter";

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
  Text: MarkdownParagraph,
  YouTubeVideo,
  PixelImage,
  Alert,
  IpsMerger,
  Countdown,
  Flex,
  Gist,
  Gen2PokemonRng,
  Gen2Rng,
  Gen3Sid,
  Gen3MirageIsland,
  EmeraldHeldEgg,
  //Gen3ShinyStarter,
  EmeraldPickupEgg,
  Static3,
  Gen3TidSidGenerator,
  OrAsMirageSpot,
  ShowIf,
  Gen4Timer,
  RngTimer,
  OrasId,
  DpptSeed,
  DpptId,
  XyPokeRadar,
  ShinyStarter,
};
