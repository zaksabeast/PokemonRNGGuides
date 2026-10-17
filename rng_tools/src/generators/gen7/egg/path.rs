use serde::{Deserialize, Serialize};
use tsify::Tsify;

use super::generator::Gen7Egg;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen7EggAction {
    Accept,
    Reject,
}

/// Consecutive rejects are one step. Each accept is its own step.
#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7EggPathStep {
    pub action: Gen7EggAction,
    pub count: usize,
    pub advance_before: usize,
    pub seed_before: [u32; 4],
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7EggPath {
    /// The steps before accepting the target.
    pub steps: Vec<Gen7EggPathStep>,
    pub accepts: usize,
    pub rejects: usize,
    pub target: Gen7Egg,
    pub seed_after_target: [u32; 4],
}

/// The fewest accepts and rejects to reach each advance, from advance 0.
/// A port of 3DSRNGTool's `Gen7EggPath`, so ties pick the same path.
pub(super) struct ShortestPaths {
    previous: Vec<usize>,
    actions: Vec<u32>,
}

impl ShortestPaths {
    /// `accept_advances[i]` is how far accepting the egg on advance `i` moves.
    pub(super) fn new(accept_advances: &[usize]) -> Self {
        let len = accept_advances.len();
        let mut previous = vec![0; len];
        let mut actions = vec![u32::MAX; len];
        if len > 0 {
            actions[0] = 0;
        }

        for advance in 0..len {
            if advance != 0 && actions[advance] > actions[advance - 1] + 1 {
                previous[advance] = advance - 1;
                actions[advance] = actions[advance - 1] + 1;
            }

            // Accepting from here, then accepting each egg after.
            let mut from = advance;
            let mut to = from + accept_advances[from];
            while to < len {
                if actions[to] > actions[from] + 1 {
                    previous[to] = from;
                    actions[to] = actions[from] + 1;
                }
                from = to;
                to = from + accept_advances[from];
            }
        }

        Self { previous, actions }
    }

    pub(super) fn actions(&self, advance: usize) -> u32 {
        self.actions[advance]
    }

    /// Each advance the path lands on, from 0 to `target`.
    pub(super) fn advances_to(&self, target: usize) -> Vec<usize> {
        let mut advances = vec![target];
        let mut advance = target;
        while advance != 0 {
            advance = self.previous[advance];
            advances.push(advance);
        }
        advances.reverse();
        advances
    }
}

/// `seeds[i]` is the egg seeds on advance `i`.
pub(super) fn path_steps(advances: &[usize], seeds: &[[u32; 4]]) -> Vec<Gen7EggPathStep> {
    let mut steps: Vec<Gen7EggPathStep> = vec![];
    for pair in advances.windows(2) {
        let (from, to) = (pair[0], pair[1]);
        // Eggs use far more than 1 advance, so 1 is always a reject.
        let action = if to - from == 1 {
            Gen7EggAction::Reject
        } else {
            Gen7EggAction::Accept
        };

        match steps.last_mut() {
            Some(step) if action == Gen7EggAction::Reject && step.action == action => {
                step.count += 1;
            }
            _ => steps.push(Gen7EggPathStep {
                action,
                count: 1,
                advance_before: from,
                seed_before: seeds[from],
            }),
        }
    }
    steps
}
