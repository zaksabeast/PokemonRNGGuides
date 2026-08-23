import React from "react";
import { AbilityType, Species } from "~/rngTools";
import { getAbilityDisplayStrFromAbType } from "~/rngToolsUi/gen3/wild/calculateTargetSetupResult";

type AbilityNameProps = {
  species: Species;
  abilityType: AbilityType;
};

export const AbilityName = ({ species, abilityType }: AbilityNameProps) => {
  const [abilityName, setAbilityName] = React.useState("");

  React.useEffect(() => {
    let isCurrent = true;

    getAbilityDisplayStrFromAbType(species, abilityType).then(
      (nextAbilityName) => {
        if (isCurrent) {
          setAbilityName(nextAbilityName);
        }
      },
    );

    return () => {
      isCurrent = false;
    };
  }, [abilityType, species]);

  return <>{abilityName}</>;
};
