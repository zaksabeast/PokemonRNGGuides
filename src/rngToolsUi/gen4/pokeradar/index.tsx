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
  multiWorkerRngTools,
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
} from "~/rngTools";
import { formatSpeciesLabel } from "~/types/species";
import { useWatch_UNSAFE } from "~/hooks/form";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { chunkIvs } from "~/utils/chunkIvs";
import {
  getPkmFilterIvFields,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/rngToolsUi/workbench/components/pkmFilter";
import { IvInput } from "~/components/ivInput";
import { toOptions } from "~/utils/options";

const IV_FILTER_MODE = "ivs";

type Game = "Diamond" | "Pearl" | "Platinum";

const GAMES = ["Diamond", "Pearl", "Platinum"] as const satisfies Game[];

const RADAR_LEADS = [
  "None",
  "Synchronize",
  "CuteharmM",
  "CutecharmF",
] as const satisfies Static4LeadInput[];

const BATTLE_RESULTS = ["Catch", "Win"] as const satisfies BattleResult[];
const TIMES = ["Day", "Night"] as const;
const DUAL_SLOT_GAMES = [
  "Ruby",
  "Sapphire",
  "Emerald",
  "FireRed",
  "LeafGreen",
] as const;
type DualSlotGame = (typeof DUAL_SLOT_GAMES)[number];

const ALLOWED_ROUTES = [
  "Valley Windworks",
  "Eterna Forest",
  "Fuego Ironworks",
  "Mt. Coronet Summit",
  "Stark Mountain",
  "Sendoff Spring",
  "Trophy Garden",
  "Lake Valor",
  "Lake Acuity",
  "Valor Lakefront",
  "Acuity Lakefront",
  "Route 201",
  "Route 202",
  "Route 203",
  "Route 204 (South)",
  "Route 205 (South)",
  "Route 205 (North)",
  "Route 206",
  "Route 207",
  "Route 208",
  "Route 209",
  "Route 210 (South)",
  "Route 210 (North)",
  "Route 211 (West)",
  "Route 211 (East)",
  "Route 212 (North)",
  "Route 212 (South)",
  "Route 213",
  "Route 214",
  "Route 215",
  "Route 216",
  "Route 217",
  "Route 218",
  "Route 221",
  "Route 222",
  "Route 224",
  "Route 225",
  "Route 226",
  "Route 227",
  "Route 228",
  "Route 229",
  "Route 230",
] as const;

const ALLOWED_ROUTES_SET = new Set<string>(ALLOWED_ROUTES);

type RadarSpecies = {
  species: Species;
  min_level: number;
  max_level: number;
};

const Validator = z
  .object({
    game: z.enum(GAMES),
    tid: z.number().int().min(0).max(0xffff),
    sid: z.number().int().min(0).max(0xffff),
    minDelay: z.number().int().min(0),
    maxDelay: z.number().int().min(0),
    lead: z.enum(RADAR_LEADS),
    minAdvanceSpread: z.number().int().min(0),
    maxAdvanceSpread: z.number().int().min(0),
    minAdvancePatch: z.number().int().min(0),
    maxAdvancePatch: z.number().int().min(0),
    route: z.string().min(1, "Select a route"),
    species: z
      .string()
      .min(1, "Select a species") as unknown as z.ZodType<Species>,
    time: z.enum(TIMES),
    swarm: z.boolean(),
    dualSlot: z.boolean(),
    dualSlotGame: z.enum(DUAL_SLOT_GAMES),
    chainCount: z.number().int().min(0),
    battleResult: z.enum(BATTLE_RESULTS),
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
  minDelay: 700,
  maxDelay: 3000,
  lead: "None",
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
  { title: "Patch Advance", dataIndex: "patchAdvance" },
  { title: "Spread Advance", dataIndex: "advance" },
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

const fetchRadarSpecies = (opts: {
  game: Game;
  route: string;
  time: (typeof TIMES)[number];
  swarm: boolean;
  dualSlot: boolean;
  dualSlotGame: DualSlotGame;
}): Promise<RadarSpecies[]> =>
  rngTools.get_gen4_radar_species({
    game: opts.game,
    location: opts.route,
    time_of_day: opts.time,
    swarm_active: opts.swarm,
    dual_slot_game: opts.dualSlot ? opts.dualSlotGame : null,
  });

const FormContent = () => {
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

  const [locations, setLocations] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!game) return;
    let cancelled = false;
    rngTools
      .get_gen4_radar_locations(game)
      .then((result: string[]) => {
        if (!cancelled) setLocations(result);
      })
      .catch((err: unknown) => {
        console.error("[radar] get_gen4_radar_locations failed:", err);
      });
    return () => {
      cancelled = true;
    };
  }, [game]);

  const routeOptions = React.useMemo(
    () =>
      locations
        .filter((r) => ALLOWED_ROUTES_SET.has(r))
        .sort((a, b) => a.localeCompare(b))
        .map((r) => ({ label: r, value: r })),
    [locations],
  );

  const [resolvedSpecies, setResolvedSpecies] = React.useState<RadarSpecies[]>(
    [],
  );

  React.useEffect(() => {
    if (!game || !route) {
      setResolvedSpecies([]);
      return;
    }
    let cancelled = false;
    fetchRadarSpecies({ game, route, time, swarm, dualSlot, dualSlotGame })
      .then((result) => {
        if (!cancelled) setResolvedSpecies(result);
      })
      .catch((err: unknown) => {
        console.error("[radar] get_gen4_radar_species failed:", err);
      });
    return () => {
      cancelled = true;
    };
  }, [game, route, time, swarm, dualSlot, dualSlotGame]);

  const speciesOptions = React.useMemo(
    () =>
      resolvedSpecies.map((s) => ({
        label: formatSpeciesLabel(s.species),
        value: s.species,
      })),
    [resolvedSpecies],
  );

  const allowCuteCharm = true;

  const staticFields: Field[] = [
    {
      label: "Game",
      input: (
        <FormikSelect<FormState> name="game" options={toOptions([...GAMES])} />
      ),
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
      input: (
        <FormikSelect<FormState> name="time" options={toOptions([...TIMES])} />
      ),
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
      input: (
        <FormikSelect<FormState> name="species" options={speciesOptions} />
      ),
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
      label: "Delay",
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState> name="minDelay" numType="decimal" />
          }
          max={
            <FormikNumberInput<FormState> name="maxDelay" numType="decimal" />
          }
        />
      ),
    },
    {
      label: "Advance (spread)",
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="minAdvanceSpread"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="maxAdvanceSpread"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: "Advance (shiny patch)",
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="minAdvancePatch"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="maxAdvancePatch"
              numType="decimal"
            />
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

export const PokeRadar4ShinySearcher = () => {
  const {
    run: searchShinyPatches,
    data: results,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.search_shiny_patches_range, {
    map: toResultRow,
  });

  const filteredResults = React.useMemo(
    () => results.filter((r) => r.patchAdvance < r.advance),
    [results],
  );

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    try {
      const resolvedSpecies = await fetchRadarSpecies({
        game: opts.game,
        route: opts.route,
        time: opts.time,
        swarm: opts.swarm,
        dualSlot: opts.dualSlot,
        dualSlotGame: opts.dualSlotGame,
      });
      const encounter = resolvedSpecies.find((s) => s.species === opts.species);
      if (!encounter) {
        console.warn(
          "[radar] nessun match per la specie selezionata tra gli slot risolti:",
          opts.species,
          resolvedSpecies,
        );
      }

      const filter = {
        ...(await pkmFilterFieldsToRustInput(
          { species: opts.species, ivFilterMode: IV_FILTER_MODE },
          opts,
        )),
        shiny: true,
      };

      const baseSearch: Omit<SearchStatic4Opts, "filter"> = {
        tid: opts.tid,
        sid: opts.sid,
        species: opts.species,
        offset: 0,
        encounter_min_level: encounter?.min_level ?? 1,
        encounter_max_level: encounter?.max_level ?? 100,
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
      const searchOptsChunks = chunkedIvs.map(([minIvs, maxIvs]) => ({
        search: {
          ...baseSearch,
          filter: {
            ...filter,
            min_ivs: minIvs,
            max_ivs: maxIvs,
          },
        } as SearchStatic4Opts,
        patch_min_advance: opts.minAdvancePatch,
        patch_max_advance: opts.maxAdvancePatch,
        chain_count: opts.chainCount,
        battle_result: opts.battleResult,
        selected_shake: "Slow",
      }));

      await searchShinyPatches(searchOptsChunks);
    } catch (err) {
      console.error("[radar] onSubmit failed:", err);
      throw err;
    }
  };

  return (
    <RngToolForm<FormState, ResultRow>
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
    </RngToolForm>
  );
};
