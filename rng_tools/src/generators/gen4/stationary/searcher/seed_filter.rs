use super::opts::SearchStatic4Opts;
use crate::gen4::seed_time::SeedTime4Searcher;
use crate::gen4::stationary::searcher::base_state::{BaseStatic4State, Static4State};
use crate::rng::Rng;
use crate::rng::lcrng::Pokerng;

pub struct SeedFilters {
    pub offset: usize,
    pub min_advance: usize,
    pub max_advance: usize,
    pub year: Option<u32>,
    pub month: Option<u32>,
    pub min_delay: u32,
    pub max_delay: u32,
    pub force_second: Option<u32>,
}

impl SeedFilters {
    pub fn filter(&self, states: impl Iterator<Item = BaseStatic4State>) -> Vec<Static4State> {
        let filters = self;
        let min_advance = filters.min_advance;
        let max_advance = filters.max_advance;
        let seed_time_lookup = SeedTime4Searcher::new(
            filters.year,
            filters.month,
            filters.min_delay..=filters.max_delay,
            filters.force_second,
        );

        let mut results = vec![];

        for state in states {
            let mut rng = Pokerng::new(state.seed).reverse();

            rng.advance(self.offset.saturating_add(min_advance));
            let mut seed = rng.seed();

            for advance in min_advance..=max_advance {
                if let Some(seed_time) = seed_time_lookup.find(seed) {
                    let found_state = state.add_seedtime(advance, seed_time);
                    results.push(found_state);
                }

                seed = rng.rand::<u32>();
            }
        }

        results
    }
}

impl From<&SearchStatic4Opts> for SeedFilters {
    fn from(opts: &SearchStatic4Opts) -> Self {
        Self {
            offset: opts.offset,
            min_advance: opts.min_advance,
            max_advance: opts.max_advance,
            year: opts.year,
            month: opts.month,
            min_delay: opts.min_delay,
            max_delay: opts.max_delay,
            force_second: opts.force_second,
        }
    }
}
