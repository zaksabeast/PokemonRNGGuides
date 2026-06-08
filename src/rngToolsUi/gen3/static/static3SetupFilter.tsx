import { gen3StaticMethods, Static3Game } from "./constants";
import { Field, FormFieldTable, FormikSelect, Typography } from "~/components";
import { useWatch } from "~/hooks/form";
import { toOptions } from "~/utils/options";
import { FormState } from "./static3TargetSetupSearcher";
import {
  getPaintingSetupFilterFields,
  targetSetupSearcherSchema,
  getTidSidSetupFilterFields,
} from "../pokemonRng/targetSetupSearcher";

const getSetupFields = (obj: {
  game: Static3Game;
  usingPaintingReseeding: boolean;
  filter_shiny: boolean;
  usingAceForSid: boolean;
  letSearcherFindPaintingSeed: boolean;
  showAdvancedPaintingSettings: boolean;
  usingDeadBattery: boolean;
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

export const Static3SetupFilter = ({ game }: { game: Static3Game }) => {
  const {
    usingPaintingReseeding,
    filter_shiny,
    usingAceForSid,
    letSearcherFindPaintingSeed,
    showAdvancedPaintingSettings,
    usingDeadBattery,
  } = useWatch({
    names: {
      usingPaintingReseeding: true,
      filter_shiny: true,
      usingAceForSid: true,
      letSearcherFindPaintingSeed: true,
      showAdvancedPaintingSettings: true,
      usingDeadBattery: true,
    },
    validationSchema: targetSetupSearcherSchema,
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
        })}
      />
    </>
  );
};
