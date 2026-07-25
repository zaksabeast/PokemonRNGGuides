use super::LeadAbility;
use super::opts::Gen4StaticOpts;
use crate::Gender;
use crate::gen4::game_logic::GameSpecificLogic;
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;

pub trait PidStrategy<Game: GameSpecificLogic> {
    fn generate_pid(rng: &mut Pokerng, opts: &Gen4StaticOpts) -> u32;
}

pub struct Method1;

impl<Game: GameSpecificLogic> PidStrategy<Game> for Method1 {
    fn generate_pid(rng: &mut Pokerng, _opts: &Gen4StaticOpts) -> u32 {
        let pid_low = rng.rand::<u16>() as u32;
        let pid_high = rng.rand::<u16>() as u32;
        (pid_high << 16) | pid_low
    }
}

pub struct NormalMethodJK;

impl<Game: GameSpecificLogic> PidStrategy<Game> for NormalMethodJK {
    fn generate_pid(rng: &mut Pokerng, opts: &Gen4StaticOpts) -> u32 {
        let buffer: u8 = match opts.lead {
            LeadAbility::CutecharmF => (25 * ((opts.species.gender_ratio() as u32 / 25) + 1)) as u8,
            _ => 0,
        };

        let cute_charm = matches!(opts.lead, LeadAbility::CutecharmF | LeadAbility::CutecharmM)
            && !opts.species.is_fixed_gender();
        let cute_charm_flag = match cute_charm {
            true => Game::max(rng.rand::<u16>(), 3) != 0,
            false => false,
        };

        let nature = match opts.lead {
            LeadAbility::Synchronize(nature) => {
                let is_sync = Game::max(rng.rand::<u16>(), 2) == 0;
                match is_sync {
                    true => nature as u16,
                    false => Game::max(rng.rand::<u16>(), 25),
                }
            }
            _ => Game::max(rng.rand::<u16>(), 25),
        };

        match cute_charm_flag {
            true => buffer as u32 + nature as u32,
            false => {
                let mut pid;
                loop {
                    let pid_low = rng.rand::<u16>() as u32;
                    let pid_high = rng.rand::<u16>() as u32;
                    pid = (pid_high << 16) | pid_low;
                    if pid % 25 == nature as u32 {
                        break;
                    }
                }
                pid
            }
        }
    }
}

pub struct ShinyMethodJK;

fn shiny_pid(rng: &mut Pokerng, tsv: u16) -> u32 {
    let mut low = rng.rand::<u16>() % 8;
    let mut high = rng.rand::<u16>() % 8;

    for i in 3..16 {
        low |= (rng.rand::<u16>() & 1) << i;
    }

    high |= (tsv ^ low) & 0xFFF8;

    ((high as u32) << 16) | (low as u32)
}

impl<Game: GameSpecificLogic> PidStrategy<Game> for ShinyMethodJK {
    fn generate_pid(rng: &mut Pokerng, opts: &Gen4StaticOpts) -> u32 {
        let tsv = opts.tid ^ opts.sid;
        let lead = opts.lead;
        let species = opts.species;

        let cute_charm_active = matches!(lead, LeadAbility::CutecharmF | LeadAbility::CutecharmM)
            && !species.is_fixed_gender();

        let cute_charm_check = |pid: u32| -> bool {
            match lead {
                LeadAbility::CutecharmF => species.gender_from_pid(pid) == Gender::Male,
                LeadAbility::CutecharmM => species.gender_from_pid(pid) == Gender::Female,
                _ => false,
            }
        };

        if cute_charm_active && (Game::max(rng.rand::<u16>(), 3)) != 0 {
            loop {
                let pid = shiny_pid(rng, tsv);
                if cute_charm_check(pid) {
                    break pid;
                }
            }
        } else if let LeadAbility::Synchronize(nature) = lead {
            if (Game::max(rng.rand::<u16>(), 2)) == 0 {
                let nature_value = nature as u32;
                loop {
                    let pid = shiny_pid(rng, tsv);
                    if pid % 25 == nature_value {
                        break pid;
                    }
                }
            } else {
                shiny_pid(rng, tsv)
            }
        } else {
            shiny_pid(rng, tsv)
        }
    }
}
