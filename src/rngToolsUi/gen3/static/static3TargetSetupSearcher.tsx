import {
  Gen3StaticMethod,
  Species,
  Static3SearcherResult,
  Wild3PaintingAdvsAndDur,
} from "~/rngTools";
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
import { getGeneratorPokemonResultColumns } from "../pokemonRng/generatorResultColumns";
import { getPossibleSpecies, Static3TargetMon } from "./static3TargetMon";
import { species } from "~/types/species";
import { Static3Game } from "./constants";
import { Static3SetupFilter } from "./static3SetupFilter";

export const gen3StaticMethods = [
  "Static1",
  "Static4",
] as const satisfies readonly Gen3StaticMethod[];

export type TargetSetup = {
  game: Static3Game;
  species: Species;
  roaming: boolean;
  targetPaintingAdvs: { before: number; after: number };
  targetMethod: Gen3StaticMethod;
};

const schema = z
  .object({
    species: z.enum(species),
    roaming: z.boolean(),
    tid: z.number().int().min(0).max(0xffff),
    usingAceForSid: z.boolean(),
    sid: z.number().int().min(0).max(0xffff),
    methods: z.array(z.enum(gen3StaticMethods)).min(1),
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
      roaming: boolean;
      species: Species;
    }
>;

const getInitialValues = (game: Static3Game): FormState => {
  return {
    species: getPossibleSpecies(game)[0],
    tid: 0,
    usingAceForSid: false,
    sid: 0,
    roaming: false,
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
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
};

const convertToTargetSetup = (
  game: Static3Game,
  pidPath: PidPathResult,
): TargetSetup => {
  return {
    game,
    species: pidPath.species,
    roaming: pidPath.roaming,
    targetPaintingAdvs: {
      before: pidPath.advs.frame_before_painting,
      after: pidPath.advs.adv_after_painting,
    },
    targetMethod: pidPath.method,
  };
};

export const Static3TargetSetupSearcher = ({
  game,
  setTargetSetup: setTargetSetupProp,
}: Props) => {
  const [pidPathResults, setPidPathResults] = React.useState<PidPathResult[]>(
    [],
  );

  const initialValues = getInitialValues(game);

  const pidPathColumns = getGeneratorPokemonResultColumns<PidPathResult>();

  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    const pidPathResults = await searchStatic3Target(game, values);

    setPidPathResults(sortBy(pidPathResults, "wait_dur"));
    setTargetSetupProp(null);
  };

  const onClickResultRow = (res: PidPathResult | null) => {
    const targetSetup = res == null ? null : convertToTargetSetup(game, res);
    setTargetSetupProp(targetSetup);
  };

  return (
    <RngToolForm<FormState, PidPathResult>
      columns={pidPathColumns}
      results={pidPathResults}
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="wild3_find_target"
      rowKey="uid"
      onClickResultRow={onClickResultRow}
    >
      <Static3TargetMon game={game} />
      <br />
      <Static3SetupFilter game={game} />
    </RngToolForm>
  );
};
