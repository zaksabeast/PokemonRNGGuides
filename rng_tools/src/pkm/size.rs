use super::Ivs;

pub fn is_max_size(pid: u32, ivs: &Ivs) -> bool {
    //NO_PROD
    return calculate_size(pid, ivs) >= 65534;
}

pub fn calculate_size(_pid: u32, _ivs: &Ivs) -> u32 {
    //NO_PROD
    return 12345;
}
