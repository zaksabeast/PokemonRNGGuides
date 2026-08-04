import React from "react";
import { z } from "zod";
import {
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  MinMaxContainer,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
  Field,
  FormFieldTable,
} from "~/components";
import {
  rngTools,
  Species,
  Nature,
  Gender,
  AbilityType,
  Static4LeadInput,
  Ivs,
  SearchStatic4Opts,
  RadarShinyPatchResult,
  Patch,
  BattleResult,
  ShakeType,
  PokeRadarPatch,
} from "~/rngTools";
import { toOptions } from "~/utils/options";
import { formatSpeciesLabel } from "~/types/species";
import { PokeRadarPatches } from "~/rngToolsUi/gen6/xyPokeRadar/patch";
import { useWatch_UNSAFE } from "~/hooks/form";
import {
  getPkmFilterIvFields,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/rngToolsUi/workbench/components/pkmFilter";
import { IvInput } from "~/components/ivInput";

// Adapter: il componente PokeRadarPatches è stato scritto per il tool XY
// (griglia 0-8 con `{ x, y, state: "Empty"|"Shiny"|"Good"|"Bad" }"), mentre
// i nostri Patch Gen4 hanno `{ ring, gx, gz, continue_chain, is_shiny, shake_type }`.
// Verifica che gx/gz siano effettivamente coordinate 0-8 sulla griglia:
// se la visualizzazione risulta sbagliata, questo è il punto da rivedere.
const toXyPatchFormat = (patches: Patch[]): PokeRadarPatch[] =>
  patches.map((p) => ({
    x: p.gx,
    y: p.gz,
    state: p.is_shiny ? "Shiny" : p.continue_chain ? "Good" : "Bad",
  }));

const IV_FILTER_MODE = "ivs";

type Game = "Diamond" | "Pearl" | "Platinum";

const GAMES = ["Diamond", "Pearl", "Platinum"] as const satisfies Game[];

const RADAR_LEADS = [
  "Synchronize",
  "CutecharmM",
  "CutecharmF",
] as const satisfies Static4LeadInput[];

const BATTLE_RESULTS = ["Catch", "Win"] as const satisfies BattleResult[];
const SHAKE_TYPES = ["Slow", "Fast"] as const satisfies ShakeType[];
const TIMES = ["Day", "Night"] as const;
const DUAL_SLOT_GAMES = [
  "Ruby",
  "Sapphire",
  "Emerald",
  "FireRed",
  "LeafGreen",
] as const;
type DualSlotGame = (typeof DUAL_SLOT_GAMES)[number];

// Rispecchia la struct Rust `RadarEncounter` (rng_tools/src/gen4/pokeradar/encounters.rs)
type RadarEncounter = {
  location: string;
  species: Species;
  min_level: number;
  max_level: number;
  source: "Radar" | "Swarm" | "Day" | "Night" | "DualSlot";
  dual_slot_game: DualSlotGame | null;
};

// ---------------------------------------------------------------------------
// Form state & validazione
// ---------------------------------------------------------------------------

const Validator = z
  .object({
    game: z.enum(GAMES),
    tid: z.number().int().min(0).max(0xffff),
    sid: z.number().int().min(0).max(0xffff),
    chain: z.number().int().min(0).max(999),
    minDelay: z.number().int().min(0),
    maxDelay: z.number().int().min(0),
    lead: z.enum(RADAR_LEADS),
    minAdvanceSpread: z.number().int().min(0),
    maxAdvanceSpread: z.number().int().min(0),
    minAdvancePatch: z.number().int().min(0),
    maxAdvancePatch: z.number().int().min(0),
    route: z.string().min(1, "Select a route"),
    species: z.string().min(1, "Select a species") as unknown as z.ZodType<Species>,
    time: z.enum(TIMES),
    swarm: z.boolean(),
    dualSlot: z.boolean(),
    dualSlotGame: z.enum(DUAL_SLOT_GAMES),
    chainCount: z.number().int().min(0),
    battleResult: z.enum(BATTLE_RESULTS),
    selectedShake: z.enum(SHAKE_TYPES),
  })
  .extend(pkmFilterSchema.shape)
  .refine((v) => v.minDelay <= v.maxDelay, {
    message: "Min delay has to be <= max delay",
    path: ["maxDelay"],
  })
  .refine((v) => v.minAdvanceSpread <= v.maxAdvanceSpread, {
    message: "Min advance has to be <= max advance",
    path: ["maxAdvanceSpread"],
  })
  .refine((v) => v.minAdvancePatch <= v.maxAdvancePatch, {
    message: "Min advance has to be <= max advance",
    path: ["maxAdvancePatch"],
  });

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  game: "Diamond",
  tid: 0,
  sid: 0,
  chain: 1,
  minDelay: 700,
  maxDelay: 3000,
  lead: "Synchronize",
  minAdvanceSpread: 550,
  maxAdvanceSpread: 3000,
  minAdvancePatch: 300,
  maxAdvancePatch: 400,
  route: "",
  species: "" as Species,
  time: "Day",
  swarm: false,
  dualSlot: false,
  dualSlotGame: "Ruby",
  chainCount: 40,
  battleResult: "Catch",
  selectedShake: "Slow",
  filter_level: 5,
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
  ivs: Ivs;
  level: number;
  delay: number;
  patches: Patch[];
};

const toResultRow = (result: RadarShinyPatchResult): ResultRow => ({
  key: `${result.state.seed}-${result.patch_advance}`,
  seed: result.state.seed,
  advance: result.state.advance,
  patchAdvance: result.patch_advance,
  pid: result.state.pid,
  nature: result.state.nature,
  ability: result.state.ability,
  gender: result.state.gender,
  ivs: result.state.ivs,
  level: result.state.level,
  delay: result.seed_time.delay,
  patches: result.patches,
});

const hex = (n: number, width = 8) =>
  n.toString(16).padStart(width, "0").toUpperCase();

const columns: ResultColumn<ResultRow>[] = [
  { title: "Seed", dataIndex: "seed", monospace: true, render: (v) => hex(v) },
  { title: "Spread Advance", dataIndex: "advance" },
  { title: "Patch Advance", dataIndex: "patchAdvance" },
  { title: "Delay", dataIndex: "delay" },
  { title: "PID", dataIndex: "pid", monospace: true, render: (v) => hex(v) },
  { title: "Nature", dataIndex: "nature" },
  { title: "Ability", dataIndex: "ability" },
  { title: "Gender", dataIndex: "gender" },
  {
    title: "IVs",
    dataIndex: "ivs",
    render: (ivs: Ivs) =>
      `${ivs.hp}/${ivs.atk}/${ivs.def}/${ivs.spa}/${ivs.spd}/${ivs.spe}`,
  },
  { title: "Level", dataIndex: "level" },
];

// ---------------------------------------------------------------------------
// Form content: qui vivono routes/species, popolate da rngTools.get_gen4_radar_encounters
// ---------------------------------------------------------------------------

const FormContent = () => {
  // Valori grezzi (non validati) via react-hook-form: ci servono anche quando
  // route/species sono ancora vuoti, cosa che useWatch (validato) non permette
  // (se un campo fallisce lo schema, l'intero risultato diventa {}).
  const [game, route, species, time, swarm, dualSlot, dualSlotGame] =
    useWatch_UNSAFE<FormState>({
      name: [
        "game",
        "route",
        "species",
        "time",
        "swarm",
        "dualSlot",
        "dualSlotGame",
      ],
    });

  const [encounters, setEncounters] = React.useState<RadarEncounter[]>([]);

  React.useEffect(() => {
    console.log("[radar] game watched value:", game);
    if (!game) return;
    let cancelled = false;
    rngTools
      .get_gen4_radar_encounters(game)
      .then((result: RadarEncounter[]) => {
        console.log("[radar] encounters received:", result.length, result.slice(0, 3));
        if (!cancelled) setEncounters(result);
      })
      .catch((err: unknown) => {
        console.error("[radar] get_gen4_radar_encounters failed:", err);
      });
    return () => {
      cancelled = true;
    };
  }, [game]);

  const routeOptions = React.useMemo(
    () =>
      Array.from(new Set(encounters.map((e) => e.location)))
        .sort()
        .map((r) => ({ label: r, value: r })),
    [encounters],
  );

  const encountersForRoute = React.useMemo(
    () => (route ? encounters.filter((e) => e.location === route) : []),
    [encounters, route],
  );

  // Filtra per fonte in base agli switch/select attivi. Radar (la tabella
  // base) è sempre incluso; Swarm/Dual Slot/Time sono condizionali.
  const activeEncounters = React.useMemo(
    () =>
      encountersForRoute.filter((e) => {
        switch (e.source) {
          case "Radar":
            return true;
          case "Swarm":
            return swarm;
          case "Day":
            return time === "Day";
          case "Night":
            return time === "Night";
          case "DualSlot":
            return dualSlot && e.dual_slot_game === dualSlotGame;
          default:
            return false;
        }
      }),
    [encountersForRoute, swarm, dualSlot, dualSlotGame, time],
  );

  const speciesOptions = React.useMemo(
    () =>
      Array.from(new Set(activeEncounters.map((e) => e.species))).map((s) => ({
        label: formatSpeciesLabel(s),
        value: s,
      })),
    [activeEncounters],
  );

  // TODO: se esiste già un helper tipo getSpeciesGenderRatio(species), usalo qui
  // per disabilitare Cute Charm sulle specie gender-locked. Per ora sempre abilitato.
  const allowCuteCharm = true;

  const staticFields: Field[] = [
    {
      label: "Game",
      input: <FormikSelect<FormState> name="game" options={toOptions([...GAMES])} />,
    },
    {
      label: "TID / SID",
      input: (
        <MinMaxContainer
          min={<FormikNumberInput<FormState> name="tid" numType="decimal" />}
          max={<FormikNumberInput<FormState> name="sid" numType="decimal" />}
        />
      ),
    },
    {
      label: "Route",
      input: <FormikSelect<FormState> name="route" options={routeOptions} />,
    },
    {
      label: "Time",
      input: <FormikSelect<FormState> name="time" options={toOptions([...TIMES])} />,
    },
    {
      label: "Swarm",
      input: <FormikSwitch<FormState> name="swarm" />,
    },
    {
      label: "Dual Slot",
      input: <FormikSwitch<FormState> name="dualSlot" />,
    },
    ...(dualSlot
      ? [
          {
            label: "Dual Slot Game",
            input: (
              <FormikSelect<FormState>
                name="dualSlotGame"
                options={toOptions([...DUAL_SLOT_GAMES])}
              />
            ),
          },
        ]
      : []),
    {
      label: "Species",
      input: <FormikSelect<FormState> name="species" options={speciesOptions} />,
    },
    {
      label: "Lead",
      input: (
        <FormikSelect<FormState>
          name="lead"
          options={toOptions([...RADAR_LEADS]).filter(
            (o) => allowCuteCharm || o.value === "Synchronize",
          )}
        />
      ),
    },
    {
      label: "Chain",
      input: <FormikNumberInput<FormState> name="chain" numType="decimal" />,
    },
    {
      label: "Delay",
      input: (
        <MinMaxContainer
          min={<FormikNumberInput<FormState> name="minDelay" numType="decimal" />}
          max={<FormikNumberInput<FormState> name="maxDelay" numType="decimal" />}
        />
      ),
    },
    {
      label: "Advance (spread)",
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState> name="minAdvanceSpread" numType="decimal" />
          }
          max={
            <FormikNumberInput<FormState> name="maxAdvanceSpread" numType="decimal" />
          }
        />
      ),
    },
    {
      label: "Advance (shiny patch)",
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState> name="minAdvancePatch" numType="decimal" />
          }
          max={
            <FormikNumberInput<FormState> name="maxAdvancePatch" numType="decimal" />
          }
        />
      ),
    },
    {
      label: "Battle Result",
      input: (
        <FormikSelect<FormState>
          name="battleResult"
          options={toOptions([...BATTLE_RESULTS])}
        />
      ),
    },
    {
      label: "Shake Type",
      input: (
        <FormikSelect<FormState>
          name="selectedShake"
          options={toOptions([...SHAKE_TYPES])}
        />
      ),
    },
  ];

  const ivFields: Field[] = [
    {
      label: "Min IVs",
      input: <IvInput<FormState> name="filter_min_ivs" />,
    },
    {
      label: "Max IVs",
      input: <IvInput<FormState> name="filter_max_ivs" />,
    },
  ];

  // Il risultato è sempre e solo shiny (forziamo filter.shiny = true nel
  // submit), quindi lo switch "Shiny" del filtro condiviso viene nascosto:
  // mostrarlo confonderebbe, dato che l'utente non può comunque cambiarlo.
  const otherFilterFields: Field[] = species
    ? getPkmFilterIvFields<FormState>({ species })
        .filter((f) => !/\bIV\b/.test(f.label) && !/shiny/i.test(f.label))
        .map((f) => ({
          label: f.label,
          input: f.children,
        }))
    : [];

  return (
    <FormFieldTable
      fields={[...staticFields, ...ivFields, ...otherFilterFields]}
    />
  );
};

// ---------------------------------------------------------------------------

export const PokeRadar4ShinySearcher = () => {
  const [results, setResults] = React.useState<ResultRow[]>([]);
  const [selectedPatches, setSelectedPatches] = React.useState<Patch[]>([]);

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    const allEncounters: RadarEncounter[] = await rngTools.get_gen4_radar_encounters(
      opts.game,
    );
    const encounter = allEncounters.find((e) => {
      if (e.location !== opts.route || e.species !== opts.species) return false;
      switch (e.source) {
        case "Radar":
          return true;
        case "Swarm":
          return opts.swarm;
        case "Day":
          return opts.time === "Day";
        case "Night":
          return opts.time === "Night";
        case "DualSlot":
          return opts.dualSlot && e.dual_slot_game === opts.dualSlotGame;
        default:
          return false;
      }
    });

    const filter = {
      ...(await pkmFilterFieldsToRustInput(
        { species: opts.species, ivFilterMode: IV_FILTER_MODE },
        opts,
      )),
      shiny: true,
    };

    const search: SearchStatic4Opts = {
      tid: opts.tid,
      sid: opts.sid,
      species: opts.species,
      filter,
      offset: 0,
      encounter_min_level: encounter?.min_level ?? 1,
      encounter_max_level: encounter?.max_level ?? 100,
      min_advance: opts.minAdvanceSpread,
      max_advance: opts.maxAdvanceSpread,
      min_delay: opts.minDelay,
      max_delay: opts.maxDelay,
      year: null,
      month: null,
      force_second: null,
      lead: opts.lead,
      method: "DpptJ",
    };

    const rawResults = await rngTools.search_shiny_patches_range({
      search,
      patch_min_advance: opts.minAdvancePatch,
      patch_max_advance: opts.maxAdvancePatch,
      chain_count: opts.chainCount,
      battle_result: opts.battleResult,
      selected_shake: opts.selectedShake,
    });

    setResults(rawResults.map(toResultRow));
  };

  return (
    <>
      <RngToolForm<FormState, ResultRow>
        columns={columns}
        results={results}
        initialValues={initialValues}
        validationSchema={Validator}
        onSubmit={onSubmit}
        onClickResultRow={(row) => setSelectedPatches(row?.patches ?? [])}
        rowKey="key"
        submitTrackerId="search_gen4_radar_shiny_patches"
      >
        <FormContent />
      </RngToolForm>
      <PokeRadarPatches patches={toXyPatchFormat(selectedPatches)} />
    </>
  );
};