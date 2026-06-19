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
} from "./constants";
import { getPaintingReseedingFields } from "../pokemonRng/targetSetupInput";
import { species } from "~/types/species";
import { lcrng_distance } from "~/utils/lcrng";
import { toOptions } from "~/utils/options";
import { z } from "zod";
import { emeraldLangs } from "./emeraldLang";
import { AceForm } from "./aceForm";

const schema = z.object({
  species: z.enum(species),
  roaming: z.boolean(),
  lang: z.enum(emeraldLangs),
});

const GAME = "emerald"; // Only emerald is supported.

export type FormState = z.infer<typeof schema>;

const getInitialValues = (): FormState => ({
  species: "Mudkip",
  roaming: false,
  lang: "English",
});

export type Props = AllOrNone<{
  species: Species;
  roaming: boolean;
}>;

const EmeraldAceStatic = ({
  species: speciesProp,
  roaming: roamingProp,
}: Props) => {
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
  const possibleRoaming = getPossibleRoamingValuesForSpecies(
    GAME,
    selectedSpecies,
  );

  React.useEffect(() => {
    if (!possibleRoaming.includes(roaming)) {
      setFieldValue("roaming", possibleRoaming[0]);
    }
  }, [possibleRoaming, roaming, setFieldValue]);

  const fields: Field[] = [
    {
      label: "Species",
      input: (
        <FormikSelect<FormState, "species">
          name="species"
          options={toOptions(getPossibleStatic3Species(GAME))}
        />
      ),
    },
    {
      label: "Roaming",
      input: <FormikSwitch<FormState> name="roaming" />,
      show: possibleRoaming.length > 1,
    },
    {
    label: "Game Language",
    input: (
        <FormikSelect<FormState, "lang">
        name="lang"
        options={toOptions(emeraldLangs)}
        />
    ),
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

  };

  return (
    <AceForm<FormState>
        getFields={getFields}
        results={results}
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
    />
  );
};
