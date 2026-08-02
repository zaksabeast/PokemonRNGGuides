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
} from "~/rngTools";
import { z } from "zod";
import { nature, RustOption } from "~/types";
import {
  pkmFilterSchema,
  getPkmFilterIvFields,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
} from "~/rngToolsUi/workbench/components/pkmFilter";
import { flattenIvs } from "~/rngToolsUi/shared/ivColumns";
import { chunkRange } from "~/utils/chunkRange";
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
import { getEncounterOptions, getEncounter } from "./encounters";
import {
  static4LeadSchema,
  getLeadOptions,
  leadOptionToRust,
} from "~/rngToolsUi/gen4/shared/leads";
import { getNatureInputProps } from "~/components/pkmFilter";

const IV_FILTER_MODE = "ivs";

const LIMIT = 1000;

const Validator = z
  .object({
    profile_id: z.string().min(1, "Profile is required"),
    seed: z.number().int().min(0).max(0xffffffff),
    offset: z.number().int().min(0),
    min_advance: z.number().int().min(0),
    max_advance: z.number().int().min(0),
    encounter_id: z.string(),
    lead: static4LeadSchema,
    sync_nature: z.enum(nature),
    year: z.number().int().min(2000).max(2100),
    force_second: z.number().int().min(0).max(59).nullable(),
    filter_characteristic: z.enum(characteristics).nullable(),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  profile_id: "",
  year: 2000,
  encounter_id: "",
  lead: "None",
  sync_nature: "Adamant",
  seed: 0,
  offset: 0,
  min_advance: 0,
  max_advance: 2000,
  filter_level: 5,
  force_second: null,
  filter_characteristic: null,
  ...getPkmFilterInitialValues(),
};

type Result = {
  id: string;
  advance: number;
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
  const [lockedProfiles] = useAtom(gen4ProfilesAtom);
  const { client: profiles } = useHydrate(lockedProfiles);
  const { profile_id, encounter_id, lead } = useWatch({
    validationSchema: Validator,
    names: { profile_id: true, encounter_id: true, lead: true },
  });

  const { game } = findProfileOrDefault({ profiles, id: profile_id });
  const encounter = getEncounter(game, encounter_id);

  const rngInfoFields: Field[] = [
    {
      label: "Profile",
      children: (
        <FormikProfileSelect<FormState>
          name="profile_id"
          profileAtom={gen4ProfilesAtom}
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
    {
      label: "Pokemon",
      children: (
        <FormikSelect<FormState, "encounter_id">
          name="encounter_id"
          options={getEncounterOptions(game)}
        />
      ),
    },
    {
      label: "Seed",
      children: <FormikNumberInput<FormState> name="seed" numType="hex" />,
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
      label: "Offset",
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
  const { encounter_id, profile_id } = useWatch({
    validationSchema: Validator,
    names: { encounter_id: true, profile_id: true },
  });

  const [lockedProfiles] = useAtom(gen4ProfilesAtom);
  const { client: profiles } = useHydrate(lockedProfiles);
  const { game } = findProfileOrDefault({ profiles, id: profile_id });

  const encounter = getEncounter(game, encounter_id);
  const species = encounter.species;

  const baseFields = getPkmFilterIvFields<FormState>({ species });

  const fields: Field[] = [
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

const mapResult = (res: Gen4StaticPokemon): Result => {
  return {
    id: uniqueId(),
    ...flattenIvs(res),
  };
};

export const Static4Generator = () => {
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
    sortBy: (res) => res.advance,
  });

  const onSubmit = async (opts: FormState) => {
    const { tid, sid, game } = findProfileOrDefault({
      profiles,
      id: opts.profile_id,
    });

    const encounter = getEncounter(game, opts.encounter_id);
    const species = encounter.species;

    const baseOpts: RustOption<Gen4StaticOpts> = {
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
      seed: opts.seed,
      filter_characteristic: opts.filter_characteristic,
      filter_level: null,
    };
    const chunkedAdvances = chunkRange(
      [opts.min_advance, opts.max_advance],
      1000,
    );
    const searchOpts = chunkedAdvances.map(
      ([initial_advances, end_advance]) => ({
        ...baseOpts,
        initial_advances,
        max_advances: end_advance - initial_advances,
      }),
    );

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
