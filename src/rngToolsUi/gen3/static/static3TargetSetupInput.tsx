import {
  Field,
  FormFieldTable,
  FormikSelect,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { Gen3StaticMethod, Species } from "~/rngTools";
import { lcrng_distance } from "~/utils/lcrng";
import { toOptions } from "~/utils/options";
import { useFormContext } from "~/hooks/form";
import { useWatch } from "react-hook-form";
import { z } from "zod";
import React from "react";

import { getStatic3SpeciesEncounters } from "./constants";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import { usingTargetSetupInputs } from "../pokemonRng/generatorResultColumns";

const static3Methods = [
  "Static1",
  "Static4",
] as const satisfies readonly Gen3StaticMethod[];
const static3Species = getStatic3SpeciesEncounters("emerald").map(
  ({ species }) => species,
);
type Static3EncounterContext = "";
const static3EncounterContexts = [""] as const;

export const encounterContextToLvl = (_ctx: string) => 5;

export const getPossibleValuesForSpecies = (_species: Species) => {
  return {
    species: static3Species,
    encounterContexts: static3EncounterContexts,
  };
};

const formatEncounterContext = (encounterContext: Static3EncounterContext) => {
  return encounterContext === "" ? "Default" : encounterContext;
};

const Validator = z.object({
  species: z.enum(static3Species),
  encounterContext: z.enum(static3EncounterContexts),
  usingPaintingReseeding: z.boolean(),
  targetFrameBeforePainting: z.number().int().min(1).max(0xffff),
  targetMethod: z.enum(static3Methods),
  targetAdvance: z.number().int().min(0).max(0xffffffff),
});

type Props = {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
};

export type TargetSetup = {
  species: Species;
  // encounterContext is required to distinguish Roaming Lati@s and Southern Island Lati@s. They don't have the same level.
  encounterContext: string;
  targetPaintingAdvs: { before: number; after: number };
  targetMethod: Gen3StaticMethod;
};

export type FormState = z.infer<typeof Validator>;

const getInitialValues = (): FormState => {
  return {
    species: "Mudkip",
    encounterContext: "",
    usingPaintingReseeding: false,
    targetFrameBeforePainting: 1,
    targetAdvance: 1000,
    targetMethod: "Static1",
  };
};

const convertFormStateValuesToTargetSetup = (
  values: FormState,
): TargetSetup => {
  return {
    species: values.species,
    encounterContext: values.encounterContext,
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
  encounterContext,
  usingPaintingReseeding,
  equivalentInitialAdvs,
}: {
  species: Species;
  encounterContext: Static3EncounterContext;
  usingPaintingReseeding: boolean;
  equivalentInitialAdvs: number;
}): Field[] => {
  const { encounterContexts } = getPossibleValuesForSpecies(species);

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
      label: "Encounter",
      input: (
        <FormikSelect<FormState, "encounterContext">
          name="encounterContext"
          options={toOptions(encounterContexts, formatEncounterContext)}
        />
      ),
      show: encounterContexts.length > 1,
    },
    {
      label: "Encounter",
      input:
        encounterContexts.length > 0
          ? formatEncounterContext(encounterContext)
          : "",
      show: encounterContexts.length > 0,
    },
    ...usingTargetSetupInputs(usingPaintingReseeding, equivalentInitialAdvs),
    {
      label: "Target Method",
      input: (
        <FormikSelect<FormState, "targetMethod">
          name="targetMethod"
          options={toOptions(static3Methods)}
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
  const encounterContext = useWatch<FormState, "encounterContext">({
    name: "encounterContext",
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
    encounterContext,
    usingPaintingReseeding,
    equivalentInitialAdvs,
  });

  React.useEffect(() => {
    setTargetSetup(null);
  }, [
    setFieldValue,
    setTargetSetup,
    species,
    encounterContext,
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
