use super::*;
use crate::{
    AbilityType, Gender, Ivs, Nature, PkmFilter,
    gen3::{FASTEST_MODULO_CYCLE_24, Gen3Method, Gen3PidSpeedFilter, SLOWEST_MODULO_CYCLE_24},
};

mod utils;
use utils::{pid_paths_to_string, strs_to_string};

#[test]
fn test_extend_iv_path_to_pid_paths() {
    let opts = FindPidPathsOptions {
        ..Default::default()
    };
    let iv_path = IvPath {
        seed: 0,
        iv_arc: IvFromStartArc::WithoutVBlank,
    };
    let results = extend_iv_path_to_pid_paths::<true>(&opts, iv_path);
    assert_eq!(
        results,
        ArrayVec::<PidPath, 3>::from([
            PidPath::from_method(1295823142, Gen3Method::Wild1),
            PidPath::from_method(2453350303, Gen3Method::Wild2),
            PidPath::from_method(2453350303, Gen3Method::Wild3),
        ])
    );
}

#[test]
fn test_find_pid_paths_filter_iv() {
    let opts = FindPidPathsOptions {
        filter: PkmFilter {
            min_ivs: Ivs::new_all31(),
            max_ivs: Ivs::new_all31(),
            ..Default::default()
        },
        ..Default::default()
    };

    // The results for Wild1,Wild4 can be validated from the Static Searcher in Pokefinder.
    assert_eq!(
        pid_paths_to_string(find_pid_paths_reverse_iv::<true>(&opts)),
        strs_to_string(&[
            "Seed: 35CC77B9, Adv: 176562487, Method: Wild2, PID: EF72C69F, Ivs: 31/31/31/31/31/31",
            "Seed: 35CC77B9, Adv: 176562487, Method: Wild3, PID: 7942C69F, Ivs: 31/31/31/31/31/31",
            "Seed: C69FB838, Adv: 176562488, Method: Wild1, PID: 7942EF72, Ivs: 31/31/31/31/31/31",
            "Seed: AAE8B215, Adv: 356047747, Method: Wild4, PID: 995ABC94, Ivs: 31/31/31/31/31/31",
            "Seed: EEC6F716, Adv: 816994414, Method: Wild2, PID: 91A9FB04, Ivs: 31/31/31/31/31/31",
            "Seed: EEC6F716, Adv: 816994414, Method: Wild3, PID: E850FB04, Ivs: 31/31/31/31/31/31",
            "Seed: FB0448D1, Adv: 816994415, Method: Wild1, PID: E85091A9, Ivs: 31/31/31/31/31/31",
            "Seed: 33597310, Adv: 1129328144, Method: Wild4, PID: B8862C85, Ivs: 31/31/31/31/31/31",
            "Seed: A4C16DAD, Adv: 1821972667, Method: Wild2, PID: 5A48D694, Ivs: 31/31/31/31/31/31",
            "Seed: A4C16DAD, Adv: 1821972667, Method: Wild3, PID: E937D694, Ivs: 31/31/31/31/31/31",
            "Seed: D694C91C, Adv: 1821972668, Method: Wild1, PID: E9375A48, Ivs: 31/31/31/31/31/31",
            "Seed: B5CC77B9, Adv: 2324046135, Method: Wild2, PID: 6F72469F, Ivs: 31/31/31/31/31/31",
            "Seed: B5CC77B9, Adv: 2324046135, Method: Wild3, PID: F942469F, Ivs: 31/31/31/31/31/31",
            "Seed: 469FB838, Adv: 2324046136, Method: Wild1, PID: F9426F72, Ivs: 31/31/31/31/31/31",
            "Seed: 2AE8B215, Adv: 2503531395, Method: Wild4, PID: 195A3C94, Ivs: 31/31/31/31/31/31",
            "Seed: 6EC6F716, Adv: 2964478062, Method: Wild2, PID: 11A97B04, Ivs: 31/31/31/31/31/31",
            "Seed: 6EC6F716, Adv: 2964478062, Method: Wild3, PID: 68507B04, Ivs: 31/31/31/31/31/31",
            "Seed: 7B0448D1, Adv: 2964478063, Method: Wild1, PID: 685011A9, Ivs: 31/31/31/31/31/31",
            "Seed: B3597310, Adv: 3276811792, Method: Wild4, PID: 3886AC85, Ivs: 31/31/31/31/31/31",
            "Seed: 24C16DAD, Adv: 3969456315, Method: Wild2, PID: DA485694, Ivs: 31/31/31/31/31/31",
            "Seed: 24C16DAD, Adv: 3969456315, Method: Wild3, PID: 69375694, Ivs: 31/31/31/31/31/31",
            "Seed: 5694C91C, Adv: 3969456316, Method: Wild1, PID: 6937DA48, Ivs: 31/31/31/31/31/31",
        ])
    );
}

#[test]
fn test_find_pid_paths_filter_nature() {
    let opts = FindPidPathsOptions {
        filter: PkmFilter {
            min_ivs: Ivs::new(28, 31, 31, 31, 31, 31),
            max_ivs: Ivs::new(28, 31, 31, 31, 31, 31),
            nature: Some(Nature::Adamant),
            ..Default::default()
        },
        ..Default::default()
    };

    // The results can be validated from the Static Searcher in Pokefinder.
    assert_eq!(
        pid_paths_to_string(find_pid_paths_reverse_iv::<true>(&opts)),
        strs_to_string(&[
            "Seed: 9CB75889, Adv: 421027527, Method: Wild1, PID: 54A6DA00, Ivs: 28/31/31/31/31/31",
            "Seed: F2FC2E75, Adv: 2715152483, Method: Wild4, PID: 56E9EF05, Ivs: 28/31/31/31/31/31",
        ])
    );
}

#[test]
fn test_find_pid_paths_filter_gender() {
    let opts = FindPidPathsOptions {
        filter: PkmFilter {
            min_ivs: Ivs::new(26, 0, 0, 0, 0, 0),
            max_ivs: Ivs::new(26, 0, 0, 0, 0, 0),
            gender: Some(Gender::Female),
            nature: Some(Nature::Naughty),
            ..Default::default()
        },
        ..Default::default()
    };

    // The results can be validated from the Static Searcher in Pokefinder.
    assert_eq!(
        pid_paths_to_string(find_pid_paths_reverse_iv::<true>(&opts)),
        strs_to_string(&[
            "Seed: 016846DF, Adv: 424209469, Method: Wild1, PID: 0F03CE78, Ivs: 26/0/0/0/0/0",
        ])
    );
}

#[test]
fn test_find_pid_paths_filter_restrictive() {
    let opts = FindPidPathsOptions {
        filter: PkmFilter {
            nature: Some(Nature::Adamant),
            gender: Some(Gender::Female),
            min_ivs: Ivs::new(12, 29, 23, 10, 14, 13),
            max_ivs: Ivs::new(12, 29, 23, 10, 14, 13),
            ability: Some(AbilityType::Second),
            ..Default::default()
        },
        ..Default::default()
    };

    let expected_res_str =
        "Seed: 081A6F6E, Adv: 3737251206, Method: Wild1, PID: 02FA9E49, Ivs: 12/29/23/10/14/13";

    // Sub-test 1
    let pid_paths = extend_iv_path_to_pid_paths::<true>(
        &opts,
        IvPath {
            seed: 49961864,
            iv_arc: IvFromStartArc::WithoutVBlank,
        },
    );

    assert!(!pid_paths.is_empty());
    assert_eq!(pid_paths[0].to_string(), expected_res_str);

    // Sub-test 2
    // The results can be validated from the Static Searcher in Pokefinder.
    assert_eq!(
        pid_paths_to_string(find_pid_paths_reverse_iv::<true>(&opts)),
        vec![String::from(expected_res_str)]
    );
}

#[test]
fn test_find_pid_paths_reverse_pid() {
    let mut opts = FindPidPathsOptions {
        gen3_filter: Gen3PkmFilter {
            pid_speed: Gen3PidSpeedFilter {
                active: true,
                min_cycle_count: FASTEST_MODULO_CYCLE_24,
                max_cycle_count: FASTEST_MODULO_CYCLE_24,
            },
            ..Default::default()
        },
        ..Default::default()
    };

    assert_eq!(
        pid_paths_to_string(find_pid_paths_reverse_pid::<true>(&opts)),
        strs_to_string(&[
            "Seed: 091D0909, Adv: 13106503, Method: Wild3, PID: 00000013, Ivs: 15/2/18/19/21/1",
            "Seed: FC39FC71, Adv: 301677967, Method: Wild3, PID: 00000001, Ivs: 12/19/11/9/29/4",
            "Seed: 536E6B2F, Adv: 329210829, Method: Wild1, PID: 00000006, Ivs: 12/1/15/2/14/12",
            "Seed: 536E6B2F, Adv: 329210829, Method: Wild2, PID: 00000006, Ivs: 12/2/14/26/2/6",
            "Seed: 536E6B2F, Adv: 329210829, Method: Wild4, PID: 00000006, Ivs: 12/1/15/26/2/6",
            "Seed: A780A776, Adv: 512368078, Method: Wild3, PID: 00000011, Ivs: 19/8/17/17/18/25",
            "Seed: 9B2808E0, Adv: 537155296, Method: Wild1, PID: 00000000, Ivs: 3/13/16/8/20/0",
            "Seed: 9B2808E0, Adv: 537155296, Method: Wild2, PID: 00000000, Ivs: 0/8/20/17/31/11",
            "Seed: 9B2808E0, Adv: 537155296, Method: Wild4, PID: 00000000, Ivs: 3/13/16/17/31/11",
            "Seed: E447E450, Adv: 830600016, Method: Wild3, PID: 0000000C, Ivs: 26/20/15/15/12/10",
            "Seed: 01E2FC37, Adv: 903562357, Method: Wild3, PID: 00000008, Ivs: 12/1/30/30/28/30",
            "Seed: E9F0E416, Adv: 1042668910, Method: Wild3, PID: 00000014, Ivs: 26/2/2/5/12/4",
            "Seed: 26B820F0, Adv: 1182466544, Method: Wild3, PID: 0000000F, Ivs: 2/15/0/2/6/21",
            "Seed: 5DD65E04, Adv: 1260589092, Method: Wild3, PID: 00000003, Ivs: 9/13/12/10/0/11",
            "Seed: C0AC4A6A, Adv: 1349854978, Method: Wild1, PID: 00000004, Ivs: 9/5/26/4/16/8",
            "Seed: C0AC4A6A, Adv: 1349854978, Method: Wild2, PID: 00000004, Ivs: 8/4/16/23/1/7",
            "Seed: C0AC4A6A, Adv: 1349854978, Method: Wild4, PID: 00000004, Ivs: 9/5/26/23/1/7",
            "Seed: 6AB96A9C, Adv: 1404406332, Method: Wild3, PID: 00000016, Ivs: 12/28/18/20/24/8",
            "Seed: 2FB9A32B, Adv: 1429484953, Method: Wild1, PID: 00000003, Ivs: 4/4/4/15/16/25",
            "Seed: 2FB9A32B, Adv: 1429484953, Method: Wild2, PID: 00000003, Ivs: 25/15/16/19/14/13",
            "Seed: 2FB9A32B, Adv: 1429484953, Method: Wild4, PID: 00000003, Ivs: 4/4/4/19/14/13",
            "Seed: 0D844704, Adv: 1455110436, Method: Wild1, PID: 0000000D, Ivs: 18/16/12/6/6/12",
            "Seed: 0D844704, Adv: 1455110436, Method: Wild2, PID: 0000000D, Ivs: 12/6/6/2/20/4",
            "Seed: 0D844704, Adv: 1455110436, Method: Wild4, PID: 0000000D, Ivs: 18/16/12/2/20/4",
            "Seed: A0469AA4, Adv: 1516612804, Method: Wild3, PID: 00000006, Ivs: 16/7/29/29/25/23",
            "Seed: 9CF78266, Adv: 1553274686, Method: Wild1, PID: 00000001, Ivs: 1/8/15/17/18/21",
            "Seed: 9CF78266, Adv: 1553274686, Method: Wild2, PID: 00000001, Ivs: 21/17/18/16/13/15",
            "Seed: 9CF78266, Adv: 1553274686, Method: Wild4, PID: 00000001, Ivs: 1/8/15/16/13/15",
            "Seed: E6308BF4, Adv: 1575438356, Method: Wild1, PID: 00000008, Ivs: 15/29/3/0/12/16",
            "Seed: E6308BF4, Adv: 1575438356, Method: Wild2, PID: 00000008, Ivs: 16/0/12/29/3/4",
            "Seed: E6308BF4, Adv: 1575438356, Method: Wild4, PID: 00000008, Ivs: 15/29/3/29/3/4",
            "Seed: 403B461D, Adv: 1677883499, Method: Wild3, PID: 00000008, Ivs: 22/0/30/26/15/23",
            "Seed: E800057A, Adv: 1714002578, Method: Wild1, PID: 00000009, Ivs: 12/24/2/10/10/4",
            "Seed: E800057A, Adv: 1714002578, Method: Wild2, PID: 00000009, Ivs: 4/10/10/28/17/7",
            "Seed: E800057A, Adv: 1714002578, Method: Wild4, PID: 00000009, Ivs: 12/24/2/28/17/7",
            "Seed: 7D0282F7, Adv: 1728237109, Method: Wild3, PID: 00000003, Ivs: 30/12/28/24/9/7",
            "Seed: 45E445E3, Adv: 1779980849, Method: Wild3, PID: 0000000F, Ivs: 23/14/16/16/15/17",
            "Seed: 88548283, Adv: 1837756241, Method: Wild3, PID: 00000011, Ivs: 30/8/1/3/9/29",
            "Seed: C3FB2FCD, Adv: 1949623387, Method: Wild1, PID: 00000012, Ivs: 29/9/12/23/1/3",
            "Seed: C3FB2FCD, Adv: 1949623387, Method: Wild2, PID: 00000012, Ivs: 3/23/1/11/9/27",
            "Seed: C3FB2FCD, Adv: 1949623387, Method: Wild4, PID: 00000012, Ivs: 29/9/12/11/9/27",
            "Seed: E7AFF7D1, Adv: 1981156207, Method: Wild1, PID: 00000014, Ivs: 5/7/23/9/31/23",
            "Seed: E7AFF7D1, Adv: 1981156207, Method: Wild2, PID: 00000014, Ivs: 23/9/31/18/29/20",
            "Seed: E7AFF7D1, Adv: 1981156207, Method: Wild4, PID: 00000014, Ivs: 5/7/23/18/29/20",
            "Seed: 9E76EE43, Adv: 2053742097, Method: Wild1, PID: 0000000E, Ivs: 23/17/2/26/5/27",
            "Seed: 9E76EE43, Adv: 2053742097, Method: Wild2, PID: 0000000E, Ivs: 27/26/5/5/7/30",
            "Seed: 9E76EE43, Adv: 2053742097, Method: Wild4, PID: 0000000E, Ivs: 23/17/2/5/7/30",
            "Seed: BF72BF97, Adv: 2097795413, Method: Wild3, PID: 00000005, Ivs: 5/7/13/11/3/19",
            "Seed: E97F7157, Adv: 2171777557, Method: Wild1, PID: 00000016, Ivs: 3/2/22/19/29/11",
            "Seed: E97F7157, Adv: 2171777557, Method: Wild2, PID: 00000016, Ivs: 11/19/29/17/11/23",
            "Seed: E97F7157, Adv: 2171777557, Method: Wild4, PID: 00000016, Ivs: 3/2/22/17/11/23",
            "Seed: 553DE4B5, Adv: 2220456355, Method: Wild1, PID: 00000007, Ivs: 9/28/13/12/12/0",
            "Seed: 553DE4B5, Adv: 2220456355, Method: Wild2, PID: 00000007, Ivs: 0/12/12/25/16/9",
            "Seed: 553DE4B5, Adv: 2220456355, Method: Wild4, PID: 00000007, Ivs: 9/28/13/25/16/9",
            "Seed: DE9EE48A, Adv: 2396089890, Method: Wild3, PID: 00000005, Ivs: 26/6/29/25/12/15",
            "Seed: 1B662164, Adv: 2414896004, Method: Wild3, PID: 00000001, Ivs: 1/19/27/23/6/0",
            "Seed: 78F2ACB9, Adv: 2744361527, Method: Wild1, PID: 0000000A, Ivs: 18/25/24/30/9/20",
            "Seed: 78F2ACB9, Adv: 2744361527, Method: Wild2, PID: 0000000A, Ivs: 20/30/9/0/5/2",
            "Seed: 78F2ACB9, Adv: 2744361527, Method: Wild4, PID: 0000000A, Ivs: 18/25/24/0/5/2",
            "Seed: 7AC2263F, Adv: 2931075357, Method: Wild1, PID: 0000000B, Ivs: 15/20/23/8/8/8",
            "Seed: 7AC2263F, Adv: 2931075357, Method: Wild2, PID: 0000000B, Ivs: 8/8/8/31/18/6",
            "Seed: 7AC2263F, Adv: 2931075357, Method: Wild4, PID: 0000000B, Ivs: 15/20/23/31/18/6",
            "Seed: 0BB4CD7E, Adv: 2960618262, Method: Wild1, PID: 0000000C, Ivs: 21/21/13/28/7/24",
            "Seed: 0BB4CD7E, Adv: 2960618262, Method: Wild2, PID: 0000000C, Ivs: 24/28/7/3/6/0",
            "Seed: 0BB4CD7E, Adv: 2960618262, Method: Wild4, PID: 0000000C, Ivs: 21/21/13/3/6/0",
            "Seed: C27BC3F0, Adv: 2966869232, Method: Wild1, PID: 00000005, Ivs: 7/0/25/13/14/28",
            "Seed: C27BC3F0, Adv: 2966869232, Method: Wild2, PID: 00000005, Ivs: 28/13/14/22/15/11",
            "Seed: C27BC3F0, Adv: 2966869232, Method: Wild4, PID: 00000005, Ivs: 7/0/25/22/15/11",
            "Seed: 2DEA29A5, Adv: 2968247763, Method: Wild1, PID: 00000002, Ivs: 6/9/5/6/18/4",
            "Seed: 2DEA29A5, Adv: 2968247763, Method: Wild2, PID: 00000002, Ivs: 4/6/18/20/0/9",
            "Seed: 2DEA29A5, Adv: 2968247763, Method: Wild4, PID: 00000002, Ivs: 6/9/5/20/0/9",
            "Seed: C22BB647, Adv: 2982021829, Method: Wild1, PID: 00000010, Ivs: 0/15/13/13/3/15",
            "Seed: C22BB647, Adv: 2982021829, Method: Wild2, PID: 00000010, Ivs: 15/13/3/12/27/23",
            "Seed: C22BB647, Adv: 2982021829, Method: Wild4, PID: 00000010, Ivs: 0/15/13/12/27/23",
            "Seed: 637F5DCA, Adv: 3004488034, Method: Wild3, PID: 0000000A, Ivs: 9/27/30/0/0/6",
            "Seed: C51BBF5D, Adv: 3256352939, Method: Wild3, PID: 0000000D, Ivs: 5/21/31/1/3/14",
            "Seed: 210F212A, Adv: 3267079106, Method: Wild3, PID: 00000008, Ivs: 1/1/14/12/6/27",
            "Seed: 56BD5092, Adv: 3373437674, Method: Wild1, PID: 00000014, Ivs: 0/6/1/21/31/7",
            "Seed: 56BD5092, Adv: 3373437674, Method: Wild2, PID: 00000014, Ivs: 7/21/31/14/10/25",
            "Seed: 56BD5092, Adv: 3373437674, Method: Wild4, PID: 00000014, Ivs: 0/6/1/14/10/25",
            "Seed: A1D7A7B0, Adv: 3640579248, Method: Wild3, PID: 0000000A, Ivs: 19/26/30/27/18/30",
            "Seed: 4B8D45A9, Adv: 3758308199, Method: Wild3, PID: 00000016, Ivs: 23/28/2/6/15/12",
            "Seed: 31390F08, Adv: 3978594568, Method: Wild1, PID: 00000010, Ivs: 26/13/23/24/3/31",
            "Seed: 31390F08, Adv: 3978594568, Method: Wild2, PID: 00000010, Ivs: 31/24/3/8/8/29",
            "Seed: 31390F08, Adv: 3978594568, Method: Wild4, PID: 00000010, Ivs: 26/13/23/8/8/29",
            "Seed: 54EDD70C, Adv: 4166215340, Method: Wild1, PID: 00000012, Ivs: 3/11/2/11/1/19",
            "Seed: 54EDD70C, Adv: 4166215340, Method: Wild2, PID: 00000012, Ivs: 19/11/1/15/28/21",
            "Seed: 54EDD70C, Adv: 4166215340, Method: Wild4, PID: 00000012, Ivs: 3/11/2/15/28/21",
            "Seed: 82AB82BD, Adv: 4179526795, Method: Wild3, PID: 0000000A, Ivs: 30/26/14/14/9/2",
            "Seed: 7A721896, Adv: 4264455662, Method: Wild1, PID: 00000016, Ivs: 8/3/12/7/29/26",
            "Seed: 7A721896, Adv: 4264455662, Method: Wild2, PID: 00000016, Ivs: 26/7/29/21/30/18",
            "Seed: 7A721896, Adv: 4264455662, Method: Wild4, PID: 00000016, Ivs: 8/3/12/21/30/18",
            "Seed: 0A3561A1, Adv: 4294967295, Method: Wild1, PID: 00000000, Ivs: 30/11/26/19/20/17",
            "Seed: 0A3561A1, Adv: 4294967295, Method: Wild2, PID: 00000000, Ivs: 17/19/20/13/12/16",
            "Seed: 0A3561A1, Adv: 4294967295, Method: Wild4, PID: 00000000, Ivs: 30/11/26/13/12/16"
        ])
    );

    opts.gen3_filter.pid_speed.min_cycle_count = SLOWEST_MODULO_CYCLE_24;
    opts.gen3_filter.pid_speed.max_cycle_count = SLOWEST_MODULO_CYCLE_24;
    assert_eq!(
        pid_paths_to_string(find_pid_paths_reverse_pid::<true>(&opts)),
        strs_to_string(&[
            "Seed: FCD6F078, Adv: 293090680, Method: Wild3, PID: 59999999, Ivs: 18/0/20/4/9/19",
            "Seed: 14855885, Adv: 386636595, Method: Wild1, PID: 5999999D, Ivs: 11/21/30/20/27/19",
            "Seed: 14855885, Adv: 386636595, Method: Wild2, PID: 5999999D, Ivs: 19/20/27/12/13/18",
            "Seed: 14855885, Adv: 386636595, Method: Wild4, PID: 5999999D, Ivs: 11/21/30/12/13/18",
            "Seed: C00FB39E, Adv: 534703158, Method: Wild3, PID: 5999999D, Ivs: 11/20/21/7/15/2",
            "Seed: 3F472D18, Adv: 742047768, Method: Wild3, PID: 5999999B, Ivs: 25/26/4/23/2/30",
            "Seed: A0E38EAB, Adv: 984499993, Method: Wild3, PID: 5999999E, Ivs: 22/20/5/25/5/6",
            "Seed: 5C3EF636, Adv: 1114502798, Method: Wild1, PID: 59999997, Ivs: 2/1/0/26/1/8",
            "Seed: 5C3EF636, Adv: 1114502798, Method: Wild2, PID: 59999997, Ivs: 8/26/1/3/10/24",
            "Seed: 5C3EF636, Adv: 1114502798, Method: Wild4, PID: 59999997, Ivs: 2/1/0/3/10/24",
            "Seed: F0D09081, Adv: 1321855839, Method: Wild1, PID: 5999999B, Ivs: 3/24/19/2/30/0",
            "Seed: F0D09081, Adv: 1321855839, Method: Wild2, PID: 5999999B, Ivs: 0/2/30/5/25/26",
            "Seed: F0D09081, Adv: 1321855839, Method: Wild4, PID: 5999999B, Ivs: 3/24/19/5/25/26",
            "Seed: 1654D20B, Adv: 1655182841, Method: Wild1, PID: 5999999F, Ivs: 8/16/29/30/25/8",
            "Seed: 1654D20B, Adv: 1655182841, Method: Wild2, PID: 5999999F, Ivs: 8/30/25/11/27/22",
            "Seed: 1654D20B, Adv: 1655182841, Method: Wild4, PID: 5999999F, Ivs: 8/16/29/11/27/22",
            "Seed: 5E73520B, Adv: 1730713081, Method: Wild3, PID: 5999999B, Ivs: 14/26/20/5/12/26",
            "Seed: BA66B3D8, Adv: 1985977048, Method: Wild3, PID: 59999996, Ivs: 10/6/3/17/15/7",
            "Seed: 8392B146, Adv: 2099924766, Method: Wild1, PID: 5999999D, Ivs: 5/20/8/0/28/4",
            "Seed: 8392B146, Adv: 2099924766, Method: Wild2, PID: 5999999D, Ivs: 4/0/28/8/26/24",
            "Seed: 8392B146, Adv: 2099924766, Method: Wild4, PID: 5999999D, Ivs: 5/20/8/8/26/24",
            "Seed: 388A2E32, Adv: 2201552266, Method: Wild1, PID: 59999995, Ivs: 26/3/21/7/4/20",
            "Seed: 388A2E32, Adv: 2201552266, Method: Wild2, PID: 59999995, Ivs: 20/7/4/28/21/31",
            "Seed: 388A2E32, Adv: 2201552266, Method: Wild4, PID: 59999995, Ivs: 26/3/21/28/21/31",
            "Seed: 5E0E6FBC, Adv: 2216084316, Method: Wild1, PID: 59999999, Ivs: 0/28/30/3/0/28",
            "Seed: 5E0E6FBC, Adv: 2216084316, Method: Wild2, PID: 59999999, Ivs: 28/3/0/2/24/27",
            "Seed: 5E0E6FBC, Adv: 2216084316, Method: Wild4, PID: 59999999, Ivs: 0/28/30/2/24/27",
            "Seed: 7C0E69F2, Adv: 2464399178, Method: Wild3, PID: 59999997, Ivs: 0/7/3/21/28/15",
            "Seed: CB4C4EF7, Adv: 2481211957, Method: Wild1, PID: 59999997, Ivs: 29/31/9/5/2/24",
            "Seed: CB4C4EF7, Adv: 2481211957, Method: Wild2, PID: 59999997, Ivs: 24/5/2/31/22/29",
            "Seed: CB4C4EF7, Adv: 2481211957, Method: Wild4, PID: 59999997, Ivs: 29/31/9/31/22/29",
            "Seed: A747794A, Adv: 2805334242, Method: Wild1, PID: 5999999F, Ivs: 14/17/19/18/25/23",
            "Seed: A747794A, Adv: 2805334242, Method: Wild2, PID: 5999999F, Ivs: 23/18/25/15/14/17",
            "Seed: A747794A, Adv: 2805334242, Method: Wild4, PID: 5999999F, Ivs: 14/17/19/15/14/17",
            "Seed: EF0116FB, Adv: 3041983401, Method: Wild1, PID: 59999999, Ivs: 5/29/20/24/31/11",
            "Seed: EF0116FB, Adv: 3041983401, Method: Wild2, PID: 59999999, Ivs: 11/24/31/6/11/22",
            "Seed: EF0116FB, Adv: 3041983401, Method: Wild4, PID: 59999999, Ivs: 5/29/20/6/11/22",
            "Seed: 81C337C0, Adv: 3228771264, Method: Wild1, PID: 5999999B, Ivs: 8/25/9/22/29/15",
            "Seed: 81C337C0, Adv: 3228771264, Method: Wild2, PID: 5999999B, Ivs: 15/22/29/9/12/20",
            "Seed: 81C337C0, Adv: 3228771264, Method: Wild4, PID: 5999999B, Ivs: 8/25/9/9/12/20",
            "Seed: 9B3A8EE5, Adv: 3439770131, Method: Wild3, PID: 59999996, Ivs: 21/6/19/3/6/11",
            "Seed: DDAACB85, Adv: 3622933043, Method: Wild3, PID: 59999999, Ivs: 29/0/4/22/31/23"
        ])
    );
}
