import { Field, FormikRadio, FormikSelect, FormikSwitch } from "~/components";
import z from "zod";
import { emeraldLangs } from "./emeraldLang";
import { toOptions } from "~/utils/options";
import { AceForm } from "./aceForm";
import { aceCodes } from "./aceStaticCodes";
import { species } from "~/types/species";
import { useFormContext, useWatch } from "~/hooks/form";
import React from "react";
import { getPossibleRoamingValuesForSpecies } from "../static/constants";

const availableSpecies = [
  ...new Set(aceCodes.flatMap((aceCode) => aceCode.speciesList)),
].toSorted();

const schema = z.object({
  species: z.enum(species),
  roaming: z.boolean(),
  action: z.enum(["Respawn", "Access"]),
  lang: z.enum(emeraldLangs),
});

const getInitialValues = (): FormState => {
  return {
    species: "Mudkip",
    roaming: false,
    action: "Respawn",
    lang: "English",
  };
};

const GAME = "emerald";

export type FormState = z.infer<typeof schema>;

export const EmeraldAceStatic = () => {
  const initialValues = getInitialValues();

  const { setFieldValue } = useFormContext<FormState>();
  const watchedValues = useWatch({
    names: {
      roaming: true,
      species: true,
      action: true,
    },
    validationSchema: schema,
  });
  const roaming = watchedValues.roaming ?? initialValues.roaming;
  const selectedSpecies = watchedValues.species ?? initialValues.species;

  const actions =
    aceCodes.find((aceCode) => {
      return (
        aceCode.speciesList.includes(selectedSpecies) &&
        aceCode.roaming === roaming
      );
    })?.actions ?? [];

  const possibleRoaming = getPossibleRoamingValuesForSpecies(
    GAME,
    selectedSpecies,
  );

  React.useEffect(() => {
    if (!possibleRoaming.includes(roaming)) {
      setFieldValue("roaming", possibleRoaming[0]);
    }
  }, [possibleRoaming, roaming, setFieldValue]);

  const getFields = (): Field[] => {
    return [
      {
        label: "Species",
        input: (
          <FormikSelect<FormState, "species">
            name="species"
            options={toOptions(availableSpecies)}
          />
        ),
      },
      {
        label: "Roaming",
        input: <FormikSwitch<FormState> name="roaming" />,
        show: possibleRoaming.length > 1,
      },
      {
        label: "Action",
        input: <FormikRadio<FormState> name="action" options={actions} />,
        show: actions.length > 0,
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
  };

  const onSubmit = async (values: FormState) => {
    const selectedAction = actions.find((act) => act.value === values.action);
    if (selectedAction == null) {
      return null;
    }

    return {
      lang: values.lang,
      raw_boxes: selectedAction.boxesByLanguage[values.lang],
    };
  };

  return (
    <AceForm<FormState>
      getFields={getFields}
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};
