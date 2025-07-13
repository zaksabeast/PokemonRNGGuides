import React from "react";
import { check, Pass } from "~/typeTest";
import {
  MarkdownBreak,
  MarkdownH1,
  MarkdownH2,
  MarkdownH3,
  MarkdownH4,
  MarkdownH5,
  MarkdownH6,
  MarkdownParagraph,
  MarkdownListItem,
  MarkdownDivider,
  MarkdownCode,
  MarkdownPre,
  MarkdownImage,
  MarkdownOList,
  MarkdownA,
} from "./components";
import {
  Flex,
  Gist,
  YouTubeVideo,
  PixelImage,
  Countdown,
  ShowIf,
  Alert,
  Stepper,
  Step,
  WhatNext,
  List,
  MediaTable,
  MediaTableBody,
  MediaTableHeader,
  MediaTableRow,
  MediaTableCell,
  YouTubeTable,
} from "~/components";
import { Glossary } from "~/pageComponents/glossary";
import { Gen7SosList } from "~/pageComponents/gen7Sos/sosList";
import { ChallengePageComponent } from "~/pageComponents/challenge";
import { ExperimentsPageComponent } from "~/pageComponents/experiments";
import { HomePageComponent } from "~/pageComponents/home";
import { GamePageComponent } from "~/pageComponents/gamePage";
import { withTags } from "~/components/tagDetector/provider";
import { mapValues } from "lodash-es";
import { Starter4ShowIf } from "~/rngToolsUi/gen4/starters/showIf";
import { Id4ShowIf } from "~/rngToolsUi/gen4/id/showIf";
import { TranslationHelperSelectGuide } from "~/rngToolsUi/translationHelper/selectGuide";
import { TranslationHelperEditGuide } from "~/rngToolsUi/translationHelper/editGuide";
import { ToolTranslationButton } from "~/rngToolsUi/translationHelper/toolTranslations";
import { TranslationHelperSelectLanguage } from "~/rngToolsUi/translationHelper/selectLanguage";

const nonTools = {
  br: MarkdownBreak,
  h1: MarkdownH1,
  h2: MarkdownH2,
  h3: MarkdownH3,
  h4: MarkdownH4,
  h5: MarkdownH5,
  h6: MarkdownH6,
  // eslint-disable-next-line id-length
  p: MarkdownParagraph,
  ul: List,
  ol: MarkdownOList,
  li: MarkdownListItem,
  hr: MarkdownDivider,
  pre: MarkdownPre,
  code: MarkdownCode,
  img: MarkdownImage,
  table: MediaTable,
  tbody: MediaTableBody,
  th: MediaTableHeader,
  tr: MediaTableRow,
  td: MediaTableCell,
  // eslint-disable-next-line id-length
  a: MarkdownA,
  Text: MarkdownParagraph,
  YouTubeVideo,
  PixelImage,
  Alert,
  Countdown,
  Flex,
  Gist,
  ShowIf,
  Gen7SosList,
  ChallengePageComponent,
  ExperimentsPageComponent,
  HomePageComponent,
  GamePageComponent,
  Stepper,
  Step,
  Glossary,
  Starter4ShowIf,
  Id4ShowIf,
  WhatNext,
  YouTubeTable,
  TranslationHelperSelectGuide,
  TranslationHelperEditGuide,
  ToolTranslationButton,
  TranslationHelperSelectLanguage,
};

const tools = {
  IpsMerger: () => import("~/components/ipsMerger"),
  Gen2PokemonRng: () => import("~/rngToolsUi/gen2/crystalPokemon"),
  Gen2Rng: () => import("~/rngToolsUi/gen2/gen2Rng"),
  Gen3Pokerus: () => import("~/rngToolsUi/gen3/pokerus"),
  Gen3Sid: () => import("~/rngToolsUi/gen3/sid"),
  RsTidSidGenerator: () => import("~/rngToolsUi/gen3/rstid/rstid"),
  RsTidTimer: () => import("~/rngToolsUi/gen3/rstid/searcher"),
  RsTidSearcher: () => import("~/rngToolsUi/gen3/rstid/searcher"),
  Gen3MirageIsland: () => import("~/rngToolsUi/gen3/mirageIsland"),
  EmeraldHeldEgg: () => import("~/rngToolsUi/gen3/emeraldHeldEgg"),
  EmeraldPickupEgg: () => import("~/rngToolsUi/gen3/emeraldPickupEgg"),
  Static3: () => import("~/rngToolsUi/gen3/static/static3"),
  Wild3SearcherFindTarget: () =>
    import("~/rngToolsUi/gen3/wild/wild3FindTarget"),
  Gen3PidSpeedCalculator: () => import("~/rngToolsUi/gen3/pidSpeedCalculator"),
  Gen3TidSidGenerator: () => import("~/rngToolsUi/gen3/tidsid"),
  OrAsMirageSpot: () => import("~/rngToolsUi/gen6/orasMirageSpot"),
  Gen4Timer: () => import("~/rngToolsUi/timer/gen4"),
  RngTimer: () => import("~/rngToolsUi/timer"),
  OrasId: () => import("~/rngToolsUi/gen6/orasId"),
  Transporter: () => import("~/rngToolsUi/gen6/transporter/transporter"),
  Static4Generator: () => import("~/rngToolsUi/gen4/gen4stationary"),
  DpptSeed: () => import("~/rngToolsUi/gen4/dpptSeed"),
  CalibrateId4: () => import("~/rngToolsUi/gen4/id/calibrateId"),
  Gen4IdSetup: () => import("~/rngToolsUi/gen4/id/setup"),
  Id4ConsoleSetDateString: () => import("~/rngToolsUi/gen4/id/timer"),
  Id4Searcher: () => import("~/rngToolsUi/gen4/id/idSearcher"),
  Id4Timer: () => import("~/rngToolsUi/gen4/id/timer"),
  XyPokeRadar: () => import("~/rngToolsUi/gen6/xyPokeRadar"),
  ShinyHoennStarter: () => import("~/rngToolsUi/gen3/shinyStarter"),
  GenerateHoennTidSid: () =>
    import("~/rngToolsUi/gen3/shinyStarter/generateTidSid"),
  MultibootJirachi: () => import("~/rngToolsUi/gen3/multibootJirachi"),
  PaintingReseed: () => import("~/rngToolsUi/gen3/paintingReseed"),
  RetailEmeraldHeldEgg: () =>
    import("~/rngToolsUi/gen3/retailEmeraldEgg/heldEgg"),
  PokeNavInput: () =>
    import("~/rngToolsUi/gen3/retailEmeraldEgg/pokeNavTrainer"),
  CalibrateHeldEgg: () =>
    import("~/rngToolsUi/gen3/retailEmeraldEgg/calibrateHeldEgg"),
  CalibrateHeldEggTimer: () =>
    import("~/rngToolsUi/gen3/retailEmeraldEgg/calibrateHeldEgg"),
  RetailEmeraldPickupEgg: () =>
    import("~/rngToolsUi/gen3/retailEmeraldEgg/pickupEgg"),
  CalibratePickupEgg: () =>
    import("~/rngToolsUi/gen3/retailEmeraldEgg/calibratePickupEgg"),
  CalibratePickupEggTimer: () =>
    import("~/rngToolsUi/gen3/retailEmeraldEgg/calibratePickupEgg"),
  CalibrateStarter4: () => import("~/rngToolsUi/gen4/starters"),
  GetStarter4: () => import("~/rngToolsUi/gen4/starters/getStarter"),
  PickStarter4: () => import("~/rngToolsUi/gen4/starters/pickStarter"),
  Starter4ConsoleSetDateString: () =>
    import("~/rngToolsUi/gen4/starters/getStarter"),
  Starter4Setup: () => import("~/rngToolsUi/gen4/starters/setup"),
};

type ToolMapWithStrictExportNameAsKey = {
  [ExportName in keyof typeof tools]: () => Promise<Record<ExportName, Tool>>;
};

// This type check ensures that the keys of the tools object are strictly the export names.
type Result = typeof tools extends ToolMapWithStrictExportNameAsKey
  ? true
  : false;
check<Result, true>(Pass);

// We don't want to enforce specific props for tools, as they can vary.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Tool = (props: any) => React.JSX.Element;

const createLazyTool = <ExportName extends string>(
  exportName: ExportName,
  importFunc: () => Promise<Record<ExportName, Tool>>,
) => {
  return React.lazy(async () => {
    const tool = await importFunc();
    return { default: tool[exportName] };
  });
};

export const markdownComponents = {
  ...nonTools,
  ...mapValues(tools, (importFunc, componentName) => {
    const Component = createLazyTool(componentName, importFunc);
    // This is temporary
    // At some point I'd like each of these to be lazy loaded, which will require specifying the component path next to the component name.
    // A wrapper around React.lazy can include `withTags`.
    return withTags(Component, { web_tool: true });
  }),
};
