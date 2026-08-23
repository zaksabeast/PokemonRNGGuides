#[cfg(test)]
use crate::gen4::parse_pokefinder::PokefinderEgg4;
use crate::{
    G3Idx, HiddenPower, InheritedIv, InheritedIvs, Ivs, PartialIvs, PkmFilter,
    rng::{Rng, StateIterator, lcrng::Pokerng},
};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg4PickupOpts {
    pub seed: u32,
    pub offset: usize,
    pub min_advances: usize,
    pub max_advances: usize,
    pub parent_ivs: [PartialIvs; 2],
    pub is_dppt: bool,
    pub filter: PkmFilter,
}

#[derive(Debug, Eq, PartialEq, Clone, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Egg4PickupResult {
    pub advance: usize,
    pub ivs: InheritedIvs,
    pub hidden_power: Option<HiddenPower>,
}

fn generate_egg4_pickup(
    opts: &Egg4PickupOpts,
    advance: usize,
    ivs: InheritedIvs,
) -> Option<Egg4PickupResult> {
    if !ivs.filter(&opts.filter.min_ivs, &opts.filter.max_ivs) {
        return None;
    }

    let hidden_power = ivs.try_as_ivs().map(|ivs| HiddenPower::from_ivs(&ivs));

    if opts.filter.hidden_power.active
        && !hidden_power.is_some_and(|hidden_power| {
            opts.filter
                .hidden_power
                .pokemon_types
                .contains(&hidden_power.pokemon_type)
                && hidden_power.bp >= opts.filter.hidden_power.min_bp
                && hidden_power.bp <= opts.filter.hidden_power.max_bp
        })
    {
        return None;
    }

    Some(Egg4PickupResult {
        advance,
        ivs,
        hidden_power,
    })
}

fn generate_dppt_ivs(parent_ivs: &[PartialIvs; 2], rng: &mut Pokerng) -> InheritedIvs {
    let iv1 = rng.rand::<u16>();
    let iv2 = rng.rand::<u16>();
    let mut ivs: InheritedIvs = Ivs::new_g3(iv1, iv2).into();

    let inherited_ivs: [usize; 3] = [
        (rng.rand_max::<u16>(6)).into(),
        (rng.rand_max::<u16>(5)).into(),
        (rng.rand_max::<u16>(4)).into(),
    ];

    let parent_slot: [usize; 3] = [
        (rng.rand_max::<u16>(2)).into(),
        (rng.rand_max::<u16>(2)).into(),
        (rng.rand_max::<u16>(2)).into(),
    ];

    use G3Idx::*;
    let available1: [G3Idx; 6] = [Hp, Atk, Def, Spe, Spa, Spd];
    let available2: [G3Idx; 5] = [Atk, Def, Spe, Spa, Spd];
    let available3: [G3Idx; 4] = [Atk, Spe, Spa, Spd];

    let stat = available1[inherited_ivs[0]];
    ivs[stat] = InheritedIv::new(parent_ivs, parent_slot[0], stat);

    let stat = available2[inherited_ivs[1]];
    ivs[stat] = InheritedIv::new(parent_ivs, parent_slot[1], stat);

    let stat = available3[inherited_ivs[2]];
    ivs[stat] = InheritedIv::new(parent_ivs, parent_slot[2], stat);

    ivs
}

fn generate_pickup_ivs(opts: &Egg4PickupOpts, rng: &mut Pokerng) -> InheritedIvs {
    match opts.is_dppt {
        true => generate_dppt_ivs(&opts.parent_ivs, rng),
        false => generate_hgss_ivs(&opts.parent_ivs, rng),
    }
}

fn generate_hgss_ivs(parent_ivs: &[PartialIvs; 2], rng: &mut Pokerng) -> InheritedIvs {
    let iv1 = rng.rand::<u16>();
    let iv2 = rng.rand::<u16>();
    let mut ivs: InheritedIvs = Ivs::new_g3(iv1, iv2).into();

    let inherited_ivs: [usize; 3] = [
        (rng.rand_max::<u16>(6)).into(),
        (rng.rand_max::<u16>(5)).into(),
        (rng.rand_max::<u16>(4)).into(),
    ];

    let parent_slot: [usize; 3] = [
        (rng.rand_max::<u16>(2)).into(),
        (rng.rand_max::<u16>(2)).into(),
        (rng.rand_max::<u16>(2)).into(),
    ];

    use G3Idx::*;
    let mut available: [G3Idx; 6] = [Hp, Atk, Def, Spe, Spa, Spd];

    let stat = available[inherited_ivs[0]];
    ivs[stat] = InheritedIv::new(parent_ivs, parent_slot[0], stat);
    for idx in inherited_ivs[0]..5 {
        available[idx] = available[idx + 1];
    }

    let stat = available[inherited_ivs[1]];
    ivs[stat] = InheritedIv::new(parent_ivs, parent_slot[1], stat);
    for idx in inherited_ivs[1]..4 {
        available[idx] = available[idx + 1];
    }

    let stat = available[inherited_ivs[2]];
    ivs[stat] = InheritedIv::new(parent_ivs, parent_slot[2], stat);

    ivs
}

pub(crate) fn egg4_pickup_iter(
    opts: &Egg4PickupOpts,
) -> impl Iterator<Item = Egg4PickupResult> + '_ {
    let take = opts
        .max_advances
        .saturating_sub(opts.min_advances)
        .saturating_add(1);

    StateIterator::new(Pokerng::new(opts.seed))
        .skip(opts.offset)
        .enumerate()
        .skip(opts.min_advances)
        .take(take)
        .filter_map(|(advance, mut rng)| {
            let ivs = generate_pickup_ivs(opts, &mut rng);
            generate_egg4_pickup(opts, advance, ivs)
        })
}

#[wasm_bindgen]
pub fn generate_egg4_pickups(opts: &Egg4PickupOpts) -> Vec<Egg4PickupResult> {
    egg4_pickup_iter(opts).collect()
}

#[cfg(test)]
impl PartialEq<PokefinderEgg4> for Egg4PickupResult {
    fn eq(&self, other: &PokefinderEgg4) -> bool {
        if self.advance != other.pickup_advances {
            return false;
        }

        if self.hidden_power != Some(other.hidden_power) {
            return false;
        }

        // Pokefinder knows either IV or parent inheritance,
        if !self.ivs.is_parent_or_value_eq(&other.ivs) {
            return false;
        }

        true
    }
}

#[cfg(test)]
mod tests {
    use super::super::parse_pokefinder::parse_pokefinder_egg4_generator_lines;
    use super::*;
    use crate::assert_list_eq;
    use crate::ivs;

    macro_rules! pokefinder {
        ($file:expr) => {
            parse_pokefinder_egg4_generator_lines(include_str!($file))
        };
    }

    #[test]
    fn offset() {
        let opts = Egg4PickupOpts {
            seed: 0,
            offset: 100,
            min_advances: 0,
            max_advances: 100,
            parent_ivs: [PartialIvs::new_all31(), PartialIvs::new_all31()],
            is_dppt: true,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_pickups(&opts);
        let expected = pokefinder!("test_data/pickup/offset.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn min_advances() {
        let opts = Egg4PickupOpts {
            seed: 0,
            offset: 0,
            min_advances: 10,
            max_advances: 110,
            parent_ivs: [PartialIvs::new_all31(), PartialIvs::new_all31()],
            is_dppt: true,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_pickups(&opts);
        let expected = pokefinder!("test_data/pickup/min_advances.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn non_zero_seed() {
        let opts = Egg4PickupOpts {
            seed: 0xaa,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            parent_ivs: [PartialIvs::new_all31(), PartialIvs::new_all31()],
            is_dppt: true,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_pickups(&opts);
        let expected = pokefinder!("test_data/pickup/non_zero_seed.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn filter_ivs() {
        let opts = Egg4PickupOpts {
            seed: 0,
            offset: 0,
            min_advances: 0,
            max_advances: 300,
            parent_ivs: [PartialIvs::new_all31(), PartialIvs::new_all31()],
            is_dppt: true,
            filter: PkmFilter {
                min_ivs: ivs!(0 / 0 / 3 / 0 / 0 / 0),
                max_ivs: ivs!(31 / 31 / 5 / 31 / 31 / 31),
                ..Default::default()
            },
        };
        let results = generate_egg4_pickups(&opts);
        let expected = pokefinder!("test_data/pickup/filter_ivs.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn dppt_ivs() {
        let opts = Egg4PickupOpts {
            seed: 0,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            parent_ivs: [PartialIvs::new_all31(), PartialIvs::new_all31()],
            is_dppt: true,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_pickups(&opts);
        let expected = pokefinder!("test_data/pickup/dppt_ivs.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn dppt_inheritance() {
        let opts = Egg4PickupOpts {
            seed: 0,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            parent_ivs: [PartialIvs::new_all31(), PartialIvs::new_all31()],
            is_dppt: true,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_pickups(&opts);
        let expected = pokefinder!("test_data/pickup/dppt_inheritance.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn hgss_ivs() {
        let opts = Egg4PickupOpts {
            seed: 0,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            parent_ivs: [PartialIvs::new_all31(), PartialIvs::new_all31()],
            is_dppt: false,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_pickups(&opts);
        let expected = pokefinder!("test_data/pickup/hgss_ivs.txt");
        assert_list_eq!(results, expected);
    }

    #[test]
    fn hgss_inheritance() {
        let opts = Egg4PickupOpts {
            seed: 0,
            offset: 0,
            min_advances: 0,
            max_advances: 100,
            parent_ivs: [PartialIvs::new_all31(), PartialIvs::new_all31()],
            is_dppt: false,
            filter: PkmFilter::new_allow_all(),
        };
        let results = generate_egg4_pickups(&opts);
        let expected = pokefinder!("test_data/pickup/hgss_inheritance.txt");
        assert_list_eq!(results, expected);
    }
}
