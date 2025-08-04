use super::Ivs;

pub fn is_max_size(pid: u32, ivs: &Ivs) -> bool {
    // scale of 65534 and 65535 are displayed the same in-game
    calculate_size_scale(pid, ivs) >= 65534
}

pub fn calculate_size_scale(pid: u32, ivs: &Ivs) -> u16 {
    let hp = (ivs.hp & 0b1111) as u16;
    let atk = (ivs.atk & 0b1111) as u16;
    let def = (ivs.def & 0b1111) as u16;
    let spa = (ivs.spa & 0b1111) as u16;
    let spd = (ivs.spd & 0b1111) as u16;
    let spe = (ivs.spe & 0b1111) as u16;

    let low_pid = (pid & 0xFF) as u16;
    let high_pid = ((pid & 0xFF00) >> 8) as u16;
    256 * (low_pid ^ (hp * (atk ^ def))) + (high_pid ^ (spe * (spa ^ spd)))
}
