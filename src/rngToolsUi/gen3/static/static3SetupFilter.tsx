import {
  gen3StaticMethods,
  getEmeraldStaticCalibData,
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
  initial_advances: number;
  recommendedMinAdvances: number | null;
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

const getSetupFieldsOpts = (
  game: Static3Game,
  species: Species | null | undefined,
  roaming: boolean | null | undefined,
) => {
  const defaultVal = {
    requireAceForPaintingReseeding: false,
    recommendedMinAdvances: null,
  };

  if (game !== "emerald" || species == null || roaming == null) {
    return defaultVal;
  }

  const calib = getEmeraldStaticCalibData(species, roaming);
  if (calib == null) {
    return defaultVal;
  }

  return {
    requireAceForPaintingReseeding: calib.requireAceForPaintingReseeding,
    recommendedMinAdvances: calib.recommendedMinAdvances ?? null,
  };
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
    initial_advances,
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
      initial_advances: true,
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
          usingPaintingReseeding: usingPaintingReseeding ?? false,
          filter_shiny: filter_shiny ?? false,
          usingAceForSid: usingAceForSid ?? false,
          letSearcherFindPaintingSeed: letSearcherFindPaintingSeed ?? false,
          showAdvancedPaintingSettings: showAdvancedPaintingSettings ?? false,
          usingDeadBattery: usingDeadBattery ?? false,
          initial_advances: initial_advances ?? 0,
          ...getSetupFieldsOpts(game, species, roaming),
        })}
      />
    </>
  );
};
