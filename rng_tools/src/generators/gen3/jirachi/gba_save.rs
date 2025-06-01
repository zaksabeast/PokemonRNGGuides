use super::save_time::SaveTime;
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;

const BLOCK_ID_OFFSET: usize = 0xff4;
const BLOCK_COUNT: usize = 14;
const SIZE_BLOCK: usize = 0x1000;
const BLOCK_MAGIC: u32 = 0x8012025;
const SAVE_LEN_1: usize = 131_088;
const SAVE_LEN_2: usize = 131_072;

fn chk_u32(data: impl Iterator<Item = u32>) -> u32 {
    data.fold(0u32, u32::wrapping_add)
}

pub fn chk_u16(data: impl Iterator<Item = u32>) -> u16 {
    let chk = chk_u32(data);
    (chk as u16).wrapping_add((chk >> 16) as u16)
}

fn le_u16(bytes: &[u8]) -> u16 {
    u16::from_le_bytes(bytes.try_into().unwrap())
}

fn le_u32(bytes: &[u8]) -> u32 {
    u32::from_le_bytes(bytes.try_into().unwrap())
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum Sav3ReadError {
    InvalidLength,
    InvalidMagic,
}

#[derive(Debug, PartialEq)]
pub enum SaveSlot {
    Save0,
    Save1,
}

pub struct Sav3<'a> {
    data: &'a [u8],
}

impl<'a> Sav3<'a> {
    const SAVE_0_OFFSET: usize = 0;
    const SAVE_1_OFFSET: usize = SIZE_BLOCK * BLOCK_COUNT;

    pub fn new(data: &'a [u8]) -> Result<Self, Sav3ReadError> {
        if data.len() != SAVE_LEN_1 && data.len() != SAVE_LEN_2 {
            return Err(Sav3ReadError::InvalidLength);
        }

        let s0 = Block::new(&data[Self::SAVE_0_OFFSET..][..SIZE_BLOCK]);
        let s1 = Block::new(&data[Self::SAVE_1_OFFSET..][..SIZE_BLOCK]);

        if !s0.valid_magic() && !s1.valid_magic() {
            return Err(Sav3ReadError::InvalidMagic);
        }

        Ok(Self { data })
    }

    pub fn current_save_slot(&self) -> SaveSlot {
        let save = self.data;

        let s0 = Block::new(&save[Self::SAVE_0_OFFSET..][..SIZE_BLOCK]);
        let s1 = Block::new(&save[Self::SAVE_1_OFFSET..][..SIZE_BLOCK]);

        let s0_save_count = s0.save_count();
        let s1_save_count = s1.save_count();

        match (
            s0.valid_magic(),
            s1.valid_magic(),
            s0_save_count,
            s1_save_count,
        ) {
            // Bad save, assume s0
            (false, false, _, _) => SaveSlot::Save0,
            // Only s0 is valid
            (true, false, _, _) => SaveSlot::Save0,
            // Only s1 is valid
            (false, true, _, _) => SaveSlot::Save1,
            // s1 save count overflowed, so it's smaller but newer
            (true, true, 0xffffffff, 0) => SaveSlot::Save1,
            // s0 save count overflowed, so it's smaller but newer
            (true, true, 0, 0xffffffff) => SaveSlot::Save0,
            // Both are valid, neither or both overflowed, so choose the higher number
            (true, true, _, _) => {
                if s0_save_count > s1_save_count {
                    SaveSlot::Save0
                } else {
                    SaveSlot::Save1
                }
            }
        }
    }

    fn current_save_offset(&self) -> usize {
        match self.current_save_slot() {
            SaveSlot::Save0 => Self::SAVE_0_OFFSET,
            SaveSlot::Save1 => Self::SAVE_1_OFFSET,
        }
    }

    fn block_offset(&self, block_id: usize) -> usize {
        let save_offset = self.current_save_offset();
        let first_block_offset = save_offset + BLOCK_ID_OFFSET;
        let first_block_id: usize = self.data[first_block_offset].into();
        let block_0_index = (BLOCK_COUNT - first_block_id) % BLOCK_COUNT;
        let block_index = (block_0_index + block_id) % 14;
        (SIZE_BLOCK * block_index) + save_offset
    }

    pub fn block(&self, block_id: usize) -> Block<'a> {
        let offset = self.block_offset(block_id);
        let block = &self.data[offset..][..SIZE_BLOCK];
        Block::new(block)
    }
}

pub struct Block<'a> {
    data: &'a [u8],
}

impl<'a> Block<'a> {
    fn new(data: &'a [u8]) -> Self {
        Self { data }
    }

    fn valid_magic(&self) -> bool {
        let magic = le_u32(&self.data[0xff8..][..4]);
        magic == BLOCK_MAGIC
    }

    fn save_count(&self) -> u32 {
        le_u32(&self.data[0xffc..][..4])
    }

    pub fn chk_u32(&self) -> u32 {
        chk_u32(self.data.chunks_exact(4).take(0xf80 / 4).map(le_u32))
    }

    pub fn save_time(&self) -> SaveTime {
        SaveTime {
            hours: le_u16(&self.data[0xe..][..2]),
            minutes: self.data[0x10],
            seconds: self.data[0x11],
            frames: self.data[0x12],
        }
    }

    pub fn time_words(&self, save_time: &SaveTime) -> [u32; 2] {
        let hour_bytes = save_time.hours.to_le_bytes();
        [
            le_u32(&[self.data[0xc], self.data[0xd], hour_bytes[0], hour_bytes[1]]),
            le_u32(&[
                save_time.minutes,
                save_time.seconds,
                save_time.frames,
                self.data[0x13],
            ]),
        ]
    }
}

#[cfg(test)]
mod test {
    use super::*;

    mod block {
        use super::*;

        #[test]
        fn checksum_u32() {
            let data = [0xaa, 0xbb, 0xcc, 0xdd, 0x11, 0x22, 0x33, 0x44];
            let block = Block::new(&data);
            let checksum = block.chk_u32();
            assert_eq!(checksum, 0x21ffddbb);
        }

        #[test]
        fn save_time() {
            let mut data = [0; 0x1000];
            data[0xe..][..2].copy_from_slice(&100u16.to_le_bytes());
            data[0x10] = 26;
            data[0x11] = 27;
            data[0x12] = 43;
            let block = Block::new(&data);
            let save_time = block.save_time();
            assert_eq!(save_time.hours, 100);
            assert_eq!(save_time.minutes, 26);
            assert_eq!(save_time.seconds, 27);
            assert_eq!(save_time.frames, 43);
        }

        #[test]
        fn time_words() {
            let data = [0xaa; 0x1000];
            let block = Block::new(&data);
            let save_time = SaveTime {
                hours: 4,
                minutes: 5,
                seconds: 6,
                frames: 7,
            };
            let time_words = block.time_words(&save_time);
            assert_eq!(time_words[0], 0x0004aaaa);
            assert_eq!(time_words[1], 0xaa070605);
        }
    }
}
