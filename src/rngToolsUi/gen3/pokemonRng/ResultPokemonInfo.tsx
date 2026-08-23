import { Flex } from "~/components";
import { Gender, Ivs, rngTools, Species, StatsValue } from "~/rngTools";
import { nature_from_pid } from "~/types";
import { minIvs } from "~/types/ivs";
import { formatHex } from "~/utils/formatHex";
import React from "react";
import { getAbilityDisplayStr } from "../wild/calculateTargetSetupResult";

export const PokemonInfo = ({
  species,
  pid,
  ivs,
  lvl,
}: {
  species: Species;
  pid: number;
  ivs: Ivs;
  lvl: number;
}) => {
  const nature = nature_from_pid(pid);
  const [stats, setStats] = React.useState<StatsValue>(minIvs);
  const [gender, setGender] = React.useState<Gender>("Genderless");
  const [abilityStr, setAbilityStr] = React.useState("");

  React.useEffect(() => {
    const statsPromise = rngTools.calculate_stats(
      species,
      lvl,
      nature,
      ivs,
      minIvs /*evs*/,
    );

    const genderPromise = rngTools.get_species_gender_from_pid(species, pid);
    const abilityStrPromise = getAbilityDisplayStr(species, pid);

    Promise.all([statsPromise, genderPromise, abilityStrPromise]).then(
      ([nextStats, nextGender, nextAbilityStr]) => {
        setStats(nextStats);
        setGender(nextGender);
        setAbilityStr(nextAbilityStr);
      },
    );
  }, [species, ivs, lvl, nature, pid]);

  return (
    <Flex vertical>
      <div>
        {species}, Lvl {lvl}, {gender}, {abilityStr}, {nature}, HP {stats.hp},
        ATK {stats.atk}, DEF {stats.def}, SPA {stats.spa}, SPD {stats.spd}, SPE{" "}
        {stats.spe}
      </div>
      <div>
        PID: {formatHex(pid)}, IVS: {ivs.hp}/{ivs.atk}/{ivs.def}/{ivs.spa}/
        {ivs.spd}/{ivs.spe}
      </div>
    </Flex>
  );
};
