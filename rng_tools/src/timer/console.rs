use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

use super::calibrator::Calibrator;

const GBA_FPS: f32 = 59.7275;
const NDS_SLOT1_FPS: f32 = 59.8261;
const NDS_SLOT2_FPS: f32 = 59.6555;

const GBA_FRAMERATE: f32 = 1000.0 / GBA_FPS;
const NDS_SLOT1_FRAMERATE: f32 = 1000.0 / NDS_SLOT1_FPS;
const NDS_SLOT2_FRAMERATE: f32 = 1000.0 / NDS_SLOT2_FPS;

#[derive(Debug, Clone, Copy, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Console {
    Gba,
    NdsSlot2,
    NdsSlot1,
    Dsi,
    ThreeDs,
}

impl Console {
    pub fn fps(&self) -> f32 {
        match self {
            Console::Gba => GBA_FPS,
            Console::NdsSlot2 => NDS_SLOT2_FPS,
            Console::NdsSlot1 | Console::ThreeDs | Console::Dsi => NDS_SLOT1_FPS,
        }
    }

    pub fn framerate(&self) -> f32 {
        match self {
            Console::Gba => GBA_FRAMERATE,
            Console::NdsSlot2 => NDS_SLOT2_FRAMERATE,
            Console::NdsSlot1 | Console::ThreeDs | Console::Dsi => NDS_SLOT1_FRAMERATE,
        }
    }

    pub fn to_calibrator(self) -> Calibrator {
        Calibrator::new(self.framerate())
    }
}
