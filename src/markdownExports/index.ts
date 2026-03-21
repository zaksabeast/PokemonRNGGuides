import React from "react";
import { Input } from "antd";
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
  MarkdownSummary,
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
  Summary: MarkdownSummary,
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
  TextArea: Input.TextArea,
};

const lazyLoad = <ImportRes, Props>(
  importRes: Promise<ImportRes>,
  resolver: (tool: ImportRes) => React.ComponentType<Props>,
) => {
  return React.lazy(async () => {
    const tool = await importRes;
    return { default: resolver(tool) };
  });
};

const tools = {
  IpsMerger: lazyLoad(import("~/components/ipsMerger"), (mod) => mod.IpsMerger),
  Gen2PokemonRng: lazyLoad(
    import("~/rngToolsUi/gen2/crystalPokemon"),
    (mod) => mod.Gen2PokemonRng,
  ),
  Gen2Rng: lazyLoad(import("~/rngToolsUi/gen2/gen2Rng"), (mod) => mod.Gen2Rng),
  Gen3Pokerus: lazyLoad(
    import("~/rngToolsUi/gen3/pokerus"),
    (mod) => mod.Gen3Pokerus,
  ),
  Gen3Sid: lazyLoad(import("~/rngToolsUi/gen3/sid"), (mod) => mod.Gen3Sid),
  RsTidSidGenerator: lazyLoad(
    import("~/rngToolsUi/gen3/rstid/rstid"),
    (mod) => mod.RsTidSidGenerator,
  ),
  RsTidTimer: lazyLoad(
    import("~/rngToolsUi/gen3/rstid/searcher"),
    (mod) => mod.RsTidTimer,
  ),
  RsTidSearcher: lazyLoad(
    import("~/rngToolsUi/gen3/rstid/searcher"),
    (mod) => mod.RsTidSearcher,
  ),
  Gen3MirageIsland: lazyLoad(
    import("~/rngToolsUi/gen3/mirageIsland"),
    (mod) => mod.Gen3MirageIsland,
  ),
  EmeraldHeldEgg: lazyLoad(
    import("~/rngToolsUi/gen3/emeraldHeldEgg"),
    (mod) => mod.EmeraldHeldEgg,
  ),
  EmeraldPickupEgg: lazyLoad(
    import("~/rngToolsUi/gen3/emeraldPickupEgg"),
    (mod) => mod.EmeraldPickupEgg,
  ),
  Static3: lazyLoad(
    import("~/rngToolsUi/gen3/static/static3"),
    (mod) => mod.Static3,
  ),
  Wild3SearcherFindTarget: lazyLoad(
    import("~/rngToolsUi/gen3/wild/wild3FindTarget"),
    (mod) => mod.Wild3SearcherFindTarget,
  ),
  Wild3Calib: lazyLoad(
    import("~/rngToolsUi/gen3/wild/wild3Calib"),
    (mod) => mod.Wild3Calib,
  ),
  Wild3MethodDistribution: lazyLoad(
    import("~/rngToolsUi/gen3/wild/wild3MethodDistribution"),
    (mod) => mod.Wild3MethodDistribution,
  ),
  Gen3PidSpeedCalculator: lazyLoad(
    import("~/rngToolsUi/gen3/pidSpeedCalculator"),
    (mod) => mod.Gen3PidSpeedCalculator,
  ),
  EmeraldSeedToAdvances: lazyLoad(
    import("~/rngToolsUi/gen3/wild/seedToAdvances"),
    (mod) => mod.EmeraldSeedToAdvances,
  ),
  Gen3TidSidGenerator: lazyLoad(
    import("~/rngToolsUi/gen3/tidsid"),
    (mod) => mod.Gen3TidSidGenerator,
  ),
  OrAsMirageSpot: lazyLoad(
    import("~/rngToolsUi/gen6/orasMirageSpot"),
    (mod) => mod.OrAsMirageSpot,
  ),
  Gen4Timer: lazyLoad(
    import("~/rngToolsUi/timer/gen4"),
    (mod) => mod.Gen4Timer,
  ),
  RngTimer: lazyLoad(import("~/rngToolsUi/timer"), (mod) => mod.RngTimer),
  OrasId: lazyLoad(import("~/rngToolsUi/gen6/orasId"), (mod) => mod.OrasId),
  Transporter: lazyLoad(
    import("~/rngToolsUi/gen6/transporter/transporter"),
    (mod) => mod.Transporter,
  ),
  CalibrateId4: lazyLoad(
    import("~/rngToolsUi/gen4/id/calibrateId"),
    (mod) => mod.CalibrateId4,
  ),
  Gen4IdSetup: lazyLoad(
    import("~/rngToolsUi/gen4/id/setup"),
    (mod) => mod.Gen4IdSetup,
  ),
  Id4ConsoleSetDateString: lazyLoad(
    import("~/rngToolsUi/gen4/id/timer"),
    (mod) => mod.Id4ConsoleSetDateString,
  ),
  Id4Searcher: lazyLoad(
    import("~/rngToolsUi/gen4/id/idSearcher"),
    (mod) => mod.Id4Searcher,
  ),
  Id4Timer: lazyLoad(
    import("~/rngToolsUi/gen4/id/timer"),
    (mod) => mod.Id4Timer,
  ),
  XyPokeRadar: lazyLoad(
    import("~/rngToolsUi/gen6/xyPokeRadar"),
    (mod) => mod.XyPokeRadar,
  ),
  ShinyHoennStarter: lazyLoad(
    import("~/rngToolsUi/gen3/shinyStarter"),
    (mod) => mod.ShinyHoennStarter,
  ),
  GenerateHoennTidSid: lazyLoad(
    import("~/rngToolsUi/gen3/shinyStarter/generateTidSid"),
    (mod) => mod.GenerateHoennTidSid,
  ),
  MultibootJirachi: lazyLoad(
    import("~/rngToolsUi/gen3/multibootJirachi"),
    (mod) => mod.MultibootJirachi,
  ),
  PaintingReseed: lazyLoad(
    import("~/rngToolsUi/gen3/paintingReseed"),
    (mod) => mod.PaintingReseed,
  ),
  RetailEmeraldHeldEgg: lazyLoad(
    import("~/rngToolsUi/gen3/retailEmeraldEgg/heldEgg"),
    (mod) => mod.RetailEmeraldHeldEgg,
  ),
  PokeNavInput: lazyLoad(
    import("~/rngToolsUi/gen3/retailEmeraldEgg/pokeNavTrainer"),
    (mod) => mod.PokeNavInput,
  ),
  CalibrateHeldEgg: lazyLoad(
    import("~/rngToolsUi/gen3/retailEmeraldEgg/calibrateHeldEgg"),
    (mod) => mod.CalibrateHeldEgg,
  ),
  CalibrateHeldEggTimer: lazyLoad(
    import("~/rngToolsUi/gen3/retailEmeraldEgg/calibrateHeldEgg"),
    (mod) => mod.CalibrateHeldEggTimer,
  ),
  RetailEmeraldPickupEgg: lazyLoad(
    import("~/rngToolsUi/gen3/retailEmeraldEgg/pickupEgg"),
    (mod) => mod.RetailEmeraldPickupEgg,
  ),
  CalibratePickupEgg: lazyLoad(
    import("~/rngToolsUi/gen3/retailEmeraldEgg/calibratePickupEgg"),
    (mod) => mod.CalibratePickupEgg,
  ),
  CalibratePickupEggTimer: lazyLoad(
    import("~/rngToolsUi/gen3/retailEmeraldEgg/calibratePickupEgg"),
    (mod) => mod.CalibratePickupEggTimer,
  ),
  CalibrateStarter4: lazyLoad(
    import("~/rngToolsUi/gen4/starters"),
    (mod) => mod.CalibrateStarter4,
  ),
  GetStarter4: lazyLoad(
    import("~/rngToolsUi/gen4/starters"),
    (mod) => mod.GetStarter4,
  ),
  PickStarter4: lazyLoad(
    import("~/rngToolsUi/gen4/starters"),
    (mod) => mod.PickStarter4,
  ),
  Starter4ConsoleSetDateString: lazyLoad(
    import("~/rngToolsUi/gen4/starters/getStarter"),
    (mod) => mod.Starter4ConsoleSetDateString,
  ),
  Starter4Setup: lazyLoad(
    import("~/rngToolsUi/gen4/starters"),
    (mod) => mod.Starter4Setup,
  ),
  Gen4StaticSetup: lazyLoad(
    import("~/rngToolsUi/gen4/static/setup"),
    (mod) => mod.Gen4StaticSetup,
  ),
  Static4ShowIf: lazyLoad(
    import("~/rngToolsUi/gen4/static/showIf"),
    (mod) => mod.Static4ShowIf,
  ),
  Static4Searcher: lazyLoad(
    import("~/rngToolsUi/gen4/static/staticSearcher"),
    (mod) => mod.Static4Searcher,
  ),
  Static4HitSeed: lazyLoad(
    import("~/rngToolsUi/gen4/static/hitSeed"),
    (mod) => mod.Static4HitSeed,
  ),
  Static4Timer: lazyLoad(
    import("~/rngToolsUi/gen4/static/static4Timer"),
    (mod) => mod.Static4Timer,
  ),
  Static4ConsoleSetDateString: lazyLoad(
    import("~/rngToolsUi/gen4/static/static4Timer"),
    (mod) => mod.Static4ConsoleSetDateString,
  ),
  Static4ChatotCount: lazyLoad(
    import("~/rngToolsUi/gen4/static/stateText"),
    (mod) => mod.Static4ChatotCount,
  ),
  Static4SyncNature: lazyLoad(
    import("~/rngToolsUi/gen4/static/stateText"),
    (mod) => mod.Static4SyncNature,
  ),
  Static4ShowIfLead: lazyLoad(
    import("~/rngToolsUi/gen4/static/showIf"),
    (mod) => mod.Static4ShowIfLead,
  ),
  Static4Calibrator: lazyLoad(
    import("~/rngToolsUi/gen4/static/staticCalibrator"),
    (mod) => mod.Static4Calibrator,
  ),
};

export const markdownComponents = {
  ...nonTools,
  ...mapValues(tools, (Component) => {
    // This is temporary
    // At some point I'd like each of these to be lazy loaded, which will require specifying the component path next to the component name.
    // A wrapper around React.lazy can include `withTags`.
    // @ts-expect-error -- TS can't tell each component props apart in the Component union, so it thinks there are prop mismatches
    return withTags(Component, { web_tool: true });
  }),
};
