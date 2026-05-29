export const PokemonInfo = ({
  species,
  pid,
  ivs,
}:{
  species:Species,
  pid:number,
  ivs:Ivs,

}) => {
  const [stats, setStats] = React.useState<StatValues>(minIvs);
  const [gender, setGender] = React.useState<Gender>("Genderless");

  React.useEffect(() => {
    const nature = nature_from_pid(pid);

    const statsPromise = rngTools.calculate_stats(
      species,
      encounterData.lvl,
      nature,
      ivs,
      { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    );

    const genderPromise = await rngTools.get_species_gender_from_pid(species, pid);

    const abilityStrPromise = await getAbilityDisplayStr(species, pid);

    Promise.all([statsPromise, genderPromise, abilityStrPromise]).then(([

    ]) => {

    });
  }, [species, ivs, pid]);


    return

  return <Flex vertical>
          <div>
            {species}, Lvl {lvl}, {gender}, {abilityStr}, {nature}, HP{" "}
            {stats.hp}, ATK {stats.atk}, DEF {stats.def}, SPA {stats.spa}, SPD{" "}
            {stats.spd}, SPE {stats.spe}
          </div>
          <div>
            PID: {formatHex(pid)}, IVS: {ivs.hp}/{ivs.atk}/{ivs.def}/{ivs.spa}
            /{ivs.spd}/{ivs.spe}
          </div>
}