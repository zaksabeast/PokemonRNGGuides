use crate::{
    Gender, GenderRatio, Nature,
    gen3::{
        Gen3Lead, Wild3SafariPokeblockGenOpt, Wild3SafariPokeblockSearchOpt,
        calculate_nature_from_safari_pokeblock, wild::searcher::PidPath,
    },
    rng::lcrng::Pokerng,
};

#[derive(Default, Debug, PartialEq, Clone, Copy)]
/** right before PickWildMonNature_RandomPickNature or PickWildMonNature_RandomTestSynchro or CreateWildMon_RandomTestCuteCharm */
pub struct NatureGenderPath {
    pub seed: u32,
    pub nature_gender_arc: Ngpa,
    pub pid_path: PidPath,
}

/**
Cc = CuteCharm, Suc=Success, Saf=Safari 80% check, NoBlk=No safari pokeblock, WBlk=With safari pokeblock, Sync=Synchronize
It's not possible to split the nature_gender step into 2 steps (nature then gender), because the stopping criteria for PID
reroll depends on the gender in the Cute Charm case.
*/
#[derive(Default, Debug, Clone, Copy, PartialEq)]
#[allow(non_camel_case_types)]
pub enum NatureGenderToPidArc {
    #[default]
    Vanilla,
    CcSuc,
    CcSuc_SafSuc_NoBlk,
    CcSuc_SafSuc_WBlk,
    CcSuc_SafFail,
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
type Ngpa = NatureGenderToPidArc;

impl NatureGenderToPidArc {
    pub fn is_in_safari_map(&self) -> bool {
        matches!(
            self,
            Ngpa::CcSuc_SafSuc_NoBlk
                | Ngpa::CcSuc_SafSuc_WBlk
                | Ngpa::CcSuc_SafFail
                | Ngpa::CcFail_SafSuc_NoBlk
                | Ngpa::CcFail_SafSuc_WBlk
                | Ngpa::CcFail_SafFail
                | Ngpa::SafSuc_NoBlk
                | Ngpa::SafSuc_WBlk
                | Ngpa::SafFail
                | Ngpa::SafFail_SyncSuc
                | Ngpa::SafFail_SyncFail
        )
    }
    pub fn is_safari_success(&self) -> bool {
        matches!(
            self,
            Ngpa::CcSuc_SafSuc_NoBlk
                | Ngpa::CcSuc_SafSuc_WBlk
                | Ngpa::CcFail_SafSuc_NoBlk
                | Ngpa::CcFail_SafSuc_WBlk
                | Ngpa::SafSuc_NoBlk
                | Ngpa::SafSuc_WBlk
        )
    }
    pub fn is_safari_fail(&self) -> bool {
        self.is_in_safari_map() && !self.is_safari_success()
    }
    pub fn uses_safari_pokeblock(&self) -> bool {
        matches!(
            self,
            Ngpa::CcSuc_SafSuc_WBlk | Ngpa::CcFail_SafSuc_WBlk | Ngpa::SafSuc_WBlk
        )
    }
    pub fn has_synchronize_lead(&self) -> bool {
        matches!(
            self,
            Ngpa::SafFail_SyncSuc | Ngpa::SafFail_SyncFail | Ngpa::SyncSuc | Ngpa::SyncFail
        )
    }
    pub fn is_synchronize_success(&self) -> bool {
        matches!(self, Ngpa::SafFail_SyncSuc | Ngpa::SyncSuc)
    }
    pub fn is_synchronize_fail(&self) -> bool {
        self.has_synchronize_lead() && !self.is_synchronize_success()
    }
    pub fn has_cute_charm_lead(&self) -> bool {
        matches!(
            self,
            Ngpa::CcSuc
                | Ngpa::CcSuc_SafSuc_NoBlk
                | Ngpa::CcSuc_SafSuc_WBlk
                | Ngpa::CcSuc_SafFail
                | Ngpa::CcFail
                | Ngpa::CcFail_SafSuc_NoBlk
                | Ngpa::CcFail_SafSuc_WBlk
                | Ngpa::CcFail_SafFail
        )
    }
    pub fn is_cute_charm_success(&self) -> bool {
        matches!(
            self,
            Ngpa::CcSuc | Ngpa::CcSuc_SafSuc_NoBlk | Ngpa::CcSuc_SafSuc_WBlk | Ngpa::CcSuc_SafFail
        )
    }

    pub fn is_cute_charm_fail(&self) -> bool {
        self.has_cute_charm_lead() && !self.is_cute_charm_success()
    }
}

pub enum Wild3InSafariMapStatus {
    Never,
    Sometimes,
    Always,
}

pub struct NatureGenderSeedGenerator {
    arcs: Vec<Ngpa>,
    permit_all: bool,
    encounter_gender_ratio: GenderRatio,
    leads: Vec<Gen3Lead>,
    considered_safari_pokeblocks: Wild3SafariPokeblockSearchOpt,
}

impl NatureGenderSeedGenerator {
    pub fn new(
        leads: &[Gen3Lead],
        encounter_gender_ratio: GenderRatio,
        wanted_nature: Option<Nature>,
        wanted_gender: Option<Gender>,
        safari_status: Wild3InSafariMapStatus,
        considered_safari_pokeblocks: Wild3SafariPokeblockSearchOpt,
    ) -> Self {
        let mut arcs: Vec<Ngpa> = vec![];

        let mut permit_all = true;

        if permit_vanilla_arc(leads) {
            if matches!(
                safari_status,
                Wild3InSafariMapStatus::Sometimes | Wild3InSafariMapStatus::Never
            ) {
                arcs.push(Ngpa::Vanilla)
            }
            if matches!(
                safari_status,
                Wild3InSafariMapStatus::Sometimes | Wild3InSafariMapStatus::Always
            ) {
                arcs.push(Ngpa::SafFail);

                if !matches!(
                    considered_safari_pokeblocks,
                    Wild3SafariPokeblockSearchOpt::Specific(_)
                ) {
                    arcs.push(Ngpa::SafSuc_NoBlk);
                }

                if considered_safari_pokeblocks != Wild3SafariPokeblockSearchOpt::None {
                    arcs.push(Ngpa::SafSuc_WBlk);
                }
            }
        }

        if permit_synchronize_arc(leads) {
            if matches!(
                safari_status,
                Wild3InSafariMapStatus::Sometimes | Wild3InSafariMapStatus::Never
            ) {
                arcs.push(Ngpa::SyncSuc);
                arcs.push(Ngpa::SyncFail);
            }
            if matches!(
                safari_status,
                Wild3InSafariMapStatus::Sometimes | Wild3InSafariMapStatus::Always
            ) {
                arcs.push(Ngpa::SafFail_SyncSuc);
                arcs.push(Ngpa::SafFail_SyncFail);
            }

            if !has_all_synchronize_natures(leads, wanted_nature) {
                permit_all = false;
            }
        }

        if encounter_gender_ratio.has_multiple_genders() && permit_cute_charm_arc_type(leads) {
            if matches!(
                safari_status,
                Wild3InSafariMapStatus::Sometimes | Wild3InSafariMapStatus::Never
            ) {
                arcs.push(Ngpa::CcFail);
                arcs.push(Ngpa::CcSuc);
            }

            if matches!(
                safari_status,
                Wild3InSafariMapStatus::Sometimes | Wild3InSafariMapStatus::Always
            ) {
                arcs.push(Ngpa::CcSuc_SafFail);
                arcs.push(Ngpa::CcFail_SafFail);

                if !matches!(
                    considered_safari_pokeblocks,
                    Wild3SafariPokeblockSearchOpt::Specific(_)
                ) {
                    arcs.push(Ngpa::CcSuc_SafSuc_NoBlk);
                    arcs.push(Ngpa::CcFail_SafSuc_NoBlk);
                }

                if considered_safari_pokeblocks != Wild3SafariPokeblockSearchOpt::None {
                    arcs.push(Ngpa::CcFail_SafSuc_WBlk);
                    arcs.push(Ngpa::CcSuc_SafSuc_WBlk);
                }
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
            considered_safari_pokeblocks,
        }
    }

    pub fn extend_path_for_all_arcs(&self, pid_path: &PidPath) -> Vec<NatureGenderPath> {
        self.arcs
            .iter()
            .flat_map(|arc| {
                if !self.permit_all {
                    if arc.is_synchronize_success()
                        && !permit_synchronize_success_arc_for_path(&self.leads, pid_path)
                    {
                        return vec![];
                    }

                    if arc.is_cute_charm_success()
                        && !permit_cute_charm_success_arc_for_path(
                            &self.leads,
                            self.encounter_gender_ratio,
                            pid_path,
                        )
                    {
                        return vec![];
                    }
                }

                extend_path_for_arc(
                    self.encounter_gender_ratio,
                    self.considered_safari_pokeblocks,
                    pid_path,
                    *arc,
                )
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

// Ex: The path states that the nature is Adamant and that Synchronize was a success. If lead can't be Synchronize Adamant, then that path is invalid.
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

// Ex: The path states that the gender is Male and that Cute Charm was a success. If lead can't be Cute Charm Female, then that path is invalid.
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

pub fn create_pokeblock_gen_opt(
    pokeblock_search_opt: Wild3SafariPokeblockSearchOpt,
    wanted_nature: Nature,
) -> Wild3SafariPokeblockGenOpt {
    match pokeblock_search_opt {
        Wild3SafariPokeblockSearchOpt::Specific(pokeblock) => {
            Wild3SafariPokeblockGenOpt::Specific(pokeblock)
        }
        _ => Wild3SafariPokeblockGenOpt::ForSearching {
            wanted_nature,
            consider_all_safari_pokeblocks: pokeblock_search_opt
                == Wild3SafariPokeblockSearchOpt::All,
        },
    }
}

fn extend_path_for_arc(
    encounter_gender_ratio: GenderRatio,
    considered_safari_pokeblocks: Wild3SafariPokeblockSearchOpt,
    pid_path: &PidPath, // pid_path.seed is the AdvBefore at for last CreateMonWithGenderNatureLetter_pidlow
    arc: Ngpa,
) -> Vec<NatureGenderPath> {
    let mut nature_gender_seeds: Vec<u32> = vec![];

    let mut rng = Pokerng::new(pid_path.seed);
    //rng.rand::<u16>(); // put in a state such as rng.prev_u16 returns pid_high of previous iteration.

    let pid = pid_path.pid();

    let resulting_nature = Nature::from_pid(pid);
    let resulting_gender = encounter_gender_ratio.gender_from_pid(pid);

    let does_safari_pokeblock_give_wanted_nature = |rng_nat: &mut Pokerng| -> bool {
        rng_nat.reverse_jump(300);

        let mut copy_rng = *rng_nat;
        let pokeblock_gen_opt =
            create_pokeblock_gen_opt(considered_safari_pokeblocks, resulting_nature);
        let (pokeblock_nature, _) =
            calculate_nature_from_safari_pokeblock(&mut copy_rng, &pokeblock_gen_opt);

        pokeblock_nature == resulting_nature
    };

    let is_nature_correct = |rng_nat: &mut Pokerng| -> bool {
        if arc.is_synchronize_success() {
            true
        } else if arc.uses_safari_pokeblock() {
            does_safari_pokeblock_give_wanted_nature(rng_nat)
        } else {
            let pick_wild_mon_nature: Nature = ((rng_nat.prev_rand() % 25) as u8).into();
            pick_wild_mon_nature == resulting_nature
        }
    };

    let is_synchronize_correct = |rng_nat: &mut Pokerng| -> bool {
        if arc.is_synchronize_success() {
            (rng_nat.prev_rand() % 2) == 0
        } else if arc.is_synchronize_fail() {
            (rng_nat.prev_rand() % 2) == 1
        } else {
            true
        }
    };

    let is_safari_correct = |rng_nat: &mut Pokerng| -> bool {
        if arc.is_safari_success() {
            (rng_nat.prev_rand() % 100) < 80
        } else if arc.is_safari_fail() {
            (rng_nat.prev_rand() % 100) >= 80
        } else {
            true
        }
    };

    let is_cute_charm_correct = |rng_nat: &mut Pokerng| -> bool {
        if arc.is_cute_charm_success() {
            (rng_nat.prev_rand() % 3) != 0
        } else if arc.is_cute_charm_fail() {
            (rng_nat.prev_rand() % 3) == 0
        } else {
            true
        }
    };

    // E D C B A 9 8 7 6 5 4 3 2 1 0 : reverse advances (pid_path.seed is at 0)
    //   x       x             x     : x represents when is_nature_correct() && ... returns true
    //       y-y                     : y-y represents a PID that returns the same nature as pid_path
    // If the nature is generated at adv 9 or 2, then Pokemon PID will reroll until reaching adv 0 (pid_path.seed). We want those results.
    // If the nature is generated at D, then Pokemon PID will reroll until reaching adv (B-A), which means adv 0 is never reached. We don't want that result.
    // The strategy is to add results and stop the loop when we reach a PID that returns the same nature as pid_path.
    // In the case of Cute Charm, the logic is the same, but taking into account gender as well.

    loop {
        let mut rng_nat = rng;

        // This checks ensures that the RNG state will make the code execute the same way as the arc predicted.
        if is_nature_correct(&mut rng_nat)
            && is_synchronize_correct(&mut rng_nat)
            && is_safari_correct(&mut rng_nat)
            && is_cute_charm_correct(&mut rng_nat)
        {
            nature_gender_seeds.push(rng_nat.seed());
        }

        // Limitation: Wild5 are not supported.
        let mut rng_pid = rng;
        let prev_pid = ((rng_pid.prev_rand() as u32) << 16) | (rng_pid.prev_rand() as u32);
        let prev_nature = Nature::from_pid(prev_pid);

        if !arc.is_cute_charm_success() {
            if prev_nature == resulting_nature {
                break; // All further seeds won't reach pid_path. 
            }
        } else {
            let prev_gender = encounter_gender_ratio.gender_from_pid(prev_pid);

            if prev_nature == resulting_nature && prev_gender == resulting_gender {
                break; // All further seeds won't reach pid_path. 
            }
        }

        rng.prev_rand();
        rng.prev_rand();
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
