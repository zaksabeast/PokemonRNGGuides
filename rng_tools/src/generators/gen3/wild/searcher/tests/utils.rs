use itertools::Itertools;

use crate::gen3::PidPath;

pub fn pid_paths_to_string<I>(iter: I) -> Vec<String>
where
    I: Iterator<Item = PidPath>,
{
    iter.sorted_by(|res1, res2| {
        res1.adv_from_seed_0()
            .cmp(&res2.adv_from_seed_0())
            .then_with(|| (res1.method() as u8).cmp(&(res2.method() as u8)))
    })
    .map(|pid_path| pid_path.to_string())
    .collect::<Vec<_>>()
}

pub fn strs_to_string(strs: &'static [&str]) -> Vec<String> {
    strs.iter()
        .map(|str| String::from(*str))
        .collect::<Vec<_>>()
}
