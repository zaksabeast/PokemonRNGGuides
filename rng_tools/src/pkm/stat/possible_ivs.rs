use super::{
    StatsValue, calculate_hp, calculate_max_ivs_from_stats, calculate_min_ivs_from_stats,
    calculate_non_hp,
};
use crate::{
    Characteristic, G3Idx, Ivs, Nature, PokemonType, Species, calculate_hidden_power_type,
};
use itertools::iproduct;
use serde::{Deserialize, Serialize};
use std::ops::{Index, IndexMut};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct LevelStat {
    pub level: u8,
    pub stats: StatsValue,
}

impl LevelStat {
    #[cfg(test)]
    fn new(species: Species, level: u8, nature: Nature, ivs: Ivs) -> Self {
        Self {
            level,
            stats: crate::calculate_stats(species, level, nature, &ivs, &StatsValue::new_all0()),
        }
    }
}

struct SingleCalcStatOpts<'a> {
    species: Species,
    nature: Nature,
    level_stats: &'a LevelStat,
    characteristic: Option<Characteristic>,
    hidden_power: Option<PokemonType>,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct CalcStatOpts {
    species: Species,
    nature: Nature,
    level_stats: Vec<LevelStat>,
    characteristic: Option<Characteristic>,
    hidden_power: Option<PokemonType>,
}

#[derive(Debug, Default, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct PossibleIvs {
    pub hp: Vec<u8>,
    pub atk: Vec<u8>,
    pub def: Vec<u8>,
    pub spa: Vec<u8>,
    pub spd: Vec<u8>,
    pub spe: Vec<u8>,
}

impl PossibleIvs {
    fn from_range(min_ivs: Ivs, max_ivs: Ivs) -> Self {
        Self {
            hp: (min_ivs.hp..=max_ivs.hp).collect(),
            atk: (min_ivs.atk..=max_ivs.atk).collect(),
            def: (min_ivs.def..=max_ivs.def).collect(),
            spa: (min_ivs.spa..=max_ivs.spa).collect(),
            spd: (min_ivs.spd..=max_ivs.spd).collect(),
            spe: (min_ivs.spe..=max_ivs.spe).collect(),
        }
    }

    fn parity_flags(values: &[u8]) -> [bool; 2] {
        let mut flags = [false; 2];

        for &value in values {
            flags[(value & 1) as usize] = true;
            if flags[0] && flags[1] {
                break;
            }
        }

        flags
    }

    fn filter_hidden_power(&mut self, hidden_power: PokemonType) {
        let hp_parity = Self::parity_flags(&self.hp);
        let atk_parity = Self::parity_flags(&self.atk);
        let def_parity = Self::parity_flags(&self.def);
        let spa_parity = Self::parity_flags(&self.spa);
        let spd_parity = Self::parity_flags(&self.spd);
        let spe_parity = Self::parity_flags(&self.spe);

        let mut allowed_hp = [false; 2];
        let mut allowed_atk = [false; 2];
        let mut allowed_def = [false; 2];
        let mut allowed_spa = [false; 2];
        let mut allowed_spd = [false; 2];
        let mut allowed_spe = [false; 2];

        iproduct!(0u8..=1, 0u8..=1, 0u8..=1, 0u8..=1, 0u8..=1, 0u8..=1)
            .filter(|(hp, atk, def, spa, spd, spe)| {
                hp_parity[*hp as usize]
                    && atk_parity[*atk as usize]
                    && def_parity[*def as usize]
                    && spa_parity[*spa as usize]
                    && spd_parity[*spd as usize]
                    && spe_parity[*spe as usize]
            })
            .filter(|(hp, atk, def, spa, spd, spe)| {
                let ivs = Ivs {
                    hp: *hp,
                    atk: *atk,
                    def: *def,
                    spa: *spa,
                    spd: *spd,
                    spe: *spe,
                };

                calculate_hidden_power_type(&ivs) == hidden_power
            })
            .for_each(|(hp, atk, def, spa, spd, spe)| {
                allowed_hp[hp as usize] = true;
                allowed_atk[atk as usize] = true;
                allowed_def[def as usize] = true;
                allowed_spa[spa as usize] = true;
                allowed_spd[spd as usize] = true;
                allowed_spe[spe as usize] = true;
            });

        self.hp.retain(|value| allowed_hp[(value & 1) as usize]);
        self.atk.retain(|value| allowed_atk[(value & 1) as usize]);
        self.def.retain(|value| allowed_def[(value & 1) as usize]);
        self.spa.retain(|value| allowed_spa[(value & 1) as usize]);
        self.spd.retain(|value| allowed_spd[(value & 1) as usize]);
        self.spe.retain(|value| allowed_spe[(value & 1) as usize]);
    }

    /// Intersects this PossibleIvs with another, keeping only IVs that are possible in both.
    fn intersect(&self, other: &Self) -> Self {
        let intersect_stat = |a: &[u8], b: &[u8]| -> Vec<u8> {
            a.iter().filter(|iv| b.contains(iv)).copied().collect()
        };

        Self {
            hp: intersect_stat(&self.hp, &other.hp),
            atk: intersect_stat(&self.atk, &other.atk),
            def: intersect_stat(&self.def, &other.def),
            spa: intersect_stat(&self.spa, &other.spa),
            spd: intersect_stat(&self.spd, &other.spd),
            spe: intersect_stat(&self.spe, &other.spe),
        }
    }

    fn next_level(&self, species: Species, level: u8, nature: Nature) -> StatsValue {
        let level = level as u16;
        let mut levels = StatsValue {
            hp: level,
            atk: level,
            def: level,
            spa: level,
            spd: level,
            spe: level,
        };
        let base_stats = &species.personal().base_stats;
        let nature_factors = nature.stat_factor();

        for &stat_idx in &G3Idx::ORDER {
            let ivs = &self[stat_idx];

            if ivs.len() < 2 {
                continue;
            }

            let calc_stat = |iv: u8, level_u8: u8| -> u16 {
                let base_stat = base_stats[stat_idx];
                match stat_idx {
                    G3Idx::Hp => calculate_hp(base_stat, iv, 0, level_u8),
                    G3Idx::Atk => calculate_non_hp(base_stat, iv, 0, level_u8, nature_factors.atk),
                    G3Idx::Def => calculate_non_hp(base_stat, iv, 0, level_u8, nature_factors.def),
                    G3Idx::Spa => calculate_non_hp(base_stat, iv, 0, level_u8, nature_factors.spa),
                    G3Idx::Spd => calculate_non_hp(base_stat, iv, 0, level_u8, nature_factors.spd),
                    G3Idx::Spe => calculate_non_hp(base_stat, iv, 0, level_u8, nature_factors.spe),
                }
            };

            'level_loop: for l in (level + 1)..=100 {
                let l = l as u8;
                for j in 1..ivs.len() {
                    if calc_stat(ivs[j - 1], l) < calc_stat(ivs[j], l) {
                        levels[stat_idx] = l as u16;
                        break 'level_loop;
                    }
                }
            }
        }

        levels
    }

    fn calc_single_level(opts: &SingleCalcStatOpts) -> Option<Self> {
        let min_ivs = calculate_min_ivs_from_stats(
            opts.species,
            opts.level_stats.level,
            opts.nature,
            &opts.level_stats.stats,
        )?;
        let max_ivs = calculate_max_ivs_from_stats(
            opts.species,
            opts.level_stats.level,
            opts.nature,
            &opts.level_stats.stats,
        )?;
        let mut possible = match opts.characteristic {
            None => Self::from_range(min_ivs, max_ivs),
            Some(characteristic) => {
                let mut possible = Self::default();
                let mut characteristic_high = 31;

                let (char_index, char_mod) = characteristic.decompose();

                for iv in min_ivs[char_index]..=max_ivs[char_index] {
                    // IV is only possible if (iv % 5) matches the characteristic.
                    // Keep the highest value to cap the other stats below.
                    if iv % 5 == char_mod
                        && min_ivs.hp <= iv
                        && min_ivs.atk <= iv
                        && min_ivs.def <= iv
                        && min_ivs.spa <= iv
                        && min_ivs.spd <= iv
                        && min_ivs.spe <= iv
                    {
                        possible[char_index].push(iv);
                        characteristic_high = iv;
                    }
                }

                // Fill non-characteristic stats with ranges capped by characteristic_high.
                for &i in G3Idx::ORDER.iter() {
                    if i == char_index {
                        continue;
                    }

                    let capped_max = max_ivs[i].min(characteristic_high);
                    possible[i] = (min_ivs[i]..=capped_max).collect();
                }

                possible
            }
        };

        if let Some(hidden_power) = opts.hidden_power {
            possible.filter_hidden_power(hidden_power);
        }

        Some(possible)
    }

    fn calc_multi_levels(opts: &CalcStatOpts) -> Option<Self> {
        if opts.level_stats.is_empty() {
            return None;
        }

        let mut result = Self::calc_single_level(&SingleCalcStatOpts {
            species: opts.species,
            nature: opts.nature,
            level_stats: &opts.level_stats[0],
            characteristic: opts.characteristic,
            hidden_power: opts.hidden_power,
        })?;

        for level_stats in opts.level_stats.iter().skip(1) {
            let level_result = Self::calc_single_level(&SingleCalcStatOpts {
                species: opts.species,
                nature: opts.nature,
                level_stats,
                characteristic: opts.characteristic,
                hidden_power: opts.hidden_power,
            })?;
            result = result.intersect(&level_result);
        }

        Some(result)
    }
}

impl Index<G3Idx> for PossibleIvs {
    type Output = Vec<u8>;

    fn index(&self, index: G3Idx) -> &Self::Output {
        match index {
            G3Idx::Hp => &self.hp,
            G3Idx::Atk => &self.atk,
            G3Idx::Def => &self.def,
            G3Idx::Spa => &self.spa,
            G3Idx::Spd => &self.spd,
            G3Idx::Spe => &self.spe,
        }
    }
}

impl IndexMut<G3Idx> for PossibleIvs {
    fn index_mut(&mut self, index: G3Idx) -> &mut Self::Output {
        match index {
            G3Idx::Hp => &mut self.hp,
            G3Idx::Atk => &mut self.atk,
            G3Idx::Def => &mut self.def,
            G3Idx::Spa => &mut self.spa,
            G3Idx::Spd => &mut self.spd,
            G3Idx::Spe => &mut self.spe,
        }
    }
}

#[derive(Debug, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct IvRanges {
    pub possible_ivs: PossibleIvs,
    pub next_level_stats: StatsValue,
}

#[wasm_bindgen]
pub fn calculate_iv_ranges(opts: CalcStatOpts) -> Option<IvRanges> {
    if opts.level_stats.is_empty() {
        return None;
    }

    let last_level = opts
        .level_stats
        .iter()
        .max_by_key(|stat| stat.level)
        .unwrap()
        .level;
    let possible_ivs = PossibleIvs::calc_multi_levels(&opts)?;
    let next_level_stats = possible_ivs.next_level(opts.species, last_level, opts.nature);

    Some(IvRanges {
        possible_ivs,
        next_level_stats,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    mod calc_single_level {
        use super::*;
        use crate::stats;

        #[test]
        fn no_characteristic() {
            let stats = LevelStat {
                level: 6,
                stats: stats!(22 / 12 / 12 / 15 / 11 / 9),
            };
            let opts = SingleCalcStatOpts {
                species: Species::Torchic,
                nature: Nature::Relaxed,
                level_stats: &stats,
                characteristic: None,
                hidden_power: None,
            };
            let result = PossibleIvs::calc_single_level(&opts).unwrap();
            let expected = PossibleIvs {
                hp: (10..=26).collect(),
                atk: (0..=13).collect(),
                def: (20..=31).collect(),
                spa: (27..=31).collect(),
                spd: (0..=16).collect(),
                spe: (0..=26).collect(),
            };

            assert_eq!(result.hp, expected.hp);
            assert_eq!(result.atk, expected.atk);
            assert_eq!(result.def, expected.def);
            assert_eq!(result.spa, expected.spa);
            assert_eq!(result.spd, expected.spd);
            assert_eq!(result.spe, expected.spe);
        }

        #[test]
        fn with_characteristic() {
            let stats = LevelStat {
                level: 6,
                stats: stats!(22 / 12 / 12 / 15 / 11 / 9),
            };
            let opts = SingleCalcStatOpts {
                species: Species::Torchic,
                nature: Nature::Relaxed,
                level_stats: &stats,
                characteristic: Some(Characteristic::OftenLostInThought),
                hidden_power: None,
            };
            let result = PossibleIvs::calc_single_level(&opts).unwrap();
            let expected = PossibleIvs {
                hp: (10..=26).collect(),
                atk: (0..=13).collect(),
                def: (20..=28).collect(),
                spa: vec![28],
                spd: (0..=16).collect(),
                spe: (0..=26).collect(),
            };

            assert_eq!(result.hp, expected.hp);
            assert_eq!(result.atk, expected.atk);
            assert_eq!(result.def, expected.def);
            assert_eq!(result.spa, expected.spa);
            assert_eq!(result.spd, expected.spd);
            assert_eq!(result.spe, expected.spe);
        }

        #[test]
        fn with_hidden_power() {
            let stats = LevelStat {
                level: 6,
                stats: stats!(22 / 12 / 12 / 15 / 11 / 9),
            };
            let opts = SingleCalcStatOpts {
                species: Species::Torchic,
                nature: Nature::Relaxed,
                level_stats: &stats,
                characteristic: None,
                hidden_power: Some(PokemonType::Grass),
            };
            let result = PossibleIvs::calc_single_level(&opts).unwrap();
            let expected = PossibleIvs {
                hp: (10..=26).collect(),
                atk: (0..=13).collect(),
                def: (20..=31).collect(),
                spa: vec![28, 30],
                spd: vec![1, 3, 5, 7, 9, 11, 13, 15],
                spe: vec![1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
            };

            assert_eq!(result.hp, expected.hp);
            assert_eq!(result.atk, expected.atk);
            assert_eq!(result.def, expected.def);
            assert_eq!(result.spa, expected.spa);
            assert_eq!(result.spd, expected.spd);
            assert_eq!(result.spe, expected.spe);
        }
    }

    mod intersect {
        use super::*;

        #[test]
        fn identical() {
            let ivs1 = PossibleIvs {
                hp: vec![5, 10, 15, 20],
                atk: vec![0, 5, 10, 15, 20, 25, 30],
                def: vec![10, 15, 20],
                spa: vec![25, 26, 27, 28, 29, 30, 31],
                spd: vec![0, 1, 2, 3],
                spe: vec![15, 20, 25, 30],
            };

            let result = ivs1.intersect(&ivs1);

            assert_eq!(result.hp, ivs1.hp);
            assert_eq!(result.atk, ivs1.atk);
            assert_eq!(result.def, ivs1.def);
            assert_eq!(result.spa, ivs1.spa);
            assert_eq!(result.spd, ivs1.spd);
            assert_eq!(result.spe, ivs1.spe);
        }

        #[test]
        fn partial_overlap() {
            let ivs1 = PossibleIvs {
                hp: vec![5, 10, 15, 20],
                atk: vec![0, 5, 10, 15, 20],
                def: vec![10, 15, 20],
                spa: vec![20, 25, 30],
                spd: vec![0, 5, 10],
                spe: vec![15, 20, 25, 30],
            };

            let ivs2 = PossibleIvs {
                hp: vec![10, 15, 20, 25],
                atk: vec![5, 10, 15, 20, 25],
                def: vec![10, 15, 20, 25],
                spa: vec![15, 25, 35],
                spd: vec![5, 10, 15],
                spe: vec![15, 20, 25],
            };

            let result = ivs1.intersect(&ivs2);

            assert_eq!(result.hp, vec![10, 15, 20]);
            assert_eq!(result.atk, vec![5, 10, 15, 20]);
            assert_eq!(result.def, vec![10, 15, 20]);
            assert_eq!(result.spa, vec![25]);
            assert_eq!(result.spd, vec![5, 10]);
            assert_eq!(result.spe, vec![15, 20, 25]);
        }

        #[test]
        fn no_overlap() {
            let ivs1 = PossibleIvs {
                hp: vec![0, 5, 10],
                atk: vec![0, 10, 20],
                def: vec![0, 15],
                spa: vec![0, 5],
                spd: vec![0, 1, 2],
                spe: vec![0, 6, 12],
            };

            let ivs2 = PossibleIvs {
                hp: vec![20, 25, 30],
                atk: vec![15, 25, 31],
                def: vec![20, 31],
                spa: vec![20, 31],
                spd: vec![10, 20, 31],
                spe: vec![20, 31],
            };

            let result = ivs1.intersect(&ivs2);

            assert!(result.hp.is_empty());
            assert!(result.atk.is_empty());
            assert!(result.def.is_empty());
            assert!(result.spa.is_empty());
            assert!(result.spd.is_empty());
            assert!(result.spe.is_empty());
        }
    }

    mod calc_multi_levels {
        use super::*;
        use crate::ivs;

        #[test]
        fn multi_level_narrows_range() {
            let species = Species::Torchic;
            let nature = Nature::Relaxed;
            let real_ivs = ivs!(25 / 2 / 21 / 28 / 7 / 25);

            let opts = CalcStatOpts {
                species,
                nature,
                level_stats: vec![
                    LevelStat::new(species, 7, nature, real_ivs),
                    LevelStat::new(species, 10, nature, real_ivs),
                ],
                characteristic: None,
                hidden_power: None,
            };
            let results = PossibleIvs::calc_multi_levels(&opts).unwrap();
            let expected = PossibleIvs {
                hp: (25..=29).collect(),
                atk: (0..=8).collect(),
                def: (20..=29).collect(),
                spa: (20..=29).collect(),
                spd: (0..=9).collect(),
                spe: (25..=29).collect(),
            };

            assert_eq!(results.hp, expected.hp);
            assert_eq!(results.atk, expected.atk);
            assert_eq!(results.def, expected.def);
            assert_eq!(results.spa, expected.spa);
            assert_eq!(results.spd, expected.spd);
            assert_eq!(results.spe, expected.spe);
        }

        #[test]
        fn empty_data() {
            let opts = CalcStatOpts {
                species: Species::Torchic,
                nature: Nature::Relaxed,
                level_stats: vec![],
                characteristic: None,
                hidden_power: None,
            };
            let result = PossibleIvs::calc_multi_levels(&opts);
            assert!(result.is_none());
        }

        #[test]
        fn single_level() {
            let species = Species::Torchic;
            let nature = Nature::Relaxed;
            let real_ivs = ivs!(25 / 2 / 21 / 28 / 7 / 25);

            let opts = CalcStatOpts {
                species,
                nature,
                level_stats: vec![LevelStat::new(species, 6, nature, real_ivs)],
                characteristic: None,
                hidden_power: None,
            };
            let results = PossibleIvs::calc_multi_levels(&opts).unwrap();
            let expected = PossibleIvs {
                hp: (10..=26).collect(),
                atk: (0..=13).collect(),
                def: (20..=31).collect(),
                spa: (27..=31).collect(),
                spd: (0..=16).collect(),
                spe: (0..=26).collect(),
            };

            assert_eq!(results.hp, expected.hp);
            assert_eq!(results.atk, expected.atk);
            assert_eq!(results.def, expected.def);
            assert_eq!(results.spa, expected.spa);
            assert_eq!(results.spd, expected.spd);
            assert_eq!(results.spe, expected.spe);
        }
    }

    mod next_level {
        use super::*;
        use crate::ivs;

        #[test]
        fn test() {
            let species = Species::Torchic;
            let nature = Nature::Relaxed;
            let real_ivs = ivs!(25 / 2 / 21 / 28 / 7 / 25);

            let opts = CalcStatOpts {
                species,
                nature,
                level_stats: vec![
                    LevelStat::new(species, 7, nature, real_ivs),
                    LevelStat::new(species, 10, nature, real_ivs),
                ],
                characteristic: None,
                hidden_power: None,
            };
            let possible_ivs = PossibleIvs::calc_multi_levels(&opts).unwrap();
            let result = possible_ivs.next_level(Species::Torchic, 10, Nature::Relaxed);
            let expected = StatsValue {
                hp: 11,
                atk: 11,
                def: 12,
                spa: 11,
                spd: 12,
                spe: 11,
            };

            assert_eq!(result, expected);
        }
    }

    mod calculate_iv_ranges {
        use super::*;
        use crate::ivs;

        #[test]
        fn test() {
            let species = Species::Torchic;
            let nature = Nature::Relaxed;
            let real_ivs = ivs!(25 / 2 / 21 / 28 / 7 / 25);

            let opts = CalcStatOpts {
                species,
                nature,
                level_stats: vec![
                    LevelStat::new(species, 7, nature, real_ivs),
                    LevelStat::new(species, 10, nature, real_ivs),
                ],
                characteristic: None,
                hidden_power: None,
            };
            let result = calculate_iv_ranges(opts).unwrap();
            let expected = IvRanges {
                possible_ivs: PossibleIvs {
                    hp: (25..=29).collect(),
                    atk: (0..=8).collect(),
                    def: (20..=29).collect(),
                    spa: (20..=29).collect(),
                    spd: (0..=9).collect(),
                    spe: (25..=29).collect(),
                },
                next_level_stats: StatsValue {
                    hp: 11,
                    atk: 11,
                    def: 12,
                    spa: 11,
                    spd: 12,
                    spe: 11,
                },
            };

            assert_eq!(result, expected);
        }

        #[test]
        fn unordered() {
            let species = Species::Torchic;
            let nature = Nature::Relaxed;
            let real_ivs = ivs!(25 / 2 / 21 / 28 / 7 / 25);

            let opts = CalcStatOpts {
                species,
                nature,
                level_stats: vec![
                    LevelStat::new(species, 10, nature, real_ivs),
                    LevelStat::new(species, 7, nature, real_ivs),
                ],
                characteristic: None,
                hidden_power: None,
            };
            let result = calculate_iv_ranges(opts).unwrap();
            let expected = IvRanges {
                possible_ivs: PossibleIvs {
                    hp: (25..=29).collect(),
                    atk: (0..=8).collect(),
                    def: (20..=29).collect(),
                    spa: (20..=29).collect(),
                    spd: (0..=9).collect(),
                    spe: (25..=29).collect(),
                },
                next_level_stats: StatsValue {
                    hp: 11,
                    atk: 11,
                    def: 12,
                    spa: 11,
                    spd: 12,
                    spe: 11,
                },
            };

            assert_eq!(result, expected);
        }
    }
}
