use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

pub const fn seconds_to_frames(seconds: u32) -> u32 {
    seconds * 60
}

pub const fn minutes_to_frames(minutes: u32) -> u32 {
    seconds_to_frames(minutes * 60)
}

pub const fn hours_to_frames(hours: u32) -> u32 {
    minutes_to_frames(hours * 60)
}

pub const MAX_FRAMES: u32 =
    hours_to_frames(999) + minutes_to_frames(59) + seconds_to_frames(59) + 59;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct SaveTime {
    pub hours: u16,
    pub minutes: u8,
    pub seconds: u8,
    pub frames: u8,
}

impl SaveTime {
    pub fn to_total_frames(&self) -> u32 {
        hours_to_frames(self.hours as u32)
            + minutes_to_frames(self.minutes as u32)
            + seconds_to_frames(self.seconds as u32)
            + self.frames as u32
    }

    pub fn from_total_frames(total_frames: u32) -> Self {
        let frames = (total_frames % 60) as u8;
        let seconds = ((total_frames / 60) % 60) as u8;
        let minutes = ((total_frames / 3_600) % 60) as u8;
        let hours = (total_frames / 216_000) as u16;

        SaveTime {
            hours,
            minutes,
            seconds,
            frames,
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn to_total_frames() {
        let save_time = SaveTime {
            hours: 1,
            minutes: 2,
            seconds: 3,
            frames: 4,
        };
        assert_eq!(
            save_time.to_total_frames(),
            (1 * 216_000) + (2 * 3_600) + (3 * 60) + 4
        );
    }

    #[test]
    fn from_total_frames() {
        let total_frames = (1 * 216_000) + (2 * 3_600) + (3 * 60) + 4;
        let save_time = SaveTime::from_total_frames(total_frames);
        assert_eq!(save_time.hours, 1);
        assert_eq!(save_time.minutes, 2);
        assert_eq!(save_time.seconds, 3);
        assert_eq!(save_time.frames, 4);
    }
}
