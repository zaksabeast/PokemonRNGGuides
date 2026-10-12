import {
  type PkmFilterFields as PkmFilterValues,
  type PkmFilterProps,
} from "~/components/pkmFilter";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import { GenericForm, type RequireFormFields } from "~/types/form";
import { SwitchGroup } from "~/components/form/base/switchGroup";
import { FormSwitchField } from "~/components/form/base/switchField";
import { AbilityFilterField } from "./abilityField";
import { GenderFilterField } from "./genderField";
import { HiddenPowerField } from "./hiddenPowerField";
import { IvRangeFields } from "./ivFields";
import { NatureFilterField } from "./natureFields";

type Props<FormState extends GenericForm> = PkmFilterProps &
  RequireFormFields<FormState, PkmFilterValues>;

export const PkmFilter = <FormState extends GenericForm>({
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
      {(displayShiny || displayHiddenPower) && (
        <SwitchGroup>
          {displayShiny && (
            <FormSwitchField<PkmFilterValues>
              name="filter_shiny"
              label={t["Shiny"]}
            />
          )}
          {displayHiddenPower && (
            <HiddenPowerField<PkmFilterValues> name="filter_hidden_power" />
          )}
        </SwitchGroup>
      )}
    </>
  );
};
