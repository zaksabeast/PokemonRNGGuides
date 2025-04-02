use crate::rng::lcrng::Pokerng;
use crate::rng::{Rng, StateIterator};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct FeebasSidResult {
    pub sid: u16,
    pub advances: usize,
    pub vblanks: u8,
}

fn generate_feebas_seed(mut rng: Pokerng) -> u16 {
    let mut trends = Vec::new();
    for _ in 0..5 {
        rng.advance(4);
        let mut rand = rng.rand_max::<u16>(98);
        if rand > 50 {
            rand = rng.rand_max::<u16>(98);
            if rand > 80 {
                rand = rng.rand_max::<u16>(98);
            }
        }

        let max_trend = rand + 30;
        let trend = rng.rand_max::<u16>(rand + 1) + 30;
        let rand = rng.rand::<u16>();
        trends.push(((trend, max_trend), rand));
    }
    let mut feebas_trend = trends.remove(0);
    for trend in trends {
        if trend.0 > feebas_trend.0 || (trend.0 == feebas_trend.0 && rng.rand_max::<u16>(2) != 0) {
            feebas_trend = trend;
        }
    }
    feebas_trend.1
}

#[wasm_bindgen]
pub fn emerald_sid_from_feebas_seed(
    tid: u16,
    feebas_seed: u16,
    initial_advances: usize,
    max_advances: usize,
) -> Vec<FeebasSidResult> {
    StateIterator::new(Pokerng::new(tid.into()))
        .enumerate()
        .skip(initial_advances)
        .take(max_advances)
        .flat_map(|(advances, mut rng)| {
            let sid3 = rng.rand::<u16>();
            let sid2 = rng.rand::<u16>();
            rng.advance(2);

            if feebas_seed != generate_feebas_seed(rng) {
                return vec![];
            }

            vec![
                FeebasSidResult {
                    sid: sid3,
                    advances,
                    vblanks: 3,
                },
                FeebasSidResult {
                    sid: sid2,
                    advances: advances + 1,
                    vblanks: 2,
                },
            ]
        })
        .collect()
}

#[wasm_bindgen]
pub fn rs_sid_from_feebas_seed(
    tid: u16,
    feebas_seed: u16,
    initial_advances: usize,
    max_advances: usize,
) -> Vec<FeebasSidResult> {
    StateIterator::new(Pokerng::new(0x5a0))
        .enumerate()
        .skip(initial_advances)
        .take(max_advances.saturating_add(1))
        .flat_map(|(advances, mut rng)| {
            let sid = rng.rand::<u16>();

            if tid != rng.rand::<u16>() {
                return vec![];
            }

            let mut results = vec![];
            rng.next();
            rng.next();
            if feebas_seed == generate_feebas_seed(rng) {
                results.push(FeebasSidResult {
                    sid,
                    advances,
                    vblanks: 2,
                });
            }

            rng.next();
            if feebas_seed == generate_feebas_seed(rng) {
                results.push(FeebasSidResult {
                    sid,
                    advances: advances.saturating_sub(3),
                    vblanks: 3,
                });
            }

            results
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::assert_list_eq;

    #[test]
    fn test_generate_feebas_seed() {
        let result = generate_feebas_seed(Pokerng::new(0xaabb));
        assert_eq!(result, 41779);
    }

    #[test]
    fn test_emerald_sid_from_spots() {
        let results = emerald_sid_from_feebas_seed(14223, 0xad4f, 0, 300_000);
        let expected = [
            FeebasSidResult {
                sid: 34159,
                advances: 1810,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 27105,
                advances: 1811,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 30561,
                advances: 282651,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 31118,
                advances: 282652,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 27948,
                advances: 282657,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 39625,
                advances: 282658,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 39625,
                advances: 282658,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 57826,
                advances: 282659,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 28480,
                advances: 282664,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 4087,
                advances: 282665,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 4087,
                advances: 282665,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 53059,
                advances: 282666,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 61650,
                advances: 282671,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 42187,
                advances: 282672,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 42187,
                advances: 282672,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 53956,
                advances: 282673,
                vblanks: 2,
            },
            FeebasSidResult {
                sid: 53956,
                advances: 282673,
                vblanks: 3,
            },
            FeebasSidResult {
                sid: 53173,
                advances: 282674,
                vblanks: 2,
            },
        ];
        assert_list_eq!(results, expected);
    }

    #[test]
    fn test_rs_sid_from_spots() {
        let results = rs_sid_from_feebas_seed(52548, 0xebf6, 0, 500_000);
        let expected = [FeebasSidResult {
            sid: 4132,
            advances: 90715,
            vblanks: 2,
        }];
        assert_list_eq!(results, expected);
    }
}
