use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::wasm_bindgen;

use crate::{Gender, Nature};

#[derive(Clone, Copy, Default, Debug, Eq, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen3Method {
    #[default]
    Wild1,
    Wild2,
    Wild3,
    Wild4,
    Wild5,
}

#[derive(Clone, Copy, Default, Debug, Eq, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Gen3Lead {
    #[default]
    Vanilla,
    Synchronize(Nature),
    CuteCharm(Gender),
    Egg,
    MagnetPull,
    Static,
    HustleVitalSpiritPressure,
}

#[derive(Clone, Copy, Default, Debug, Eq, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Wild3Action {
    #[default]
    SweetScentLand = 0,
    SweetScentWater = 1,
    OldRod = 2,
    GoodRod = 3,
    SuperRod = 4,
    RockSmash = 5, // Code assumes it's the last element.
}

impl Wild3Action {
    pub fn is_fishing(&self) -> bool {
        matches!(
            self,
            Wild3Action::OldRod | Wild3Action::GoodRod | Wild3Action::SuperRod
        )
    }
}
