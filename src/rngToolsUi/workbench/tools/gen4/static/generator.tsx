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
  Gen4StaticOpts,
  Gen4StaticPokemon,
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
} from "~/components/pkmFilter";
import { flattenIvs } from "~/rngToolsUi/shared/ivColumns";
import { chunkRange } from "~/utils/chunkRange";
import { characteristicToGen4Label } from "~/rngToolsUi/gen4/gen4types";
import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import { formatHex } from "~/utils/formatHex";
import {
  gen4ProfilesAtom,
  defaultProfile,
} from "~/rngToolsUi/workbench/tools/profile/state";
import { useAtom } from "jotai";
import { useHydrate } from "~/hooks/useHydrate";

const LIMIT = 1000;

const Validator = z
  .object({
    profile_id: z.string().min(1, "Profile is required"),
    seed: z.number().int().min(0).max(0xffffffff),
    offset: z.number().int().min(0),
    min_advance: z.number().int().min(0),
    max_advance: z.number().int().min(0),
    species: z.enum(species),
    year: z.number().int().min(2000).max(2100),
    force_second: z.number().int().min(0).max(59).nullable(),
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  profile_id: "",
  year: 2000,
  species: "Turtwig",
  seed: 0,
  offset: 0,
  min_advance: 0,
  max_advance: 2000,
  force_second: null,
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
  const { profile_id } = useWatch({
    validationSchema: Validator,
    names: { profile_id: true },
  });

  const { game } =
    (profiles ?? []).find(({ id }) => id === profile_id) ?? defaultProfile;

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
          options={
            game === "HeartGold" || game === "SoulSilver"
              ? [
                  { label: "Chikorita", value: "Chikorita" },
                  { label: "Cyndaquil", value: "Cyndaquil" },
                  { label: "Totodile", value: "Totodile" },
                ]
              : [
                  { label: "Chimchar", value: "Chimchar" },
                  { label: "Piplup", value: "Piplup" },
                  { label: "Turtwig", value: "Turtwig" },
                ]
          }
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
  const { species } = useWatch({
    validationSchema: Validator,
    names: { species: true },
  });

  const filterFields: DescriptionsProps["items"] = [
    {
      label: "HP",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="filter_min_ivs.hp"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="filter_max_ivs.hp"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: "Atk",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="filter_min_ivs.atk"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="filter_max_ivs.atk"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: "Def",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="filter_min_ivs.def"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="filter_max_ivs.def"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: "SpA",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="filter_min_ivs.spa"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="filter_max_ivs.spa"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: "SpD",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="filter_min_ivs.spd"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="filter_max_ivs.spd"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: "Spe",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="filter_min_ivs.spe"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="filter_max_ivs.spe"
              numType="decimal"
            />
          }
        />
      ),
    },
    ...getPkmFilterFields<FormState>({
      species: species ?? undefined,
      displayIvs: false,
      displayHiddenPower: false,
    }).map((field) => ({
      label: field.label,
      children: field.input,
    })),
  ];

  return (
    <Descriptions bordered title="Filters" items={filterFields} column={1} />
  );
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
    map: mapResult,
    limit: LIMIT,
  });

  const onSubmit = async (opts: FormState) => {
    const { tid, sid, game } =
      (profiles ?? []).find(({ id }) => id === opts.profile_id) ??
      defaultProfile;

    const baseOpts: RustOption<Gen4StaticOpts> = {
      game,
      tid,
      sid,
      encounter_max_level: 5,
      encounter_min_level: 5,
      filter: pkmFilterFieldsToRustInput(opts),
      initial_advances: opts.min_advance,
      max_advances: opts.max_advance,
      species: opts.species,
      lead: "None",
      offset: opts.offset,
      seed: opts.seed,
      filter_characteristic: null,
      filter_level: null,
    };
    const chunkedAdvances = chunkRange(
      [opts.min_advance, opts.max_advance],
      1000,
    );
    const searchOpts = chunkedAdvances.map(
      ([initial_advances, max_advances]) => ({
        ...baseOpts,
        initial_advances,
        max_advances,
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
        timer: <Gen4Timer />,
        filterFields: <FilterFields />,
        rngInfoFields: <RngInfoFields />,
      }}
    />
  );
};
