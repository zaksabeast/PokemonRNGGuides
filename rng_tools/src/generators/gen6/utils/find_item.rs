pub fn find_item(rand100: u8) -> u8 {
    if rand100 < 50 {
        return 0;
    } else if rand100 < 55 {
        return 1;
    } else {
        return 2;
    }
}
