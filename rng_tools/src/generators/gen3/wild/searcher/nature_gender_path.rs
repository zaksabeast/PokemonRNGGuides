use crate::{
    Gender, GenderRatio, Nature,
    gen3::{Gen3Lead, wild::searcher::PidPath},
    rng::lcrng::Pokerng,
};

#[derive(Default, Debug, PartialEq, Clone, Copy)]
/** right before PickWildMonNature_RandomPickNature or PickWildMonNature_RandomTestSynchro or CreateWildMon_RandomTestCuteCharm */
pub struct NatureGenderPath {
    pub seed: u32,
    pub nature_gender_arc: NatureGenderToPidArc,
    pub pid_path: PidPath,
}

#[derive(Default, Debug, Clone, Copy, PartialEq)]
pub enum NatureGenderToPidArc {
    #[default]
    Vanilla,
    SynchronizeSuccess,
    SynchronizeFailure,
    CuteCharmSuccess,
    CuteCharmFailure,
}

pub struct NatureGenderSeedGenerator {
    arcs: Vec<NatureGenderToPidArc>,
    permit_all: bool,
    encounter_gender_ratio: GenderRatio,
    leads: Vec<Gen3Lead>,
}

impl NatureGenderSeedGenerator {
    pub fn new(
        leads: &[Gen3Lead],
        encounter_gender_ratio: GenderRatio,
        wanted_nature: Option<Nature>,
        wanted_gender: Option<Gender>,
    ) -> Self {
        let mut arcs: Vec<NatureGenderToPidArc> = vec![];

        let mut permit_all = true;

        if permit_vanilla_arc(leads) {
            arcs.push(NatureGenderToPidArc::Vanilla);
        }
        if permit_synchronize_arc(leads) {
            arcs.push(NatureGenderToPidArc::SynchronizeSuccess);
            arcs.push(NatureGenderToPidArc::SynchronizeFailure);

            if !has_all_synchronize_natures(leads, wanted_nature) {
                permit_all = false;
            }
        }
        if encounter_gender_ratio.has_multiple_genders() && permit_cute_charm_arc_type(leads) {
            arcs.push(NatureGenderToPidArc::CuteCharmFailure);
            arcs.push(NatureGenderToPidArc::CuteCharmSuccess);

            if !has_all_cute_charm_genders(leads, wanted_gender) {
                permit_all = false;
            }
        }

        Self {
            arcs,
            permit_all,
            encounter_gender_ratio,
            leads: leads.to_vec(),
        }
    }

    pub fn extend_path_for_all_arcs(&self, pid_path: &PidPath) -> Vec<NatureGenderPath> {
        self.arcs
            .iter()
            .flat_map(|arc| {
                if !self.permit_all {
                    if *arc == NatureGenderToPidArc::SynchronizeSuccess
                        && !permit_synchronize_success_arc_for_path(&self.leads, pid_path)
                    {
                        return vec![];
                    }

                    if *arc == NatureGenderToPidArc::CuteCharmSuccess
                        && !permit_cute_charm_success_arc_for_path(
                            &self.leads,
                            self.encounter_gender_ratio,
                            pid_path,
                        )
                    {
                        return vec![];
                    }
                }

                extend_path_for_arc(self.encounter_gender_ratio, pid_path, *arc)
            })
            .collect()
    }
}

fn has_all_synchronize_natures(leads: &[Gen3Lead], wanted_nature: Option<Nature>) -> bool {
    let needed_natures = match wanted_nature {
        None => (0..=24u8)
            .map(|nat_u8| nat_u8.into())
            .collect::<Vec<Nature>>(),
        Some(wanted_nature) => {
            vec![wanted_nature]
        }
    };

    needed_natures.into_iter().all(|nat| {
        leads.iter().any(|lead| match *lead {
            Gen3Lead::Synchronize(sync_nat) => sync_nat == nat,
            _ => false,
        })
    })
}

fn has_all_cute_charm_genders(leads: &[Gen3Lead], wanted_gender: Option<Gender>) -> bool {
    // this function is only called if encounter_gender_ratio has multiple genders
    let needed_cute_charm_genders = match wanted_gender {
        None => vec![Gender::Male, Gender::Female],
        Some(wanted_gender) => {
            if matches!(wanted_gender, Gender::Male) {
                vec![Gender::Female]
            } else {
                vec![Gender::Male]
            }
        }
    };
    needed_cute_charm_genders.into_iter().all(|gender| {
        leads.iter().any(|lead| match *lead {
            Gen3Lead::CuteCharm(cc_gender) => cc_gender == gender,
            _ => false,
        })
    })
}

fn permit_vanilla_arc(leads: &[Gen3Lead]) -> bool {
    leads
        .iter()
        .any(|lead| !matches!(*lead, Gen3Lead::CuteCharm(_) | Gen3Lead::Synchronize(_)))
}

fn permit_synchronize_arc(leads: &[Gen3Lead]) -> bool {
    leads
        .iter()
        .any(|lead| matches!(*lead, Gen3Lead::Synchronize(_)))
}

fn permit_synchronize_success_arc_for_path(leads: &[Gen3Lead], pid_path: &PidPath) -> bool {
    let encounter_nature = pid_path.nature();
    leads.iter().any(|lead| match *lead {
        Gen3Lead::Synchronize(nat) => nat == encounter_nature,
        _ => false,
    })
}

fn permit_cute_charm_arc_type(leads: &[Gen3Lead]) -> bool {
    leads
        .iter()
        .any(|lead| matches!(*lead, Gen3Lead::CuteCharm(_)))
}

fn permit_cute_charm_success_arc_for_path(
    leads: &[Gen3Lead],
    encounter_gender_ratio: GenderRatio,
    pid_path: &PidPath,
) -> bool {
    let encounter_gender = encounter_gender_ratio.gender_from_pid(pid_path.pid());
    leads.iter().any(|lead| match *lead {
        Gen3Lead::CuteCharm(gender) => encounter_gender != gender,
        _ => false,
    })
}

fn extend_path_for_arc(
    encounter_gender_ratio: GenderRatio,
    pid_path: &PidPath,
    arc: NatureGenderToPidArc,
) -> Vec<NatureGenderPath> {
    let mut nature_gender_seeds: Vec<u32> = vec![];

    let mut rng = Pokerng::new(pid_path.seed);
    //rng.rand::<u16>(); // put in a state such as rng.prev_u16 returns pid_high of previous iteration.

    let pid = pid_path.pid();

    let resulting_nature = Nature::from_pid(pid);
    let resulting_gender = encounter_gender_ratio.gender_from_pid(pid);

    match arc {
        NatureGenderToPidArc::CuteCharmSuccess => loop {
            let mut rng_nat = rng;
            let random_selected_correct_nature = {
                let pick_wild_mon_nature: Nature = ((rng_nat.prev_rand() % 25) as u8).into();
                pick_wild_mon_nature == resulting_nature
            };
            let cute_charm_was_success = (rng_nat.prev_rand() % 3) != 0;
            if random_selected_correct_nature && cute_charm_was_success {
                nature_gender_seeds.push(rng_nat.seed());
            }

            let mut rng_pid = rng;
            let prev_pid = ((rng_pid.prev_rand() as u32) << 16) | (rng_pid.prev_rand() as u32);
            let prev_nature = Nature::from_pid(prev_pid);
            let prev_gender = encounter_gender_ratio.gender_from_pid(prev_pid);

            if prev_nature == resulting_nature && prev_gender == resulting_gender {
                break;
            }

            rng.prev_rand();
            rng.prev_rand();
        },
        _ => {
            // E D C B A 9 8 7 6 5 4 3 2 1 0 : reverse advances (pid_path.seed is at 0)
            //   x       x             x     : RandomPickNature is nature
            //       y-y                     : PID is nature
            // If RandomPickNature is D, then Pokemon is generated with PID from B-A, which means advance 0 is never reached.
            // If RandomPickNature is 9 or 2, then Pokemon is generated with PID from 0 (pid_path.seed).

            loop {
                let mut rng_nat = rng;
                let random_selected_correct_nature = match arc {
                    NatureGenderToPidArc::SynchronizeSuccess => true,
                    _ => {
                        let pick_wild_mon_nature: Nature =
                            ((rng_nat.prev_rand() % 25) as u8).into();
                        pick_wild_mon_nature == resulting_nature
                    }
                };

                let ability_success_is_correct = match arc {
                    NatureGenderToPidArc::SynchronizeSuccess => (rng_nat.prev_rand() % 2) == 0,
                    NatureGenderToPidArc::SynchronizeFailure => (rng_nat.prev_rand() % 2) == 1,
                    NatureGenderToPidArc::CuteCharmFailure => (rng_nat.prev_rand() % 3) == 0,
                    _ => true,
                };

                if random_selected_correct_nature && ability_success_is_correct {
                    nature_gender_seeds.push(rng_nat.seed());
                }

                let mut rng_pid = rng;
                let prev_pid = ((rng_pid.prev_rand() as u32) << 16) | (rng_pid.prev_rand() as u32);
                let prev_nature = Nature::from_pid(prev_pid);

                if prev_nature == resulting_nature {
                    break;
                }

                rng.prev_rand();
                rng.prev_rand();
            }
        }
    }

    nature_gender_seeds
        .into_iter()
        .map(|seed| NatureGenderPath {
            seed,
            nature_gender_arc: arc,
            pid_path: *pid_path,
        })
        .collect()
}
