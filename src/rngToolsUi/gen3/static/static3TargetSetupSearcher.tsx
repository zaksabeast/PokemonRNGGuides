import {
  Gen3StaticMethod,
  Species,
  Static3SearcherResult,
  Wild3PaintingAdvsAndDur,
} from "~/rngTools";
import { Flex, RngToolForm, RngToolSubmit } from "~/components";
import React from "react";
import { z } from "zod";

import { sortBy } from "lodash-es";
import { FlattenIvs } from "~/rngToolsUi/shared/ivColumns";

import { searchStatic3Target } from "./searchStatic3Target";
import { Static3TargetMon } from "./static3TargetMon";
import { gen3StaticMethods, Static3Game } from "./constants";
import { Static3SetupFilter } from "./static3SetupFilter";
import {
  targetSetupSearcherSchema,
  getTargetSetupSearcherInitialValues,
  getTargetResultColumns,
} from "../pokemonRng/targetSetupSearcher";

export type TargetSetup = {
  game: Static3Game;
  species: Species;
  roaming: boolean;
  targetPaintingAdvs: { before: number; after: number };
  targetMethod: Gen3StaticMethod;
  aceSid: number | null;
};

const schema = z
  .object({
    methods: z.array(z.enum(gen3StaticMethods)).min(1),
    roaming: z.boolean(),
  })
  .extend(targetSetupSearcherSchema.shape);

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
    species: game === "frlg" ? "Squirtle" : "Mudkip",
    roaming: false,
    methods: ["Static1"],
    ...getTargetSetupSearcherInitialValues(game),
  };
};

type Props = {
  game: Static3Game;
  setTargetSetup?: (targetSetup: TargetSetup | null) => void;
};

const convertToTargetSetup = (
  game: Static3Game,
  pidPath: PidPathResult,
  tidForAceSid: number | null,
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
    aceSid: tidForAceSid,
  };
};

export const Static3TargetSetupSearcher = ({
  game,
  setTargetSetup: setTargetSetupProp,
}: Props) => {
  const [pidPathResults, setPidPathResults] = React.useState<PidPathResult[]>(
    [],
  );

  const [tidForAceSid, setTidForAceSid] = React.useState<number | null>(null);
  const initialValues = getInitialValues(game);

  const pidPathColumns = getTargetResultColumns(
    game,
    false,
    tidForAceSid !== null,
  );

  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    const pidPathResults = await searchStatic3Target(game, values);

    if (values.filter_shiny && values.usingAceForSid) {
      setTidForAceSid(values.tid);
    } else {
      setTidForAceSid(null);
    }

    setPidPathResults(sortBy(pidPathResults, "wait_dur"));
    setTargetSetupProp?.(null);
  };

  const onClickResultRow =
    setTargetSetupProp == null
      ? undefined
      : (res: PidPathResult | null) => {
          const targetSetup =
            res == null ? null : convertToTargetSetup(game, res, tidForAceSid);
          setTargetSetupProp(targetSetup);
        };

  return (
    <RngToolForm<FormState, PidPathResult>
      columns={pidPathColumns}
      results={pidPathResults}
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="static3_find_target"
      rowKey="uid"
      onClickResultRow={onClickResultRow}
    >
      <Flex vertical gap={15}>
        <Static3TargetMon game={game} />
        <Static3SetupFilter game={game} />
      </Flex>
    </RngToolForm>
  );
};
