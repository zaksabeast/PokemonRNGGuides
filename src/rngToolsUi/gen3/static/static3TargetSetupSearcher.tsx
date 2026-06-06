import { Static3SearcherResult, Wild3PaintingAdvsAndDur } from "~/rngTools";
import {
  Field,
  FormFieldTable,
  FormikNumberInput,
  FormikSelect,
  FormikSwitch,
  RngToolForm,
  RngToolSubmit,
  Typography,
} from "~/components";
import {
  pkmFilterSchema,
  getPkmFilterInitialValues,
} from "~/components/pkmFilter";
import React from "react";
import { z } from "zod";

import { sortBy } from "lodash-es";
import uniq from "lodash-es/uniq";
import { FlattenIvs } from "~/rngToolsUi/shared/ivColumns";
import {
  gen3PkmFilterSchema,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";

import { searchStatic3Target } from "./searchStatic3Target";
import { gen3StaticMethods, TargetSetup } from "./static3TargetSetupInput";
import {
  getGeneratorPokemonResultColumns,
  usingTargetSetupInputs,
} from "../pokemonRng/generatorResultColumns";
import { Static3TargetMon } from "./static3TargetMon";
import { toOptions } from "~/utils/options";
import { species } from "~/types/species";

const schema = z
  .object({
    species: z.enum(species),
    tid: z.number().int().min(0).max(0xffff),
    sid: z.number().int().min(0).max(0xffff),
    methods: z.array(z.enum(gen3StaticMethods)).min(1),
    isRoaming: z.boolean(),
    usingPaintingReseeding: z.boolean(),
    letSearcherFindPaintingSeed: z.boolean(),
    showAdvancedPaintingSettings: z.boolean(),
    initial_seed: z.number().int().min(0).max(0xffffffff),
    initial_advances: z.number().int().min(0).max(0xffffffff),
    min_frame_before_painting: z.number().int().min(0).max(0xffffffff),
    min_adv_after_painting: z.number().int().min(0).max(0xffffffff),
    max_advances: z.number().int().min(0).max(0xffffffff),
    max_result_count: z.number().int().min(1),
  })
  .extend(pkmFilterSchema.shape)
  .extend(gen3PkmFilterSchema.shape);

export type FormState = z.infer<typeof schema>;

export type PidPathResult = FlattenIvs<
  Static3SearcherResult &
    Wild3PaintingAdvsAndDur & {
      uid: number;
      pidCycleCount: number;
      earliestAdvance: number;
      initial_seed: number;
    }
>;

const getInitialValues = (): FormState => {
  return {
    species: "Mudkip",
    tid: 0,
    sid: 0,
    isRoaming: false,
    methods: ["Static1"],
    usingPaintingReseeding: false,
    letSearcherFindPaintingSeed: true,
    showAdvancedPaintingSettings: false,
    initial_seed: 0,
    initial_advances: 1000,
    min_frame_before_painting: 800,
    min_adv_after_painting: 7000,
    max_advances: 10_000_000,
    max_result_count: 20,
    ...getPkmFilterInitialValues(),
    ...getGen3PkmFilterInitialValues(),
  };
};

type Props = {
  setTargetSetup: (targetSetup: TargetSetup) => void;
};

const getSetupFields = (): Field[] => [
  {
    label: "TID",
    input: <FormikNumberInput<FormState> name="tid" numType="decimal" />,
  },
  {
    label: "SID",
    input: <FormikNumberInput<FormState> name="sid" numType="decimal" />,
  },
  {
    label: "Methods",
    input: (
      <FormikSelect<FormState, "methods">
        name="methods"
        options={toOptions(gen3StaticMethods)}
        mode="multiple"
        selectAllNoneButtons
      />
    ),
  },
  ...usingTargetSetupInputs(false, 0, ["usingPaintingReseeding"]),
  {
    label: "Let searcher find painting seed",
    input: <FormikSwitch<FormState> name="letSearcherFindPaintingSeed" />,
  },
  {
    label: "Initial seed",
    input: <FormikNumberInput<FormState> name="initial_seed" numType="hex" />,
  },
  {
    label: "Initial advances",
    input: (
      <FormikNumberInput<FormState> name="initial_advances" numType="decimal" />
    ),
  },
  {
    label: "Min frame before painting",
    input: (
      <FormikNumberInput<FormState>
        name="min_frame_before_painting"
        numType="decimal"
      />
    ),
  },
  {
    label: "Min advances after painting",
    input: (
      <FormikNumberInput<FormState>
        name="min_adv_after_painting"
        numType="decimal"
      />
    ),
  },
  {
    label: "Max advances",
    input: (
      <FormikNumberInput<FormState> name="max_advances" numType="decimal" />
    ),
  },
  {
    label: "Max results",
    input: (
      <FormikNumberInput<FormState> name="max_result_count" numType="decimal" />
    ),
  },
];

const Static3SetupFilter = () => {
  return (
    <>
      <Typography.Title level={5} p={0} m={0}>
        Setup
      </Typography.Title>
      <FormFieldTable fields={getSetupFields()} />
    </>
  );
};

export const Static3TargetSetupSearcher = ({
  setTargetSetup: setTargetSetupProp,
}: Props) => {
  const [pidPathResults, setPidPathResults] = React.useState<PidPathResult[]>(
    [],
  );
  const [selectedPidPathResult, setSelectedPidPathResult] =
    React.useState<PidPathResult | null>(null);

  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    const pidPathResults = await searchStatic3Target(values);

    setPidPathResults(sortBy(pidPathResults, "wait_dur"));
    setSelectedPidPathResult(null);
  };

  const initialValues = getInitialValues();

  const pidPathColumns = getGeneratorPokemonResultColumns<PidPathResult>();

  React.useEffect(() => {
    //NO_PROD
    //setTargetSetupProp?.();
  }, [selectedPidPathResult, setTargetSetupProp]);

  return (
    <>
      <RngToolForm<FormState, PidPathResult>
        columns={pidPathColumns}
        results={pidPathResults}
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitTrackerId="wild3_find_target"
        rowKey="uid"
        onClickResultRow={setSelectedPidPathResult}
      >
        <Static3TargetMon />
        <br />
        <Static3SetupFilter />
      </RngToolForm>
    </>
  );
};
