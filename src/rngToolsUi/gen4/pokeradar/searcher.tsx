import React from "react";
import { sortBy, uniq, uniqBy, uniqueId } from "lodash-es";
import { z } from "zod";
import { ResultColumn, Button } from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormRadioField,
  FormSection,
  FormSelectField,
  FormSwitchField,
  NumberField,
  PkmFilter,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import {
  multiWorkerRngTools,
  Nature,
  Gender,
  AbilityType,
  Ivs,
  SearchStatic4Opts,
  RadarShinyPatchResult,
  Patch,
  BattleResult,
  LeadAbility,
  Species,
} from "~/rngTools";
import { formatSpeciesLabel, species } from "~/types/species";
import { useWatch } from "~/hooks/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { chunkIvs } from "~/utils/chunkIvs";
import { chunkRange } from "~/utils/chunkRange";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/components/form/pokemon/pkmFilterFields";
import { formatHex } from "~/utils/formatHex";
import { RustOption } from "~/types";
import { toOptions } from "~/utils/options";
import { static4LeadSchema, getLeadOptions } from "../shared/leads";
import { DpPt, Gen3GameVersions } from "~/types/games";
import { getEncounters } from "~/rngToolsUi/gen4/encounters/wild";
import { ivColumns } from "~/rngToolsUi/shared/ivColumns";
import {
  BATTLE_RESULTS,
  TIMES,
  POKERADAR_ROUTES,
  TROPHY_GARDEN,
  TROPHY_GARDEN_DP,
  TROPHY_GARDEN_PT,
  TROPHY_GARDEN_LEVEL,
  TROPHY_GARDEN_SLOTS,
} from "./constants";
import { useSetAtom } from "jotai";
import { useCurrentStep } from "~/components/stepper/state";
import { selectedShinyPatchAtom } from "./state";

const LIMIT = 1000;

const Validator = z
  .object({
    game: z.enum(DpPt),
    tid: z.number().int().min(0).max(0xffff),
    sid: z.number().int().min(0).max(0xffff),
    minDelay: z.number().int().min(0),
    maxDelay: z.number().int().min(0),
    lead: static4LeadSchema,
    minAdvanceSpread: z.number().int().min(0),
    maxAdvanceSpread: z.number().int().min(0),
    minAdvancePatch: z.number().int().min(0),
    maxAdvancePatch: z.number().int().min(0),
    route: z.enum(POKERADAR_ROUTES),
    species: z.enum(species),
    level: z.number().int().min(1).max(100),
    timeOfDay: z.enum(TIMES),
    swarmActive: z.boolean(),
    dualSlotGame: z.enum(Gen3GameVersions).nullable(),
    chainCount: z.number().int().min(0).max(1000),
    battleResult: z.enum(BATTLE_RESULTS),
    replace: z.boolean(),
    replacement1: z.enum(species),
    replacement2: z.enum(species),
  })
  .extend(pkmFilterSchema.shape);

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  game: "Diamond",
  tid: 0,
  sid: 0,
  minDelay: 700,
  maxDelay: 800,
  lead: "None",
  minAdvanceSpread: 550,
  maxAdvanceSpread: 1000,
  minAdvancePatch: 300,
  maxAdvancePatch: 400,
  route: "Acuity Lakefront",
  species: "Snover",
  level: 5,
  timeOfDay: "day",
  swarmActive: false,
  dualSlotGame: null,
  chainCount: 1,
  battleResult: "Catch",
  replace: false,
  replacement1: "Clefairy",
  replacement2: "Jigglypuff",
  ...getPkmFilterInitialValues(),
};

type ResultRow = {
  key: string;
  seed: number;
  advance: number;
  patchAdvance: number;
  pid: number;
  nature: Nature;
  ability: AbilityType;
  gender: Gender;
  level: number;
  delay: number;
  patches: Patch[];
  lead: LeadAbility;
} & Ivs;

type EncounterOpts = Pick<
  FormState,
  | "game"
  | "route"
  | "timeOfDay"
  | "swarmActive"
  | "dualSlotGame"
  | "replace"
  | "replacement1"
  | "replacement2"
>;

// Route encounters, with the Trophy Garden slots replaced by the
// chosen substitutes (if "Replace?" is enabled).
const getFormEncounters = (opts: EncounterOpts) => {
  const encounters = getEncounters({
    game: opts.game,
    location: opts.route,
    timeOfDay: opts.timeOfDay,
    swarmActive: opts.swarmActive,
    dualSlotCartridge: opts.dualSlotGame,
    radarActive: false,
  });

  if (opts.route !== TROPHY_GARDEN || !opts.replace) {
    return encounters;
  }

  const [slot1, slot2] = TROPHY_GARDEN_SLOTS;
  return encounters.map((enc, slot) => {
    if (slot === slot1) {
      return {
        ...enc,
        species: opts.replacement1,
        minLevel: TROPHY_GARDEN_LEVEL,
        maxLevel: TROPHY_GARDEN_LEVEL,
      };
    }
    if (slot === slot2) {
      return {
        ...enc,
        species: opts.replacement2,
        minLevel: TROPHY_GARDEN_LEVEL,
        maxLevel: TROPHY_GARDEN_LEVEL,
      };
    }
    return enc;
  });
};

const getSpeciesEncounterSlots = (opts: FormState): number[] =>
  getFormEncounters(opts).flatMap((enc, slot) =>
    enc.species === opts.species ? [slot] : [],
  );

const toResultRow = (result: RadarShinyPatchResult): ResultRow => {
  const spread = result.state.state;
  return {
    key: uniqueId(),
    seed: spread.seed,
    advance: spread.advance,
    patchAdvance: result.patch_advance,
    pid: spread.pid,
    nature: spread.nature,
    ability: spread.ability,
    gender: spread.gender,
    ...spread.ivs,
    level: spread.level,
    delay: result.state.seed_time.delay,
    patches: result.patches,
    lead: spread.lead,
  };
};

const FormContent = () => {
  const t = useActiveRouteTranslations();
  const {
    game,
    route,
    species,
    timeOfDay,
    swarmActive,
    dualSlotGame,
    replace,
    replacement1,
    replacement2,
  } = useWatch({
    validationSchema: Validator,
    names: {
      game: true,
      route: true,
      species: true,
      timeOfDay: true,
      swarmActive: true,
      dualSlotGame: true,
      replace: true,
      replacement1: true,
      replacement2: true,
    },
  });

  const encounters =
    game == null || route == null || timeOfDay == null || swarmActive == null
      ? []
      : getFormEncounters({
          game,
          route,
          timeOfDay,
          swarmActive,
          dualSlotGame: dualSlotGame ?? null,
          replace: replace ?? false,
          replacement1: replacement1 ?? initialValues.replacement1,
          replacement2: replacement2 ?? initialValues.replacement2,
        });

  const encounterLevels = encounters
    .filter((enc) => enc.species === species)
    .flatMap((enc) => [enc.minLevel, enc.maxLevel]);
  const levelOptions = sortBy(
    toOptions(uniq(encounterLevels)),
    (opt) => opt.label,
  );

  const uniqueSpecies = uniqBy(encounters, ({ species }) => species);
  const speciesOptions = uniqueSpecies.map(({ species }) => ({
    label: formatSpeciesLabel(species),
    value: species,
  }));

  const trophyGardenOptions = toOptions(
    game === "Platinum" ? TROPHY_GARDEN_PT : TROPHY_GARDEN_DP,
  );

  return (
    <>
      <FormSection title={t["Your game"]}>
        <FormSelectField<FormState>
          name="game"
          label={t["Game"]}
          options={toOptions(DpPt)}
        />
        <FieldRow>
          <FormNumberField<FormState>
            name="tid"
            label={t["TID"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="sid"
            label={t["SID"]}
            numType="decimal"
          />
        </FieldRow>
        <FormSelectField<FormState>
          name="lead"
          label={t["Lead"]}
          options={getLeadOptions({
            method: "ShinyRadar",
            isFixedGender: false,
          })}
        />
      </FormSection>

      <FormSection title="Encounter">
        <FormSelectField<FormState>
          name="route"
          label="Route"
          options={sortBy(toOptions(POKERADAR_ROUTES), (opt) => opt.label)}
        />
        {route === TROPHY_GARDEN && (
          <FormSwitchField<FormState> name="replace" label="Replace?" />
        )}
        {route === TROPHY_GARDEN && replace && (
          <FieldRow>
            <FormSelectField<FormState>
              name="replacement1"
              label="Replacement 1 (slot 7)"
              options={trophyGardenOptions}
            />
            <FormSelectField<FormState>
              name="replacement2"
              label="Replacement 2 (slot 6)"
              options={trophyGardenOptions}
            />
          </FieldRow>
        )}
        <FormSelectField<FormState>
          name="timeOfDay"
          label={t["Time"]}
          options={[
            { label: "Day", value: "day" },
            { label: "Night", value: "night" },
          ]}
        />
        <FormSwitchField<FormState> name="swarmActive" label="Swarm" />
        <FormSelectField<FormState>
          name="dualSlotGame"
          label="Dual Slot Game"
          options={[
            { label: t["None"], value: null },
            ...toOptions(Gen3GameVersions),
          ]}
        />
        <FormSelectField<FormState>
          name="species"
          label={t["Species"]}
          options={speciesOptions}
        />
        <FormRadioField<FormState>
          name="level"
          label={t["Level"]}
          cellSize="number"
          options={levelOptions}
        />
      </FormSection>

      <FormSection title={t["Search"]}>
        <FieldRow>
          <FormNumberField<FormState>
            name="minDelay"
            label={t["Min Delay"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="maxDelay"
            label={t["Max Delay"]}
            numType="decimal"
          />
        </FieldRow>
        <FieldRow>
          <FormNumberField<FormState>
            name="minAdvanceSpread"
            label="Min Spread Advance"
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="maxAdvanceSpread"
            label="Max Spread Advance"
            numType="decimal"
          />
        </FieldRow>
        <FieldRow>
          <FormNumberField<FormState>
            name="minAdvancePatch"
            label="Min Patch Advance"
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="maxAdvancePatch"
            label="Max Patch Advance"
            numType="decimal"
          />
        </FieldRow>
        <FormSelectField<FormState>
          name="battleResult"
          label="Battle Result"
          options={toOptions(BATTLE_RESULTS)}
        />
        <FormNumberField<FormState>
          name="chainCount"
          label={t["Chain"]}
          numType="decimal"
        />
        <NumberField label="Limit" numType="decimal" disabled value={LIMIT} />
      </FormSection>

      <FormSection title={t["Filters"]}>
        <PkmFilter<FormState>
          generation={4}
          species={species ?? undefined}
          displayShiny={false}
        />
      </FormSection>
    </>
  );
};

export const PokeRadar4ShinySearcher: React.FC = () => {
  const setSelectedPatch = useSetAtom(selectedShinyPatchAtom);
  const [, setCurrentStep] = useCurrentStep();

  // Tracks the search parameters used for the most recent search, since
  // those aren't part of each individual result row. Needed both for the
  // patch grid (chainCount/battleResult) and for the chain starter
  // (tid/sid/lead/species/level/encounterSlots).
  const [searchMeta, setSearchMeta] = React.useState<{
    chainCount: number;
    battleResult: BattleResult;
    tid: number;
    sid: number;
    species: Species;
    level: number;
    encounterSlots: number[];
  }>({
    chainCount: initialValues.chainCount,
    battleResult: initialValues.battleResult,
    tid: initialValues.tid,
    sid: initialValues.sid,
    species: initialValues.species,
    level: initialValues.level,
    encounterSlots: getSpeciesEncounterSlots(initialValues),
  });

  const columns: ResultColumn<ResultRow>[] = [
    {
      title: "",
      dataIndex: "key",
      render: (_value, row: ResultRow) => (
        <Button
          trackerId="poke_radar4_shiny_select_patch"
          onClick={() => {
            setSelectedPatch({
              seed: row.seed,
              advance: row.patchAdvance,
              spreadAdvance: row.advance,
              chainCount: searchMeta.chainCount,
              battleResult: searchMeta.battleResult,
              tid: searchMeta.tid,
              sid: searchMeta.sid,
              lead: row.lead,
              species: searchMeta.species,
              level: searchMeta.level,
              encounterSlots: searchMeta.encounterSlots,
            });
            setCurrentStep((prev) => prev + 1);
          }}
        >
          Select
        </Button>
      ),
    },
    {
      title: "Seed",
      dataIndex: "seed",
      monospace: true,
      render: (value) => formatHex(value),
    },
    { title: "Patch Advance", dataIndex: "patchAdvance" },
    { title: "Spread Advance", dataIndex: "advance" },
    { title: "Delay", dataIndex: "delay" },
    {
      title: "PID",
      dataIndex: "pid",
      monospace: true,
      render: (value) => formatHex(value),
    },
    { title: "Nature", dataIndex: "nature" },
    { title: "Ability", dataIndex: "ability" },
    { title: "Gender", dataIndex: "gender" },
    ...ivColumns,
    { title: "Level", dataIndex: "level" },
  ];

  const {
    run: searchShinyPatches,
    data: results,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.search_shiny_patches_range, {
    map: toResultRow,
    limit: LIMIT,
  });

  const filteredResults = React.useMemo(
    () => results.filter((res) => res.patchAdvance < res.advance),
    [results],
  );

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    setSearchMeta({
      chainCount: opts.chainCount,
      battleResult: opts.battleResult,
      tid: opts.tid,
      sid: opts.sid,
      species: opts.species,
      level: opts.level,
      encounterSlots: getSpeciesEncounterSlots(opts),
    });

    const baseSearch: Omit<RustOption<SearchStatic4Opts>, "filter"> = {
      tid: opts.tid,
      sid: opts.sid,
      species: opts.species,
      offset: 0,
      encounter_min_level: opts.level,
      encounter_max_level: opts.level,
      min_advance: opts.minAdvanceSpread,
      max_advance: opts.maxAdvanceSpread,
      min_delay: opts.minDelay,
      max_delay: opts.maxDelay,
      year: 2000,
      month: null,
      force_second: null,
      lead: opts.lead,
      method: "ShinyRadar",
    };

    const chunkedIvs = chunkIvs(opts.filter_min_ivs, opts.filter_max_ivs);
    const chunkedSpreadAdvances = chunkRange(
      [opts.minAdvanceSpread, opts.maxAdvanceSpread],
      100,
    );
    const chunkedPatchAdvances = chunkRange(
      [opts.minAdvancePatch, opts.maxAdvancePatch],
      100,
    );

    const combinedChunks = chunkedIvs.flatMap(([minIvs, maxIvs]) =>
      chunkedSpreadAdvances.flatMap(([minSpread, maxSpread]) =>
        chunkedPatchAdvances.map(([minPatch, maxPatch]) => ({
          minIvs,
          maxIvs,
          minSpread,
          maxSpread,
          minPatch,
          maxPatch,
        })),
      ),
    );

    const searchOptsChunks = combinedChunks.map(
      ({ minIvs, maxIvs, minSpread, maxSpread, minPatch, maxPatch }) => ({
        search: {
          ...baseSearch,
          min_advance: minSpread,
          max_advance: maxSpread,
          filter: {
            ...pkmFilterFieldsToRustInput({
              ...opts,
              filter_shiny: "AnyShiny",
            }),
            min_ivs: minIvs,
            max_ivs: maxIvs,
          },
        },
        patch_min_advance: minPatch,
        patch_max_advance: maxPatch,
        chain_count: opts.chainCount,
        battle_result: opts.battleResult,
        selected_shake: "Slow" as const,
      }),
    );

    await searchShinyPatches(searchOptsChunks);
  };

  return (
    <ToolForm<FormState, ResultRow>
      columns={columns}
      results={filteredResults}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      rowKey="key"
      submitTrackerId="search_gen4_radar_shiny_patches"
      allowCancel
      cancelTrackerId="cancel_gen4_radar_shiny_patches"
      onCancel={cancel}
      progressPercent={progressPercent}
    >
      <FormContent />
    </ToolForm>
  );
};
