use super::egg_rng::EggRng;
use super::parents::{
    EverstoneRule, Gen7EggParentSlot, Gen7EggParents, InheritanceRules, PowerItemRule,
};
use super::pid::EggPidStrategy;
use crate::rng::tinymt::TinyMT;
use crate::{AbilityType, G5Idx, Gender, GenderRatio, Ivs, Nature, PkmState, gen6_psv};
use serde::{Deserialize, Serialize};
use tsify::Tsify;

/// Rands after the ball for adopting the egg and clearing it from the Nursery.
const RANDS_AFTER_BALL: usize = 2;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7Egg {
    pub advance: usize,
    /// Advances that accepting this egg moves the egg seeds forward by.
    /// Rejecting it always moves them forward by 1.
    pub accept_advances: usize,
    /// The egg seeds this egg generates from.
    pub seed: [u32; 4],
    pub ec: u32,
    pub pid: u32,
    pub psv: u16,
    pub shiny: bool,
    pub ivs: Ivs,
    /// The parent each IV came from, in HP, Atk, Def, SpA, SpD, Spe order.
    /// Random IVs are `None`.
    pub inherited_ivs: [Option<Gen7EggParentSlot>; 6],
    pub ability: AbilityType,
    pub nature: Nature,
    pub gender: Gender,
    pub ball: Gen7EggParentSlot,
}

impl PkmState for Gen7Egg {
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

/// The egg species' gender ratio. Species data ends at Gen 5, so this is
/// entered directly, like in 3DSRNGTool.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen7EggGender {
    Ratio(GenderRatio),
    /// Nidoran and Volbeat/Illumise eggs pick the species, and so the gender,
    /// with a coin flip.
    CoinFlip,
}

impl Gen7EggGender {
    fn roll(self, rng: &mut EggRng) -> Gender {
        match self {
            Self::CoinFlip => match rng.rand_bit() {
                0 => Gender::Male,
                _ => Gender::Female,
            },
            Self::Ratio(ratio) if ratio.has_multiple_genders() => {
                ratio.gender(rng.rand_mod(252) as u8 + 1)
            }
            Self::Ratio(ratio) => ratio.gender(0),
        }
    }
}

/// Everything about an egg that stays the same for each advance.
pub(super) struct EggSettings {
    parents: Gen7EggParents,
    rules: InheritanceRules,
    gender: Gen7EggGender,
    tsv: u16,
}

impl EggSettings {
    pub(super) fn new(gender: Gen7EggGender, parents: &Gen7EggParents, tsv: u16) -> Self {
        Self {
            parents: parents.clone(),
            rules: InheritanceRules::new(parents),
            gender,
            tsv,
        }
    }

    fn parent_ivs(&self, slot: Gen7EggParentSlot) -> &Ivs {
        &self.parents.parent(slot).ivs
    }
}

fn parent_from_bit(bit: u32) -> Gen7EggParentSlot {
    match bit {
        0 => Gen7EggParentSlot::Male,
        _ => Gen7EggParentSlot::Female,
    }
}

fn egg_ability(parent_ability: AbilityType, rand: u32) -> AbilityType {
    match parent_ability {
        AbilityType::First if rand < 80 => AbilityType::First,
        AbilityType::First => AbilityType::Second,
        AbilityType::Second if rand < 20 => AbilityType::First,
        AbilityType::Second => AbilityType::Second,
        AbilityType::Hidden if rand < 20 => AbilityType::First,
        AbilityType::Hidden if rand < 40 => AbilityType::Second,
        AbilityType::Hidden => AbilityType::Hidden,
    }
}

/// The egg from the egg seeds in `state`. The rand order follows
/// 3DSRNGTool's `Egg7`.
pub(super) fn generate_egg<Pid: EggPidStrategy>(
    state: TinyMT,
    advance: usize,
    settings: &EggSettings,
) -> Gen7Egg {
    let seed = state.get_state();
    let rules = &settings.rules;
    let mut rng = EggRng::new(state);

    let gender = settings.gender.roll(&mut rng);

    let random_nature = Nature::from(rng.rand_mod(25) as u8);
    let nature = match &rules.everstone {
        None => random_nature,
        Some(EverstoneRule::Both) => {
            settings
                .parents
                .parent(parent_from_bit(rng.rand_bit()))
                .nature
        }
        Some(EverstoneRule::One(slot)) => settings.parents.parent(*slot).nature,
    };

    let ability = egg_ability(rules.parent_ability, rng.rand_mod(100));

    let mut inherited_ivs: [Option<Gen7EggParentSlot>; 6] = [None; 6];
    match &rules.power_item {
        None => {}
        Some(PowerItemRule::Both {
            male_stat,
            female_stat,
        }) => match parent_from_bit(rng.rand_bit()) {
            Gen7EggParentSlot::Male => {
                inherited_ivs[*male_stat as usize] = Some(Gen7EggParentSlot::Male);
            }
            Gen7EggParentSlot::Female => {
                inherited_ivs[*female_stat as usize] = Some(Gen7EggParentSlot::Female);
            }
        },
        Some(PowerItemRule::One { parent, stat }) => {
            inherited_ivs[*stat as usize] = Some(*parent);
        }
    }

    // A power item's stat counts toward the inherited IVs.
    let first_random_inherit = usize::from(rules.power_item.is_some());
    for _ in first_random_inherit..rules.inherited_iv_count {
        let stat = loop {
            let stat = rng.rand_mod(6) as usize;
            if inherited_ivs[stat].is_none() {
                break stat;
            }
        };
        inherited_ivs[stat] = Some(parent_from_bit(rng.rand_bit()));
    }

    // Inherited IVs still use their random IV rand.
    let mut ivs = Ivs::default();
    for (stat, parent) in G5Idx::ORDER.into_iter().zip(inherited_ivs) {
        let random_iv = (rng.rand() & 0x1f) as u8;
        ivs[stat] = match parent {
            Some(parent) => settings.parent_ivs(parent)[stat],
            None => random_iv,
        };
    }

    let ec = rng.rand();
    let pid = Pid::roll(&mut rng, settings.tsv);
    let psv = gen6_psv(pid);

    // Only same species parents use a rand for the ball.
    let ball = if rules.rolls_ball {
        match rng.rand_mod(100) {
            0..50 => Gen7EggParentSlot::Female,
            _ => Gen7EggParentSlot::Male,
        }
    } else if rules.female_is_ditto {
        Gen7EggParentSlot::Male
    } else {
        Gen7EggParentSlot::Female
    };

    for _ in 0..RANDS_AFTER_BALL {
        rng.rand();
    }

    Gen7Egg {
        advance,
        accept_advances: rng.used(),
        seed,
        ec,
        pid,
        psv,
        shiny: psv == settings.tsv,
        ivs,
        inherited_ivs,
        ability,
        nature,
        gender,
        ball,
    }
}
