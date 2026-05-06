use crate::{
    Gender, GenderRatio, Nature,
    gen3::{Gen3Lead, Wild3SafariPokeblock, pick_wild_mon_nature_safari, wild::searcher::PidPath},
    rng::lcrng::Pokerng,
};

#[derive(Default, Debug, PartialEq, Clone, Copy)]
/** right before PickWildMonNature_RandomPickNature or PickWildMonNature_RandomTestSynchro or CreateWildMon_RandomTestCuteCharm */
pub struct NatureGenderPath {
    pub seed: u32,
    pub nature_gender_arc: Nga,
    pub pid_path: PidPath,
}

#[derive(Default, Debug, Clone, Copy, PartialEq)]
#[allow(non_camel_case_types)]
pub enum Nga {
    #[default]
    Vanilla,
    CcSuc,
    CcSuc_SafSuc_NoBlk,
    CcSuc_SafSuc_WBlk,
    CcSuc_SafFail, // Failure is for the Random() < 80
    CcFail,
    CcFail_SafSuc_NoBlk,
    CcFail_SafSuc_WBlk,
    CcFail_SafFail,
    SafSuc_NoBlk,
    SafSuc_WBlk,
    SafFail,
    SafFail_SyncSuc,
    SafFail_SyncFail,
    SyncSuc,
    SyncFail,
}

pub enum SafariStatus {
    Always,
    Some,
    Never,
}

pub struct NatureGenderSeedGenerator {
    arcs: Vec<Nga>,
    permit_all: bool,
    encounter_gender_ratio: GenderRatio,
    leads: Vec<Gen3Lead>,
    safari_status: SafariStatus,
}

impl NatureGenderSeedGenerator {
    pub fn new(
        leads: &[Gen3Lead],
        encounter_gender_ratio: GenderRatio,
        wanted_nature: Option<Nature>,
        wanted_gender: Option<Gender>,
        safari_status: SafariStatus,
    ) -> Self {
        let mut arcs: Vec<Nga> = vec![];

        let mut permit_all = true;

        if permit_vanilla_arc(leads) {
            if matches!(safari_status, SafariStatus::Some | SafariStatus::Never) {
                arcs.push(Nga::Vanilla)
            }
            if matches!(safari_status, SafariStatus::Some | SafariStatus::Always) {
                arcs.push(Nga::SafSuc_NoBlk);
                arcs.push(Nga::SafSuc_WBlk);
                arcs.push(Nga::SafFail);
            }
        }

        if permit_synchronize_arc(leads) {
            if matches!(safari_status, SafariStatus::Some | SafariStatus::Never) {
                arcs.push(Nga::SyncSuc);
                arcs.push(Nga::SyncFail);
            }
            if matches!(safari_status, SafariStatus::Some | SafariStatus::Always) {
                arcs.push(Nga::SafFail_SyncSuc);
                arcs.push(Nga::SafFail_SyncFail);
            }

            if !has_all_synchronize_natures(leads, wanted_nature) {
                permit_all = false;
            }
        }

        if encounter_gender_ratio.has_multiple_genders() && permit_cute_charm_arc_type(leads) {
            if matches!(safari_status, SafariStatus::Some | SafariStatus::Never) {
                arcs.push(Nga::CcFail);
                arcs.push(Nga::CcSuc);
            }
            if matches!(safari_status, SafariStatus::Some | SafariStatus::Always) {
                arcs.push(Nga::CcSuc_SafSuc_NoBlk);
                arcs.push(Nga::CcSuc_SafSuc_WBlk);
                arcs.push(Nga::CcSuc_SafFail);
                arcs.push(Nga::CcFail_SafSuc_NoBlk);
                arcs.push(Nga::CcFail_SafSuc_WBlk);
                arcs.push(Nga::CcFail_SafFail);
            }

            if !has_all_cute_charm_genders(leads, wanted_gender) {
                permit_all = false;
            }
        }

        Self {
            arcs,
            permit_all,
            encounter_gender_ratio,
            leads: leads.to_vec(),
            safari_status,
        }
    }

    pub fn extend_path_for_all_arcs(&self, pid_path: &PidPath) -> Vec<NatureGenderPath> {
        self.arcs
            .iter()
            .flat_map(|arc| {
                if !self.permit_all {
                    if matches!(*arc, Nga::SyncSuc | Nga::SafFail_SyncSuc)
                        && !permit_synchronize_success_arc_for_path(&self.leads, pid_path)
                    {
                        return vec![];
                    }

                    if matches!(
                        *arc,
                        Nga::CcSuc
                            | Nga::CcSuc_SafSuc_NoBlk
                            | Nga::CcSuc_SafSuc_WBlk
                            | Nga::CcSuc_SafFail
                    ) && !permit_cute_charm_success_arc_for_path(
                        &self.leads,
                        self.encounter_gender_ratio,
                        pid_path,
                    ) {
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
    arc: Nga,
) -> Vec<NatureGenderPath> {
    let mut nature_gender_seeds: Vec<u32> = vec![];

    let mut rng = Pokerng::new(pid_path.seed);
    //rng.rand::<u16>(); // put in a state such as rng.prev_u16 returns pid_high of previous iteration.

    let pid = pid_path.pid();

    let resulting_nature = Nature::from_pid(pid);
    let resulting_gender = encounter_gender_ratio.gender_from_pid(pid);

    let safari_success = |rng_nat: &mut Pokerng| -> bool {
        for _ in 0..576 {
            rng_nat.prev_rand();
        }
        let mut copy_rng = rng_nat.clone();
        let pokeblock = Wild3SafariPokeblock::FromNature {
            wanted_nature: resulting_nature,
            flavor_count: 3, //NO_PROD
        };
        let res = pick_wild_mon_nature_safari(&mut copy_rng, &Some(pokeblock));

        match res {
            Some((nature, _)) => nature == resulting_nature,
            _ => false,
        }
    };

    match arc {
        Nga::Vanilla
        | Nga::CcFail
        | Nga::CcFail_SafSuc_NoBlk
        | Nga::CcFail_SafSuc_WBlk
        | Nga::CcFail_SafFail
        | Nga::SafSuc_NoBlk
        | Nga::SafSuc_WBlk
        | Nga::SafFail
        | Nga::SafFail_SyncSuc
        | Nga::SafFail_SyncFail
        | Nga::SyncSuc
        | Nga::SyncFail => {
            // E D C B A 9 8 7 6 5 4 3 2 1 0 : reverse advances (pid_path.seed is at 0)
            //   x       x             x     : RandomPickNature is nature
            //       y-y                     : PID is nature
            // If RandomPickNature is D, then Pokemon is generated with PID from B-A, which means advance 0 is never reached.
            // If RandomPickNature is 9 or 2, then Pokemon is generated with PID from 0 (pid_path.seed).

            loop {
                let mut rng_nat = rng;

                // 3 possible methods: synchronize, pokeblock, random % 25

                // This checks that the method gives the wanted result.
                let random_selected_correct_nature = match arc {
                    Nga::SyncSuc | Nga::SafFail_SyncSuc => true,
                    Nga::SafSuc_WBlk | Nga::CcFail_SafSuc_WBlk => safari_success(&mut rng_nat),
                    _ => {
                        let pick_wild_mon_nature: Nature =
                            ((rng_nat.prev_rand() % 25) as u8).into();
                        pick_wild_mon_nature == resulting_nature
                    }
                };

                // This checks that the wanted method was choosen.
                // Order: Synchronize -> Safari -> CuteCharm

                let synchro_is_correct = match arc {
                    Nga::SyncSuc | Nga::SafFail_SyncSuc => (rng_nat.prev_rand() % 2) == 0,
                    Nga::SyncFail | Nga::SafFail_SyncFail => (rng_nat.prev_rand() % 2) == 1,
                    _ => true,
                };

                let safari_is_correct = match arc {
                    Nga::CcFail_SafSuc_NoBlk
                    | Nga::CcFail_SafSuc_WBlk
                    | Nga::SafSuc_NoBlk
                    | Nga::SafSuc_WBlk => (rng_nat.prev_rand() % 100) < 80,
                    Nga::CcFail_SafFail
                    | Nga::SafFail
                    | Nga::SafFail_SyncSuc
                    | Nga::SafFail_SyncFail => (rng_nat.prev_rand() % 100) >= 80,
                    _ => true,
                };

                let cute_charm_is_correct = match arc {
                    Nga::CcFail
                    | Nga::CcFail_SafSuc_NoBlk
                    | Nga::CcFail_SafSuc_WBlk
                    | Nga::CcFail_SafFail => (rng_nat.prev_rand() % 3) == 0,
                    _ => true, // CcSuc is in another function
                };

                if random_selected_correct_nature
                    && synchro_is_correct
                    && safari_is_correct
                    && cute_charm_is_correct
                {
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
        Nga::CcSuc | Nga::CcSuc_SafSuc_NoBlk | Nga::CcSuc_SafSuc_WBlk | Nga::CcSuc_SafFail => {
            loop {
                let mut rng_nat = rng;

                let random_selected_correct_nature = match arc {
                    Nga::CcSuc_SafSuc_WBlk => safari_success(&mut rng_nat),
                    _ => {
                        let pick_wild_mon_nature: Nature =
                            ((rng_nat.prev_rand() % 25) as u8).into();
                        pick_wild_mon_nature == resulting_nature
                    }
                };

                let safari_is_correct = match arc {
                    Nga::CcSuc_SafSuc_NoBlk | Nga::CcSuc_SafSuc_WBlk => {
                        (rng_nat.prev_rand() % 100) < 80
                    }
                    Nga::CcSuc_SafFail => (rng_nat.prev_rand() % 100) >= 80,
                    _ => true,
                };

                let cute_charm_was_success = (rng_nat.prev_rand() % 3) != 0;

                if random_selected_correct_nature && safari_is_correct && cute_charm_was_success {
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
