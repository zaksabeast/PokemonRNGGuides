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
  MarkdownBlockquote,
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
  EqualColumnTable,
  Pixelate,
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
  Image: MarkdownImage,
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
  WhatNext,
  YouTubeTable,
  EqualColumnTable,
  TranslationHelperSelectGuide,
  TranslationHelperEditGuide,
  ToolTranslationButton,
  TranslationHelperSelectLanguage,
  blockquote: MarkdownBlockquote,
  TextArea: Input.TextArea,
  Pixelate,
};

const lazyLoad = <ImportRes, Props>(
  importRes: () => Promise<ImportRes>,
  resolver: (tool: ImportRes) => React.ComponentType<Props>,
) => {
  return React.lazy(async () => {
    const tool = await importRes();
    return { default: resolver(tool) };
  });
};

const tools = {
  IpsMerger: lazyLoad(
    () => import("~/components/ipsMerger"),
    (mod) => mod.IpsMerger,
  ),
  Gen2PokemonRng: lazyLoad(
    () => import("~/rngToolsUi/gen2/crystalPokemon"),
    (mod) => mod.Gen2PokemonRng,
  ),
  Gen2Rng: lazyLoad(
    () => import("~/rngToolsUi/gen2/gen2Rng"),
    (mod) => mod.Gen2Rng,
  ),
  Gen3Pokerus: lazyLoad(
    () => import("~/rngToolsUi/gen3/pokerus"),
    (mod) => mod.Gen3Pokerus,
  ),
  Gen3Sid: lazyLoad(
    () => import("~/rngToolsUi/gen3/sid"),
    (mod) => mod.Gen3Sid,
  ),
  RsTidSidGenerator: lazyLoad(
    () => import("~/rngToolsUi/gen3/rstid/rstid"),
    (mod) => mod.RsTidSidGenerator,
  ),
  RsTidTimer: lazyLoad(
    () => import("~/rngToolsUi/gen3/rstid/searcher"),
    (mod) => mod.RsTidTimer,
  ),
  RsTidSearcher: lazyLoad(
    () => import("~/rngToolsUi/gen3/rstid/searcher"),
    (mod) => mod.RsTidSearcher,
  ),
  Gen3MirageIsland: lazyLoad(
    () => import("~/rngToolsUi/gen3/mirageIsland"),
    (mod) => mod.Gen3MirageIsland,
  ),
  EmeraldHeldEgg: lazyLoad(
    () => import("~/rngToolsUi/gen3/emeraldHeldEgg"),
    (mod) => mod.EmeraldHeldEgg,
  ),
  EmeraldPickupEgg: lazyLoad(
    () => import("~/rngToolsUi/gen3/emeraldPickupEgg"),
    (mod) => mod.EmeraldPickupEgg,
  ),
  Static3TargetSetupSearcher: lazyLoad(
    () => import("~/rngToolsUi/gen3/static/static3TargetSetupSearcher"),
    (mod) => mod.Static3TargetSetupSearcher,
  ),
  Static3TargetSetupSearcher_WithSetTargetSetup: lazyLoad(
    () => import("~/rngToolsUi/gen3/static/static3"),
    (mod) => mod.Static3TargetSetupSearcher_WithSetTargetSetup,
  ),
  BattleVideo: lazyLoad(
    () => import("~/rngToolsUi/gen3/battleVideo/battleVideo"),
    (mod) => mod.BattleVideo,
  ),
  Wild3TargetSetupSearcher: lazyLoad(
    () => import("~/rngToolsUi/gen3/wild/wild3TargetSetupSearcher"),
    (mod) => mod.Wild3TargetSetupSearcher,
  ),
  Wild3Calib: lazyLoad(
    () => import("~/rngToolsUi/gen3/wild/wild3Calib"),
    (mod) => mod.Wild3Calib,
  ),
  Wild3LeadCycleSpeedSelector: lazyLoad(
    () => import("~/rngToolsUi/gen3/wild/wild3LeadCycleSpeedSelector"),
    (mod) => mod.Wild3LeadCycleSpeedSelector,
  ),
  Wild3TargetSetupAndLeadInputStandalone: lazyLoad(
    () => import("~/rngToolsUi/gen3/wild/wild3TargetSetupAndLeadInput"),
    (mod) => mod.Wild3TargetSetupAndLeadInputStandalone,
  ),
  Gen3PidSpeedCalculator: lazyLoad(
    () => import("~/rngToolsUi/gen3/pidSpeedCalculator"),
    (mod) => mod.Gen3PidSpeedCalculator,
  ),
  EmeraldSeedToAdvances: lazyLoad(
    () => import("~/rngToolsUi/gen3/paintingReseeding/seedToAdvances"),
    (mod) => mod.EmeraldSeedToAdvances,
  ),
  EmeraldPaintingReseeding: lazyLoad(
    () => import("~/rngToolsUi/gen3/paintingReseeding/paintingReseeding"),
    (mod) => mod.EmeraldPaintingReseeding,
  ),
  EmeraldWildAceChangeSid_WithTargetSetup: lazyLoad(
    () => import("~/rngToolsUi/gen3/wild/wild3"),
    (mod) => mod.EmeraldWildAceChangeSid_WithTargetSetup,
  ),
  EmeraldStaticAceChangeSid_WithTargetSetup: lazyLoad(
    () => import("~/rngToolsUi/gen3/static/static3"),
    (mod) => mod.EmeraldStaticAceChangeSid_WithTargetSetup,
  ),
  EmeraldAceStatic: lazyLoad(
    () => import("~/rngToolsUi/gen3/ace/emeraldAceStatic"),
    (mod) => mod.EmeraldAceStatic,
  ),
  EmeraldWildPaintingReseeding_WithTargetSetup: lazyLoad(
    () => import("~/rngToolsUi/gen3/wild/wild3"),
    (mod) => mod.EmeraldWildPaintingReseeding_WithTargetSetup,
  ),
  EmeraldStaticPaintingReseeding_WithTargetSetup: lazyLoad(
    () => import("~/rngToolsUi/gen3/static/static3"),
    (mod) => mod.EmeraldStaticPaintingReseeding_WithTargetSetup,
  ),
  Wild3Calib_WithTargetSetupAndBattleVideo: lazyLoad(
    () => import("~/rngToolsUi/gen3/wild/wild3"),
    (mod) => mod.Wild3Calib_WithTargetSetupAndBattleVideo,
  ),
  Static3Calib_WithTargetSetupAndBattleVideo: lazyLoad(
    () => import("~/rngToolsUi/gen3/static/static3"),
    (mod) => mod.Static3Calib_WithTargetSetupAndBattleVideo,
  ),
  Wild3TargetSetupSearcher_WithSetTargetSetup: lazyLoad(
    () => import("~/rngToolsUi/gen3/wild/wild3"),
    (mod) => mod.Wild3TargetSetupSearcher_WithSetTargetSetup,
  ),
  Gen3TidSidGenerator: lazyLoad(
    () => import("~/rngToolsUi/gen3/tidsid"),
    (mod) => mod.Gen3TidSidGenerator,
  ),
  OrAsMirageSpot: lazyLoad(
    () => import("~/rngToolsUi/gen6/orasMirageSpot"),
    (mod) => mod.OrAsMirageSpot,
  ),
  Gen4Timer: lazyLoad(
    () => import("~/rngToolsUi/timer/gen4"),
    (mod) => mod.Gen4Timer,
  ),
  RngTimer: lazyLoad(
    () => import("~/rngToolsUi/timer"),
    (mod) => mod.RngTimer,
  ),
  OrasId: lazyLoad(
    () => import("~/rngToolsUi/gen6/orasId"),
    (mod) => mod.OrasId,
  ),
  Transporter: lazyLoad(
    () => import("~/rngToolsUi/gen6/transporter/transporter"),
    (mod) => mod.Transporter,
  ),
  CalibrateId4: lazyLoad(
    () => import("~/rngToolsUi/gen4/id/calibrateId"),
    (mod) => mod.CalibrateId4,
  ),
  Id4Searcher: lazyLoad(
    () => import("~/rngToolsUi/gen4/id/idSearcher"),
    (mod) => mod.Id4Searcher,
  ),
  XyPokeRadar: lazyLoad(
    () => import("~/rngToolsUi/gen6/xyPokeRadar"),
    (mod) => mod.XyPokeRadar,
  ),
  ShinyHoennStarter: lazyLoad(
    () => import("~/rngToolsUi/gen3/shinyStarter"),
    (mod) => mod.ShinyHoennStarter,
  ),
  GenerateHoennTidSid: lazyLoad(
    () => import("~/rngToolsUi/gen3/shinyStarter/generateTidSid"),
    (mod) => mod.GenerateHoennTidSid,
  ),
  MultibootJirachi: lazyLoad(
    () => import("~/rngToolsUi/gen3/multibootJirachi"),
    (mod) => mod.MultibootJirachi,
  ),
  PaintingSeedToEmuTimer: lazyLoad(
    () => import("~/rngToolsUi/gen3/paintingReseeding/paintingSeedToEmuTimer"),
    (mod) => mod.PaintingSeedToEmuTimer,
  ),
  RetailEmeraldEggStateText: lazyLoad(
    () => import("~/rngToolsUi/gen3/retailEmeraldEgg/stateText"),
    (mod) => mod.RetailEmeraldEggStateText,
  ),
  RetailEmeraldHeldEgg: lazyLoad(
    () => import("~/rngToolsUi/gen3/retailEmeraldEgg/heldEgg"),
    (mod) => mod.RetailEmeraldHeldEgg,
  ),
  PokeNavInput: lazyLoad(
    () => import("~/rngToolsUi/gen3/retailEmeraldEgg/pokeNavTrainer"),
    (mod) => mod.PokeNavInput,
  ),
  CalibrateHeldEgg: lazyLoad(
    () => import("~/rngToolsUi/gen3/retailEmeraldEgg/calibrateHeldEgg"),
    (mod) => mod.CalibrateHeldEgg,
  ),
  CalibrateHeldEggTimer: lazyLoad(
    () => import("~/rngToolsUi/gen3/retailEmeraldEgg/calibrateHeldEgg"),
    (mod) => mod.CalibrateHeldEggTimer,
  ),
  RetailEmeraldPickupEgg: lazyLoad(
    () => import("~/rngToolsUi/gen3/retailEmeraldEgg/pickupEgg"),
    (mod) => mod.RetailEmeraldPickupEgg,
  ),
  CalibratePickupEgg: lazyLoad(
    () => import("~/rngToolsUi/gen3/retailEmeraldEgg/calibratePickupEgg"),
    (mod) => mod.CalibratePickupEgg,
  ),
  CalibratePickupEggTimer: lazyLoad(
    () => import("~/rngToolsUi/gen3/retailEmeraldEgg/calibratePickupEgg"),
    (mod) => mod.CalibratePickupEggTimer,
  ),
  Id4Tid: lazyLoad(
    () => import("~/rngToolsUi/gen4/id/id4Tid"),
    (mod) => mod.Id4Tid,
  ),
  Id4Sid: lazyLoad(
    () => import("~/rngToolsUi/gen4/id/id4Tid"),
    (mod) => mod.Id4Sid,
  ),
  CalibrateStarter4: lazyLoad(
    () => import("~/rngToolsUi/gen4/starters/calibrate"),
    (mod) => mod.CalibrateStarter4,
  ),
  PickStarter4: lazyLoad(
    () => import("~/rngToolsUi/gen4/starters/pickStarter"),
    (mod) => mod.PickStarter4,
  ),
  Static4Searcher: lazyLoad(
    () => import("~/rngToolsUi/gen4/static/staticSearcher"),
    (mod) => mod.Static4Searcher,
  ),
  DpptCoinFlipSeedCalibrator: lazyLoad(
    () => import("~/rngToolsUi/gen4/shared/dpptCoinFlip/seedCalibrator"),
    (mod) => mod.DpptCoinFlipSeedCalibrator,
  ),
  Static4ChatotCount: lazyLoad(
    () => import("~/rngToolsUi/gen4/static/stateText"),
    (mod) => mod.Static4ChatotCount,
  ),
  Static4SyncNature: lazyLoad(
    () => import("~/rngToolsUi/gen4/static/stateText"),
    (mod) => mod.Static4SyncNature,
  ),
  Static4ShowIfLead: lazyLoad(
    () => import("~/rngToolsUi/gen4/static/showIf"),
    (mod) => mod.Static4ShowIfLead,
  ),
  Static4Calibrator: lazyLoad(
    () => import("~/rngToolsUi/gen4/static/staticCalibrator"),
    (mod) => mod.Static4Calibrator,
  ),
  Gen5CalibrationResults: lazyLoad(
    () => import("~/rngToolsUi/gen5/calibrationResults/calibrationResults"),
    (mod) => mod.Gen5CalibrationResults,
  ),
  IvCalc: lazyLoad(
    () => import("~/rngToolsUi/ivCalc/ivCalc"),
    (mod) => mod.IvCalc,
  ),
  Profile5Calibrator: lazyLoad(
    () => import("~/rngToolsUi/gen5/profileSearcher/calibrator"),
    (mod) => mod.Profile5Calibrator,
  ),
  Profile5Setup: lazyLoad(
    () => import("~/rngToolsUi/gen5/profileSearcher/setup"),
    (mod) => mod.Profile5Setup,
  ),
  HoneyTreeTidSid: lazyLoad(
    () => import("~/rngToolsUi/gen4/honeyTree/tidSid"),
    (mod) => mod.HoneyTreeTidSid,
  ),
  DpptCoinFlipSeedFinder: lazyLoad(
    () => import("~/rngToolsUi/gen4/shared/dpptCoinFlip/seedFinder"),
    (mod) => mod.DpptCoinFlipSeedFinder,
  ),
  HoneyTreeFindEncounter: lazyLoad(
    () => import("~/rngToolsUi/gen4/honeyTree/findEncounter"),
    (mod) => mod.HoneyTreeFindEncounter,
  ),
  HoneyTreeShowIf: lazyLoad(
    () => import("~/rngToolsUi/gen4/honeyTree/showIf"),
    (mod) => mod.HoneyTreeShowIf,
  ),
  HoneyTreeMap: lazyLoad(
    () => import("~/rngToolsUi/gen4/honeyTree/map"),
    (mod) => mod.HoneyTreeMap,
  ),
  HoneyTreeTargetTree: lazyLoad(
    () => import("~/rngToolsUi/gen4/honeyTree/targetTree"),
    (mod) => mod.HoneyTreeTargetTree,
  ),
  StandaloneSinnohMap: lazyLoad(
    () => import("~/rngToolsUi/gen4/standaloneSinnohMap"),
    (mod) => mod.StandaloneSinnohMap,
  ),
  StandaloneChatterFilter: lazyLoad(
    () => import("~/rngToolsUi/gen4/standaloneChatterFilter"),
    (mod) => mod.StandaloneChatterFilter,
  ),
  SelectSwarm4Target: lazyLoad(
    () => import("~/rngToolsUi/gen4/swarm/selectTarget"),
    (mod) => mod.SelectSwarm4Target,
  ),
  SwarmFindEncounter: lazyLoad(
    () => import("~/rngToolsUi/gen4/swarm/findEncounter"),
    (mod) => mod.SwarmFindEncounter,
  ),
  Gen4ChatterFilter: lazyLoad(
    () => import("~/rngToolsUi/gen4/shared/chatterFilter"),
    (mod) => mod.Gen4ChatterFilter,
  ),
  Gen4ConfigSetup: lazyLoad(
    () => import("~/rngToolsUi/gen4/shared/configSetup"),
    (mod) => mod.Gen4ConfigSetup,
  ),
  Gen4EmbeddedTimer: lazyLoad(
    () => import("~/rngToolsUi/gen4/shared/timer"),
    (mod) => mod.Gen4EmbeddedTimer,
  ),
  Gen4ShowIf: lazyLoad(
    () => import("~/rngToolsUi/gen4/shared/gen4ShowIf"),
    (mod) => mod.Gen4ShowIf,
  ),
  Gen4Reset: lazyLoad(
    () => import("~/rngToolsUi/gen4/shared/resetState"),
    (mod) => mod.Gen4Reset,
  ),
  Gen4ConsoleSetDateString: lazyLoad(
    () => import("~/rngToolsUi/gen4/shared/consoleDateStrings"),
    (mod) => mod.Gen4ConsoleSetDateString,
  ),
  Egg4Search: lazyLoad(
    () => import("~/rngToolsUi/gen4/egg/searchEgg"),
    (mod) => mod.Egg4Search,
  ),
  DpptCoinFlipAdvanceFilter: lazyLoad(
    () => import("~/rngToolsUi/gen4/shared/dpptCoinFlip/advanceFilter"),
    (mod) => mod.DpptCoinFlipAdvanceFilter,
  ),
  Gen4SeedFinder: lazyLoad(
    () => import("~/rngToolsUi/gen4/shared/seedFinder"),
    (mod) => mod.Gen4SeedFinder,
  ),
  SwarmAdvanceFilter: lazyLoad(
    () => import("~/rngToolsUi/gen4/swarm/swarmAdvanceFilter"),
    (mod) => mod.SwarmAdvanceFilter,
  ),
  HgssSwarmAdvanceTracker: lazyLoad(
    () => import("~/rngToolsUi/gen4/swarm/hgssSwarmAdvanceTracker"),
    (mod) => mod.HgssSwarmAdvanceTracker,
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
