use super::game_logic::{DpptLogic, GameSpecificLogic};
use crate::rng::{
    GetRand, Rng,
    lcrng::{Pokerng, PokerngR},
};

pub trait LevelCalculator<R: Rng + GetRand<u16>> {
    fn calc_level(rng: &mut R, min: u8, max: u8, pressure: bool) -> u8;
}

pub struct SetLevel;

impl<R: Rng + GetRand<u16>> LevelCalculator<R> for SetLevel {
    fn calc_level(_rng: &mut R, min: u8, _max: u8, _pressure: bool) -> u8 {
        min
    }
}

pub struct HoneyLevel;

impl LevelCalculator<Pokerng> for HoneyLevel {
    fn calc_level(rng: &mut Pokerng, min: u8, max: u8, pressure: bool) -> u8 {
        let range = max - min + 1;
        let rand = DpptLogic::max(rng.rand(), range as u16) as u8;

        if pressure && DpptLogic::max(rng.rand(), 2) != 0 {
            return max;
        }

        min + rand
    }
}

pub struct ReversedHoneyLevel;

impl LevelCalculator<PokerngR> for ReversedHoneyLevel {
    fn calc_level(rng: &mut PokerngR, min: u8, max: u8, pressure: bool) -> u8 {
        let range = max - min + 1;

        let use_max = pressure && DpptLogic::max(rng.rand::<u16>(), 2) != 0;
        let rand = DpptLogic::max(rng.rand(), range as u16) as u8;

        match use_max {
            true => max,
            false => min + rand,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::rng::lcrng::Pokerng;

    #[test]
    fn honey_pressure_miss() {
        let mut rng = Pokerng::new(0xaabb);
        let level = HoneyLevel::calc_level(&mut rng, 1, 100, true);
        assert_eq!(level, 74);

        rng.rand::<u32>();
        let mut rng = rng.reverse();
        let rev_level = ReversedHoneyLevel::calc_level(&mut rng, 1, 100, true);
        assert_eq!(rev_level, 74);
        assert_eq!(rng.rand::<u32>(), 0xaabb);
    }

    #[test]
    fn honey_pressure_hit() {
        let mut rng = Pokerng::new(0);
        let level = HoneyLevel::calc_level(&mut rng, 1, 100, true);
        assert_eq!(level, 100);

        rng.rand::<u32>();
        let mut rng = rng.reverse();
        let rev_level = ReversedHoneyLevel::calc_level(&mut rng, 1, 100, true);
        assert_eq!(rev_level, 100);
        assert_eq!(rng.rand::<u32>(), 0);
    }

    #[test]
    fn honey_no_pressure() {
        let mut rng = Pokerng::new(0xaabb);
        let level = HoneyLevel::calc_level(&mut rng, 1, 100, false);
        assert_eq!(level, 74);

        rng.rand::<u32>();
        let mut rng = rng.reverse();
        let rev_level = ReversedHoneyLevel::calc_level(&mut rng, 1, 100, false);
        assert_eq!(rev_level, 74);
        assert_eq!(rng.rand::<u32>(), 0xaabb);
    }
}
