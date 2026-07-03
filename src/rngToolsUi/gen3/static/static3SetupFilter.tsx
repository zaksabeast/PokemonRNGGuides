import {
  gen3StaticMethods,
  getEmeraldStaticCalibData,
  getPossibleRoamingValuesForSpecies,
  Static3Game,
} from "./constants.tsx";
import { Field, FormFieldTable, FormikSelect, Typography } from "~/components";
import { useWatch } from "~/hooks/form";
import { toOptions } from "~/utils/options";
import { FormState } from "./static3TargetSetupSearcher";
import {
  getPaintingSetupFilterFields,
  getTidSidSetupFilterFields,
} from "../pokemonRng/targetSetupSearcher";
import { static3TargetSetupSearcherSchema } from "./static3TargetSetupSearcher.schema.ts";
import { Species } from "~/rngTools/index.ts";

const getSetupFields = (obj: {
  game: Static3Game;
  usingPaintingReseeding: boolean;
  filter_shiny: boolean;
  usingAceForSid: boolean;
  letSearcherFindPaintingSeed: boolean;
  showAdvancedPaintingSettings: boolean;
  usingDeadBattery: boolean;
  requireAceForPaintingReseeding: boolean;
}): Field[] => {
  const { game } = obj;

  return [
    ...getTidSidSetupFilterFields(obj),
    {
      label: "Methods",
      input: (
        <FormikSelect<FormState, "methods">
          name="methods"
          options={toOptions(gen3StaticMethods)}
          mode="multiple"
          selectAllNoneButtons
        />
      ),
      show: game === "rs",
    },

    ...getPaintingSetupFilterFields(obj),
  ];
};

const getRequireAceForPaintingReseeding = (
  game: Static3Game,
  species: Species | null | undefined,
  roaming: boolean | null | undefined,
) => {
  if (game !== "emerald" || species == null || roaming == null) {
    return false;
  }

  const possibleRoaming = getPossibleRoamingValuesForSpecies(game, species);

  const effectiveRoaming = possibleRoaming.includes(roaming)
    ? roaming
    : possibleRoaming[0];

  return (
    getEmeraldStaticCalibData(species, effectiveRoaming)
      ?.requireAceForPaintingReseeding ?? false
  );
};

export const Static3SetupFilter = ({ game }: { game: Static3Game }) => {
  const {
    usingPaintingReseeding,
    filter_shiny,
    usingAceForSid,
    letSearcherFindPaintingSeed,
    showAdvancedPaintingSettings,
    usingDeadBattery,
    species,
    roaming,
  } = useWatch({
    names: {
      usingPaintingReseeding: true,
      filter_shiny: true,
      usingAceForSid: true,
      letSearcherFindPaintingSeed: true,
      showAdvancedPaintingSettings: true,
      usingDeadBattery: true,
      species: true,
      roaming: true,
    },
    validationSchema: static3TargetSetupSearcherSchema,
  });

  return (
    <>
      <Typography.Title level={4} p={0} m={0}>
        Setup
      </Typography.Title>
      <FormFieldTable
        fields={getSetupFields({
          game,
          requireAceForPaintingReseeding: getRequireAceForPaintingReseeding(
            game,
            species,
            roaming,
          ),
          usingPaintingReseeding: usingPaintingReseeding ?? false,
          filter_shiny: filter_shiny ?? false,
          usingAceForSid: usingAceForSid ?? false,
          letSearcherFindPaintingSeed: letSearcherFindPaintingSeed ?? false,
          showAdvancedPaintingSettings: showAdvancedPaintingSettings ?? false,
          usingDeadBattery: usingDeadBattery ?? false,
        })}
      />
    </>
  );
};
