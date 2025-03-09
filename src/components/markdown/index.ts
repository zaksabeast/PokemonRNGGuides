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
import { Gen2StarterRng } from "../gen2StarterRng";
import { Gen2Rng } from "../gen2Rng";
import { Gen3Sid } from "../gen3Sid";
import { EmeraldHeldEgg } from "../emeraldHeldEgg";
import { EmeraldPickupEgg } from "../emeraldPickupEgg";
import { Alert } from "antd";
import { YouTubeVideo } from "../youtubeVideo";
import { PixelImage } from "../pixelImage";
import { IpsMerger } from "../ipsMerger";
import { Countdown } from "../countdown";
import { Flex } from "../flex";

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
  Gen2StarterRng,
  Gen2Rng,
  Gen3Sid,
  EmeraldHeldEgg,
  EmeraldPickupEgg,
};
