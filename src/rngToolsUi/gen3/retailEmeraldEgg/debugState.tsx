import { CopyToClipboardButton } from "~/components";
import { PokeNavTrainer } from "~/rngTools";
import { useHydrate } from "~/hooks/useHydrate";
import { NullableIvs } from "~/components/ivInput";
import {
  HeldEggCalibrationState,
  HeldEggState,
  PickupEggState,
  useHeldEggCalibrationState,
  useHeldEggState,
  usePickupEggState,
  useRegisteredTrainers,
} from "./state";
import { formatHex } from "~/utils/formatHex";
import { formatMarkdownTable } from "~/utils/formatMarkdownTable";

const maxDebugResults = 100;

const formatIvs = (ivs: NullableIvs) =>
  [
    `HP ${ivs.hp ?? "?"}`,
    `Atk ${ivs.atk ?? "?"}`,
    `Def ${ivs.def ?? "?"}`,
    `SpA ${ivs.spa ?? "?"}`,
    `SpD ${ivs.spd ?? "?"}`,
    `Spe ${ivs.spe ?? "?"}`,
  ].join(" / ");

const formatHeldEgg = ({
  seed,
  target,
  eggSettings,
  registeredTrainers,
}: HeldEggState & { registeredTrainers: PokeNavTrainer[] }) => {
  const settingsLines = [
    `- Seed: ${formatHex(seed)}`,
    `- Egg species: ${eggSettings.egg_species}`,
    `- Compatability: ${eggSettings.compatability}`,
    `- Lightning rod: ${eggSettings.has_lightning_rod ? "Yes" : "No"}`,
    `- Roamer: ${eggSettings.has_roamer ? "Yes" : "No"}`,
    `- Registered Trainer count: ${registeredTrainers.length} / 64`,
  ];

  const targetLines =
    target != null
      ? [
          `- Advance: ${target.advance}`,
          `- Redraws: ${target.redraws}`,
          `- Calibration: ${target.calibration}`,
          `- PID: ${formatHex(target.pid)}`,
          `- Nature: ${target.nature}`,
          `- Gender: ${target.gender}`,
          `- Ability: ${target.ability}`,
          `- Shiny: ${target.shiny ? "Yes" : "No"}`,
          `- Has roamer: ${target.has_roamer ? "Yes" : "No"}`,
          `- Match call: ${target.match_call}`,
        ]
      : ["None selected"];

  return [
    "## Held Egg",
    ...settingsLines,
    "",
    "### Target",
    ...targetLines,
  ].join("\n");
};

const formatCalibration = ({
  debug,
  results,
  previousOffsets,
}: HeldEggCalibrationState) => {
  const { filters, search } = debug ?? {};

  if (filters == null) {
    return ["### Calibration", "No calibration search run"].join("\n");
  }

  const filterLines = [
    `- PokeNav call: ${filters.pokeNavCall}`,
    `- Has egg: ${filters.hasEgg === "true" ? "Yes" : "No"}`,
    `- Hatched nature: ${filters.nature}`,
    `- Hatched gender: ${filters.gender}`,
    `- Advance range: ${filters.advanceRange}`,
    `- Pokedex range: ${filters.redrawRange}`,
    `- Calibration override: ${filters.calibration ?? "None"}`,
    ...(search != null
      ? [
          `- Searched calibration: ${search.calibration}`,
          `- Searched advances: ${search.initialAdvances} to ${search.initialAdvances + search.maxAdvances}`,
          `- Searched pokedex: ${search.minRedraw ?? "N/A"} to ${search.maxRedraw ?? "N/A"}`,
        ]
      : []),
    `- Previous offsets: ${previousOffsets?.join(", ") ?? "None"}`,
  ];

  const allResults = results ?? [];
  const shownResults = allResults.slice(0, maxDebugResults);
  const omitted = allResults.length - shownResults.length;

  const resultsTable = formatMarkdownTable(
    ["Advance", "Pokedex", "Calibration", "Nature", "Match Call"],
    shownResults.map((result) => [
      `${result.advance}`,
      `${result.redraws ?? "?"}`,
      `${result.calibration}`,
      result.nature ?? "No Egg",
      result.match_call,
    ]),
  );

  // A markdown table is a nice way to view the results,
  // but Discord doesn't support them.
  // We wrap in a code block to preserve formatting.
  const codeBlockResultsTable = ["```", resultsTable, "```"];

  return [
    "### Calibration Settings",
    ...filterLines,
    "",
    `### Calibration Results (${allResults.length})`,
    ...(shownResults.length > 0 ? codeBlockResultsTable : ["None"]),
    ...(omitted > 0 ? ["", `...${omitted} more not shown`] : []),
  ].join("\n");
};

const formatPickupEgg = ({
  seed,
  targetAdvance,
  targetMethod,
  parentIvs,
}: PickupEggState) =>
  [
    "## Pickup Egg",
    `- Seed: ${formatHex(seed)}`,
    `- Target advance: ${targetAdvance}`,
    `- Target method: ${targetMethod}`,
    `- Parent 1 IVs: ${formatIvs(parentIvs[0])}`,
    `- Parent 2 IVs: ${formatIvs(parentIvs[1])}`,
  ].join("\n");

export const RetailEmeraldEggDebugButton = () => {
  const [heldEggState] = useHeldEggState();
  const [calibrationState] = useHeldEggCalibrationState();
  const [pickupEggState] = usePickupEggState();
  const [lockedTrainers] = useRegisteredTrainers();
  const { client } = useHydrate(lockedTrainers);

  const helpfulTips = [
    "## Helpful Tips",
    "- Are the inputs correct (e.g. roamer)?",
    "- Does increasing the Advance or Pokedex calibration ranges show plausible results?",
    "- Did they run into the friendship issue?",
  ].join("\n");

  const debugInfo = [
    "# Retail Emerald Egg Debug Info",
    helpfulTips,
    formatHeldEgg({
      ...heldEggState,
      registeredTrainers: client?.registeredTrainers ?? [],
    }),
    formatCalibration(calibrationState),
    formatPickupEgg(pickupEggState),
  ].join("\n\n");

  return (
    <CopyToClipboardButton
      text={debugInfo}
      trackerId="copy_retail_emerald_egg_debug_info"
      successMessage="Copied debug info to clipboard"
    >
      Copy Debug Info
    </CopyToClipboardButton>
  );
};
