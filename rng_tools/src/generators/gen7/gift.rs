use super::Timeline;
use crate::rng::{GetMaxRand, GetRand, Rng};
use crate::{AbilityType, Gender, GenderRatio, Ivs, Nature, PkmState, gen6_psv};
use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(super) struct GiftSettings {
    pub steps_from_a_press_to_generation: u32,
    /// The nature of a lead with Synchronize. Gifts always take it, without
    /// using an RNG advance for the nature.
    pub sync_nature: Option<Nature>,
}

pub(super) const STARTER_GIFT: GiftSettings = GiftSettings {
    steps_from_a_press_to_generation: 12,
    // Starters can't be synchronized.
    sync_nature: None,
};

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7Gift {
    pub advance: usize,
    pub delay_advances: usize,
    pub ec: u32,
    pub pid: u32,
    pub psv: u16,
    pub shiny: bool,
    pub ivs: Ivs,
    pub ability: AbilityType,
    pub nature: Nature,
    pub gender: Gender,
}

/// A button press at `advance`.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7Press {
    pub advance: usize,
    /// Counts from the previous press, or from the last next advance for the first press.
    pub wait_steps: u32,
}

impl PkmState for Gen7Gift {
    fn pid(&self) -> u32 {
        self.pid
    }

    fn shiny(&self) -> bool {
        self.shiny
    }

    fn nature(&self) -> Nature {
        self.nature
    }

    fn ivs(&self) -> &Ivs {
        &self.ivs
    }

    fn ability(&self) -> AbilityType {
        self.ability
    }

    fn gender(&self) -> Gender {
        self.gender
    }
}

/// Starts from A pressed on `timeline`'s current step.
pub(super) fn generate_gift<R: Rng + GetRand<u64> + GetMaxRand<u64>>(
    mut timeline: Timeline<R>,
    tsv: u16,
    settings: &GiftSettings,
) -> Gen7Gift {
    let a_press_advance = timeline.advance();
    timeline.skip_steps(settings.steps_from_a_press_to_generation);
    let delay_advances = timeline.advance() - a_press_advance;
    generate(
        &mut timeline.into_rng(),
        a_press_advance,
        delay_advances,
        tsv,
        settings.sync_nature,
    )
}

/// Starts from A pressed on `timeline`'s current step.
pub(super) fn delay_advances<R: Rng + GetRand<u64> + Clone>(
    timeline: &Timeline<R>,
    settings: &GiftSettings,
) -> usize {
    let mut generation = timeline.clone();
    generation.skip_steps(settings.steps_from_a_press_to_generation);
    generation.advance() - timeline.advance()
}

fn generate<R: Rng + GetRand<u64> + GetMaxRand<u64>>(
    rng_at_generation: &mut R,
    a_press_advance: usize,
    delay_advances: usize,
    tsv: u16,
    sync_nature: Option<Nature>,
) -> Gen7Gift {
    let rng = rng_at_generation;
    let ec = rng.rand::<u64>() as u32;
    let pid = rng.rand::<u64>() as u32;
    let psv = gen6_psv(pid);

    let mut iv = || rng.rand_max::<u64>(32) as u8;
    let ivs = Ivs::new(iv(), iv(), iv(), iv(), iv(), iv());

    let ability = (rng.rand_max::<u64>(2) as u8).into();
    let nature = sync_nature.unwrap_or_else(|| (rng.rand_max::<u64>(25) as u8).into());
    let gender = GenderRatio::OneToSeven.gender(rng.rand_max::<u64>(252) as u8 + 1);

    Gen7Gift {
        advance: a_press_advance,
        delay_advances,
        ec,
        pid,
        psv,
        shiny: psv == tsv,
        ivs,
        ability,
        nature,
        gender,
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::assert_list_eq;
    use crate::gen7::test_utils::{BLINK, NO_BLINK};
    use crate::gen7::{NpcModel, model_count_from_npcs};
    use crate::rng::{StateIterator, sfmt::Sfmt};
    use crate::test_utils::FakeRng;
    use std::iter::Zip;
    use std::ops::RangeFrom;

    const IDLE_DELAY_ADVANCES: usize = STARTER_GIFT.steps_from_a_press_to_generation as usize * 2;

    fn rands_after_idle_delay(generation: &[u64]) -> Vec<u64> {
        let mut values = vec![NO_BLINK; IDLE_DELAY_ADVANCES];
        values.extend_from_slice(generation);
        values
    }

    fn generate_with_idle_npc(rands: &[u64], tsv: u16) -> Gen7Gift {
        let npcs = NpcModel::new(model_count_from_npcs(1));
        let timeline = Timeline::from_npcs(FakeRng::new(rands), npcs, 1000);
        generate_gift(timeline, tsv, &STARTER_GIFT)
    }

    #[test]
    fn generates_after_the_delay() {
        let rands = rands_after_idle_delay(&[
            0xffff_ffff_1234_5678, // EC
            0xffff_ffff_8765_4321, // PID
            0x20 | 1,              // HP
            2,                     // Atk
            3,                     // Def
            4,                     // SpA
            5,                     // SpD
            0x1f,                  // Spe
            1,                     // Ability
            25 + 15,               // Nature
            252 + 30,              // Gender
        ]);

        assert_eq!(
            generate_with_idle_npc(&rands, 0),
            Gen7Gift {
                advance: 1000,
                delay_advances: IDLE_DELAY_ADVANCES,
                ec: 0x1234_5678,
                pid: 0x8765_4321,
                psv: gen6_psv(0x8765_4321),
                shiny: false,
                ivs: Ivs::new(1, 2, 3, 4, 5, 31),
                ability: AbilityType::Second,
                nature: Nature::Modest,
                gender: Gender::Male,
            }
        );
    }

    #[test]
    fn gender_threshold() {
        let generation = |gender_rand| {
            let mut values = vec![0; 10];
            values.push(gender_rand);
            generate_with_idle_npc(&rands_after_idle_delay(&values), 0).gender
        };

        assert_eq!(generation(29), Gender::Female);
        assert_eq!(generation(30), Gender::Male);
        assert_eq!(generation(251), Gender::Male);
        assert_eq!(generation(252 + 29), Gender::Female);
    }

    #[test]
    fn ability_uses_the_low_bit() {
        let ability = |ability_rand| {
            let mut values = vec![0; 8];
            values.extend([ability_rand, 0, 0]);
            generate_with_idle_npc(&rands_after_idle_delay(&values), 0).ability
        };

        assert_eq!(ability(0), AbilityType::First);
        assert_eq!(ability(1), AbilityType::Second);
        assert_eq!(ability(2), AbilityType::First);
    }

    #[test]
    fn sync_nature_skips_the_nature_rand() {
        let mut values = vec![0; 8];
        // Ability, then gender. A nature rand would come between them.
        values.extend([1, 29]);
        let settings = GiftSettings {
            sync_nature: Some(Nature::Adamant),
            ..STARTER_GIFT
        };
        let npcs = NpcModel::new(model_count_from_npcs(1));
        let rands = rands_after_idle_delay(&values);
        let timeline = Timeline::from_npcs(FakeRng::new(&rands), npcs, 1000);

        let gift = generate_gift(timeline, 0, &settings);

        assert_eq!(gift.nature, Nature::Adamant);
        assert_eq!(gift.ability, AbilityType::Second);
        assert_eq!(gift.gender, Gender::Female);
    }

    #[test]
    fn delay_follows_the_settings() {
        let settings = GiftSettings {
            steps_from_a_press_to_generation: 15,
            ..STARTER_GIFT
        };
        let npcs = NpcModel::new(model_count_from_npcs(1));
        let timeline = Timeline::from_npcs(FakeRng::new(&[NO_BLINK; 60]), npcs, 1000);

        assert_eq!(delay_advances(&timeline, &settings), 30);
        assert_eq!(generate_gift(timeline, 0, &settings).delay_advances, 30);
    }

    #[test]
    fn shiny_when_psv_matches_tsv() {
        let pid = 0x8765_4321;
        let mut values = vec![0, pid];
        values.extend([0; 9]);
        let tsv = gen6_psv(pid as u32);

        let rands = rands_after_idle_delay(&values);
        assert!(generate_with_idle_npc(&rands, tsv).shiny);
        assert!(!generate_with_idle_npc(&rands, tsv + 1).shiny);
    }

    #[test]
    fn npc_blinks_during_the_delay_use_fewer_advances() {
        // Step 1: the player, then the NPC blinks.
        let mut values = vec![NO_BLINK, BLINK];
        values.extend([NO_BLINK; 4]);
        // Step 6: the player, then the NPC picks a cooldown.
        values.extend([NO_BLINK, 1]);
        values.extend([NO_BLINK; 6]);
        let delay_advances = values.len();
        let ec_rand = 0xffff_ffff_1234_5678;
        values.push(ec_rand);
        values.extend([0; 10]);

        let starter = generate_with_idle_npc(&values, 0);

        assert_eq!(delay_advances, 14);
        assert_eq!(starter.delay_advances, delay_advances);
        assert_eq!(starter.ec, 0x1234_5678);
    }

    struct StarterScanner {
        advance_rngs: Zip<RangeFrom<usize>, StateIterator<Sfmt>>,
        npc_rng: Sfmt,
        npcs: NpcModel,
        npcs_before_step: NpcModel,
        advances_left_in_step: usize,
    }

    impl StarterScanner {
        fn new(seed: u32, first_advance: usize) -> Self {
            let mut rng = Sfmt::new(seed);
            rng.advance(first_advance);
            let npcs = NpcModel::new(model_count_from_npcs(1));

            Self {
                npc_rng: rng.clone(),
                advance_rngs: (first_advance..).zip(StateIterator::new(rng)),
                npcs_before_step: npcs.clone(),
                npcs,
                advances_left_in_step: 0,
            }
        }
    }

    impl Iterator for StarterScanner {
        type Item = Gen7Gift;

        fn next(&mut self) -> Option<Self::Item> {
            let (advance, rng) = self.advance_rngs.next()?;

            if self.advances_left_in_step == 0 {
                self.npcs_before_step.clone_from(&self.npcs);
                // Steps where every model is mid-blink keep the states from before them.
                while self.advances_left_in_step == 0 {
                    self.advances_left_in_step = self.npcs.step(&mut self.npc_rng);
                }
            }

            let timeline = Timeline::from_npcs(rng, self.npcs_before_step.clone(), advance);
            let starter = generate_gift(timeline, 0, &STARTER_GIFT);
            self.advances_left_in_step -= 1;
            Some(starter)
        }
    }

    const SCAN_SEED: u32 = 0xdeadbeef;

    fn scan_starters(first_advance: usize, last_advance: usize) -> Vec<Gen7Gift> {
        StarterScanner::new(SCAN_SEED, first_advance)
            .take(last_advance - first_advance + 1)
            .collect()
    }

    fn parse_expected_rows(text: &str) -> Vec<Gen7Gift> {
        text.lines()
            .map(|line| {
                let cols: Vec<&str> = line.split('\t').collect();
                let num = |index: usize| cols[index].parse::<u32>().unwrap();
                let hex = |index: usize| u32::from_str_radix(cols[index], 16).unwrap();
                let iv = |index: usize| num(index) as u8;
                let pid = hex(2);
                assert_eq!(gen6_psv(pid) as u32, num(3), "PSV column");

                Gen7Gift {
                    advance: num(0) as usize,
                    delay_advances: num(13) as usize,
                    ec: hex(1),
                    pid,
                    psv: gen6_psv(pid),
                    shiny: gen6_psv(pid) == 0,
                    ivs: Ivs::new(iv(4), iv(5), iv(6), iv(7), iv(8), iv(9)),
                    ability: match num(10) {
                        1 => AbilityType::First,
                        2 => AbilityType::Second,
                        ability => panic!("unexpected ability {ability}"),
                    },
                    nature: (num(11) as u8).into(),
                    gender: match num(12) {
                        1 => Gender::Male,
                        2 => Gender::Female,
                        gender => panic!("unexpected gender {gender}"),
                    },
                }
            })
            .collect()
    }

    #[test]
    fn matches_expected_478_520() {
        let expected = parse_expected_rows(include_str!("test_data/usum_starter_478_520.txt"));
        assert_list_eq!(scan_starters(478, 520), expected);
    }

    #[test]
    fn matches_expected_with_blink() {
        let expected = parse_expected_rows(include_str!("test_data/usum_starter_1380_1400.txt"));
        assert_list_eq!(scan_starters(1380, 1400), expected);
    }

    #[test]
    fn scan_starts_with_idle_npcs() {
        let timeline = Timeline::new(SCAN_SEED, model_count_from_npcs(1), 1000);
        assert_eq!(
            scan_starters(1000, 1000),
            vec![generate_gift(timeline, 0, &STARTER_GIFT)]
        );
    }
}
