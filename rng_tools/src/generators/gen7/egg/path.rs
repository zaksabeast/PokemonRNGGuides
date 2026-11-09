use serde::{Deserialize, Serialize};
use tsify::Tsify;

use super::generator::Gen7Egg;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen7EggAction {
    Accept,
    Reject,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7EggPathStep {
    pub action: Gen7EggAction,
    pub advance_before: usize,
    pub egg_seeds_before: [u32; 4],
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7EggPath {
    pub steps_before_target: Vec<Gen7EggPathStep>,
    pub target: Gen7Egg,
    pub egg_seeds_after_target: [u32; 4],
}

pub(super) struct ShortestPaths {
    previous_advance: Vec<usize>,
    fewest_actions: Vec<u32>,
}

impl ShortestPaths {
    pub(super) fn new(accept_advances: &[usize]) -> Self {
        let len = accept_advances.len();
        let mut paths = Self {
            previous_advance: vec![0; len],
            fewest_actions: vec![u32::MAX; len],
        };

        if len > 0 {
            paths.fewest_actions[0] = 0;
        }

        // Trying the reject before the accept chain, and replacing a path only
        // when strictly shorter, makes ties pick the same path as 3DSRNGTool.
        for advance in 0..len {
            if advance != 0 {
                paths.keep_shorter_path(advance - 1, advance);
            }

            paths.keep_shorter_accept_chain(advance, accept_advances);
        }

        paths
    }

    fn keep_shorter_path(&mut self, from: usize, to: usize) {
        if self.fewest_actions[to] > self.fewest_actions[from] + 1 {
            self.previous_advance[to] = from;
            self.fewest_actions[to] = self.fewest_actions[from] + 1;
        }
    }

    fn keep_shorter_accept_chain(&mut self, start: usize, accept_advances: &[usize]) {
        let mut from = start;
        let mut to = from + accept_advances[from];

        while to < accept_advances.len() {
            self.keep_shorter_path(from, to);
            from = to;
            to = from + accept_advances[from];
        }
    }

    pub(super) fn fewest_actions_to_reach(&self, advance: usize) -> u32 {
        self.fewest_actions[advance]
    }

    pub(super) fn path_advances_to(&self, target: usize) -> Vec<usize> {
        let mut advances = vec![target];
        let mut advance = target;

        while advance != 0 {
            advance = self.previous_advance[advance];
            advances.push(advance);
        }

        advances.reverse();

        advances
    }
}

pub(super) fn path_steps(path_advances: &[usize], egg_seeds: &[[u32; 4]]) -> Vec<Gen7EggPathStep> {
    path_advances
        .windows(2)
        .map(|pair| {
            let (from, to) = (pair[0], pair[1]);
            // Eggs use far more than 1 advance, so 1 is always a reject.
            let action = if to - from == 1 {
                Gen7EggAction::Reject
            } else {
                Gen7EggAction::Accept
            };

            Gen7EggPathStep {
                action,
                advance_before: from,
                egg_seeds_before: egg_seeds[from],
            }
        })
        .collect()
}
