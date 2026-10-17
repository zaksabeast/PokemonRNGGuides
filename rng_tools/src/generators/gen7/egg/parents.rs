use crate::{AbilityType, G5Idx, Ivs, Nature};
use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen7EggParentSlot {
    Male,
    Female,
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen7EggItem {
    #[default]
    None,
    Everstone,
    DestinyKnot,
    PowerWeight,
    PowerBracer,
    PowerBelt,
    PowerLens,
    PowerBand,
    PowerAnklet,
}

impl Gen7EggItem {
    fn power_stat(self) -> Option<G5Idx> {
        match self {
            Self::PowerWeight => Some(G5Idx::Hp),
            Self::PowerBracer => Some(G5Idx::Atk),
            Self::PowerBelt => Some(G5Idx::Def),
            Self::PowerLens => Some(G5Idx::Spa),
            Self::PowerBand => Some(G5Idx::Spd),
            Self::PowerAnklet => Some(G5Idx::Spe),
            Self::None | Self::Everstone | Self::DestinyKnot => None,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7EggParent {
    pub ivs: Ivs,
    pub item: Gen7EggItem,
    pub ability: AbilityType,
    /// Only used when the parent holds an Everstone.
    pub nature: Nature,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct Gen7EggParents {
    pub male: Gen7EggParent,
    pub female: Gen7EggParent,
    /// A Ditto takes the place of the opposite gender's parent.
    pub ditto: Option<Gen7EggParentSlot>,
    /// Both parents are the same species. Ignored with a Ditto.
    pub same_species: bool,
}

impl Gen7EggParents {
    pub(super) fn parent(&self, slot: Gen7EggParentSlot) -> &Gen7EggParent {
        match slot {
            Gen7EggParentSlot::Male => &self.male,
            Gen7EggParentSlot::Female => &self.female,
        }
    }
}

pub(super) enum EverstoneRule {
    /// Each parent holds one, so a rand picks the parent.
    Both,
    One(Gen7EggParentSlot),
}

pub(super) enum PowerItemRule {
    /// Each parent holds one, so a rand picks the parent.
    Both {
        male_stat: G5Idx,
        female_stat: G5Idx,
    },
    One {
        parent: Gen7EggParentSlot,
        stat: G5Idx,
    },
}

/// How the parents' items and abilities pass down, worked out once per
/// search like 3DSRNGTool's `MarkItem`.
pub(super) struct InheritanceRules {
    pub everstone: Option<EverstoneRule>,
    pub power_item: Option<PowerItemRule>,
    pub inherited_iv_count: usize,
    /// The ability slot of the parent the egg's ability comes from.
    pub parent_ability: AbilityType,
    /// Same species parents roll which one the Poke Ball comes from.
    pub rolls_ball: bool,
    pub female_is_ditto: bool,
}

impl InheritanceRules {
    pub(super) fn new(parents: &Gen7EggParents) -> Self {
        let male = &parents.male;
        let female = &parents.female;
        let female_is_ditto = parents.ditto == Some(Gen7EggParentSlot::Female);

        let everstone = match (
            male.item == Gen7EggItem::Everstone,
            female.item == Gen7EggItem::Everstone,
        ) {
            (true, true) => Some(EverstoneRule::Both),
            (true, false) => Some(EverstoneRule::One(Gen7EggParentSlot::Male)),
            (false, true) => Some(EverstoneRule::One(Gen7EggParentSlot::Female)),
            (false, false) => None,
        };

        let power_item = match (male.item.power_stat(), female.item.power_stat()) {
            (Some(male_stat), Some(female_stat)) => Some(PowerItemRule::Both {
                male_stat,
                female_stat,
            }),
            (Some(stat), None) => Some(PowerItemRule::One {
                parent: Gen7EggParentSlot::Male,
                stat,
            }),
            (None, Some(stat)) => Some(PowerItemRule::One {
                parent: Gen7EggParentSlot::Female,
                stat,
            }),
            (None, None) => None,
        };

        let destiny_knot =
            male.item == Gen7EggItem::DestinyKnot || female.item == Gen7EggItem::DestinyKnot;

        Self {
            everstone,
            power_item,
            inherited_iv_count: if destiny_knot { 5 } else { 3 },
            parent_ability: if female_is_ditto {
                male.ability
            } else {
                female.ability
            },
            rolls_ball: parents.same_species && parents.ditto.is_none(),
            female_is_ditto,
        }
    }
}
