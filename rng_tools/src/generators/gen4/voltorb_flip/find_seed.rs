use super::{VoltorbFlipBoard, VoltorbFlipLevel, generate_board};
use crate::{
    RngDateTime,
    gen4::seed_time4::{Seed4CalcOpts, SeedTime4, calc_gen4_seeds},
    rng::mt::MT,
};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct FindVoltorbFlipSeedOpts {
    pub datetime: RngDateTime,
    pub seconds_increment: usize,
    pub min_delay: u32,
    pub max_delay: u32,
    pub level: VoltorbFlipLevel,
    pub board: VoltorbFlipBoard,
}

#[wasm_bindgen]
pub fn find_voltorb_flip_seed(opts: FindVoltorbFlipSeedOpts) -> Vec<SeedTime4> {
    let FindVoltorbFlipSeedOpts {
        datetime,
        seconds_increment,
        min_delay,
        max_delay,
        level,
        board,
    } = opts;

    let seed_opts = Seed4CalcOpts {
        datetime,
        seconds_increment,
        min_delay,
        max_delay,
    };
    calc_gen4_seeds(seed_opts)
        .into_iter()
        .filter(|seed| {
            let mut rng = MT::new(seed.seed);
            let generated_board = generate_board(&mut rng, level);
            board == generated_board
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::super::VoltorbFlipCard::*;
    use super::*;
    use crate::{assert_list_eq, datetime};

    #[test]
    fn find_seed() {
        let v = Voltorb;
        let o = One;
        let t = Two;
        let h = Three;

        let board = VoltorbFlipBoard::new_test([
            [v, o, o, t, o],
            [v, h, o, t, o],
            [v, o, o, v, o],
            [o, o, o, t, o],
            [t, o, o, v, v],
        ]);

        let opts = FindVoltorbFlipSeedOpts {
            datetime: datetime!(2026-07-09 07:09:26).unwrap(),
            seconds_increment: 1,
            min_delay: 755,
            max_delay: 755,
            level: VoltorbFlipLevel::Lvl1,
            board,
        };

        let results = find_voltorb_flip_seed(opts);
        let expected = [SeedTime4 {
            seed: 0x6207030d,
            datetime: datetime!(2026-07-09 07:09:26).unwrap(),
            delay: 755,
        }];

        assert_list_eq!(results, expected);
    }
}
