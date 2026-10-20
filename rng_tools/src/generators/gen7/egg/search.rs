use super::generator::{EggSettings, Gen7Egg, Gen7EggGender, generate_egg};
use super::parents::Gen7EggParents;
use super::path::{Gen7EggPath, ShortestPaths, path_steps};
use super::pid::{EggPidStrategy, MasudaAndShinyCharm, MasudaMethod, ShinyCharm};
use crate::PkmFilter;
use crate::rng::tinymt::TinyMT;
use crate::rng::{Rng, StateIterator};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen7EggPidMethod {
    MasudaMethod,
    ShinyCharm,
    MasudaAndShinyCharm,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7EggSearchOpts {
    /// The current egg seeds, which are advance 0.
    pub seed: [u32; 4],
    pub tsv: u16,
    pub pid_method: Gen7EggPidMethod,
    pub gender: Gen7EggGender,
    pub parents: Gen7EggParents,
    pub max_advance: usize,
    pub filter: PkmFilter,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7EggResult {
    pub egg: Gen7Egg,
    /// The fewest accepts and rejects before accepting this egg.
    pub actions: u32,
}

#[wasm_bindgen]
pub fn gen7_search_eggs(opts: Gen7EggSearchOpts) -> Vec<Gen7EggResult> {
    match opts.pid_method {
        Gen7EggPidMethod::MasudaMethod => search_eggs::<MasudaMethod>(&opts),
        Gen7EggPidMethod::ShinyCharm => search_eggs::<ShinyCharm>(&opts),
        Gen7EggPidMethod::MasudaAndShinyCharm => search_eggs::<MasudaAndShinyCharm>(&opts),
    }
}

/// The accepts and rejects to reach the egg on `target_advance`. Ignores
/// `opts.max_advance` and `opts.filter`.
#[wasm_bindgen]
pub fn gen7_egg_path(opts: Gen7EggSearchOpts, target_advance: usize) -> Gen7EggPath {
    match opts.pid_method {
        Gen7EggPidMethod::MasudaMethod => egg_path::<MasudaMethod>(&opts, target_advance),
        Gen7EggPidMethod::ShinyCharm => egg_path::<ShinyCharm>(&opts, target_advance),
        Gen7EggPidMethod::MasudaAndShinyCharm => {
            egg_path::<MasudaAndShinyCharm>(&opts, target_advance)
        }
    }
}

/// Every egg from advance 0 to `last_advance`.
fn eggs<Pid: EggPidStrategy>(
    opts: &Gen7EggSearchOpts,
    last_advance: usize,
) -> impl Iterator<Item = Gen7Egg> {
    let settings = EggSettings::new(opts.gender, &opts.parents, opts.tsv);
    StateIterator::new(TinyMT::from_state(opts.seed))
        .take(last_advance + 1)
        .enumerate()
        .map(move |(advance, state)| generate_egg::<Pid>(state, advance, &settings))
}

fn search_eggs<Pid: EggPidStrategy>(opts: &Gen7EggSearchOpts) -> Vec<Gen7EggResult> {
    let mut accept_advances = Vec::with_capacity(opts.max_advance + 1);
    let mut matches = vec![];
    for egg in eggs::<Pid>(opts, opts.max_advance) {
        accept_advances.push(egg.accept_advances);
        if opts.filter.pass_filter(&egg) {
            matches.push(egg);
        }
    }

    let paths = ShortestPaths::new(&accept_advances);
    matches
        .into_iter()
        .map(|egg| Gen7EggResult {
            actions: paths.actions(egg.advance),
            egg,
        })
        .collect()
}

fn egg_path<Pid: EggPidStrategy>(opts: &Gen7EggSearchOpts, target_advance: usize) -> Gen7EggPath {
    let eggs: Vec<Gen7Egg> = eggs::<Pid>(opts, target_advance).collect();
    let accept_advances: Vec<usize> = eggs.iter().map(|egg| egg.accept_advances).collect();
    let seeds: Vec<[u32; 4]> = eggs.iter().map(|egg| egg.seed).collect();

    let advances = ShortestPaths::new(&accept_advances).advances_to(target_advance);
    let steps = path_steps(&advances, &seeds);

    let target = eggs[target_advance].clone();
    let mut after_target = TinyMT::from_state(target.seed);
    after_target.advance(target.accept_advances);

    Gen7EggPath {
        steps,
        seed_after_target: after_target.get_state(),
        target,
    }
}
