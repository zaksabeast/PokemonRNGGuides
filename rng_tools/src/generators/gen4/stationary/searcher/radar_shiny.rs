use super::opts::Static4LeadInput;
use crate::gen4::LeadAbility;
use crate::gen4::game_logic::{DpptLogic, GameSpecificLogic};
use crate::gen4::stationary::searcher::base_state::BaseStatic4State;
use crate::rng::lcrng::Pokerng;
use crate::rng::{GetRand, Rng};
use crate::{Gender, Ivs, Nature, Species};

fn shiny_pid_rev<R: Rng + GetRand<u16>>(rng: &mut R, tsv: u16) -> u32 {
    let mut low: u16 = 0;
    for j in (3..=15).rev() {
        low |= (rng.rand::<u16>() % 2) << j;
    }
    let mut high = rng.rand::<u16>() % 8;
    low |= rng.rand::<u16>() % 8;
    high |= (low ^ tsv) & 0xfff8;
    ((high as u32) << 16) | (low as u32)
}

pub fn get_radar_shiny_states(
    lead: Static4LeadInput,
    species: Species,
    _min_level: u8,
    max_level: u8,
    tid: u16,
    sid: u16,
    ivs: Ivs,
    seed: u32,
) -> Vec<BaseStatic4State> {
    if lead == Static4LeadInput::Pressure {
        return vec![];
    }

    let tsv = tid ^ sid;
    let mut rng = Pokerng::new(seed).reverse();

    let cute_charm = matches!(
        lead,
        Static4LeadInput::CutecharmF | Static4LeadInput::CutecharmM
    ) && !species.is_fixed_gender();

    let cute_charm_check = |pid: u32| -> bool {
        match lead {
            Static4LeadInput::CutecharmF => species.gender_from_pid(pid) == Gender::Male,
            Static4LeadInput::CutecharmM => species.gender_from_pid(pid) == Gender::Female,
            _ => false,
        }
    };

    let pid = shiny_pid_rev(&mut rng, tsv);
    let nature_rand = (pid % 25) as u16;
    let nature = Nature::from(nature_rand as u8);

    let out_lead = match lead {
        Static4LeadInput::CutecharmF => LeadAbility::CutecharmF,
        Static4LeadInput::CutecharmM => LeadAbility::CutecharmM,
        Static4LeadInput::Synchronize => LeadAbility::Synchronize(nature),
        _ => LeadAbility::None,
    };

    let mut states = Vec::new();

    if lead == Static4LeadInput::Synchronize || cute_charm {
        let gender_threshold = species.gender_ratio() as u32;
        let gender = (pid & 0xff) < gender_threshold;

        loop {
            let mut test = rng;
            let valid = if lead == Static4LeadInput::Synchronize {
                DpptLogic::max(test.rand::<u16>(), 2) == 0
            } else {
                DpptLogic::max(test.rand::<u16>(), 3) != 0 && cute_charm_check(pid)
            };

            if valid {
                let origin_seed = test.rand::<u32>();
                states.push(BaseStatic4State::new(
                    origin_seed,
                    species,
                    nature,
                    max_level,
                    pid,
                    tid,
                    sid,
                    ivs,
                    out_lead,
                    0,
                ));
            }

            let hunt_pid = shiny_pid_rev(&mut rng, tsv);
            let hunt_nature = (hunt_pid % 25) as u16;
            let hunt_gender = (hunt_pid & 0xff) < gender_threshold;

            if cute_charm && gender == hunt_gender {
                break;
            }
            if hunt_nature == nature_rand {
                break;
            }
        }
    } else {
        let origin_seed = rng.rand::<u32>();
        states.push(BaseStatic4State::new(
            origin_seed,
            species,
            nature,
            max_level,
            pid,
            tid,
            sid,
            ivs,
            out_lead,
            0,
        ));
    }

    states
}
