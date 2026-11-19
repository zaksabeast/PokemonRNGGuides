use super::*;
use crate::{
    assert_list_eq,
    gen3::{
        CdfKnot, Gen3Method, Moment, Wild3Action, Wild3EncounterGameData, Wild3EncounterIndex,
        Wild3FeebasState, Wild3InitialCycleDistribution, Wild3MapGameData,
    },
};

#[derive(Debug, PartialEq)]
struct ResultForTest {
    pub method: Gen3Method,
    pub initial_cycle_range: CycleRange<i32>,
    pub method_probability: f64,
}
impl ResultForTest {
    pub fn new_from_dist_res(dist_res: &Wild3MethodDistributionResult) -> Self {
        Self {
            method: dist_res.searcher_res.method,
            initial_cycle_range: dist_res.initial_cycle_range,
            method_probability: dist_res.method_probability,
        }
    }
    pub fn new(
        method: Gen3Method,
        method_probability: f64,
        initial_cycle_range: CycleRange<i32>,
    ) -> Self {
        Self {
            method,
            initial_cycle_range,
            method_probability,
        }
    }
}

#[test]
fn test_wild3_distribution_generator_feebas() {
    let initial_seed = 0;
    let advances = 1000;
    let lead_cycle_spd = 775;
    let playing_song = Wild3PlayingSong::SurfSong;
    let weather = Wild3Weather::Thunderstorm;
    let opts = Wild3GeneratorOptions {
        action: Wild3Action::OldRod,
        feebas_state: Wild3FeebasState::OnFeebasTile,
        feebas_vblank_count: Some(3),
        using_white_flute: false,
        ..Default::default()
    };

    let initial_cycle_distr = Wild3InitialCycleDistribution {
        action: opts.action,
        playing_song,
        weather,
        min: 49_072,
        max: 141_272,
        distribution: vec![
            CdfKnot {
                cycle: 49_072.0,
                probability: 0.0,
            },
            CdfKnot {
                cycle: 141_272.0,
                probability: 1.0,
            },
        ],
        feebas_vblank_count: None,
        feebas_vblank_count_probability: 1.0,
        check_feebas_cycle: None,
    };
    let feebas_cycle_distr = Wild3InitialCycleDistribution {
        min: 47_534,
        max: 272_553,
        distribution: vec![
            CdfKnot {
                cycle: 47_534.0,
                probability: 0.0,
            },
            CdfKnot {
                cycle: 272_553.0,
                probability: 1.0,
            },
        ],
        feebas_vblank_count: Some(3),
        feebas_vblank_count_probability: 0.92,
        check_feebas_cycle: Some(736_792),
        ..initial_cycle_distr.clone()
    };
    let game_data = Wild3MapGameData {
        map_id: String::new(),
        map_internal_idx: 0,
        slots_by_action: vec![
            vec![],
            vec![],
            vec![
                Wild3EncounterGameData {
                    min_level: 5,
                    max_level: 10,
                    ..Default::default()
                };
                2
            ],
        ],
        roamers: vec![],
        mass_outbreaks: vec![],
        initial_cycle_distrs: vec![initial_cycle_distr, feebas_cycle_distr],
        feebas: Some(Wild3EncounterGameData {
            min_level: 20,
            max_level: 25,
            ..Default::default()
        }),
        rock_smash_rate: 0,
        is_safari: false,
        actions_with_safari_pokeblock: vec![],
    };

    let distribution = generate_gen3_wild_distribution(
        initial_seed,
        advances,
        &opts,
        &game_data,
        lead_cycle_spd,
        playing_song,
        weather,
        None,
        None,
    );

    let total_likelihood: f64 = distribution
        .results
        .iter()
        .map(|result| result.method_probability)
        .sum();

    assert!((total_likelihood - 0.92).abs() < 1e-10);
    assert!(!distribution.cycle_at_moments.is_empty());

    let non_feebas_distribution = generate_gen3_wild_distribution(
        initial_seed,
        1001,
        &opts,
        &game_data,
        lead_cycle_spd,
        playing_song,
        weather,
        None,
        None,
    );
    let non_feebas_likelihood: f64 = non_feebas_distribution
        .results
        .iter()
        .map(|result| result.method_probability)
        .sum();

    assert!(
        non_feebas_distribution
            .results
            .iter()
            .all(|result| result.searcher_res.encounter_idx != Wild3EncounterIndex::Feebas)
    );
    assert_eq!(non_feebas_likelihood, 0.0);
}

#[test]
fn test_wild3_distribution_generator_general() {
    let opts = Wild3GeneratorOptions::default();
    let dist_results = generate_gen3_wild_distribution(
        0,
        44,
        &opts,
        &Wild3MapGameData::default(),
        700,
        Wild3PlayingSong::MapSong,
        Wild3Weather::Sunny,
        None,
        None,
    );

    let results = dist_results
        .results
        .iter()
        .map(ResultForTest::new_from_dist_res)
        .collect::<Vec<_>>();

    let sorted_ranges = dist_results
        .results
        .iter()
        .map(|result| result.initial_cycle_range)
        .sorted_by_key(|range| range.start)
        .collect::<Vec<_>>();
    for pair in sorted_ranges.windows(2) {
        assert!(pair[0].start + pair[0].len as i32 <= pair[1].start);
    }
    let total_probability: f64 = dist_results
        .results
        .iter()
        .map(|result| result.method_probability)
        .sum();
    assert!((total_probability - 1.0).abs() < 1e-10);

    let expected_results = [
        ResultForTest::new(
            Gen3Method::Wild5,
            0.0,
            CycleRange::from_start_end(165593, 175443),
        ),
        ResultForTest::new(
            Gen3Method::Wild3,
            0.0,
            CycleRange::from_start_end(165513, 165593),
        ),
        ResultForTest::new(
            Gen3Method::Wild5,
            0.0,
            CycleRange::from_start_end(153637, 165513),
        ),
        ResultForTest::new(
            Gen3Method::Wild5,
            0.0,
            CycleRange::from_start_end(121647, 153637),
        ),
        ResultForTest::new(
            Gen3Method::Wild5,
            0.0,
            CycleRange::from_start_end(109739, 121647),
        ),
        ResultForTest::new(
            Gen3Method::Wild5,
            0.0,
            CycleRange::from_start_end(97792, 109739),
        ),
        ResultForTest::new(
            Gen3Method::Wild5,
            0.0,
            CycleRange::from_start_end(96775, 97792),
        ),
        ResultForTest::new(
            Gen3Method::Wild5,
            0.0,
            CycleRange::from_start_end(87905, 96775),
        ),
        ResultForTest::new(
            Gen3Method::Wild3,
            0.0,
            CycleRange::from_start_end(87825, 87905),
        ),
        ResultForTest::new(
            Gen3Method::Wild5,
            0.0,
            CycleRange::from_start_end(81950, 87825),
        ),
        ResultForTest::new(
            Gen3Method::Wild3,
            0.0,
            CycleRange::from_start_end(81870, 81950),
        ),
        ResultForTest::new(
            Gen3Method::Wild5,
            0.4019666666666667,
            CycleRange::from_start_end(62941, 81870),
        ),
        ResultForTest::new(
            Gen3Method::Wild5,
            0.32846666666666663,
            CycleRange::from_start_end(53087, 62941),
        ),
        ResultForTest::new(
            Gen3Method::Wild3,
            0.0026666666666666505,
            CycleRange::from_start_end(53007, 53087),
        ),
        ResultForTest::new(
            Gen3Method::Wild5,
            0.1643666666666667,
            CycleRange::from_start_end(48076, 53007),
        ),
        ResultForTest::new(
            Gen3Method::Wild2,
            0.10253333333333334,
            CycleRange::from_start_end(-74880, 48076),
        ),
        ResultForTest::new(
            Gen3Method::Wild4,
            0.0,
            CycleRange::from_start_end(-117141, -74880),
        ),
        ResultForTest::new(
            Gen3Method::Wild1,
            0.0,
            CycleRange::from_start_end(-1000000, -117141),
        ),
    ];
    assert_list_eq!(results, expected_results);

    let expected_cycle_at_moments = [
        CycleFrameMoment::new(Moment::TrySweetScentEncounter, 0, 60000),
        CycleFrameMoment::new(Moment::SweetScentWildEncounter, 0, 62001),
        CycleFrameMoment::new(Moment::TryStartRoamerEncounter, 0, 62745),
        CycleFrameMoment::new(Moment::DoMassOutbreakEncounterTest, 0, 62878),
        CycleFrameMoment::new(Moment::TryGenerateWildMon, 0, 62962),
        CycleFrameMoment::new(Moment::TryGetAbilityInfluencedWildMonIndex, 0, 63029),
        CycleFrameMoment::new(Moment::TryGetAbilityInfluencedWildMonIndex, 0, 80270),
        CycleFrameMoment::new(Moment::ChooseWildMonIndex_Land, 0, 97494),
        CycleFrameMoment::new(Moment::ChooseWildMonIndex_Land_Random, 0, 97506),
        CycleFrameMoment::new(Moment::ChooseWildMonLevel, 0, 98248),
        CycleFrameMoment::new(Moment::ChooseWildMonLevel_RandomLvl, 0, 98311),
        CycleFrameMoment::new(Moment::CreateWildMon, 0, 116305),
        CycleFrameMoment::new(Moment::PickWildMonNature, 0, 147330),
        CycleFrameMoment::new(Moment::PickWildMonNature_RandomPickNature, 0, 164713),
        CycleFrameMoment::new(Moment::CreateMonWithNature, 0, 165331),
        CycleFrameMoment::new(Moment::CreateMon, 1, 66924),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs1, 1, 189880),
        CycleFrameMoment::new(Moment::CreateBoxMon_RandomIvs2, 1, 232141),
    ];

    // Filter out CreateMonWithNature_RandomPidHigh/Low
    let cycle_at_moments = dist_results
        .cycle_at_moments
        .into_iter()
        .filter(|moment| {
            !matches!(
                moment.moment,
                Moment::CreateMonWithNature_RandomPidHigh
                    | Moment::CreateMonWithNature_RandomPidLow
            )
        })
        .collect::<Vec<_>>();

    assert_list_eq!(cycle_at_moments, expected_cycle_at_moments);
}
