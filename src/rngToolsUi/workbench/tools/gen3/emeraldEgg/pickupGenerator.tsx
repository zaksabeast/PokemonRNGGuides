import { uniqueId } from "lodash-es";
import { ToolLayout } from "~/rngToolsUi/workbench/layouts/tool";
import {
  Descriptions,
  Field,
} from "~/rngToolsUi/workbench/components/descriptions";
import {
  FormikNumberInput,
  IvInput,
  MinMaxContainer,
  FormikSelect,
  NumberInput,
} from "~/components";
import { ResultColumn } from "~/components/resultTable";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import {
  multiWorkerRngTools,
  Egg3PickupOptions,
  Egg3PickupState,
  Gen3PickupMethod,
  InheritedIv,
} from "~/rngTools";
import { z } from "zod";
import { chunkRange } from "~/utils/chunkRange";
import { NullableIvsSchema } from "~/components/ivInput";
import { HexSchema } from "~/utils/number";
import {
  getIvMethodOptions,
  ivMethodLabels,
  ivMethods,
} from "~/rngToolsUi/gen3/retailEmeraldEgg/constants";
import {
  pkmFilterSchema,
  getPkmFilterIvFields,
  getPkmFilterInitialValues,
} from "~/rngToolsUi/workbench/components/pkmFilter";
import { maxIvs, RustOption } from "~/types";
import { getInheritedIvColumns } from "~/rngToolsUi/shared/ivColumns";

const CHUNK = 200;
const LIMIT = CHUNK * 5;

const Validator = z
  .object({
    seed: HexSchema(0xffffffff),
    min_advances: z.number().int().min(0),
    max_advances: z.number().int().min(0),
    methods: z.enum(ivMethods).array().nonempty(),
    offset: z.number().int().min(0),
    parent1_ivs: NullableIvsSchema,
    parent2_ivs: NullableIvsSchema,
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;
type Result = {
  id: string;
  method: Gen3PickupMethod;
  advance: number;
  hp: InheritedIv;
  atk: InheritedIv;
  def: InheritedIv;
  spa: InheritedIv;
  spd: InheritedIv;
  spe: InheritedIv;
};

const initialValues: FormState = {
  ...getPkmFilterInitialValues(),
  seed: 0,
  offset: 0,
  min_advances: 0,
  max_advances: 1000,
  methods: ["EmeraldBred", "EmeraldBredSplit", "EmeraldBredAlternate"],
  parent1_ivs: maxIvs,
  parent2_ivs: maxIvs,
  filter_level: 5,
};

const FilterFields = () => {
  const filterFields = getPkmFilterIvFields({
    displayHiddenPower: false,
    displayGender: false,
    displayAbility: false,
    displayNature: false,
    displayShiny: false,
  });

  return (
    <Descriptions bordered title="Filters" items={filterFields} column={1} />
  );
};

const RngInfoFields = () => {
  const fields: Field[] = [
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
        <IvInput<FormState, "nullable">
          name="parent1_ivs"
          gridOverrides={{ desktop: 2, mobile: 2, smallTablet: 2, tablet: 2 }}
        />
      ),
    },
    {
      label: "Parent 2 IVs",
      tooltip: "IVs can be left blank if you don't know them",
      children: (
        <IvInput<FormState, "nullable">
          name="parent2_ivs"
          gridOverrides={{ desktop: 2, mobile: 2, smallTablet: 2, tablet: 2 }}
        />
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
  id: uniqueId(),
  advance: res.advance,
  method: res.method,
  hp: res.ivs.hp,
  atk: res.ivs.atk,
  def: res.ivs.def,
  spa: res.ivs.spa,
  spd: res.ivs.spd,
  spe: res.ivs.spe,
});

export const EmeraldEggPickupGenerator = () => {
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
    const baseOpts: Omit<
      RustOption<Egg3PickupOptions>,
      "initial_advances" | "max_advances"
    > = {
      delay: opts.offset,
      seed: opts.seed,
      filter_hidden_power: opts.filter_hidden_power,
      filter_max_ivs: opts.filter_max_ivs,
      filter_min_ivs: opts.filter_min_ivs,
      methods: opts.methods,
      parent_ivs: [opts.parent1_ivs, opts.parent2_ivs],
    };
    const chunked = chunkRange([opts.min_advances, opts.max_advances], CHUNK);
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
