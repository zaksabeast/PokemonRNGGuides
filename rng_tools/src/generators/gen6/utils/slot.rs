pub enum Gen6SlotType {
    PokeRadar,
    // Wild,
    // Swooping,
    // FriendSafari2Slots,
    // FriendSafari3Slots,
    // Horde,
    // Fishing,
    // RockSmash,
    // Surfing,
}

impl Gen6SlotType {
    fn slot_distribution(&self) -> &[u8] {
        match self {
            // Gen6SlotType::Wild | Gen6SlotType::Swooping |
            Gen6SlotType::PokeRadar => &[10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100],
            // Gen6SlotType::FriendSafari2Slots => &[50, 100],
            // Gen6SlotType::FriendSafari3Slots => &[34, 67, 100],
            // Gen6SlotType::Horde | Gen6SlotType::Fishing => &[60, 95, 100],
            // Gen6SlotType::RockSmash | Gen6SlotType::Surfing => &[50, 80, 95, 99, 100],
        }
    }

    pub fn slot(&self, rand100: u8) -> u8 {
        self.slot_distribution()
            .iter()
            .position(|&split| rand100 < split)
            .unwrap_or_default() as u8
            + 1
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn slot() {
        let result = Gen6SlotType::PokeRadar.slot(9);
        assert_eq!(result, 1);

        let result = Gen6SlotType::PokeRadar.slot(10);
        assert_eq!(result, 2);

        let result = Gen6SlotType::PokeRadar.slot(19);
        assert_eq!(result, 2);

        let result = Gen6SlotType::PokeRadar.slot(20);
        assert_eq!(result, 3);
    }
}
