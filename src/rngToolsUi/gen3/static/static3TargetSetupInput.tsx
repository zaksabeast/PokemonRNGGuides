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
import { getStatic3SpeciesEncounters } from "./constants";
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

export const encounterContextToLvl = (species: string, roaming: boolean) => {
  const encounter = getStatic3SpeciesEncounters("emerald").find(
    (encounter) =>
      encounter.species === species && encounter.roaming === roaming,
  );

  if (encounter == null) {
    throw new Error(`No static encounter for ${species}`);
  }

  return encounter.lvl;
};

export const getPossibleValuesForSpecies = (species: Species) => {
  const roaming = uniq(
    getStatic3SpeciesEncounters("emerald")
      .filter((encounter) => encounter.species === species)
      .map((encounter) => encounter.roaming),
  );

  return {
    species: static3Species,
    roaming: roaming.length === 0 ? defaultRoamingOptions : roaming,
  };
};

const Validator = z.object({
  species: z.enum(static3Species),
  roaming: z.boolean(),
  usingPaintingReseeding: z.boolean(),
  targetFrameBeforePainting: z.number().int().min(1).max(0xffff),
  targetMethod: z.enum(gen3StaticMethods),
  targetAdvance: z.number().int().min(0).max(0xffffffff),
});

type Props = {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
};

export type TargetSetup = {
  species: Species;
  roaming: boolean;
  targetPaintingAdvs: { before: number; after: number };
  targetMethod: Gen3StaticMethod;
};

export type FormState = z.infer<typeof Validator>;

const getInitialValues = (): FormState => {
  return {
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
  const { roaming } = getPossibleValuesForSpecies(values.species);

  return {
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
  species,
  roaming,
  usingPaintingReseeding,
  equivalentInitialAdvs,
}: {
  species: Species;
  roaming: boolean;
  usingPaintingReseeding: boolean;
  equivalentInitialAdvs: number;
}): Field[] => {
  const { roaming: roamingOptions } = getPossibleValuesForSpecies(species);
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
  setTargetSetup,
}: {
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
    species,
    roaming,
    usingPaintingReseeding,
    equivalentInitialAdvs,
  });

  React.useEffect(() => {
    const { roaming: roamingOptions } = getPossibleValuesForSpecies(species);
    if (!roamingOptions.includes(roaming)) {
      setFieldValue("roaming", false);
    }

    setTargetSetup(null);
  }, [
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

export const Static3TargetSetupInput = ({ setTargetSetup }: Props) => {
  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    const targetSetup = convertFormStateValuesToTargetSetup(values);
    const { content } = await calculateTargetSetupResult(targetSetup);
    setTargetSetup(content == null ? null : targetSetup);
  };

  return (
    <RngToolForm<FormState, never>
      validationSchema={Validator}
      initialValues={getInitialValues()}
      onSubmit={onSubmit}
      submitTrackerId="static3_calib_target"
      rowKey="uid"
      submitButtonLabel="Calculate Target"
    >
      <Static3TargetSetupInputFields setTargetSetup={setTargetSetup} />
    </RngToolForm>
  );
};
