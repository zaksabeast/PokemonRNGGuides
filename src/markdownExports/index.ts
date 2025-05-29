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
  Stepper,
  Step,
} from "~/components";
import { Gen2PokemonRng } from "~/rngToolsUi/gen2/crystalPokemon";
import { Gen2Rng } from "~/rngToolsUi/gen2/gen2Rng";
import { Gen3Pokerus } from "~/rngToolsUi/gen3/pokerus";
import { Gen3Sid } from "~/rngToolsUi/gen3/sid";
import { Gen4Timer } from "~/rngToolsUi/timer/gen4";
import { Glossary } from "~/pageComponents/glossary";
import { EmeraldHeldEgg } from "~/rngToolsUi/gen3/emeraldHeldEgg";
import { EmeraldPickupEgg } from "~/rngToolsUi/gen3/emeraldPickupEgg";
import { Gen3TidSidGenerator } from "~/rngToolsUi/gen3/tidsid";
import { RsTidSidGenerator } from "~/rngToolsUi/gen3/rstid/rstid";
import { RsTidSearcher, RsTidTimer } from "~/rngToolsUi/gen3/rstid/searcher";
import { Gen3MirageIsland } from "~/rngToolsUi/gen3/mirageIsland";
import { OrAsMirageSpot } from "~/rngToolsUi/gen6/orasMirageSpot";
import { RngTimer } from "~/rngToolsUi/timer";
import { OrasId } from "~/rngToolsUi/gen6/orasId";
import { Transporter } from "~/rngToolsUi/gen6/transporter/transporter";
import { DpptSeed } from "~/rngToolsUi/gen4/dpptSeed";
import { CalibrateId4 } from "~/rngToolsUi/gen4/id/calibrateId";
import { Id4Searcher } from "~/rngToolsUi/gen4/id/idSearcher";
import { XyPokeRadar } from "~/rngToolsUi/gen6/xyPokeRadar";
import { Gen7SosList } from "~/pageComponents/gen7Sos/sosList";
import { Static3 } from "~/rngToolsUi/gen3/static/static3";
import { MultibootJirachi } from "~/rngToolsUi/gen3/multibootJirachi";
import { ShinyHoennStarter } from "~/rngToolsUi/gen3/shinyStarter";
import { GenerateHoennTidSid } from "~/rngToolsUi/gen3/shinyStarter/generateTidSid";
import { ChallengePageComponent } from "~/pageComponents/challenge";
import { ExperimentsPageComponent } from "~/pageComponents/experiments";
import { PaintingReseed } from "~/rngToolsUi/gen3/paintingReseed";
import { HomePageComponent } from "~/pageComponents/home";
import { GamePageComponent } from "~/pageComponents/gamePage";
import { RetailEmeraldHeldEgg } from "~/rngToolsUi/gen3/retailEmeraldEgg/heldEgg";
import { PokeNavInput } from "~/rngToolsUi/gen3/retailEmeraldEgg/pokeNavTrainer";
import {
  CalibrateHeldEgg,
  CalibrateHeldEggTimer,
} from "~/rngToolsUi/gen3/retailEmeraldEgg/calibrateHeldEgg";
import { RetailEmeraldPickupEgg } from "~/rngToolsUi/gen3/retailEmeraldEgg/pickupEgg";
import {
  CalibratePickupEgg,
  CalibratePickupEggTimer,
} from "~/rngToolsUi/gen3/retailEmeraldEgg/calibratePickupEgg";
import { withTags } from "~/components/tagDetector/provider";
import { mapValues } from "lodash-es";
import { Id4Timer, Id4ConsoleSetDateString } from "~/rngToolsUi/gen4/id/timer";
import { Gen4IdSetup } from "~/rngToolsUi/gen4/id/setup";

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
};

const tools = {
  IpsMerger,
  Gen2PokemonRng,
  Gen2Rng,
  Gen3Pokerus,
  Gen3Sid,
  RsTidSidGenerator,
  RsTidTimer,
  RsTidSearcher,
  Gen3MirageIsland,
  EmeraldHeldEgg,
  EmeraldPickupEgg,
  Static3,
  Gen3TidSidGenerator,
  OrAsMirageSpot,
  Gen4Timer,
  RngTimer,
  OrasId,
  Transporter,
  DpptSeed,
  CalibrateId4,
  Gen4IdSetup,
  Id4ConsoleSetDateString,
  Id4Searcher,
  Id4Timer,
  XyPokeRadar,
  ShinyHoennStarter,
  GenerateHoennTidSid,
  MultibootJirachi,
  PaintingReseed,
  RetailEmeraldHeldEgg,
  PokeNavInput,
  CalibrateHeldEgg,
  CalibrateHeldEggTimer,
  RetailEmeraldPickupEgg,
  CalibratePickupEgg,
  CalibratePickupEggTimer,
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
