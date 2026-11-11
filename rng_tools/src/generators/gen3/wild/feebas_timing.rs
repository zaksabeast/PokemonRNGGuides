use serde::{Deserialize, Serialize};
use tsify::Tsify;

pub(super) const FISHING_CHECK_OFFSET: usize = 1186;

#[derive(Debug, Clone, Copy, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Wild3FeebasVblankSelection {
    #[default]
    MostProbable,
    Exact(usize),
}

#[derive(Clone, Copy)]
pub(super) struct FeebasCycleCounter {
    pub vblank_count: usize,
    pub min_cycle_after_check_feebas: usize,
    pub max_cycle_after_check_feebas: usize,
    pub most_probable_cycle_after_check_feebas: usize,
}

pub(super) fn select_distribution<'a>(
    candidates: &[&'a super::Wild3InitialCycleDistribution],
    selection: Wild3FeebasVblankSelection,
) -> Option<&'a super::Wild3InitialCycleDistribution> {
    match selection {
        Wild3FeebasVblankSelection::Exact(count) => candidates.iter().copied()
            .find(|distribution| distribution.feebas_vblank_count == Some(count)),
        Wild3FeebasVblankSelection::MostProbable => candidates.iter().copied().reduce(|best, next| {
            let higher_probability = next.feebas_vblank_count_probability > best.feebas_vblank_count_probability;
            let lower_tied_count = next.feebas_vblank_count_probability == best.feebas_vblank_count_probability
                && next.feebas_vblank_count < best.feebas_vblank_count;
            if higher_probability || lower_tied_count {
                return next;
            }

            best
        }),
    }
}

#[cfg(test)]
pub(super) fn prepared_distribution(
    action: super::Wild3Action,
    count: usize,
    cycles: usize,
    min: usize,
    max: usize,
    probability: f64,
) -> super::Wild3InitialCycleDistribution {
    super::Wild3InitialCycleDistribution {
        action,
        min,
        max,
        distribution: vec![
            super::CdfKnot { cycle: min as f64, probability: 0.0 },
            super::CdfKnot { cycle: max as f64, probability: 1.0 },
        ],
        feebas_tile: Some(super::Wild3FeebasTile { x: 1, y: 2, cycle_counter: cycles }),
        feebas_vblank_count: Some(count),
        feebas_vblank_count_probability: probability,
        ..super::Wild3InitialCycleDistribution::new_default(action).clone()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::gen3::Wild3Action;

    #[test]
    fn automatic_selection_chooses_the_lower_tied_count_in_any_order() {
        let zero = prepared_distribution(Wild3Action::OldRod, 0, 219710, 265896, 280896, 0.5);
        let one = prepared_distribution(Wild3Action::OldRod, 1, 219710, 45000, 80000, 0.5);
        let candidates = [&one, &zero];

        assert_eq!(select_distribution(&candidates, Wild3FeebasVblankSelection::MostProbable), Some(&zero));
        assert_eq!(select_distribution(&candidates, Wild3FeebasVblankSelection::Exact(1)), Some(&one));
        assert_eq!(select_distribution(&candidates, Wild3FeebasVblankSelection::Exact(2)), None);
    }
}

pub(super) fn timing_from_emu_log(
    opts: &super::Wild3GeneratorOptions,
    selected_count: usize,
) -> Option<FeebasCycleCounter> {
    let mut counter = super::CycleFrameCounter::new(opts);
    counter.add_cycle(FISHING_CHECK_OFFSET);
    let super::CycleFrameCounter::DetailedBreakdown {
        current_cycle: before,
        ..
    } = counter
    else {
        return None;
    };
    counter.add_cycle(
        opts.feebas_initial_distribution
            .as_ref()
            .and_then(|distribution| distribution.feebas_tile)
            .map_or(0, |tile| tile.cycle_counter),
    );
    let super::CycleFrameCounter::DetailedBreakdown {
        current_cycle: after,
        ..
    } = counter
    else {
        return None;
    };
    if after.frame - before.frame != selected_count {
        return None;
    }

    Some(FeebasCycleCounter {
        vblank_count: selected_count,
        min_cycle_after_check_feebas: after.cycle,
        max_cycle_after_check_feebas: after.cycle,
        most_probable_cycle_after_check_feebas: after.cycle,
    })
}

