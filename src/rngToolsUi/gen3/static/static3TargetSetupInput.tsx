import React from "react";
import {
  Field,
  FormikSelect,
  FormikSwitch,
  RngToolForm,
  RngToolSubmit,
} from "~/components";
import { FormFieldTable } from "~/components/formFieldTable";
import { useFormContext, useWatch } from "~/hooks/form";
import { TargetSetup } from "./static3TargetSetupSearcher";
import { calculateTargetSetupResult } from "./calculateTargetSetupResult";
import {
  gen3StaticMethods,
  getPossibleRoamingValuesForSpecies,
  getPossibleStatic3Species,
} from "./constants.tsx";
import { getPaintingReseedingFields } from "../pokemonRng/targetSetupInput";
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
  const { setFieldValue } = useFormContext<FormState>();
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
  const targetMethod = watchedValues.targetMethod ?? "Static1";
  const usingPaintingReseeding = watchedValues.usingPaintingReseeding ?? false;
  const targetFrameBeforePainting =
    watchedValues.targetFrameBeforePainting ?? 1;
  const targetAdvance = watchedValues.targetAdvance ?? 1000;

  const possibleRoaming = getPossibleRoamingValuesForSpecies(
    GAME,
    selectedSpecies,
  );
  const equivalentInitialAdvs =
    (lcrng_distance(0, targetFrameBeforePainting) + targetAdvance) % 2 ** 32;

  React.useEffect(() => {
    if (!possibleRoaming.includes(roaming)) {
      setFieldValue("roaming", possibleRoaming[0]);
    }
  }, [possibleRoaming, roaming, setFieldValue]);

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

  const fields: Field[] = [
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={toOptions(getPossibleStatic3Species("emerald"))}
        />
      ),
    },
    {
      label: "Roaming",
      input: <FormikSwitch<FormState> name="roaming" />,
      show: possibleRoaming.length > 1,
    },
    ...getPaintingReseedingFields({
      usingPaintingReseeding,
      equivalentInitialAdvs,
    }),
    {
      label: "Target method",
      input: (
        <FormikSelect<FormState, "targetMethod">
          name="targetMethod"
          options={toOptions(gen3StaticMethods)}
        />
      ),
      show: false, // GAME === "rs", // To show when rs will be supported.
    },
  ];

  return <FormFieldTable fields={fields} />;
};

export const Static3TargetSetupInput = ({
  setTargetSetup,
}: {
  setTargetSetup: (targetSetup: TargetSetup | null) => void;
}) => {
  const onSubmit: RngToolSubmit<FormState> = async (values) => {
    const targetSetup = convertFormStateValuesToTargetSetup(values);
    const { content } = await calculateTargetSetupResult(targetSetup);
    setTargetSetup(content == null ? null : targetSetup);
  };

  return (
    <RngToolForm<FormState, never>
      validationSchema={schema}
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
