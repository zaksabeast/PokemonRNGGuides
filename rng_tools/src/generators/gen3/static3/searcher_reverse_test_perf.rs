use super::*;

#[test]
fn test_search_reverse_perf_shiny_only() {
    if cfg!(debug_assertions) {
        return;
    }

    let opts = Static3SearcherOptions {
        initial_seed: 0,
        tid: 12345,
        sid: 54321,
        initial_advances: 0,
        max_advances: u32::MAX as usize,
        max_result_count: 20,
        filter: PkmFilter {
            shiny: true,
            ..Default::default()
        },
        gen3_filter: Gen3PkmFilter::default(),
        painting_opts: None,
        species: Species::Bulbasaur,
        bugged_roamer: false,
        methods: vec![Gen3StaticMethod::Static1, Gen3StaticMethod::Static4],
    };

    let results = search_static3_reverse(&opts);

    assert_eq!(results.len(), 20);
    assert!(results.iter().all(|result| result.shiny));
}
