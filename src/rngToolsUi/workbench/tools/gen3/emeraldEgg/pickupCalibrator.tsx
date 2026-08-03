import { uniqueId } from "lodash-es";
import {
  Flex,
  IvInput,
  NumberInput,
  MinMaxContainer,
  FormikNumberInput,
  FormikSelect,
} from "~/components";
import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import {
  Descriptions,
  Field,
} from "~/rngToolsUi/workbench/components/descriptions";
import { useWatch } from "~/hooks/form";
import { ResultColumn } from "~/components/resultTable";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import {
  multiWorkerRngTools,
  Egg3PickupOptions,
  Egg3PickupState,
  InheritedIv,
} from "~/rngTools";
import { z } from "zod";
import { chunkRange } from "~/utils/chunkRange";
import { NullableIvsSchema } from "~/components/ivInput";
import {
  getIvMethodOptions,
  ivMethodLabels,
  ivMethods,
} from "~/rngToolsUi/gen3/retailEmeraldEgg/constants";
import { HexSchema } from "~/utils/number";
import {
  pkmFilterSchema,
  getPkmFilterInitialValues,
  pkmFilterFieldsToRustInput,
  getPkmStatFilterFields,
} from "~/rngToolsUi/workbench/components/pkmFilter";
import { EvsSchema } from "~/components/evInput";
import { StatFieldsSchema } from "~/types/stat";
import { maxIvs } from "~/types/ivs";
import { RustOption } from "~/types/utils";
import { getGen3SpeciesOptions, species } from "~/types/species";
import { getInheritedIvColumns } from "~/rngToolsUi/shared/ivColumns";

const LIMIT = 1000;

const Validator = z
  .object({
    seed: HexSchema(0xffffffff),
    egg_species: z.enum(species),
    min_advances: z.number().int().min(0),
    max_advances: z.number().int().min(0),
    methods: z.enum(ivMethods).array().nonempty(),
    offset: z.number().int().min(0),
    parent1_ivs: NullableIvsSchema,
    parent2_ivs: NullableIvsSchema,
    evs: EvsSchema,
    stats: StatFieldsSchema,
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;
type Result = Egg3PickupState & {
  id: string;
  hp: InheritedIv;
  atk: InheritedIv;
  def: InheritedIv;
  spa: InheritedIv;
  spd: InheritedIv;
  spe: InheritedIv;
};

const initialValues: FormState = {
  seed: 0,
  min_advances: 0,
  max_advances: 10000,
  egg_species: "Bulbasaur",
  methods: ["EmeraldBred", "EmeraldBredAlternate", "EmeraldBredSplit"],
  offset: 0,
  filter_level: 5,
  evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
  stats: {
    hpStat: 0,
    atkStat: 0,
    defStat: 0,
    spaStat: 0,
    spdStat: 0,
    speStat: 0,
  },
  parent1_ivs: maxIvs,
  parent2_ivs: maxIvs,
  ...getPkmFilterInitialValues(),
};

const FilterFields = () => {
  const { egg_species } = useWatch({
    validationSchema: Validator,
    names: { egg_species: true },
  });
  const fields = getPkmStatFilterFields({
    displayHiddenPower: false,
    displayGender: false,
    displayAbility: false,
    displayShiny: false,
    species: egg_species ?? "None",
  });
  return <Descriptions bordered title="Filters" items={fields} column={1} />;
};

const RngInfoFields = () => {
  const fields: Field[] = [
    {
      label: "Seed",
      children: <FormikNumberInput<FormState> name="seed" numType="hex" />,
    },
    {
      label: "Egg Species",
      children: (
        <FormikSelect<FormState, "egg_species">
          name="egg_species"
          options={getGen3SpeciesOptions().byName}
        />
      ),
    },
    {
      label: "Advances",
      children: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="min_advances"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="max_advances"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: "Method",
      children: (
        <FormikSelect<FormState, "methods">
          selectAllNoneButtons
          mode="multiple"
          name="methods"
          options={getIvMethodOptions(null)}
        />
      ),
    },
    {
      label: "Parent 1 IVs",
      tooltip: "IVs can be left blank if you don't know them",
      children: (
        <Flex vertical mv={4}>
          <IvInput<FormState, "nullable">
            name="parent1_ivs"
            gridOverrides={{ desktop: 2, mobile: 2, smallTablet: 2, tablet: 2 }}
          />
        </Flex>
      ),
    },
    {
      label: "Parent 2 IVs",
      tooltip: "IVs can be left blank if you don't know them",
      children: (
        <Flex vertical mv={4}>
          <IvInput<FormState, "nullable">
            name="parent2_ivs"
            gridOverrides={{ desktop: 2, mobile: 2, smallTablet: 2, tablet: 2 }}
          />
        </Flex>
      ),
    },
    {
      label: "Limit",
      children: <NumberInput disabled numType="decimal" value={LIMIT} />,
    },
  ];
  return <Descriptions bordered title="RNG Info" items={fields} column={1} />;
};

const columns: ResultColumn<Result>[] = [
  {
    title: "Method",
    dataIndex: "method",
    render: (method) => ivMethodLabels[method],
  },
  {
    title: "Advance",
    dataIndex: "advance",
  },
  ...getInheritedIvColumns(null),
];

const mapResult = (res: Egg3PickupState): Result => ({
  ...res,
  id: uniqueId(),
  hp: res.ivs.hp,
  atk: res.ivs.atk,
  def: res.ivs.def,
  spa: res.ivs.spa,
  spd: res.ivs.spd,
  spe: res.ivs.spe,
});

export const EmeraldEggPickupCalibrator = () => {
  const {
    run: generatePickupStates,
    data: results,
    loading,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.emerald_egg_pickup_states, {
    limit: LIMIT,
    map: mapResult,
    sortBy: [(res) => res.advance],
  });

  const onSubmit = async (opts: FormState) => {
    const filters = await pkmFilterFieldsToRustInput(
      { species: opts.egg_species, ivFilterMode: "stats" },
      opts,
    );
    const baseOpts: Omit<
      RustOption<Egg3PickupOptions>,
      "initial_advances" | "max_advances"
    > = {
      delay: opts.offset,
      seed: opts.seed,
      methods: opts.methods,
      parent_ivs: [opts.parent1_ivs, opts.parent2_ivs],
      filter_hidden_power: filters.hidden_power,
      filter_max_ivs: filters.max_ivs,
      filter_min_ivs: filters.min_ivs,
    };
    const chunked = chunkRange([opts.min_advances, opts.max_advances], 200);
    const searchOpts: RustOption<Egg3PickupOptions>[] = chunked.map(
      ([min_advances, max_advances]) => ({
        ...baseOpts,
        initial_advances: min_advances,
        max_advances: Math.max(0, max_advances - min_advances),
      }),
    );

    await generatePickupStates(searchOpts);
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
