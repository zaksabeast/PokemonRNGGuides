import { Static3SearcherResult, Wild3PaintingAdvsAndDur } from "~/rngTools";
import { RngToolForm, RngToolSubmit } from "~/components";
import {
  pkmFilterSchema,
  getPkmFilterInitialValues,
} from "~/components/pkmFilter";
import React from "react";
import { z } from "zod";

import { sortBy } from "lodash-es";
import { FlattenIvs } from "~/rngToolsUi/shared/ivColumns";
import {
  gen3PkmFilterSchema,
  getGen3PkmFilterInitialValues,
} from "~/components/gen3PkmFilter";

import { searchStatic3Target } from "./searchStatic3Target";
import { gen3StaticMethods, TargetSetup } from "./static3TargetSetupInput";
import { getGeneratorPokemonResultColumns } from "../pokemonRng/generatorResultColumns";
import { Static3TargetMon } from "./static3TargetMon";
import { species } from "~/types/species";
import { Static3Game } from "./constants";
import { Static3SetupFilter } from "./static3SetupFilter";

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
  game: Static3Game;
  setTargetSetup: (targetSetup: TargetSetup) => void;
};

export const Static3TargetSetupSearcher = ({
  game,
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
        <Static3TargetMon game={game} />
        <br />
        <Static3SetupFilter game={game} />
      </RngToolForm>
    </>
  );
};
