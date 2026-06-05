import { Species, Static3Method } from "~/rngTools";
import { lcrng_distance } from "~/utils/lcrng";
import {
  Field,
  FormikSelect,
  RngToolForm,
  RngToolSubmit,
  FormFieldTable,
} from "~/components";
import { toOptions } from "~/utils/options";
import { useFormContext } from "~/hooks/form";
import React from "react";
import { z } from "zod";

import { useWatch } from "react-hook-form";
import { getStatic3EmeraldGameData } from "./data/Static3GameData";
import { getPossibleValuesForMap } from "./dataUtils";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import { FormikEmeraldFrameBeforePaintingInput } from "~/components/emeraldFrameBeforePainting";
import { usingPaintingReseedingLabel } from "./Static3Labels";
import { Pokeblock, pokeblockSchema } from "~/types/pokeblock";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { usingTargetSetupInputs } from "../pokemonRng/generatorResultColumns";
import { getStatic3Species } from "./constants";

type Static3EncounterContext = "";
const static3EncounterContexts = [""];

const static3Methods = ["Static1", "Static4"];

const emeraldStaticGameData = getStatic3Species("emerald");

const Validator = z.object({
  species: z.enum(emeraldStaticGameData),
  map: z.string(),
  usingPaintingReseeding: z.boolean(),
  targetFrameBeforePainting: z.number().min(1).max(0xffff),
  targetMethod: z.enum(static3Methods),
  encounterContext: z.enum(static3EncounterContexts),
  targetAdvance: z.number().int().min(0).max(0xffffffff),
});

type Props = {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
};

export type TargetSetup = {
  species: Species;
  // encounterContext is required to distinguish Roaming Lati@s and Southern Island Lati@s. They don't have the same level.
  encounterContext: Static3EncounterContext;
  targetPaintingAdvs: { before: number; after: number };
  targetMethod: Static3Method;
};

export type FormState = z.infer<typeof Validator>;

const getInitialValues = (): FormState => {
  return {
    species: "Mudkip",
    encounterContext: "",
    usingPaintingReseeding: false,
    targetFrameBeforePainting: 1,
    targetAdvance: 1000,
    targetMethod: "Wild1",
    requiresWhiteFlute: false,
    safariPokeblock: null,
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

const getPossibleEncounterContextsForSpecies = (
  _species: Species,
): Static3EncounterContext[] => {
  //NO_PROD
  return [""];
};

const formatEncounterContext = (enc: Static3EncounterContext) => {
  return enc; // NO_PROD
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
  const { encounterContexts } = getPossibleEncounterContextsForSpecies(species);

  const fields: Field[] = [
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="map"
          options={toOptions(emeraldStaticGameData.species)}
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
          ? formatEncounterContext(encounterContexts[0])
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
    const { content } = await calculateTargetSetupResult(targetSetup, null);
    setTargetSetup(content == null ? null : targetSetup);
  };

  const initialValues = getInitialValues();

  return (
    <RngToolForm<FormState, never>
      validationSchema={Validator}
      initialValues={initialValues}
      onSubmit={onSubmit}
      submitTrackerId="static3_calib_target"
      rowKey="uid"
      submitButtonLabel="Calculate Target"
    >
      <Static3TargetSetupInputFields setTargetSetup={setTargetSetup} />
    </RngToolForm>
  );
};
