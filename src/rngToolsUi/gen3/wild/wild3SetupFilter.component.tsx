import { Gen3Method } from "~/rngTools";
import { Link } from "~/components";
import {
  FormMultiSelectField,
  FormRadioField,
  FormSection,
  FormSummary,
  FormSwitchField,
  SwitchField,
  SwitchGroup,
} from "~/components/form";
import { toOptions } from "~/utils/options";

import {
  formatActionName,
  formatMapName,
  formatRoamerStateName,
  formatMassOutbreakStateName,
  formatFeebasStateName,
  leadsLabels,
} from "./utils";
import { useField, useWatch_UNSAFE } from "~/hooks/form";
import { FormState } from "./wild3TargetSetupSearcher";
import { getPossibleValuesForSpecies } from "./wild3TargetMon";
import { wild3SafariPokeblockSearchOptLabels } from "~/types/pokeblock";
import {
  PaintingSetupFilterFields,
  TidSidSetupFilterFields,
} from "../pokemonRng/targetSetupSearcherFields";
import { FeebasTilesField } from "./feebasMap";

const supportedGen3Methods = [
  "Wild1",
  "Wild2",
  "Wild3",
  "Wild4",
  // TODO: Support Wild5
] as const satisfies Gen3Method[];

export const Wild3SetupFilter = () => {
  const [{ value: recommendedSetups }, , { setValue: setRecommendedSetups }] =
    useField<boolean>("recommendedSetups");
  const species = useWatch_UNSAFE<FormState, "species">({
    name: "species",
  });
  const filter_shiny = useWatch_UNSAFE<FormState, "filter_shiny">({
    name: "filter_shiny",
  });
  const usingAceForSid = useWatch_UNSAFE<FormState, "usingAceForSid">({
    name: "usingAceForSid",
  });
  const usingPaintingReseeding = useWatch_UNSAFE<
    FormState,
    "usingPaintingReseeding"
  >({
    name: "usingPaintingReseeding",
  });
  const letSearcherFindPaintingSeed = useWatch_UNSAFE<
    FormState,
    "letSearcherFindPaintingSeed"
  >({
    name: "letSearcherFindPaintingSeed",
  });

  const possVals = getPossibleValuesForSpecies(species);

  return (
    <FormSection title="Considered Setups">
      <FormSummary rows={[{ label: "Target species", value: species }]} />
      <TidSidSetupFilterFields
        game="emerald"
        filter_shiny={filter_shiny}
        usingAceForSid={usingAceForSid}
      />
      <SwitchField
        name="recommendedSetups"
        label="Ignore Recommended Setups"
        value={!recommendedSetups}
        onChange={(ignore) => setRecommendedSetups(!ignore)}
      >
        <FormMultiSelectField<FormState>
          name="actions"
          label="Actions"
          options={toOptions(possVals.actions, formatActionName)}
        />
        <FormMultiSelectField<FormState>
          name="maps"
          label="Maps"
          options={toOptions(possVals.maps, formatMapName)}
        />
        <FormMultiSelectField<FormState>
          name="leadIdxs"
          label="Leads"
          options={leadsLabels}
        />
        {possVals.actions.includes("RockSmash") && (
          <FormSwitchField<FormState>
            name="using_white_flute"
            label="Using White Flute"
            tooltip={{
              title: "Using White Flute",
              description:
                "White Flute greatly increases the odds of encountering Pokémon when using Rock Smash. It can be obtained from the Glass Workshop in Route 113.",
            }}
          />
        )}
        {possVals.is_safari_pokeblock_usable && (
          <FormRadioField<FormState>
            name="considered_safari_pokeblocks"
            label="Considered Pokéblocks"
            tooltip={{
              title: "Considered Pokéblocks",
              description:
                "Putting a Pokéblock in a Pokéblock feeder in the Safari Zone increases the likehood encountering Pokémon with a particular nature.",
            }}
            cellSize="word"
            options={wild3SafariPokeblockSearchOptLabels}
          />
        )}
        {possVals.roamerStates.length > 1 && (
          <FormMultiSelectField<FormState>
            name="roamerStates"
            label="Roamer states"
            options={toOptions(possVals.roamerStates, formatRoamerStateName)}
          />
        )}
        {possVals.massOutbreakStates.length > 1 && (
          <FormMultiSelectField<FormState>
            name="massOutbreakStates"
            label="Mass outbreak states"
            options={toOptions(
              possVals.massOutbreakStates,
              formatMassOutbreakStateName,
            )}
          />
        )}
        {possVals.feebasStates.length > 1 && (
          <FormMultiSelectField<FormState>
            name="feebasStates"
            label="Feebas states"
            options={toOptions(possVals.feebasStates, formatFeebasStateName)}
          />
        )}
        <FormMultiSelectField<FormState>
          name="methods"
          label="Methods"
          tooltip={{
            title: "Methods",
            description: (
              <>
                For advanced users. Learn more about{" "}
                <Link newTab href="/gba-methods/">
                  methods
                </Link>
                .
              </>
            ),
          }}
          options={toOptions(supportedGen3Methods)}
        />
        <FormSwitchField<FormState>
          name="considerWeather"
          label="Consider all weathers"
        />
        <FormSwitchField<FormState>
          name="hasUnlockedBike"
          label="Has unlocked bike"
        />
      </SwitchField>
      {species === "Feebas" && (
        <FeebasTilesField<FormState>
          name="feebasCycles"
          label="Feebas fishing spots"
          tooltip={{
            title: "Feebas fishing spots",
            description:
              "Select the tiles where you can fish Feebas. If possible, avoid red tiles because they cause unstable results.",
          }}
        />
      )}
      <PaintingSetupFilterFields
        game="emerald"
        usingPaintingReseeding={usingPaintingReseeding}
        letSearcherFindPaintingSeed={letSearcherFindPaintingSeed}
        usingDeadBattery={false}
        requireAceForPaintingReseeding={false}
        initial_advances={0} // doesn't matter if recommendedMinAdvances is null
        recommendedMinAdvances={null}
      />
      <SwitchGroup>
        <FormSwitchField<FormState>
          name="generate_even_if_impossible"
          label="Display results with 0% likelihood"
        />
        <FormSwitchField<FormState>
          name="rngManipulatedLeadPid"
          label="RNG-manipulated lead PID"
          tooltip={{
            title: "RNG-manipulated lead PID",
            description: (
              <>
                For advanced users.
                <br />
                If inactive, likelihood is calculated assuming you're using a
                common lead cycle speed.
                <br />
                If active, likelihood is calculated assuming you will catch a
                Pokémon with the optimal lead cycle speed then use it to catch
                your target Pokémon. Learn more about{" "}
                <Link newTab href="/gba-methods-lead-impact/">
                  Methods & Leads
                </Link>
                .
              </>
            ),
          }}
        />
      </SwitchGroup>
    </FormSection>
  );
};
