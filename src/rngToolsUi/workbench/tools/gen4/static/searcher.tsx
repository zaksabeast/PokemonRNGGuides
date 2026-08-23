import { uniqueId } from "lodash-es";
import {
  ResultColumn,
  FormikNumberInput,
  MinMaxContainer,
  FormikSelect,
  NumberInput,
} from "~/components";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import { DescriptionsProps } from "antd";
import { Descriptions } from "~/rngToolsUi/workbench/components/descriptions";
import { FormikProfileSelect } from "~/rngToolsUi/workbench/components/formikProfileSelect";
import { useWatch } from "~/hooks/form";
import {
  Nature,
  Characteristic,
  SearchStatic4Opts,
  Static4State,
  multiWorkerRngTools,
} from "~/rngTools";
import { z } from "zod";
import { RustOption } from "~/types";
import {
  getPkmFilterIvFields,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  pkmFilterSchema,
} from "~/rngToolsUi/workbench/components/pkmFilter";
import { flattenIvs } from "~/rngToolsUi/shared/ivColumns";
import { chunkIvs } from "~/utils/chunkIvs";
import { characteristicToGen4Label } from "~/rngToolsUi/gen4/gen4types";
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
} from "~/rngToolsUi/gen4/shared/leads";

const IV_FILTER_MODE = "ivs";

const LIMIT = 1000;

const Validator = z
  .object({
    profile_id: z.string().min(1, "Profile is required"),
    lead: static4LeadSchema,
    min_delay: z.number().int().min(0),
    max_delay: z.number().int().min(0),
    min_advance: z.number().int().min(0),
    max_advance: z.number().int().min(0),
    encounter_id: z.string(),
    year: z.number().int().min(2000).max(2099).nullable(),
    force_second: z.number().int().min(0).max(59).nullable(),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  profile_id: "",
  year: null,
  encounter_id: "",
  min_delay: 600,
  max_delay: 1000,
  min_advance: 0,
  max_advance: 10000,
  force_second: null,
  lead: "None",
  filter_level: 5,
  ...getPkmFilterInitialValues(),
};

type Result = {
  id: string;
  seed: number;
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
  const { profile_id, encounter_id } = useWatch({
    validationSchema: Validator,
    names: { profile_id: true, encounter_id: true },
  });

  const { game } = findProfileOrDefault({ profiles, id: profile_id });
  const encounter = getEncounter(game, encounter_id);

  const rngInfoFields: DescriptionsProps["items"] = [
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
      label: "Pokemon",
      children: (
        <FormikSelect<FormState, "encounter_id">
          name="encounter_id"
          options={getEncounterOptions(game)}
        />
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
      label: "Year",
      children: <FormikNumberInput<FormState> name="year" numType="decimal" />,
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

  const filterFields = getPkmFilterIvFields<FormState>({ species });

  return (
    <Descriptions bordered title="Filters" items={filterFields} column={1} />
  );
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Seed",
    dataIndex: "seed",
    monospace: true,
    render: (value) => formatHex(value),
  },
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

const mapResult = (res: Static4State): Result => {
  return {
    id: uniqueId(),
    ...flattenIvs(res.state),
  };
};

export const Static4Searcher = () => {
  const [lockedProfiles] = useAtom(gen4ProfilesAtom);
  const { client: profiles } = useHydrate(lockedProfiles);
  const {
    run: searchStatic4,
    data: results,
    loading,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.search_static4, {
    limit: LIMIT,
    map: mapResult,
    sortBy: [(res) => res.seed, (res) => res.advance],
  });

  const onSubmit = async (opts: FormState) => {
    const { tid, sid, game } = findProfileOrDefault({
      profiles,
      id: opts.profile_id,
    });

    const encounter = getEncounter(game, opts.encounter_id);
    const species = encounter.species;

    const baseOpts: RustOption<SearchStatic4Opts> = {
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
      force_second: opts.force_second,
      max_advance: opts.max_advance,
      max_delay: opts.max_delay,
      min_advance: opts.min_advance,
      min_delay: opts.min_delay,
      year: opts.year,
      lead: opts.lead,
      month: null,
      offset: 0,
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

    await searchStatic4(searchOpts);
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
