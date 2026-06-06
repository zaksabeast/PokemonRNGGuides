import React from "react";
import { useWatch } from "react-hook-form";
import { z } from "zod";
import {
  Field,
  FormFieldTable,
  FormikSelect,
  FormikSwitch,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { useFormContext } from "~/hooks/form";
import { Gen3StaticMethod, Species } from "~/rngTools";
import { lcrng_distance } from "~/utils/lcrng";
import { toOptions } from "~/utils/options";

import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import {
  getStatic3SpeciesEncounters,
  Static3Game,
  static3Games,
} from "./constants";
import { usingTargetSetupInputs } from "../pokemonRng/generatorResultColumns";
import uniq from "lodash-es/uniq";

export const gen3StaticMethods = [
  "Static1",
  "Static4",
] as const satisfies readonly Gen3StaticMethod[];

const static3Species = uniq(
  getStatic3SpeciesEncounters("emerald").map(({ species }) => species),
);
const defaultRoamingOptions: boolean[] = [false];

export const encounterContextToLvl = (
  game: Static3Game,
  species: string,
  roaming: boolean,
) => {
  const encounter = getStatic3SpeciesEncounters(game).find(
    (encounter) =>
      encounter.species === species && encounter.roaming === roaming,
  );

  if (encounter == null) {
    throw new Error(`No static encounter for ${species}`);
  }

  return encounter.lvl;
};

export const getPossibleValuesForSpecies = (
  game: Static3Game,
  species: Species,
) => {
  const roaming = uniq(
    getStatic3SpeciesEncounters(game)
      .filter((encounter) => encounter.species === species)
      .map((encounter) => encounter.roaming),
  );

  return {
    species: static3Species,
    roaming: roaming.length === 0 ? defaultRoamingOptions : roaming,
  };
};

const Validator = z.object({
  game: z.enum(static3Games),
  species: z.enum(static3Species),
  roaming: z.boolean(),
  usingPaintingReseeding: z.boolean(),
  targetFrameBeforePainting: z.number().int().min(1).max(0xffff),
  targetMethod: z.enum(gen3StaticMethods),
  targetAdvance: z.number().int().min(0).max(0xffffffff),
});

type Props = {
  game: Static3Game;
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
};

export type TargetSetup = {
  game: Static3Game;
  species: Species;
  roaming: boolean;
  targetPaintingAdvs: { before: number; after: number };
  targetMethod: Gen3StaticMethod;
};

export type FormState = z.infer<typeof Validator>;

const getInitialValues = (game: Static3Game): FormState => {
  return {
    game,
    species: "Mudkip",
    roaming: false,
    usingPaintingReseeding: false,
    targetFrameBeforePainting: 1,
    targetAdvance: 1000,
    targetMethod: "Static1",
  };
};

const convertFormStateValuesToTargetSetup = (
  values: FormState,
): TargetSetup => {
  const { roaming } = getPossibleValuesForSpecies(values.game, values.species);

  return {
    game: values.game,
    species: values.species,
    roaming: roaming.includes(values.roaming) ? values.roaming : false,
    targetPaintingAdvs: {
      before: values.usingPaintingReseeding
        ? values.targetFrameBeforePainting
        : 0,
      after: values.targetAdvance,
    },
    targetMethod: values.targetMethod,
  };
};

const getFields = ({
  game,
  species,
  roaming,
  usingPaintingReseeding,
  equivalentInitialAdvs,
}: {
  game: Static3Game;
  species: Species;
  roaming: boolean;
  usingPaintingReseeding: boolean;
  equivalentInitialAdvs: number;
}): Field[] => {
  const { roaming: roamingOptions } = getPossibleValuesForSpecies(
    game,
    species,
  );
  const canRoam = roamingOptions.includes(true);

  const fields: Field[] = [
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={toOptions(static3Species)}
        />
      ),
    },
  ];

  fields.push(
    {
      label: "Roaming",
      input: <FormikSwitch<FormState> name="roaming" disabled={!canRoam} />,
      show: roamingOptions.length > 1 || roaming,
    },
    ...usingTargetSetupInputs(usingPaintingReseeding, equivalentInitialAdvs),
    {
      label: "Target Method",
      input: (
        <FormikSelect<FormState, "targetMethod">
          name="targetMethod"
          options={toOptions(gen3StaticMethods)}
        />
      ),
    },
  );

  return fields;
};

export const Static3TargetSetupInputFields = ({
  game,
  setTargetSetup,
}: {
  game: Static3Game;
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
}) => {
  const { setFieldValue } = useFormContext<FormState>();
  const species = useWatch<FormState, "species">({ name: "species" });
  const roaming = useWatch<FormState, "roaming">({
    name: "roaming",
  });
  const usingPaintingReseeding = useWatch<FormState, "usingPaintingReseeding">({
    name: "usingPaintingReseeding",
  });
  const targetFrameBeforePainting = useWatch<
    FormState,
    "targetFrameBeforePainting"
  >({
    name: "targetFrameBeforePainting",
  });
  const targetAdvance = useWatch<FormState, "targetAdvance">({
    name: "targetAdvance",
  });

  const equivalentInitialAdvs =
    lcrng_distance(0, targetFrameBeforePainting) + targetAdvance;

  const fields = getFields({
    game,
    species,
    roaming,
    usingPaintingReseeding,
    equivalentInitialAdvs,
  });

  React.useEffect(() => {
    const { roaming: roamingOptions } = getPossibleValuesForSpecies(
      game,
      species,
    );
    if (!roamingOptions.includes(roaming)) {
      setFieldValue("roaming", false);
    }

    setTargetSetup(null);
  }, [
    game,
    setFieldValue,
    setTargetSetup,
    species,
    roaming,
    targetAdvance,
    targetFrameBeforePainting,
    usingPaintingReseeding,
  ]);

  return <FormFieldTable fields={fields} />;
};

export const Static3TargetSetupInput = ({ game, setTargetSetup }: Props) => {
  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    const targetSetup = convertFormStateValuesToTargetSetup(values);
    const { content } = await calculateTargetSetupResult(targetSetup);
    setTargetSetup(content == null ? null : targetSetup);
  };

  return (
    <RngToolForm<FormState, never>
      validationSchema={Validator}
      initialValues={getInitialValues(game)}
      onSubmit={onSubmit}
      submitTrackerId="static3_calib_target"
      rowKey="uid"
      submitButtonLabel="Calculate Target"
    >
      <Static3TargetSetupInputFields
        game={game}
        setTargetSetup={setTargetSetup}
      />
    </RngToolForm>
  );
};
