use super::egg_rng::EggRng;
use super::parents::{
    BallRule, EverstoneRule, Gen7EggParentSlot, Gen7EggParents, InheritanceRules, PowerItemRule,
};
use super::pid::EggPidStrategy;
use crate::rng::tinymt::TinyMT;
use crate::{
    AbilityType, G5Idx, Gender, GenderRatio, Ivs, Nature, PkmState, ShinyType, TsvTrv, gen6_psv,
};
use serde::{Deserialize, Serialize};
use tsify::Tsify;

const ADOPT_AND_CLEAR_EGG_RANDS: usize = 2;

type IvSourceParents = [Option<Gen7EggParentSlot>; 6];

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7Egg {
    pub advance: usize,
    /// Advances that accepting this egg moves the egg seeds forward by.
    /// Rejecting it always moves them forward by 1.
    pub accept_advances: usize,
    pub egg_seeds: [u32; 4],
    pub ec: u32,
    pub pid: u32,
    pub psv: u16,
    pub shiny: ShinyType,
    pub ivs: Ivs,
    /// In HP, Atk, Def, SpA, SpD, Spe order. Random IVs are `None`.
    pub iv_source_parents: [Option<Gen7EggParentSlot>; 6],
    pub ability: AbilityType,
    pub nature: Nature,
    pub gender: Gender,
    pub ball_parent: Gen7EggParentSlot,
}

impl PkmState for Gen7Egg {
    fn pid(&self) -> u32 {
        self.pid
    }

    fn shiny(&self) -> ShinyType {
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
    /// These eggs pick one species of the pair with a random bit, and each
    /// species has only one gender.
    NidoranOrVolbeatIllumise,
}

impl Gen7EggGender {
    fn roll(self, rng: &mut EggRng) -> Gender {
        match self {
            Self::NidoranOrVolbeatIllumise => match rng.rand_bit() {
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

pub(super) struct EggSettings {
    parents: Gen7EggParents,
    rules: InheritanceRules,
    gender: Gen7EggGender,
    tsv_trv: TsvTrv,
}

impl EggSettings {
    pub(super) fn new(gender: Gen7EggGender, parents: &Gen7EggParents, tsv_trv: TsvTrv) -> Self {
        Self {
            parents: parents.clone(),
            rules: InheritanceRules::new(parents),
            gender,
            tsv_trv,
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

fn egg_ability(inheritable_ability: AbilityType, percent_roll: u32) -> AbilityType {
    match inheritable_ability {
        AbilityType::First if percent_roll < 80 => AbilityType::First,
        AbilityType::First => AbilityType::Second,
        AbilityType::Second if percent_roll < 20 => AbilityType::First,
        AbilityType::Second => AbilityType::Second,
        AbilityType::Hidden if percent_roll < 20 => AbilityType::First,
        AbilityType::Hidden if percent_roll < 40 => AbilityType::Second,
        AbilityType::Hidden => AbilityType::Hidden,
    }
}

fn egg_nature(rng: &mut EggRng, settings: &EggSettings) -> Nature {
    // The game rolls a random nature even when an Everstone replaces it.
    let random_nature = Nature::from(rng.rand_mod(25) as u8);

    match settings.rules.everstone {
        None => random_nature,
        Some(EverstoneRule::Both) => {
            let slot = parent_from_bit(rng.rand_bit());

            settings.parents.parent(slot).nature
        }
        Some(EverstoneRule::One(slot)) => settings.parents.parent(slot).nature,
    }
}

fn inherit_power_item_iv(
    rng: &mut EggRng,
    rules: &InheritanceRules,
    iv_source_parents: &mut IvSourceParents,
) {
    let (parent, stat) = match rules.power_item {
        None => return,
        Some(PowerItemRule::One { parent, stat }) => (parent, stat),
        Some(PowerItemRule::Both {
            male_stat,
            female_stat,
        }) => match parent_from_bit(rng.rand_bit()) {
            Gen7EggParentSlot::Male => (Gen7EggParentSlot::Male, male_stat),
            Gen7EggParentSlot::Female => (Gen7EggParentSlot::Female, female_stat),
        },
    };

    iv_source_parents[stat as usize] = Some(parent);
}

fn inherit_random_ivs(
    rng: &mut EggRng,
    rules: &InheritanceRules,
    iv_source_parents: &mut IvSourceParents,
) {
    let power_item_iv_count = usize::from(rules.power_item.is_some());

    for _ in power_item_iv_count..rules.inherited_iv_count {
        let stat = uninherited_stat(rng, iv_source_parents);
        iv_source_parents[stat] = Some(parent_from_bit(rng.rand_bit()));
    }
}

fn uninherited_stat(rng: &mut EggRng, iv_source_parents: &IvSourceParents) -> usize {
    loop {
        let stat = rng.rand_mod(6) as usize;
        if iv_source_parents[stat].is_none() {
            return stat;
        }
    }
}

fn egg_ivs(rng: &mut EggRng, settings: &EggSettings, iv_source_parents: &IvSourceParents) -> Ivs {
    let mut ivs = Ivs::default();

    for (stat, parent) in G5Idx::ORDER.into_iter().zip(iv_source_parents) {
        let random_iv = (rng.rand() & 0x1f) as u8;
        ivs[stat] = match parent {
            Some(parent) => settings.parent_ivs(*parent)[stat],
            None => random_iv,
        };
    }

    ivs
}

fn egg_ball_parent(rng: &mut EggRng, rules: &InheritanceRules) -> Gen7EggParentSlot {
    match rules.ball {
        BallRule::Parent(parent) => parent,
        BallRule::RandomParent => match rng.rand_mod(100) {
            0..50 => Gen7EggParentSlot::Female,
            _ => Gen7EggParentSlot::Male,
        },
    }
}

pub(super) fn generate_egg<Pid: EggPidStrategy>(
    state: TinyMT,
    advance: usize,
    settings: &EggSettings,
) -> Gen7Egg {
    let egg_seeds = state.get_state();
    let rules = &settings.rules;
    let mut rng = EggRng::new(state);

    let gender = settings.gender.roll(&mut rng);
    let nature = egg_nature(&mut rng, settings);
    let ability = egg_ability(rules.inheritable_ability, rng.rand_mod(100));

    let mut iv_source_parents: IvSourceParents = [None; 6];
    inherit_power_item_iv(&mut rng, rules, &mut iv_source_parents);
    inherit_random_ivs(&mut rng, rules, &mut iv_source_parents);
    let ivs = egg_ivs(&mut rng, settings, &iv_source_parents);

    let ec = rng.rand();
    let pid = Pid::roll(&mut rng, settings.tsv_trv.tsv_gen6_plus());
    let psv = gen6_psv(pid);
    let ball_parent = egg_ball_parent(&mut rng, rules);

    for _ in 0..ADOPT_AND_CLEAR_EGG_RANDS {
        rng.rand();
    }

    Gen7Egg {
        advance,
        accept_advances: rng.rand_count(),
        egg_seeds,
        ec,
        pid,
        psv,
        shiny: settings.tsv_trv.shiny_type_gen6_plus(pid),
        ivs,
        iv_source_parents,
        ability,
        nature,
        gender,
        ball_parent,
    }
}
