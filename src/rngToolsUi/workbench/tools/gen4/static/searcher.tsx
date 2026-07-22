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
import { Gen4Timer } from "~/rngToolsUi/timer/gen4";
import { z } from "zod";
import { RustOption, species } from "~/types";
import {
  getPkmFilterFields,
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
} from "~/rngToolsUi/workbench/tools/profile/state";
import { useAtom } from "jotai";
import { useHydrate } from "~/hooks/useHydrate";
import { toOptions } from "~/utils/options";
import { dpptStarters, hgssStarters } from "./constants";

const LIMIT = 1000;

const Validator = z
  .object({
    profile_id: z.string().min(1, "Profile is required"),
    min_delay: z.number().int().min(0),
    max_delay: z.number().int().min(0),
    min_advance: z.number().int().min(0),
    max_advance: z.number().int().min(0),
    species: z.enum(species),
    year: z.number().int().min(2000).max(2099),
    force_second: z.number().int().min(0).max(59).nullable(),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  profile_id: "",
  year: 2000,
  species: "Turtwig",
  min_delay: 600,
  max_delay: 1000,
  min_advance: 0,
  max_advance: 0,
  force_second: null,
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
  const { profile_id } = useWatch({
    validationSchema: Validator,
    names: { profile_id: true },
  });

  const { game } = findProfileOrDefault({ profiles, id: profile_id });

  const rngInfoFields: DescriptionsProps["items"] = [
    {
      label: "Profile",
      children: <FormikProfileSelect<FormState> name="profile_id" />,
    },
    {
      label: "Pokemon",
      children: (
        <FormikSelect<FormState, "species">
          name="species"
          options={toOptions(
            game === "HeartGold" || game === "SoulSilver"
              ? hgssStarters
              : dpptStarters,
          )}
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
  const { species, iv_filter_mode } = useWatch({
    validationSchema: Validator,
    names: { species: true, iv_filter_mode: true },
  });

  const filterFields = getPkmFilterFields<FormState>({
    species: species ?? undefined,
    ivFilterMode: iv_filter_mode ?? "ivs",
  });

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
    map: mapResult,
    sortBy: [(res) => res.seed, (res) => res.advance],
    limit: LIMIT,
  });

  const onSubmit = async (opts: FormState) => {
    const { tid, sid, game } = findProfileOrDefault({
      profiles,
      id: opts.profile_id,
    });

    const baseOpts: RustOption<SearchStatic4Opts> = {
      game,
      tid,
      sid,
      encounter_max_level: 5,
      encounter_min_level: 5,
      filter: await pkmFilterFieldsToRustInput(opts),
      force_second: opts.force_second,
      max_advance: opts.max_advance,
      max_delay: opts.max_delay,
      min_advance: opts.min_advance,
      min_delay: opts.min_delay,
      species: opts.species,
      year: opts.year,
      lead: "None",
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
        timer: <Gen4Timer />,
        filterFields: <FilterFields />,
        rngInfoFields: <RngInfoFields />,
      }}
    />
  );
};
