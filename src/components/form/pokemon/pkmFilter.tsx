import {
  type PkmFilterFields as PkmFilterValues,
  type PkmFilterProps,
} from "~/components/pkmFilter";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { GenericForm, type RequireFormFields } from "~/types/form";
import { SwitchGroup } from "~/components/form/base/switchGroup";
import { FormSelectField } from "~/components/form/base/selectField";
import {
  shinyFilterOptions,
  shinyFilterGen3To7Tooltip,
} from "~/rngTools/shiny";
import { AbilityFilterField } from "./abilityField";
import { GenderFilterField } from "./genderField";
import { HiddenPowerField } from "./hiddenPowerField";
import { IvRangeFields } from "./ivFields";
import { NatureFilterField } from "./natureFields";

type Props<FormState extends GenericForm> = PkmFilterProps &
  RequireFormFields<FormState, PkmFilterValues>;

export const PkmFilter = <FormState extends GenericForm>({
  generation,
  displayShiny = true,
  displayNature = true,
  displayAbility = true,
  displayHiddenAbility = false,
  displayGender = true,
  displayIvs = true,
  displayHiddenPower = true,
  species,
}: Props<FormState>) => {
  const t = useActiveRouteTranslations();

  return (
    <>
      {displayNature && (
        <NatureFilterField<PkmFilterValues> name="filter_nature" />
      )}
      {displayAbility && (
        <AbilityFilterField<PkmFilterValues>
          name="filter_ability"
          species={species}
          displayHiddenAbility={displayHiddenAbility}
        />
      )}
      {displayGender && (
        <GenderFilterField<PkmFilterValues>
          name="filter_gender"
          species={species}
        />
      )}
      {displayIvs && (
        <IvRangeFields<PkmFilterValues>
          minName="filter_min_ivs"
          maxName="filter_max_ivs"
        />
      )}
      {displayShiny && (
        <FormSelectField<PkmFilterValues>
          name="filter_shiny"
          label={t["Shiny"]}
          tooltip={
            generation >= 3 && generation <= 7
              ? {
                  title: t["Shiny"],
                  description: shinyFilterGen3To7Tooltip,
                }
              : undefined
          }
          options={shinyFilterOptions}
        />
      )}
      {displayHiddenPower && (
        <SwitchGroup>
          <HiddenPowerField<PkmFilterValues> name="filter_hidden_power" />
        </SwitchGroup>
      )}
    </>
  );
};
