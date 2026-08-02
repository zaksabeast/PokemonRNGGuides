import { uniqueId } from "lodash-es";
import {
  ResultColumn,
  FormikNumberInput,
  MinMaxContainer,
  FormikSelect,
  NumberInput,
} from "~/components";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import {
  Descriptions,
  Field,
} from "~/rngToolsUi/workbench/components/descriptions";
import { FormikProfileSelect } from "~/rngToolsUi/workbench/components/formikProfileSelect";
import { useWatch } from "~/hooks/form";
import {
  Nature,
  Characteristic,
  Gen4StaticOpts,
  Gen4StaticPokemon,
  multiWorkerRngTools,
  rngTools,
  RngDateTime,
  SeedTime4,
} from "~/rngTools";
import { z } from "zod";
import { nature, RustOption } from "~/types";
import {
  pkmFilterSchema,
  getPkmStatFilterFields,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/rngToolsUi/workbench/components/pkmFilter";
import { flattenIvs } from "~/rngToolsUi/shared/ivColumns";
import {
  characteristics,
  characteristicToGen4Label,
  OptionalCharacteristic4Options,
} from "~/rngToolsUi/gen4/gen4types";
import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import { formatHex } from "~/utils/formatHex";
import {
  gen4ProfilesAtom,
  findProfileOrDefault,
} from "~/rngToolsUi/workbench/tools/profile/gen4/state";
import { useAtom } from "jotai";
import { useHydrate } from "~/hooks/useHydrate";
import {
  addRngTime,
  rngDate,
  RngDateSchema,
  rngTime,
  RngTimeSchema,
  toRngDateTime,
  fromRngDateTime,
  formatRngDateTime,
} from "~/utils/time";
import { FormikDatePicker, FormikTimePicker } from "~/components/datePicker";
import { getEncounterOptions, getEncounter } from "./encounters";
import {
  static4LeadSchema,
  getLeadOptions,
  leadOptionToRust,
} from "~/rngToolsUi/gen4/shared/leads";
import { getNatureInputProps } from "~/components/pkmFilter";

const IV_FILTER_MODE = "stats";

const LIMIT = 1000;

const Validator = z
  .object({
    profile_id: z.string().min(1, "Profile is required"),
    date: RngDateSchema,
    time: RngTimeSchema,
    encounter_id: z.string(),
    lead: static4LeadSchema,
    sync_nature: z.enum(nature),
    seconds_offset: z.number().int().min(0),
    min_delay: z.number().int().min(0),
    max_delay: z.number().int().min(0),
    offset: z.number().int().min(0),
    min_advance: z.number().int().min(0),
    max_advance: z.number().int().min(0),
    filter_characteristic: z.enum(characteristics).nullable(),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  profile_id: "",
  encounter_id: "",
  lead: "None",
  sync_nature: "Adamant",
  date: rngDate(),
  time: rngTime(),
  seconds_offset: 0,
  min_delay: 0,
  max_delay: 0,
  offset: 0,
  min_advance: 0,
  max_advance: 2000,
  filter_level: 5,
  filter_characteristic: null,
  ...getPkmFilterInitialValues(),
};

type Result = {
  id: string;
  advance: number;
  seed: number;
  datetime: RngDateTime;
  delay: number;
  pid: number;
  shiny: boolean;
  nature: Nature;
  ability: string;
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
  gender: string;
  characteristic: Characteristic;
};

const RngInfoFields = () => {
  const rngInfoFields: Field[] = [
    {
      label: "Profile",
      children: <FormikProfileSelect<FormState> name="profile_id" />,
    },
    {
      label: "Date",
      children: <FormikDatePicker<FormState> name="date" />,
    },
    {
      label: "Time",
      children: <FormikTimePicker<FormState> name="time" showSecond />,
    },
    {
      label: "Second Offset ±",
      children: (
        <FormikNumberInput<FormState> name="seconds_offset" numType="decimal" />
      ),
    },
    {
      label: "Delay",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState> name="min_delay" numType="decimal" />
          }
          max={
            <FormikNumberInput<FormState> name="max_delay" numType="decimal" />
          }
        />
      ),
    },
    {
      label: "Advances",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="min_advance"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="max_advance"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: "Advance Offset",
      children: (
        <FormikNumberInput<FormState> name="offset" numType="decimal" />
      ),
    },
    {
      label: "Limit",
      children: <NumberInput disabled numType="decimal" value={LIMIT} />,
    },
  ];

  return (
    <Descriptions bordered title="RNG Info" items={rngInfoFields} column={1} />
  );
};

const FilterFields = () => {
  const { encounter_id, profile_id, lead } = useWatch({
    validationSchema: Validator,
    names: { encounter_id: true, profile_id: true, lead: true },
  });

  const [lockedProfiles] = useAtom(gen4ProfilesAtom);
  const { client: profiles } = useHydrate(lockedProfiles);
  const { game } = findProfileOrDefault({ profiles, id: profile_id });

  const encounter = getEncounter(game, encounter_id);
  const species = encounter.species;

  const baseFields = getPkmStatFilterFields<FormState>({ species });

  const fields: Field[] = [
    {
      label: "Species",
      children: (
        <FormikSelect<FormState, "encounter_id">
          name="encounter_id"
          options={getEncounterOptions(game)}
        />
      ),
    },
    {
      label: "Lead",
      children: (
        <FormikSelect<FormState, "lead">
          name="lead"
          options={getLeadOptions(encounter.method)}
        />
      ),
    },
    {
      label: "Sync Nature",
      show: lead === "Synchronize",
      children: (
        <FormikSelect<FormState, "sync_nature">
          name="sync_nature"
          {...getNatureInputProps()}
        />
      ),
    },
    ...baseFields,
    {
      label: "Characteristic",
      children: (
        <FormikSelect<FormState, "filter_characteristic">
          name="filter_characteristic"
          options={OptionalCharacteristic4Options}
        />
      ),
    },
  ];

  return <Descriptions bordered title="Filters" items={fields} column={1} />;
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    monospace: true,
    render: (value) => formatHex(value),
  },
  {
    title: "Datetime",
    dataIndex: "datetime",
    render: (value) => formatRngDateTime(value, { seconds: true }),
  },
  { title: "Delay", dataIndex: "delay" },
  { title: "Advances", dataIndex: "advance" },
  {
    title: "Pid",
    dataIndex: "pid",
    monospace: true,
    render: (value) => formatHex(value),
  },
  {
    title: "Shiny",
    dataIndex: "shiny",
    render: (value) => (value ? "Yes" : "No"),
  },
  { title: "Nature", dataIndex: "nature" },
  { title: "Ability", dataIndex: "ability" },
  { title: "Hp", dataIndex: "hp" },
  { title: "Atk", dataIndex: "atk" },
  { title: "Def", dataIndex: "def" },
  { title: "Spa", dataIndex: "spa" },
  { title: "Spd", dataIndex: "spd" },
  { title: "Spe", dataIndex: "spe" },
  { title: "Gender", dataIndex: "gender" },
  {
    title: "Characteristic",
    dataIndex: "characteristic",
    render: (value) => characteristicToGen4Label[value],
  },
];

const mapResult = (
  res: Gen4StaticPokemon,
  opts: RustOption<Gen4StaticOpts> & { seedTime: SeedTime4 },
): Result => {
  return {
    id: uniqueId(),
    ...flattenIvs(res),
    seed: opts.seedTime.seed,
    datetime: opts.seedTime.datetime,
    delay: opts.seedTime.delay,
  };
};

export const Static4Calibrator = () => {
  const [lockedProfiles] = useAtom(gen4ProfilesAtom);
  const { client: profiles } = useHydrate(lockedProfiles);
  const {
    run: generateStatic4,
    data: results,
    loading,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.generate_static4_states, {
    limit: LIMIT,
    map: mapResult,
    sortBy: [(res) => res.seed, (res) => res.advance],
  });

  const onSubmit = async (opts: FormState) => {
    const { tid, sid, game } = findProfileOrDefault({
      profiles,
      id: opts.profile_id,
    });

    const targetDateTime = addRngTime(opts.date, opts.time);

    const datetime = toRngDateTime(
      fromRngDateTime(targetDateTime).subtract(opts.seconds_offset, "seconds"),
    );

    const encounter = getEncounter(game, opts.encounter_id);
    const species = encounter.species;

    const seedTimes = await rngTools.generate_seedtime4s({
      datetime,
      seconds_increment: opts.seconds_offset * 2,
      min_delay: opts.min_delay,
      max_delay: opts.max_delay,
    });

    const baseOpts: RustOption<Gen4StaticOpts> = {
      // Will override seed
      seed: 0,
      // Base opts
      tid,
      sid,
      species,
      method: encounter.method,
      encounter_min_level: encounter.minLevel,
      encounter_max_level: encounter.maxLevel,
      filter: await pkmFilterFieldsToRustInput(
        { species, ivFilterMode: IV_FILTER_MODE },
        opts,
      ),
      initial_advances: opts.min_advance,
      max_advances: opts.max_advance,
      lead: leadOptionToRust({ lead: opts.lead, syncNature: opts.sync_nature }),
      offset: opts.offset,
      filter_characteristic: opts.filter_characteristic,
      filter_level: null,
    };

    const searchOpts = seedTimes.map((seedTime) => ({
      ...baseOpts,
      seed: seedTime.seed,
      seedTime,
    }));

    await generateStatic4(searchOpts);
  };

  return (
    <ToolLayout<FormState, Result>
      initialValues={initialValues}
      validationSchema={Validator}
      loading={loading}
      results={results}
      progressPercent={progressPercent}
      columns={columns}
      onSubmit={onSubmit}
      cancel={cancel}
      slots={{
        filterFields: <FilterFields />,
        rngInfoFields: <RngInfoFields />,
      }}
    />
  );
};
