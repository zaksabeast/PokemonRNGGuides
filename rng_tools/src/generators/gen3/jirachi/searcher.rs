use crate::PkmFilter;

use super::{
    gba_save::{Sav3, SaveSlot, chk_u16},
    generator::{JirachiSpread, MultibootJirachiType},
    save_time::{MAX_FRAMES, SaveTime, hours_to_frames},
};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct MultibootJirachiSaveSpread {
    pub seed: u16,
    pub jirachi: JirachiSpread,
    pub save_time: SaveTime,
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum JirachiSaveError {
    InvalidSave,
    NeedToSaveAgain,
}

pub type JirachiSaveResult = Result<Vec<MultibootJirachiSaveSpread>, JirachiSaveError>;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct MultibootJirachiOptions {
    pub save: Vec<u8>,
    pub hours: u32,
    pub jirachi_type: MultibootJirachiType,
    pub filter: PkmFilter,
}

#[wasm_bindgen]
pub fn search_mb_jirachi_times(opts: MultibootJirachiOptions) -> JirachiSaveResult {
    let save = Sav3::new(&opts.save).ok_or(JirachiSaveError::InvalidSave)?;

    // Wishmaker/Meteor uses the first block 0.
    // If s0 is newer and the user saves, it'll update s1.
    // The user needs to save so they update s0.
    if save.current_save_slot() == SaveSlot::Save0 {
        return Err(JirachiSaveError::NeedToSaveAgain);
    }

    let block0 = save.block(0);
    let save_time = block0.save_time();
    let [hour_word, minute_second_frame_word] = block0.time_words(&save_time);

    let current_chk = block0.chk_u32();
    let base_chk = current_chk
        .wrapping_sub(hour_word)
        .wrapping_sub(minute_second_frame_word);

    let current_frames = save_time.to_total_frames();
    let max_frames = u32::min(MAX_FRAMES, hours_to_frames(opts.hours));

    let results = (current_frames..=max_frames)
        .filter_map(|frames| {
            let save_time = SaveTime::from_total_frames(frames);
            let words = block0.time_words(&save_time).into_iter().chain([base_chk]);
            let chk = chk_u16(words);
            let jirachi = JirachiSpread::new(chk, opts.jirachi_type);

            if !opts.filter.pass_filter(&jirachi) {
                return None;
            }

            Some(MultibootJirachiSaveSpread {
                seed: chk,
                save_time,
                jirachi,
            })
        })
        // No one needs more than 10k results.
        // This is a bit arbitrary, but will make sure too many results aren't returned.
        .take(10_000)
        .collect();

    Ok(results)
}
