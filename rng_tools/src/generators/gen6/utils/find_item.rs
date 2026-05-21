pub fn find_item(rand100: u8) -> u8 {
    if rand100 < 50 {
        0
    } else if rand100 < 55 {
        1
    } else {
        2
    }
}
