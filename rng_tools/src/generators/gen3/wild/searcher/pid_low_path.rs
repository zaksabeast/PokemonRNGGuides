use arrayvec::ArrayVec;

use crate::{
    Ivs,
    gen3::{
        IvPath,
        wild::{
            passes_pid_filter,
            searcher::{
                FindPidPathsOptions, IvFromStartArc, PidPath, PidToIvArc,
                reverse_find_iv_paths_from_ivs,
            },
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

    // To improve performance for the common case where consider_all_methods_124 is true, we filter by consider_all_methods_124 at the end.
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

pub fn reverse_find_pid_low_paths_from_pids(pids: &[u32]) -> Vec<PidLowPath> {
    pids.iter()
        .flat_map(|pid| reverse_find_pid_low_paths_from_pid(*pid))
        .collect()
}

pub fn reverse_find_pid_low_paths_from_pid(pid: u32) -> Vec<PidLowPath> {
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
