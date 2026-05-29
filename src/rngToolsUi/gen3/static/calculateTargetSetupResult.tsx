
export const calculateTargetSetupResult = async (
  targetSetup: TargetSetup,
) => {
  const opts: Static3GeneratorOptions = {
    species: targetSetup.species,
    encounterContext: targetSetup.encounterContext,
    tid: 0,
    sid: 0,
    map_idx: 0,
    methods: [targetSetup.targetMethod],
    filter: pkmFilterFieldsToRustInput(getPkmFilterInitialValues()),
    gen3_filter: gen3PkmFilterFieldsToRustInput(
      getGen3PkmFilterInitialValues(),
      null,
    ),
  };

  const encounterData = emeraldStaticGameData.data.find(
    (table) => table.species === targetSetup.species && table.encounterContext === targetSetup.encounterContext,
  );
  if (encounterData == null) {
    return null;
  }

  const results = await rngTools.generate_gen3_static_wasm(
    targetSetup.targetPaintingAdvs.before,
    targetSetup.targetPaintingAdvs.after,
    opts,
  );

    if (results.length === 0) {
      return null;
    }

    const { species } = targetSetup;
    const { ivs, pid } = results[0];

    const nature = nature_from_pid(res.pid);

    const stats = await rngTools.calculate_stats(
      species,
      encounterData.lvl,
      nature,
      ivs,
      { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    );

    const gender = await rngTools.get_species_gender_from_pid(species, pid);

    const abilityStr = await getAbilityDisplayStr(species, pid);

    return

  };