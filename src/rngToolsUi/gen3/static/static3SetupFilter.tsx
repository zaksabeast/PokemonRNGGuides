import { Static3Game } from "./constants";
import { Field, FormFieldTable, FormikSelect, Typography } from "~/components";
import { toOptions } from "~/utils/options";
import { FormState, gen3StaticMethods } from "./static3TargetSetupSearcher";
import { useWatch } from "react-hook-form";
import {
  getPaintingSetupFilterFields,
  getTidSidSetupFilterFields,
} from "../pokemonRng/setupFilter";

const getSetupFields = (obj: {
  game: Static3Game;
  usingPaintingReseeding: boolean;
  filter_shiny: boolean;
  usingAceForSid: boolean;
  letSearcherFindPaintingSeed: boolean;
  showAdvancedPaintingSettings: boolean;
}): Field[] => {
  const { game } = obj;

  const canUseAce = game === "emerald";
  return [
    ...getTidSidSetupFilterFields({ ...obj, canUseAce }),
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
    },

    ...getPaintingSetupFilterFields(obj),
  ];
};

export const Static3SetupFilter = ({ game }: { game: Static3Game }) => {
  const usingPaintingReseeding = useWatch<FormState, "usingPaintingReseeding">({
    name: "usingPaintingReseeding",
  });
  const filter_shiny = useWatch<FormState, "filter_shiny">({
    name: "filter_shiny",
  });
  const usingAceForSid = useWatch<FormState, "usingAceForSid">({
    name: "usingAceForSid",
  });
  const letSearcherFindPaintingSeed = useWatch<
    FormState,
    "letSearcherFindPaintingSeed"
  >({
    name: "letSearcherFindPaintingSeed",
  });
  const showAdvancedPaintingSettings = useWatch<
    FormState,
    "showAdvancedPaintingSettings"
  >({
    name: "showAdvancedPaintingSettings",
  });

  return (
    <>
      <Typography.Title level={4} p={0} m={0}>
        Setup
      </Typography.Title>
      <FormFieldTable
        fields={getSetupFields({
          game,
          usingPaintingReseeding,
          filter_shiny,
          usingAceForSid,
          letSearcherFindPaintingSeed,
          showAdvancedPaintingSettings,
        })}
      />
    </>
  );
};
