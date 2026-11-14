import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { uniqueId, map, sortBy } from "lodash-es";
import {
  ResultColumn,
  Button,
  Flex,
  ShinyIcon,
  Typography,
} from "~/components";
import {
  FieldRow,
  FormNumberField,
  FormSection,
  FormSelectField,
  PkmFilter,
  ToolForm,
} from "~/components/form";
import {
  multiWorkerRngTools,
  Static4State,
  SearchStatic4Opts,
} from "~/rngTools";
import { z } from "zod";
import {
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/components/form/pokemon/pkmFilterFields";
import { gen4SetupAtom } from "../shared/state/setup";
import { selectGen4TargetAtom } from "../shared/state/target";
import {
  flattenIvs,
  FlattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { useCurrentStep } from "~/components/stepper/state";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { formatSpeciesLabel, RustOption } from "~/types";
import { chunkIvs } from "~/utils/chunkIvs";
import { MonthSchema, monthToRustFilter } from "~/utils/time";
import { Gen4GameVersion } from "~/types/games";
import { getStatRange } from "~/types/statRange";
import { EncountersByGame as StaticEncountersByGame } from "../encounters/static";
import { EncountersByGame as HoneyEncountersByGame } from "../encounters/honey";
import { type Encounter } from "../encounters/encounter";
import { useField, useWatch } from "~/hooks/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { normalizeTargetLead } from "./utils";
import { static4LeadSchema, getLeadOptions } from "../shared/leads";

type Result = FlattenIvs<
  Static4State["state"] & {
    seed_time: Static4State["seed_time"];
    roamerAdvances: number;
    encounter: Encounter;
    advanceOffset: number;
    key: string;
    second: number;
    seed: number;
    delay: number;
  }
>;

type SearchOpts = RustOption<SearchStatic4Opts> & {
  // Used to map results, not by search_static4
  encounter: Encounter;
};

type SelectButtonProps = {
  target: Result;
};

const SelectButton = ({ target }: SelectButtonProps) => {
  const [, setCurrentStep] = useCurrentStep();
  const selectTarget = useSetAtom(selectGen4TargetAtom);
  const { isFixedGender, minLevel, maxLevel, species, form, method } =
    target.encounter;

  if (target.advance < target.roamerAdvances) {
    return (
      <Flex vertical gap={4}>
        <Button trackerId="select_gen4_static" disabled>
          Select
        </Button>
        <Typography.Text type="secondary">
          Roamers use {target.roamerAdvances} advances when the save loads
        </Typography.Text>
      </Flex>
    );
  }

  return (
    <Button
      trackerId="select_gen4_static"
      onClick={async () => {
        const minMaxStats = await getStatRange({
          species,
          levelRange: [minLevel, maxLevel],
        });
        selectTarget({
          seedTime: target.seed_time,
          lcrngAdvance: target.advance,
          roamerAdvances: target.roamerAdvances,
          details: {
            tool: "static",
            advanceCalibration: 0,
            species,
            form,
            minMaxStats,
            advanceOffset: target.advanceOffset,
            isFixedGender,
            method,
            encounterMinLevel: minLevel,
            encounterMaxLevel: maxLevel,
            lead: target.lead,
            gender: target.gender,
            level: target.level,
          },
        });
        setCurrentStep((prev) => prev + 1);
      }}
    >
      Select
    </Button>
  );
};

const Validator = z
  .object({
    tid: z.number().int().min(0).max(0xffff),
    sid: z.number().int().min(0).max(0xffff),
    encounter_id: z
      .string()
      .refine((val) => val.length > 0, { message: "Encounter is required" }),
    min_advance: z.number().int().min(0),
    max_advance: z.number().int().min(0),
    min_delay: z.number().int().min(0),
    max_delay: z.number().int().min(0),
    offset: z.number().int().min(0),
    year: z.number().int().min(2000).max(2100),
    month: MonthSchema,
    lead: static4LeadSchema,
    force_second: z.number().int().min(0).max(59).nullable(),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  tid: 0,
  sid: 0,
  year: 2000,
  month: "Any",
  encounter_id: "",
  min_delay: 800,
  max_delay: 810,
  min_advance: 0,
  max_advance: 100,
  offset: 0,
  force_second: null,
  lead: "None",
  ...getPkmFilterInitialValues(),
};

const roamerAdvancesColumn: ResultColumn<Result> = {
  title: "Roamer Advances",
  dataIndex: "roamerAdvances",
};

const getColumns = (isHgss: boolean): ResultColumn<Result>[] => [
  {
    title: "Select",
    dataIndex: "key",
    disableVerticalPadding: true,
    render: (_, target) => <SelectButton target={target} />,
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    render: (shiny) => <ShinyIcon shiny={shiny} />,
  },
  { title: "Nature", dataIndex: "nature" },
  { title: "Ability", dataIndex: "ability" },
  { title: "Gender", dataIndex: "gender" },
  ...ivColumns,
  {
    title: "Lead",
    dataIndex: "lead",
    render: (lead) => normalizeTargetLead(lead),
  },
  {
    title: "PID",
    dataIndex: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Advance", dataIndex: "advance" },
  ...(isHgss ? [roamerAdvancesColumn] : []),
  { title: "Delay", dataIndex: "delay" },
  {
    title: "Second",
    dataIndex: "second",
  },
  {
    title: "Seed",
    dataIndex: "seed",
    monospace: true,
    render: (seed) => seed.toString(16).padStart(8, "0").toUpperCase(),
  },
];

type OffsetFieldProps = { game: Gen4GameVersion; encounter: Encounter | null };

const OffsetField = ({ game, encounter }: OffsetFieldProps) => {
  const t = useActiveRouteTranslations();
  const [, , { setValue }] = useField<FormState["offset"]>("offset");

  React.useEffect(() => {
    const offset = encounter?.offset ?? 0;
    setValue(offset);
  }, [setValue, game, encounter]);

  return (
    <FormNumberField<FormState>
      name="offset"
      label={t["Offset"]}
      numType="decimal"
    />
  );
};

type FieldsProps = {
  game: Gen4GameVersion;
  encountersByGame: Record<Gen4GameVersion, Record<string, Encounter>>;
};

const Fields = ({ game, encountersByGame }: FieldsProps) => {
  const t = useActiveRouteTranslations();
  const { encounter_id } = useWatch({
    validationSchema: Validator,
    names: { encounter_id: true },
  });
  const encounters = encountersByGame[game];
  const encounter = encounter_id == null ? null : encounters[encounter_id];

  const encounterOptions = sortBy(
    map(encounters, (enc, id) => ({
      label: enc.label ?? formatSpeciesLabel(enc.species),
      value: id,
    })),
    (enc) => enc.label,
  );

  return (
    <>
      <FormSection title={t["Your game"]}>
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
          name="encounter_id"
          label={t["Species"]}
          options={encounterOptions}
        />
        <FormSelectField<FormState>
          name="lead"
          label={t["Lead"]}
          options={getLeadOptions(encounter)}
        />
      </FormSection>

      <FormSection title={t["Search"]}>
        <FormNumberField<FormState>
          name="year"
          label={t["Year"]}
          numType="decimal"
        />
        <FieldRow>
          <FormNumberField<FormState>
            name="min_delay"
            label={t["Min Delay"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_delay"
            label={t["Max Delay"]}
            numType="decimal"
          />
        </FieldRow>
        <FieldRow>
          <FormNumberField<FormState>
            name="min_advance"
            label={t["Min Advance"]}
            numType="decimal"
          />
          <FormNumberField<FormState>
            name="max_advance"
            label={t["Max Advance"]}
            numType="decimal"
          />
        </FieldRow>
      </FormSection>

      <FormSection title={t["Filters"]}>
        <PkmFilter<FormState> generation={4} species={encounter?.species} />
      </FormSection>

      <FormSection title={t["Advanced"]}>
        <OffsetField game={game} encounter={encounter} />
        <FormNumberField<FormState>
          name="force_second"
          label={t["Force Second"]}
          numType="decimal"
        />
      </FormSection>
    </>
  );
};

const mapResult = (res: Static4State, opts: SearchOpts): Result => {
  const { state, seed_time, roamer_advances } = res;
  return {
    ...flattenIvs(state),
    seed_time,
    roamerAdvances: roamer_advances,
    encounter: opts.encounter,
    advanceOffset: opts.offset,
    key: uniqueId(),
    second: seed_time.datetime.second,
    seed: seed_time.seed,
    delay: seed_time.delay,
  };
};

type Static4SearcherProps = {
  honey?: boolean;
};

export const Static4Searcher = ({ honey = false }: Static4SearcherProps) => {
  const setup = useAtomValue(gen4SetupAtom);
  const { game } = setup;
  const isHgss = setup.group === "hgss";

  const encountersByGame = honey
    ? HoneyEncountersByGame
    : StaticEncountersByGame;

  const {
    run: searchStaticSeeds,
    data: results,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.search_static4, {
    map: mapResult,
  });

  const onSubmit = async (opts: FormState) => {
    const encounters: Record<string, Encounter> = encountersByGame[game];
    const encounter = encounters[opts.encounter_id];

    if (encounter == null) {
      return;
    }

    const baseOpts: SearchOpts = {
      encounter,
      filter: pkmFilterFieldsToRustInput(opts),
      force_second: opts.force_second,
      max_advance: opts.max_advance,
      min_advance: opts.min_advance,
      max_delay: opts.max_delay,
      min_delay: opts.min_delay,
      offset: opts.offset,
      sid: opts.sid,
      species: encounter.species,
      tid: opts.tid,
      year: opts.year,
      month: monthToRustFilter(opts.month),
      lead: opts.lead,
      encounter_min_level: encounter.minLevel,
      encounter_max_level: encounter.maxLevel,
      method: encounter.method,
      roamers: setup.group === "hgss" ? setup.roamers : null,
    };
    const chunkedIvs = chunkIvs(opts.filter_min_ivs, opts.filter_max_ivs);
    const searchOpts = chunkedIvs.map(([minIvs, maxIvs]) => ({
      ...baseOpts,
      filter: {
        ...baseOpts.filter,
        min_ivs: minIvs,
        max_ivs: maxIvs,
      },
    }));

    await searchStaticSeeds(searchOpts);
  };

  return (
    <ToolForm<FormState, Result>
      columns={getColumns(isHgss)}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      rowKey="key"
      submitTrackerId="search_gen4_static"
      allowCancel
      cancelTrackerId="cancel_gen4_static"
      onCancel={cancel}
      progressPercent={progressPercent}
    >
      <Fields game={game} encountersByGame={encountersByGame} />
    </ToolForm>
  );
};
