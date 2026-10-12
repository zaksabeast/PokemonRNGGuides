import {
  gen3StaticMethods,
  getEmeraldStaticCalibData,
  Static3Game,
} from "./constants.tsx";
import { FormMultiSelectField, FormSection } from "~/components/form";
import { useWatch } from "~/hooks/form";
import { toOptions } from "~/utils/options";
import { FormState } from "./static3TargetSetupSearcher";
import {
  PaintingSetupFilterFields,
  TidSidSetupFilterFields,
} from "../pokemonRng/targetSetupSearcherFields";
import { static3TargetSetupSearcherSchema } from "./static3TargetSetupSearcher.schema.ts";
import { Species } from "~/rngTools/index.ts";

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
      usingDeadBattery: true,
      species: true,
      roaming: true,
      initial_advances: true,
    },
    validationSchema: static3TargetSetupSearcherSchema,
  });

  return (
    <FormSection title="Setup">
      <TidSidSetupFilterFields
        game={game}
        filter_shiny={filter_shiny ?? "Any"}
        usingAceForSid={usingAceForSid ?? false}
      />
      {game === "rs" && (
        <FormMultiSelectField<FormState>
          name="methods"
          label="Methods"
          options={toOptions(gen3StaticMethods)}
        />
      )}
      <PaintingSetupFilterFields
        game={game}
        usingPaintingReseeding={usingPaintingReseeding ?? false}
        letSearcherFindPaintingSeed={letSearcherFindPaintingSeed ?? false}
        usingDeadBattery={usingDeadBattery ?? false}
        initial_advances={initial_advances ?? 0}
        {...getSetupFieldsOpts(game, species, roaming)}
      />
    </FormSection>
  );
};
