import React from "react";
import { atom, useAtom } from "jotai";
import { uniqueId, map, sortBy } from "lodash-es";
import {
  FormikNumberInput,
  FormikSelect,
  ResultColumn,
  RngToolForm,
  Button,
  Field,
} from "~/components";
import {
  multiWorkerRngTools,
  Static4State,
  SearchStatic4Opts,
  Static4LeadInput,
} from "~/rngTools";
import { z } from "zod";
import {
  getPkmFilterFields,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/components/pkmFilter";
import { useStatic4State } from "./state";
import {
  flattenIvs,
  FlattenIvs,
  ivColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { useCurrentStep } from "~/components/stepper/state";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { formatSpeciesLabel, UndefinedToNull } from "~/types";
import { chunkIvs } from "~/utils/chunkIvs";
import { MonthSchema, monthToRustFilter } from "~/utils/time";
import { Gen4GameVersion } from "../gen4types";
import { getStatRange } from "~/types/statRange";
import { defaultEncounter, Encounter, getGameEncounters } from "./encounters";
import { useWatch } from "react-hook-form";
import { useField } from "~/hooks/form";
import { Translations } from "~/translations";

type Result = FlattenIvs<
  Static4State["state"] & {
    seed_time: Static4State["seed_time"];
    key: string;
    second: number;
    seed: number;
    delay: number;
  }
>;

const searchedEncounterAtom = atom<Encounter>(defaultEncounter);

type SelectButtonProps = {
  target: Result;
};

const SelectButton = ({ target }: SelectButtonProps) => {
  const [, setCurrentStep] = useCurrentStep();
  const [, setState] = useStatic4State();
  const [{ isFixedGender, level, species, form }] = useAtom(
    searchedEncounterAtom,
  );

  return (
    <Button
      trackerId="select_gen4_static"
      onClick={async () => {
        const minMaxStats = await getStatRange({
          species,
          levelRange: [level, level],
        });
        setState((prev) => ({
          ...prev,
          target: {
            ...target,
            isFixedGender,
            species,
            form,
            level,
            minMaxStats,
          },
          chatotSummaryCount: target.advance,
        }));
        setCurrentStep((prev) => prev + 1);
      }}
    >
      Select
    </Button>
  );
};

const LeadOptions = [
  "None",
  "CutecharmF",
  "CutecharmM",
  "Synchronize",
] as const satisfies Static4LeadInput[];

const LeadOptionsSchema = z.enum(LeadOptions);

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
    lead: LeadOptionsSchema,
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

const columns: ResultColumn<Result>[] = [
  {
    title: "Select",
    dataIndex: "key",
    render: (_, target) => <SelectButton target={target} />,
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    render: (shiny: boolean) => (shiny ? "Yes" : "No"),
  },
  { title: "Nature", dataIndex: "nature" },
  { title: "Ability", dataIndex: "ability" },
  { title: "Gender", dataIndex: "gender" },
  ...ivColumns,
  {
    title: "PID",
    dataIndex: "pid",
    monospace: true,
    render: (pid) => pid.toString(16).padStart(8, "0").toUpperCase(),
  },
  { title: "Advance", dataIndex: "advance" },
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

const leadOptions = [
  { label: "No Lead", value: "None" },
  { label: "Cute Charm (Female)", value: "CutecharmF" },
  { label: "Cute Charm (Male)", value: "CutecharmM" },
  { label: "Synchronize", value: "Synchronize" },
] satisfies { label: string; value: Static4LeadInput }[];

const OffsetField = ({ game }: { game: Gen4GameVersion }) => {
  const [, , { setValue }] = useField<FormState["offset"]>("offset");
  const encounterId = useWatch<Pick<FormState, "encounter_id">>({
    name: "encounter_id",
  });

  React.useEffect(() => {
    const encounters = getGameEncounters(game);
    const encounter = encounters[encounterId];
    const offset = encounter?.offset ?? 0;
    setValue(offset);
  }, [setValue, game, encounterId]);

  return <FormikNumberInput<FormState> name="offset" numType="decimal" />;
};

const getFields = (t: Translations, game: Gen4GameVersion): Field[] => {
  const encounters = getGameEncounters(game);

  return [
    {
      label: t["TID"],
      input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
    },
    {
      label: t["SID"],
      input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
    },
    {
      label: t["Year"],
      input: <FormikNumberInput<FormState> name="year" numType="decimal" />,
    },
    {
      label: t["Min Delay"],
      input: (
        <FormikNumberInput<FormState> name="min_delay" numType="decimal" />
      ),
    },
    {
      label: t["Max Delay"],
      input: (
        <FormikNumberInput<FormState> name="max_delay" numType="decimal" />
      ),
    },
    {
      label: t["Min Advance"],
      input: (
        <FormikNumberInput<FormState> name="min_advance" numType="decimal" />
      ),
    },
    {
      label: t["Max Advance"],
      input: (
        <FormikNumberInput<FormState> name="max_advance" numType="decimal" />
      ),
    },
    {
      label: t["Offset"],
      input: <OffsetField game={game} />,
    },
    {
      label: t["Species"],
      input: (
        <FormikSelect<FormState, "encounter_id">
          name="encounter_id"
          options={sortBy(
            map(encounters, (enc, id) => ({
              label: enc.label ?? formatSpeciesLabel(enc.species),
              value: id,
            })),
            (enc) => enc.label,
          )}
        />
      ),
    },
    {
      label: t["Lead"],
      input: (
        <FormikSelect<FormState, "lead"> name="lead" options={leadOptions} />
      ),
    },
    ...getPkmFilterFields({}, t),
    {
      label: t["Force Second"],
      input: (
        <FormikNumberInput<FormState> name="force_second" numType="decimal" />
      ),
    },
  ];
};

const mapResult = (res: Static4State): Result => {
  const { state, seed_time } = res;
  return {
    ...flattenIvs(state),
    seed_time,
    key: uniqueId(),
    second: seed_time.datetime.second,
    seed: seed_time.seed,
    delay: seed_time.delay,
  };
};

export const Static4Searcher = () => {
  const [state] = useStatic4State();
  const [, setSearchedEncounter] = useAtom(searchedEncounterAtom);
  const game = state.game;

  const {
    run: searchStaticSeeds,
    data: results,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.search_static4, {
    map: mapResult,
  });

  const onSubmit = React.useCallback(
    async (opts: FormState) => {
      const encounters = getGameEncounters(game);
      const encounter = encounters[opts.encounter_id];

      if (encounter == null) {
        return;
      }

      setSearchedEncounter(encounter);

      const baseOpts: UndefinedToNull<SearchStatic4Opts> = {
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
        game,
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
    },
    [game, setSearchedEncounter, searchStaticSeeds],
  );

  const getTranslatedFields = React.useCallback(
    (t: Translations) => getFields(t, game),
    [game],
  );

  return (
    <RngToolForm<FormState, Result>
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      getFields={getTranslatedFields}
      onSubmit={onSubmit}
      rowKey="key"
      submitTrackerId="search_gen4_static"
      allowCancel
      cancelTrackerId="cancel_gen4_static"
      onCancel={cancel}
    />
  );
};
