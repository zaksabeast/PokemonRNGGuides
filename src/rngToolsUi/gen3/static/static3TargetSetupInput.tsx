import React from "react";
import {
  FormSection,
  FormSelectField,
  FormSwitchField,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { useWatch } from "~/hooks/form";
import { TargetSetup } from "./static3TargetSetupSearcher";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import {
  gen3StaticMethods,
  hasMultiplePossibleRoamingValuesForSpecies,
  getPossibleStatic3Species,
} from "./constants.tsx";
import { PaintingReseedingFields } from "../pokemonRng/targetSetupInput";
import { species } from "~/types/species";
import { lcrng_distance } from "~/utils/lcrng";
import { toOptions } from "~/utils/options";
import { z } from "zod";

const schema = z.object({
  species: z.enum(species),
  roaming: z.boolean(),
  usingPaintingReseeding: z.boolean(),
  targetFrameBeforePainting: z.number().int().min(1).max(0xffff),
  targetAdvance: z.number().int().min(0).max(0xffffffff),
  targetMethod: z.enum(gen3StaticMethods),
});

const GAME = "emerald"; // Only emerald is supported.

export type FormState = z.infer<typeof schema>;

const getInitialValues = (): FormState => ({
  species: "Mudkip",
  roaming: false,
  usingPaintingReseeding: false,
  targetFrameBeforePainting: 1,
  targetAdvance: 1000,
  targetMethod: "Static1",
});

const convertFormStateValuesToTargetSetup = (
  values: FormState,
): TargetSetup => ({
  game: GAME,
  species: values.species,
  roaming: values.roaming,
  targetPaintingAdvs: {
    before: values.usingPaintingReseeding
      ? values.targetFrameBeforePainting
      : 0,
    after: values.targetAdvance,
  },
  targetMethod: values.targetMethod,
  aceSid: null,
});

const Static3TargetSetupInputFields = ({
  setTargetSetup,
}: {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
}) => {
  const watchedValues = useWatch({
    names: {
      roaming: true,
      species: true,
      targetMethod: true,
      usingPaintingReseeding: true,
      targetFrameBeforePainting: true,
      targetAdvance: true,
    },
    validationSchema: schema,
  });
  const roaming = watchedValues.roaming ?? false;
  const selectedSpecies = watchedValues.species ?? "Mudkip";
  // The target method has no field while only Emerald is supported.
  const targetMethod = watchedValues.targetMethod ?? "Static1";
  const usingPaintingReseeding = watchedValues.usingPaintingReseeding ?? false;
  const targetFrameBeforePainting =
    watchedValues.targetFrameBeforePainting ?? 1;
  const targetAdvance = watchedValues.targetAdvance ?? 1000;

  const hasMultiplePossibleRoaming = hasMultiplePossibleRoamingValuesForSpecies(
    GAME,
    selectedSpecies,
  );
  const equivalentInitialAdvs =
    (lcrng_distance(0, targetFrameBeforePainting) + targetAdvance) % 2 ** 32;

  React.useEffect(() => {
    setTargetSetup(null);
  }, [
    selectedSpecies,
    roaming,
    usingPaintingReseeding,
    targetFrameBeforePainting,
    targetAdvance,
    targetMethod,
    setTargetSetup,
  ]);

  return (
    <FormSection>
      <FormSelectField<FormState>
        name="species"
        label="Species"
        options={toOptions(getPossibleStatic3Species("emerald"))}
      />
      {hasMultiplePossibleRoaming && (
        <FormSwitchField<FormState> name="roaming" label="Roaming" />
      )}
      <PaintingReseedingFields
        usingPaintingReseeding={usingPaintingReseeding}
        equivalentInitialAdvs={equivalentInitialAdvs}
      />
    </FormSection>
  );
};

export const Static3TargetSetupInput = ({
  setTargetSetup,
}: {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
}) => {
  const onSubmit: ToolFormSubmit<FormState> = async (values) => {
    const targetSetup = convertFormStateValuesToTargetSetup(values);
    const { content } = await calculateTargetSetupResult(targetSetup);
    setTargetSetup(content == null ? null : targetSetup);
  };

  return (
    <ToolForm<FormState, never>
      validationSchema={schema}
      initialValues={getInitialValues()}
      onSubmit={onSubmit}
      submitTrackerId="static3_calib_target"
      rowKey="uid"
      submitButtonLabel="Calculate Target"
    >
      <Static3TargetSetupInputFields setTargetSetup={setTargetSetup} />
    </ToolForm>
  );
};
