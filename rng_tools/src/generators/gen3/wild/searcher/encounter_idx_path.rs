use itertools::Itertools;

use crate::{
    EncounterSlot, Gender, GenderRatio, Species,
    gen3::{
        Gen3Lead, SpeciesData, Wild3Action, Wild3EncounterGameData, Wild3EncounterIndex,
        Wild3FeebasState, Wild3MassOutbreakState,
        wild::{
            lcrng_distance,
            searcher::{
                LvlPath, LvlToNatureGenderArc, Wild3MapSetups,
                nature_gender_path::NatureGenderToPidArc, pid_path::PidPath,
            },
        },
    },
    rng::lcrng::Pokerng,
};

#[derive(Default, Debug, PartialEq, Clone, Copy)]
/** seed when sweet scent is triggered (state right before Roamer test) */
pub struct EncounterIdxPath {
    pub seed: u32,
    pub map_setups_idx: usize,
    pub action: Wild3Action,
    pub encounter_idx_to_lvl_arc: EncounterIdxToLvlArc,
    pub lvl_to_nature_gender_arc: LvlToNatureGenderArc,
    pub nature_gender_to_pid_arc: NatureGenderToPidArc,
    pub pid_path: PidPath,
    pub debug_lvl_path: Option<LvlPath>,
}

impl EncounterIdxPath {
    pub fn new(
        seed: u32,
        map_setups_idx: usize,
        action: Wild3Action,
        encounter_idx_to_lvl_arc: EncounterIdxToLvlArc,
        lvl_path: &LvlPath,
    ) -> Self {
        Self {
            seed,
            map_setups_idx,
            action,
            encounter_idx_to_lvl_arc,
            lvl_to_nature_gender_arc: lvl_path.lvl_to_nature_gender_arc,
            nature_gender_to_pid_arc: lvl_path.nature_gender_to_pid_arc,
            pid_path: lvl_path.pid_path,
            debug_lvl_path: if cfg!(debug_assertions) {
                Some(*lvl_path)
            } else {
                None
            },
        }
    }

    pub fn lead(&self, encounter_gender_ratio: GenderRatio) -> Gen3Lead {
        match self.nature_gender_to_pid_arc {
            NatureGenderToPidArc::SynchronizeFailure | NatureGenderToPidArc::SynchronizeSuccess => {
                return Gen3Lead::Synchronize(self.pid_path.nature());
            }
            NatureGenderToPidArc::CuteCharmFailure | NatureGenderToPidArc::CuteCharmSuccess => {
                let encounter_gender = encounter_gender_ratio.gender_from_pid(self.pid_path.pid());
                let cute_charm_gender = if encounter_gender == Gender::Male {
                    Gender::Female
                } else {
                    Gender::Male
                };
                return Gen3Lead::CuteCharm(cute_charm_gender);
            }
            _ => {}
        }

        if matches!(self.lvl_to_nature_gender_arc, LvlToNatureGenderArc::Hustle) {
            return Gen3Lead::HustleVitalSpiritPressure;
        }

        match self.encounter_idx_to_lvl_arc {
            EncounterIdxToLvlArc::SlotMagnetPullSuccess => Gen3Lead::MagnetPull,
            EncounterIdxToLvlArc::SlotStaticSuccess => Gen3Lead::Static,
            _ => Gen3Lead::Vanilla,
        }
    }

    pub fn path_chain_to_string(&self) -> String {
        let mut str = String::from("");

        let seed_to_str = |seed: Option<u32>| match seed {
            Some(seed) => format!(
                ", Seed: {:08X}, Adv: {}",
                seed,
                lcrng_distance(self.seed, seed)
            ),
            None => String::from(""),
        };

        str.push_str(&format!(
            "  encounter_idx: {:?}, Initial Adv from 0: {}{}\n",
            self.encounter_idx_to_lvl_arc,
            lcrng_distance(0, self.seed),
            seed_to_str(Some(self.seed))
        ));

        let lvl_seed = self.debug_lvl_path.map(|lvl_path| lvl_path.seed);

        str.push_str(&format!(
            "  lvl: {:?} {}\n",
            self.lvl_to_nature_gender_arc,
            seed_to_str(lvl_seed)
        ));

        let nature_gender_path = self
            .debug_lvl_path
            .and_then(|lvl_path| lvl_path.debug_nature_gender_path);

        let nature_gender_seed = nature_gender_path.map(|seed| seed.seed);

        str.push_str(&format!(
            "  nature_gender: {:?} {}\n",
            self.nature_gender_to_pid_arc,
            seed_to_str(nature_gender_seed)
        ));

        str.push_str(&format!(
            "  pid: {:?} {}\n",
            self.pid_path.pid_to_iv_arc,
            seed_to_str(Some(self.pid_path.seed))
        ));

        str
    }
}

impl std::fmt::Display for EncounterIdxPath {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(
            f,
            "Seed: {:08X}, Map: {}, Action: {:?}, Method: {:?}, PID: {:08X}, Ivs: {}\n{}",
            self.seed,
            self.map_setups_idx,
            self.action,
            self.pid_path.method(),
            self.pid_path.pid(),
            self.pid_path.ivs(),
            self.path_chain_to_string()
        )
    }
}

#[derive(Default, Debug, PartialEq, Clone, Copy)]
pub enum EncounterIdxToLvlArc {
    #[default]
    SlotVanilla,
    SlotMagnetPullSuccess,
    SlotStaticSuccess,
    MassOutbreakSuccess(Wild3MassOutbreakState),
    FeebasSuccess,
    // Failure for MagnetPull, Static, MassOutbreak, Feebas are not considered because they add no
    // additional possibilities because it only shifts the very first random call.
    // Triggering SweetScent an advance later gives the same result.
}

pub struct EncounterIdxPathGenerator<'a> {
    arcs: Vec<EncounterIdxToLvlArc>,
    map_setups: Vec<Wild3MapSetupsForReverse<'a>>,
    mass_outbreak_setups: Vec<(usize, Wild3MassOutbreakState)>,
    actions: Vec<Wild3Action>,
    species_data: Option<SpeciesData>,
}

struct Wild3MapSetupsForReverse<'a> {
    pub map_setups_idx: usize,
    pub map_setups: &'a Wild3MapSetups,
    pub magnet_pull_attracted_indexes: Vec<usize>,
    pub static_attracted_indexes_land: Vec<usize>,
    pub static_attracted_indexes_water: Vec<usize>,
}

impl<'a> Wild3MapSetupsForReverse<'a> {
    pub fn new(map_setups_idx: usize, map_setups: &'a Wild3MapSetups) -> Self {
        let slots_to_vec = |slots: &[Wild3EncounterGameData], attract_steel: bool| -> Vec<usize> {
            let attracted_indexes = slots
                .iter()
                .enumerate()
                .filter_map(|(i, slot)| {
                    let attracted = if attract_steel {
                        slot.species_data.is_steel_type
                    } else {
                        slot.species_data.is_electric_type
                    };
                    if attracted { Some(i) } else { None }
                })
                .collect::<Vec<_>>();

            if attracted_indexes.is_empty() || attracted_indexes.len() == slots.len() {
                vec![]
            } else {
                attracted_indexes
            }
        };

        Self {
            map_setups_idx,
            map_setups,
            magnet_pull_attracted_indexes: slots_to_vec(
                &map_setups.map_data.slots_by_action[Wild3Action::SweetScentLand as usize],
                true,
            ),
            static_attracted_indexes_land: slots_to_vec(
                &map_setups.map_data.slots_by_action[Wild3Action::SweetScentLand as usize],
                false,
            ),
            static_attracted_indexes_water: slots_to_vec(
                &map_setups.map_data.slots_by_action[Wild3Action::SweetScentWater as usize],
                false,
            ),
        }
    }
}

impl<'a> EncounterIdxPathGenerator<'a> {
    pub fn new(
        leads: &[Gen3Lead],
        map_setups: &'a [Wild3MapSetups],
        species_data: Option<SpeciesData>,
    ) -> Self {
        let actions: Vec<Wild3Action> = map_setups
            .iter()
            .flat_map(|map_setup| map_setup.actions.iter().cloned())
            .sorted_by(|act1, act2| (*act1 as u8).cmp(&(*act2 as u8)))
            .dedup()
            .collect_vec();

        let mut arcs: Vec<EncounterIdxToLvlArc> = Vec::new();

        if permit_mass_outbreak_warm_arc(map_setups, &species_data) {
            arcs.push(EncounterIdxToLvlArc::MassOutbreakSuccess(
                Wild3MassOutbreakState::Inactive, // Mass outbreak state doesn't matter
            ));
        }
        if permit_vanilla_arc(leads) {
            arcs.push(EncounterIdxToLvlArc::SlotVanilla);
        }
        if permit_magnet_pull_arc(leads, &species_data, &actions) {
            arcs.push(EncounterIdxToLvlArc::SlotMagnetPullSuccess);
        }
        if permit_static_arc(leads, &species_data, &actions) {
            arcs.push(EncounterIdxToLvlArc::SlotStaticSuccess);
        }

        if permit_feebas_arc(&species_data) {
            arcs.push(EncounterIdxToLvlArc::FeebasSuccess);
        }

        let map_setups: Vec<Wild3MapSetupsForReverse<'a>> = map_setups
            .iter()
            .enumerate()
            .map(|(idx, map_setups)| Wild3MapSetupsForReverse::<'a>::new(idx, map_setups))
            .collect_vec();

        let mass_outbreak_setups: Vec<(usize, Wild3MassOutbreakState)> =
            get_mass_outbreak_setups(&map_setups, &species_data);

        Self {
            arcs,
            map_setups,
            mass_outbreak_setups,
            actions,
            species_data: species_data.clone(),
        }
    }

    pub fn extend_path_for_all_arcs(&self, lvl_path: &LvlPath) -> Vec<EncounterIdxPath> {
        // TODO for caughtMon searcher: filter by wanted_lvl

        self.arcs
            .iter()
            .flat_map(|arc| match *arc {
                EncounterIdxToLvlArc::SlotVanilla => extend_path_for_slot_vanilla(
                    lvl_path,
                    &self.map_setups,
                    &self.species_data,
                    &self.actions,
                ),
                EncounterIdxToLvlArc::MassOutbreakSuccess(_) => {
                    extend_path_for_mass_outbreak(lvl_path, &self.mass_outbreak_setups)
                }
                EncounterIdxToLvlArc::SlotMagnetPullSuccess => extend_path_for_magnet_pull(
                    lvl_path,
                    &self.map_setups,
                    self.species_data.as_ref().unwrap(),
                ),
                EncounterIdxToLvlArc::SlotStaticSuccess => extend_path_for_static(
                    lvl_path,
                    &self.map_setups,
                    self.species_data.as_ref().unwrap(),
                    &self.actions,
                ),
                EncounterIdxToLvlArc::FeebasSuccess => {
                    extend_path_for_feebas(lvl_path, &self.map_setups)
                }
            })
            .collect()
    }
}

fn permit_vanilla_arc(leads: &[Gen3Lead]) -> bool {
    leads
        .iter()
        .any(|lead| *lead != Gen3Lead::Static && *lead != Gen3Lead::MagnetPull)
}

fn permit_feebas_arc(species_data: &Option<SpeciesData>) -> bool {
    match species_data {
        Some(species_data) => species_data.species == Species::Feebas,
        None => false,
    }
}
fn permit_magnet_pull_arc(
    leads: &[Gen3Lead],
    species_data: &Option<SpeciesData>,
    actions: &[Wild3Action],
) -> bool {
    if !actions.contains(&Wild3Action::SweetScentLand) {
        return false;
    }

    match species_data {
        None => false,
        Some(species_data) => species_data.is_steel_type && leads.contains(&Gen3Lead::MagnetPull),
    }
}

fn permit_static_arc(
    leads: &[Gen3Lead],
    species_data: &Option<SpeciesData>,
    actions: &[Wild3Action],
) -> bool {
    if !actions.contains(&Wild3Action::SweetScentLand)
        && !actions.contains(&Wild3Action::SweetScentWater)
    {
        return false;
    }

    match species_data {
        None => false,
        Some(species_data) => species_data.is_electric_type && leads.contains(&Gen3Lead::Static),
    }
}

fn permit_mass_outbreak_warm_arc(
    maps_setups: &[Wild3MapSetups],
    species_data: &Option<SpeciesData>,
) -> bool {
    if let Some(species_data) = species_data {
        maps_setups.iter().any(|map_setup| {
            map_setup
                .map_data
                .mass_outbreaks
                .iter()
                .any(|mass_outbreak| {
                    mass_outbreak.encounter_data.species_data.species == species_data.species
                })
        })
    } else {
        true
    }
}

fn get_mass_outbreak_setups(
    maps_setups_for_rev: &[Wild3MapSetupsForReverse],
    species_data: &Option<SpeciesData>,
) -> Vec<(usize, Wild3MassOutbreakState)> {
    maps_setups_for_rev
        .iter()
        .flat_map(|map_setups_for_rev| {
            if !map_setups_for_rev
                .map_setups
                .actions
                .contains(&Wild3Action::SweetScentLand)
            {
                return vec![];
            }

            map_setups_for_rev
                .map_setups
                .map_data
                .mass_outbreaks
                .iter()
                .filter_map(|mass_outbreak| {
                    if !map_setups_for_rev
                        .map_setups
                        .mass_outbreak_states
                        .contains(&mass_outbreak.id)
                    {
                        return None;
                    }
                    if let Some(species_data) = species_data {
                        if mass_outbreak.encounter_data.species_data.species != species_data.species
                        {
                            return None;
                        }
                    }
                    Some((map_setups_for_rev.map_setups_idx, mass_outbreak.id))
                })
                .collect()
        })
        .collect()
}

fn extend_path_for_mass_outbreak(
    lvl_path: &LvlPath,
    mass_outbreak_setups: &[(usize, Wild3MassOutbreakState)],
) -> Vec<EncounterIdxPath> {
    let mut rng = Pokerng::new(lvl_path.seed);

    if (rng.prev_rand() % 100) >= 50 {
        return vec![];
    }

    mass_outbreak_setups
        .iter()
        .map(|(map_setups_idx, mass_outbreak_state)| {
            EncounterIdxPath::new(
                rng.seed(),
                *map_setups_idx,
                Wild3Action::SweetScentLand,
                EncounterIdxToLvlArc::MassOutbreakSuccess(*mass_outbreak_state),
                lvl_path,
            )
        })
        .collect()
}

fn extend_path_for_slot_vanilla(
    lvl_path: &LvlPath,
    maps_setups_for_rev: &[Wild3MapSetupsForReverse],
    species_data: &Option<SpeciesData>,
    actions: &[Wild3Action],
) -> Vec<EncounterIdxPath> {
    let mut rng = Pokerng::new(lvl_path.seed);

    let encounter_rand = (rng.prev_rand() % 100) as u8; // Encounter slot

    actions
        .iter()
        .flat_map(|action| {
            let encounter_slot =
                EncounterSlot::from_rand(encounter_rand, EncounterSlot::gen3_thresholds(*action));
            let encounter_idx = Wild3EncounterIndex::Slot(encounter_slot);

            maps_setups_for_rev
                .iter()
                .filter_map(move |map_setups_for_rev| {
                    let encounter = map_setups_for_rev
                        .map_setups
                        .map_data
                        .get_encounter(*action, encounter_idx);

                    encounter?;

                    if let Some(species_data) = species_data {
                        if encounter.unwrap().species_data.species != species_data.species {
                            return None;
                        }
                    }

                    Some(EncounterIdxPath::new(
                        rng.seed(),
                        map_setups_for_rev.map_setups_idx,
                        *action,
                        EncounterIdxToLvlArc::SlotVanilla,
                        lvl_path,
                    ))
                })
        })
        .collect()
}

fn extend_path_for_magnet_pull(
    lvl_path: &LvlPath,
    maps_setups_for_rev: &[Wild3MapSetupsForReverse],
    species_data: &SpeciesData,
) -> Vec<EncounterIdxPath> {
    maps_setups_for_rev
        .iter()
        .filter_map(|map_setups_for_rev| {
            let attracted_idxs = &map_setups_for_rev.magnet_pull_attracted_indexes;
            if attracted_idxs.is_empty() {
                return None;
            }

            let mut rng = Pokerng::new(lvl_path.seed);

            let slot_idx = attracted_idxs[rng.prev_rand() as usize % attracted_idxs.len()];

            let slot = &map_setups_for_rev.map_setups.map_data.slots_by_action
                [Wild3Action::SweetScentLand as usize][slot_idx];
            if slot.species_data.species != species_data.species {
                return None;
            }

            let ability_triggered = rng.prev_rand() % 2 == 0;
            if !ability_triggered {
                return None;
            }

            Some(EncounterIdxPath::new(
                rng.seed(),
                map_setups_for_rev.map_setups_idx,
                Wild3Action::SweetScentLand,
                EncounterIdxToLvlArc::SlotMagnetPullSuccess,
                lvl_path,
            ))
        })
        .collect()
}

fn extend_path_for_static(
    lvl_path: &LvlPath,
    maps_setups_for_rev: &[Wild3MapSetupsForReverse],
    species_data: &SpeciesData,
    actions: &[Wild3Action],
) -> Vec<EncounterIdxPath> {
    maps_setups_for_rev
        .iter()
        .flat_map(|map_setups_for_rev| {
            actions.iter().filter_map(|action| {
                if *action != Wild3Action::SweetScentLand && *action != Wild3Action::SweetScentWater
                {
                    return None;
                }

                let attracted_idxs = if *action == Wild3Action::SweetScentLand {
                    &map_setups_for_rev.static_attracted_indexes_land
                } else {
                    &map_setups_for_rev.static_attracted_indexes_water
                };

                if attracted_idxs.is_empty() {
                    return None;
                }

                let mut rng = Pokerng::new(lvl_path.seed);

                let slot_idx = attracted_idxs[rng.prev_rand() as usize % attracted_idxs.len()];

                let slot = &map_setups_for_rev.map_setups.map_data.slots_by_action
                    [*action as usize][slot_idx];
                if slot.species_data.species != species_data.species {
                    return None;
                }

                let ability_triggered = rng.prev_rand() % 2 == 0;
                if !ability_triggered {
                    return None;
                }

                Some(EncounterIdxPath::new(
                    rng.seed(),
                    map_setups_for_rev.map_setups_idx,
                    *action,
                    EncounterIdxToLvlArc::SlotStaticSuccess,
                    lvl_path,
                ))
            })
        })
        .collect()
}

fn extend_path_for_feebas(
    lvl_path: &LvlPath,
    maps_setups_for_rev: &[Wild3MapSetupsForReverse],
) -> Vec<EncounterIdxPath> {
    maps_setups_for_rev
        .iter()
        .filter_map(|map_setups_for_rev| {
            if !map_setups_for_rev
                .map_setups
                .feebas_states
                .contains(&Wild3FeebasState::OnFeebasTile)
            {
                return None;
            }

            let action = map_setups_for_rev
                .map_setups
                .actions
                .iter()
                .find(|action| action.is_fishing())?;

            let mut rng = Pokerng::new(lvl_path.seed);
            let got_feebas = rng.prev_rand() % 100 <= 49;
            if !got_feebas {
                return None;
            }

            Some(EncounterIdxPath::new(
                rng.seed(),
                map_setups_for_rev.map_setups_idx,
                *action,
                EncounterIdxToLvlArc::FeebasSuccess,
                lvl_path,
            ))
        })
        .collect()
}
