use std::collections::HashSet;

use super::*;

#[test]
fn test_find_iv1_seeds_from_ivs_with_vblank() {
    let results = reverse_find_iv1_seeds_from_ivs_values_with_vblank(29, 31, 31, 31, 31, 31)
        .into_iter()
        .collect::<HashSet<_>>();
    assert_eq!(results, HashSet::<u32>::from([3082667636, 935183988]));

    let results = reverse_find_iv1_seeds_from_ivs_values_with_vblank(31, 31, 31, 31, 31, 1)
        .into_iter()
        .collect::<HashSet<_>>();
    assert_eq!(
        results,
        HashSet::<u32>::from([3923710577, 3400723838, 1776226929, 1253240190,])
    );
}

#[test]
fn test_find_iv1_seeds_from_ivs_no_vblank() {
    let results = reverse_find_iv1_seeds_from_ivs_values_no_vblank(29, 31, 31, 31, 31, 31)
        .into_iter()
        .collect::<HashSet<_>>();
    assert_eq!(
        results,
        HashSet::<u32>::from([
            3598036769, 3582849630, 1435365982, 1719703965, 3867187613, 1450553121
        ])
    );

    let results = reverse_find_iv1_seeds_from_ivs_values_no_vblank(31, 31, 31, 31, 31, 1)
        .into_iter()
        .collect::<HashSet<_>>();
    assert_eq!(results, HashSet::<u32>::from([1650773405, 3798257053]));
}

#[test]
fn test_find_iv_seeds() {
    let results = reverse_find_iv_paths_from_min_max_ivs(
        Ivs::new(29, 31, 31, 31, 31, 31),
        Ivs::new(30, 31, 31, 31, 31, 31),
        None,
    )
    .iter()
    .map(|iv_seed| iv_seed.seed)
    .collect::<HashSet<_>>();

    assert_eq!(
        results,
        HashSet::<u32>::from([
            1734891104, 3882374752, 3867187613, 1450553121, 935183988, 1435365982, 2538483370,
            2015496631, 3639993540, 3598036769, 3082667636, 4162980279, 3582849630, 390999722,
            1492509892, 1719703965
        ])
    );
}
