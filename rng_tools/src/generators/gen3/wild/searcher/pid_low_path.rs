use arrayvec::ArrayVec;

use crate::{
    Ivs,
    gen3::{
        IvPath, reverse_find_iv_paths_from_ivs,
        wild::{
            passes_pid_filter,
            searcher::{FindPidPathsOptions, IvFromStartArc, PidPath, PidToIvArc},
        },
    },
    rng::{Rng, lcrng::Pokerng},
};

#[derive(Default, PartialEq, Debug, Clone, Copy)]
/** vblanks for ivs are not yet determined */
pub struct PidLowPath {
    /** seed right before pid_low */
    pub seed: u32,
    pub pid_low_to_iv_arc: PidLowToIvArc,
}

impl PidLowPath {
    pub fn pid(&self) -> u32 {
        let mut rng = Pokerng::new(self.seed);
        let pid_low = rng.rand::<u16>() as u32;

        if self.pid_low_to_iv_arc == PidLowToIvArc::WithVBlank {
            rng.rand::<u16>();
        }
        pid_low + ((rng.rand::<u16>() as u32) << 16)
    }
    pub fn seed_after_pid_high(&self) -> Pokerng {
        let mut rng = Pokerng::new(self.seed);
        rng.rand::<u16>();

        if self.pid_low_to_iv_arc == PidLowToIvArc::WithVBlank {
            rng.rand::<u16>();
        }
        rng.rand::<u16>();
        rng
    }
    pub fn from_iv_path(iv_path: &IvPath) -> Self {
        Self {
            seed: iv_path.seed,
            pid_low_to_iv_arc: match iv_path.iv_arc {
                IvFromStartArc::WithVBlank => PidLowToIvArc::WithVBlank,
                IvFromStartArc::WithoutVBlank => PidLowToIvArc::WithoutVBlank,
            },
        }
    }
}

#[derive(Default, Debug, PartialEq, Clone, Copy)]
pub enum PidLowToIvArc {
    #[default]
    WithVBlank,
    WithoutVBlank,
}

pub fn find_pid_low_paths_from_pid_low_seed<const METHOD3: bool>(
    opts: &FindPidPathsOptions,
    mut rng: Pokerng,
) -> Option<Vec<PidLowPath>> {
    let pid_low = rng.rand::<u16>() as u32;

    let pid_high_wild1245 = pid_low + ((rng.rand::<u16>() as u32) << 16);

    let wild1245_good = passes_pid_filter(
        &opts.filter,
        &opts.gen3_filter,
        Some(opts.encounter_gender_ratio),
        pid_high_wild1245,
        opts.tsv,
    );

    let wild3_good = {
        if METHOD3 {
            let pid_high_wild3 = pid_low + ((rng.rand::<u16>() as u32) << 16);
            passes_pid_filter(
                &opts.filter,
                &opts.gen3_filter,
                Some(opts.encounter_gender_ratio),
                pid_high_wild3,
                opts.tsv,
            )
        } else {
            false
        }
    };

    if !wild1245_good && !wild3_good {
        return None;
    }

    // revert state
    rng.prev_rand();
    rng.prev_rand();
    if METHOD3 {
        rng.prev_rand();
    }

    let mut pid_low_paths = vec![];
    if wild1245_good {
        pid_low_paths.push(PidLowPath {
            seed: rng.seed(),
            pid_low_to_iv_arc: PidLowToIvArc::WithoutVBlank,
        });
    }
    if wild3_good {
        pid_low_paths.push(PidLowPath {
            seed: rng.seed(),
            pid_low_to_iv_arc: PidLowToIvArc::WithVBlank,
        });
    }
    Some(pid_low_paths)
}

pub fn extend_pid_low_path_to_pid_paths(
    opts: &FindPidPathsOptions,
    pid_low_path: &PidLowPath,
) -> ArrayVec<PidPath, 3> {
    let mut pid_paths: ArrayVec<PidPath, 3> = Default::default();
    if let Some(wild13_pid_path) = extend_pid_low_path_to_pid_path_wild13(opts, pid_low_path) {
        pid_paths.push(wild13_pid_path);
    }
    if pid_low_path.pid_low_to_iv_arc == PidLowToIvArc::WithoutVBlank {
        if let Some(wild2_pid_path) = extend_pid_low_path_to_pid_path_wild2(opts, pid_low_path) {
            pid_paths.push(wild2_pid_path);
        }
        if let Some(wild4_pid_path) = extend_pid_low_path_to_pid_path_wild4(opts, pid_low_path) {
            pid_paths.push(wild4_pid_path);
        }
    }

    // To improve performance for the common case, we assume that consider_all_methods_124 is true. Later, we will filter unwanted methods.
    if !opts.consider_all_methods_124 {
        pid_paths.retain(|pid_path| opts.methods.contains(&pid_path.method()));
    }
    pid_paths
}

fn extend_pid_low_path_to_pid_path_wild13(
    opts: &FindPidPathsOptions,
    pid_low_path: &PidLowPath,
) -> Option<PidPath> {
    let mut rng = pid_low_path.seed_after_pid_high();

    let ivs = Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>());

    if pid_low_path.seed == 0x6B61F77C {
        println!("pid_low_path={:?}, wild13 ivs={:?}", pid_low_path, ivs);
    }

    if ivs.filter(&opts.filter.min_ivs, &opts.filter.max_ivs) {
        let arc_type = match pid_low_path.pid_low_to_iv_arc {
            PidLowToIvArc::WithoutVBlank => PidToIvArc::WithoutVBlank,
            PidLowToIvArc::WithVBlank => PidToIvArc::WithVBlankBetweenPid,
        };
        Some(PidPath::new(
            pid_low_path.seed,
            arc_type,
            IvFromStartArc::WithoutVBlank,
        ))
    } else {
        None
    }
}

fn extend_pid_low_path_to_pid_path_wild2(
    opts: &FindPidPathsOptions,
    pid_low_path: &PidLowPath,
) -> Option<PidPath> {
    // should only be called if pid_low_path has no vblank
    let mut rng = pid_low_path.seed_after_pid_high();
    rng.rand::<u16>(); // vblank

    let ivs = Ivs::new_g3(rng.rand::<u16>(), rng.rand::<u16>());

    if ivs.filter(&opts.filter.min_ivs, &opts.filter.max_ivs) {
        Some(PidPath::new(
            pid_low_path.seed,
            PidToIvArc::WithVBlankBetweenPidIv,
            IvFromStartArc::WithoutVBlank,
        ))
    } else {
        None
    }
}

fn extend_pid_low_path_to_pid_path_wild4(
    opts: &FindPidPathsOptions,
    pid_low_path: &PidLowPath,
) -> Option<PidPath> {
    // should only be called if pid_low_path has no vblank
    let mut rng = pid_low_path.seed_after_pid_high();

    let iv1 = rng.rand::<u16>();
    rng.rand::<u16>(); //vblank
    let ivs = Ivs::new_g3(iv1, rng.rand::<u16>());

    if ivs.filter(&opts.filter.min_ivs, &opts.filter.max_ivs) {
        Some(PidPath::new(
            pid_low_path.seed,
            PidToIvArc::WithoutVBlank,
            IvFromStartArc::WithVBlank,
        ))
    } else {
        None
    }
}

pub fn reverse_find_pid_low_paths_from_pid_NO_PROD<const METHOD3: bool>(
    pid: u32,
) -> Vec<PidLowPath> {
    // We reuse the existing reverse IV logic for PID. It's not ideal because the first bit of IV is ignored
    // but not the first bit of PID. This means the IV logic returns correct values and incorrect values.
    // However, it's easy to filter them afterwards. The performance is not important.
    let ivs = Ivs::new_g3((pid & 0xFFFF) as u16, (pid >> 16) as u16);
    reverse_find_iv_paths_from_ivs(ivs.hp, ivs.atk, ivs.def, ivs.spa, ivs.spd, ivs.spe)
        .iter()
        .map(PidLowPath::from_iv_path)
        .filter(|pid_low_path| pid_low_path.pid() == pid)
        .collect::<Vec<_>>()
}

pub fn reverse_find_pid_low_paths_from_pids<const METHOD3: bool>(
    pids: impl Iterator<Item = u32>,
) -> impl Iterator<Item = PidLowPath> {
    pids.flat_map(reverse_find_pid_low_paths_from_pid::<METHOD3>)
}

/** pid has already been validated that it respects the filter */
pub fn reverse_find_pid_low_paths_from_pid<const METHOD3: bool>(
    pid: u32,
) -> ArrayVec<PidLowPath, 6> {
    let mut pid_low_paths = ArrayVec::new();

    reverse_find_pid_low_paths_with_arc::<0x41c64e6d, 0x6073, 0x67d3, 0xd3e, 0x4034>(
        pid,
        PidLowToIvArc::WithoutVBlank,
        &mut pid_low_paths,
    );

    if METHOD3 {
        reverse_find_pid_low_paths_with_arc::<0xc2a29a69, 0xe97e7b6a, 0x3a89, 0x2e4c, 0x5831>(
            pid,
            PidLowToIvArc::WithVBlank,
            &mut pid_low_paths,
        );
    }

    pid_low_paths
}

fn reverse_find_pid_low_paths_with_arc<
    const MULT: u32,
    const ADD: u32,
    const MOD: u32,
    const PAT: u32,
    const INC: u32,
>(
    pid: u32,
    pid_low_to_iv_arc: PidLowToIvArc,
    pid_low_paths: &mut ArrayVec<PidLowPath, 6>,
) {
    let first = pid << 16;
    let second = pid & 0xffff0000;

    let additional_add = if pid_low_to_iv_arc == PidLowToIvArc::WithoutVBlank {
        0
    } else {
        ADD
    };

    let diff =
        (second.wrapping_sub(first.wrapping_mul(MULT).wrapping_add(additional_add)) >> 16) as u32;
    let start = (((diff.wrapping_mul(MOD).wrapping_add(INC) >> 16).wrapping_mul(PAT)) % MOD) as u32;

    for low in (start..0x10000).step_by(MOD as usize) {
        let seed_after_pid_low = first | low;
        if seed_after_pid_low.wrapping_mul(MULT).wrapping_add(ADD) & 0xffff0000 == second {
            let mut rng = Pokerng::new(seed_after_pid_low);
            rng.prev_rand();
            pid_low_paths.push(PidLowPath {
                seed: rng.seed(),
                pid_low_to_iv_arc,
            });
        }
    }
}
