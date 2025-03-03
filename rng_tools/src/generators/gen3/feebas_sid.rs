use crate::rng::Prng;
use wasm_bindgen::prelude::*;

fn generate_feebas_seed(seed: u32) -> u16 {
    let mut rng = Prng::new(seed);
    let mut trends = Vec::new();
    for _ in 0..5 {
        rng.advance(4);
        let mut rand = rng.next_rand(98);
        if rand > 50 {
            rand = rng.next_rand(98);
            if rand > 80 {
                rand = rng.next_rand(98);
            }
        }

        let max_trend = rand + 30;
        let trend = rng.next_rand(rand + 1) + 30;
        let rand = rng.next_u16();
        trends.push(((trend, max_trend), rand));
    }
    let mut feebas_trend = trends.remove(0);
    for trend in trends {
        if trend.0 > feebas_trend.0 || (trend.0 == feebas_trend.0 && rng.next_rand(2) != 0) {
            feebas_trend = trend;
        }
    }
    feebas_trend.1
}

#[wasm_bindgen]
pub fn emerald_sid_from_feebas_seed(
    tid: u16,
    feebas_seed: u16,
    min_advances: usize,
    max_advances: usize,
) -> Vec<u16> {
    let mut rng = Prng::new(tid);
    rng.advance(min_advances);
    let mut possible_sids = vec![];
    for _ in min_advances..max_advances {
        let mut go = rng.clone();
        let sid3 = go.next_u16();
        let sid2 = go.next_u16();
        go.advance(2);
        if feebas_seed == generate_feebas_seed(go.state) {
            possible_sids.push(sid3);
            possible_sids.push(sid2);
        }

        rng.next();
    }

    possible_sids
}

#[wasm_bindgen]
pub fn rs_sid_from_feebas_seed(
    tid: u16,
    feebas_seed: u16,
    min_advances: usize,
    max_advances: usize,
) -> Vec<u16> {
    let mut rng = Prng::new(0x5a0u16);
    rng.advance(min_advances);
    let mut possible_sids = vec![];
    for _ in min_advances..max_advances {
        let mut go = rng.clone();
        let sid = go.next_u16();
        if tid == go.next_u16() {
            go.next();
            if feebas_seed == generate_feebas_seed(go.next()) {
                possible_sids.push(sid);
            }

            if feebas_seed == generate_feebas_seed(go.next()) {
                possible_sids.push(sid);
            }
        }
        rng.next();
    }

    possible_sids
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_feebas_seed() {
        let result = generate_feebas_seed(0xaabb);
        assert_eq!(result, 41779);
    }

    #[test]
    fn test_emerald_sid_from_spots() {
        let results = emerald_sid_from_feebas_seed(14223, 0xad4f, 0, 100_000);
        assert_eq!(results, [34159, 27105])
    }

    #[test]
    fn test_rs_sid_from_spots() {
        let results = rs_sid_from_feebas_seed(52548, 0xebf6, 0, 100_000);
        assert_eq!(results, [4132]);
    }
}
