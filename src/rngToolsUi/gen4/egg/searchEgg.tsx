import * as tst from "ts-toolbelt";
import { uniqueId } from "lodash-es";
import {
  Button,
  Field,
  FormFieldTable,
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  MinMaxContainer,
  ResultColumn,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { useWatch } from "~/hooks/form";
import { species, getGen4SpeciesOptions } from "~/types/species";
import { IvInput, IvsSchema, NullableIvsSchema } from "~/components/ivInput";
import { maxIvs } from "~/types/ivs";
import { useAtom } from "jotai";
import { gen4StateAtom } from "../shared/state";
import { z } from "zod";
import {
  multiWorkerRngTools,
  SearchEgg4Opts,
  Egg4Result,
  Egg4HeldResult,
  Egg4PickupResult,
  RngDateTime,
  SeedTime4,
} from "~/rngTools";
import {
  getPkmFilterFields,
  getPkmFilterInitialValues,
  pkmFilterSchema,
  pkmFilterFieldsToRustInput,
} from "~/components/pkmFilter";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { useCurrentStep } from "~/components/stepper/state";
import { useBatchedTool } from "~/hooks/useBatchedTool";
import {
  FlattenIvs,
  flattenIvs,
  getInheritedIvColumns,
} from "~/rngToolsUi/shared/ivColumns";
import { formatHex } from "~/utils/formatHex";
import { chunkRange } from "~/utils/chunkRange";
import { RustOption } from "~/types/utils";

type PickupResult = tst.O.Omit<FlattenIvs<Egg4PickupResult>, "advance">;
type HeldResult = tst.O.Omit<Egg4HeldResult, "advance">;
type BaseResult = {
  key: string;
  seed: number;
  delay: number;
  heldAdvance: number;
  pickupAdvance: number;
  seedTime: SeedTime4;
};
type Result = tst.O.MergeAll<
  BaseResult,
  [PickupResult, HeldResult, RngDateTime]
>;

const Validator = z
  .object({
    year: z.number().int().min(2000).max(2100),
    min_delay: z.number().int().min(0),
    max_delay: z.number().int().min(0),
    species: z.enum(species),
    tid: z.number().int().min(0).max(0xffff),
    sid: z.number().int().min(0).max(0xffff),
    held_min_advances: z.number().int().min(0),
    held_max_advances: z.number().int().min(0),
    is_masuda: z.boolean(),
    pickup_min_advances: z.number().int().min(0),
    pickup_max_advances: z.number().int().min(0),
    parent1_ivs: NullableIvsSchema,
    parent2_ivs: NullableIvsSchema,
    filter_min_ivs: IvsSchema,
    filter_max_ivs: IvsSchema,
  })
  .extend(pkmFilterSchema.shape);

type FormState = z.infer<typeof Validator>;

const Fields = () => {
  const t = useActiveRouteTranslations();
  const { species } = useWatch({
    validationSchema: Validator,
    names: { species: true },
  });

  const fields: Field[] = [
    {
      label: t["TID / SID"],
      input: (
        <MinMaxContainer
          min={<FormikNumberInput<FormState> name="tid" numType="decimal" />}
          max={<FormikNumberInput<FormState> name="sid" numType="decimal" />}
          delimeter="/"
        />
      ),
    },
    {
      label: t["Year"],
      input: <FormikNumberInput<FormState> name="year" numType="decimal" />,
    },
    {
      label: t["Delay"],
      input: (
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
      label: t["Held Advance"],
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="held_min_advances"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="held_max_advances"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: t["Pickup Advance"],
      input: (
        <MinMaxContainer
          min={
            <FormikNumberInput<FormState>
              name="pickup_min_advances"
              numType="decimal"
            />
          }
          max={
            <FormikNumberInput<FormState>
              name="pickup_max_advances"
              numType="decimal"
            />
          }
        />
      ),
    },
    {
      label: t["Species"],
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={getGen4SpeciesOptions().byName}
        />
      ),
    },
    {
      label: t["Masuda Method"],
      input: <FormikSwitch<FormState> name="is_masuda" />,
    },
    {
      label: t["Parent 1 IVs"],
      input: <IvInput<FormState, "nullable"> name="parent1_ivs" />,
    },
    {
      label: t["Parent 2 IVs"],
      input: <IvInput<FormState, "nullable"> name="parent2_ivs" />,
    },
    ...getPkmFilterFields({ species: species ?? undefined }, t),
  ];

  return <FormFieldTable fields={fields} />;
};

const initialValues: FormState = {
  tid: 0,
  sid: 0,
  year: 2000,
  min_delay: 600,
  max_delay: 2000,
  held_min_advances: 0,
  held_max_advances: 30,
  pickup_min_advances: 0,
  pickup_max_advances: 200,
  species: "Bulbasaur",
  is_masuda: false,
  parent1_ivs: maxIvs,
  parent2_ivs: maxIvs,
  ...getPkmFilterInitialValues(),
};

const mapResult = (result: Egg4Result): Result => ({
  key: uniqueId(),
  ...result.held,
  ...flattenIvs(result.pickup),
  ...result.seed_time.datetime,
  ...result.seed_time,
  seedTime: result.seed_time,
  heldAdvance: result.held.advance,
  pickupAdvance: result.pickup.advance,
});

export const Egg4Search = () => {
  const t = useActiveRouteTranslations();
  const [state, setState] = useAtom(gen4StateAtom);
  const [, setCurrentStep] = useCurrentStep();
  const {
    run: searchEgg4,
    data: results,
    progressPercent,
    cancel,
  } = useBatchedTool(multiWorkerRngTools.search_egg4, {
    map: mapResult,
    sortBy: [
      (result) => result.heldAdvance,
      (result) => result.pickupAdvance,
      (result) => result.delay,
    ],
  });

  const game = state.config.game;

  const onSubmit: RngToolSubmit<FormState> = async (opts) => {
    const chunked = chunkRange([opts.min_delay, opts.max_delay], 200);
    const chunkedOpts = chunked.map(
      ([min_delay, max_delay]): RustOption<SearchEgg4Opts> => ({
        pickup_min_advances: opts.pickup_min_advances,
        pickup_max_advances: opts.pickup_max_advances,
        held_max_advances: opts.held_max_advances,
        held_min_advances: opts.held_min_advances,
        held_offset: 0,
        pickup_offset: 0,
        is_dppt: game === "Diamond" || game === "Pearl" || game === "Platinum",
        force_seconds: null,
        is_masuda: opts.is_masuda,
        min_delay,
        max_delay,
        year: opts.year,
        species: opts.species,
        tid: opts.tid,
        sid: opts.sid,
        parent_ivs: [opts.parent1_ivs, opts.parent2_ivs],
        filter: pkmFilterFieldsToRustInput(opts),
      }),
    );
    return await searchEgg4(chunkedOpts);
  };

  const columns: ResultColumn<Result>[] = [
    {
      title: t["Select"],
      dataIndex: "key",
      disableVerticalPadding: true,
      render: (_, target) => (
        <Button
          trackerId="select_egg4_pickup"
          onClick={() => {
            setState({
              target: {
                seedTime: target.seedTime,
                mtAdvance: target.heldAdvance,
                lcrngAdvance: target.pickupAdvance,
              },
            });
            setCurrentStep((step) => step + 1);
          }}
        >
          Select
        </Button>
      ),
    },
    { title: t["Held Advance"], dataIndex: "heldAdvance" },
    { title: t["Pickup Advance"], dataIndex: "pickupAdvance" },
    ...getInheritedIvColumns(t),
    { title: t["Nature"], dataIndex: "nature" },
    { title: t["Ability"], dataIndex: "ability" },
    {
      title: t["Shiny"],
      dataIndex: "shiny",
      render: (shiny) => (shiny === true ? "Yes" : "No"),
    },
    { title: t["Gender"], dataIndex: "gender" },
    {
      title: t["Hidden power"],
      type: "group",
      columns: [
        {
          title: "Type",
          dataIndex: "hidden_power",
          render: (hidden_power) => hidden_power?.pokemon_type ?? "?",
        },
        {
          title: "Power",
          dataIndex: "hidden_power",
          render: (hidden_power) => hidden_power?.bp ?? "?",
        },
      ],
    },
    { title: "Delay", dataIndex: "delay" },
    {
      title: "Second",
      dataIndex: "second",
    },
    {
      title: t["PID"],
      dataIndex: "pid",
      monospace: true,
      render: (pid) => formatHex(pid),
    },
    {
      title: "Seed",
      dataIndex: "seed",
      monospace: true,
      render: (seed) => formatHex(seed),
    },
  ];

  return (
    <RngToolForm<FormState, Result>
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="search_egg4"
      columns={columns}
      results={results}
      allowCancel
      progressPercent={progressPercent}
      cancelTrackerId="cancel_search_egg4"
      onCancel={cancel}
    >
      <Fields />
    </RngToolForm>
  );
};
