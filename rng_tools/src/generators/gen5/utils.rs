use crate::rng::{Rng, lcrng64::Bwrng};

fn advance_probability_table(rng: &mut Bwrng) -> usize {
    let mut count: usize = 0;

    // Round 1: 50, 100
    rng.advance(1);
    count += 1;

    // Round 2: 50, 50, 100
    if rng.rand_max::<u32>(101) > 50 {
        rng.advance(1);
        count += 1;
    }
    count += 1;

    // Round 3: 30, 50, 100
    if rng.rand_max::<u32>(101) > 30 {
        rng.advance(1);
        count += 1;
    }
    count += 1;

    // Round 4: 25, 30, 50, 100
    if rng.rand_max::<u32>(101) > 25 {
        if rng.rand_max::<u32>(101) > 30 {
            rng.advance(1);
            count += 1;
        }
        count += 1;
    }
    count += 1;

    // Round 5: 20, 25, 33, 50, 100
    if rng.rand_max::<u32>(101) > 20 {
        if rng.rand_max::<u32>(101) > 25 {
            if rng.rand_max::<u32>(101) > 33 {
                rng.advance(1);
                count += 1;
            }
            count += 1;
        }
        count += 1;
    }
    count += 1;

    count
}

pub fn initial_advances_bw(seed: u64) -> usize {
    let mut rng = Bwrng::new(seed);
    let mut count = 0;

    for _ in 0..5 {
        count += advance_probability_table(&mut rng);
    }

    count
}

pub fn initial_advances_bw2(seed: u64, memory: bool) -> usize {
    let mut rng = Bwrng::new(seed);
    let mut count = 0;

    for i in 0..5 {
        count += advance_probability_table(&mut rng);

        if i == 0 {
            let advance_amount = if memory { 2 } else { 3 };
            count += advance_amount;
            rng.advance(advance_amount);
        }
    }

    for _ in 0..100 {
        count += 3;
        let rand1 = rng.rand_max::<u32>(15) as u8;
        let rand2 = rng.rand_max::<u32>(15) as u8;
        let rand3 = rng.rand_max::<u32>(15) as u8;

        // This check is to see if any of the 3 rand calls are duplicates
        // If they aren't then break the loop early
        if rand1 != rand2 && rand1 != rand3 && rand2 != rand3 {
            break;
        }
    }

    count
}

#[cfg(test)]
mod tests {
    use super::*;

    mod advance_probability_table {
        use super::*;

        #[test]
        fn test() {
            let mut rng = Bwrng::new(0xb80853578ab60aa0);
            let count = advance_probability_table(&mut rng);
            assert_eq!(count, 8);
        }
    }

    mod initial_advances_bw {
        use super::*;

        #[test]
        fn test() {
            let count = initial_advances_bw(0xb80853578ab60aa0);
            assert_eq!(count, 43);
        }
    }
}
