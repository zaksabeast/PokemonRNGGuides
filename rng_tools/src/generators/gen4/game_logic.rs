pub trait GameSpecificLogic {
    fn max(rand: u16, max: u16) -> u16;
    fn sync_check(rand: u16) -> u16;
}

pub struct HgssLogic;

impl GameSpecificLogic for HgssLogic {
    fn max(rand: u16, max: u16) -> u16 {
        rand % max
    }

    fn sync_check(rand: u16) -> u16 {
        rand % 2
    }
}

pub struct DpptLogic;

impl GameSpecificLogic for DpptLogic {
    fn max(rand: u16, max: u16) -> u16 {
        rand / ((0xffff / max) + 1)
    }

    fn sync_check(rand: u16) -> u16 {
        rand >> 15
    }
}
