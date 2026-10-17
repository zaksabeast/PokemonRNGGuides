//! The fixtures come from a Mono harness around the unmodified 3DSRNGTool
//! `Egg7` and `Gen7EggPath`, so they still need spot checks in the real app.

use super::generator::{EggSettings, generate_egg};
use super::path::{Gen7EggAction, ShortestPaths, path_steps};
use super::pid::{EggPidStrategy, MasudaMethod};
use super::*;
use crate::assert_list_eq;
use crate::rng::Rng;
use crate::rng::tinymt::TinyMT;
use crate::{AbilityType, Gender, GenderRatio, Ivs, Nature, PkmFilter, gen6_psv};

const ALL_31: [u8; 6] = [31; 6];
const MIXED: [u8; 6] = [31, 0, 31, 31, 31, 31];
const VARIED: [u8; 6] = [1, 5, 12, 20, 28, 31];
const MALE_NATURE: Nature = Nature::Adamant;
const FEMALE_NATURE: Nature = Nature::Timid;

fn ivs(values: [u8; 6]) -> Ivs {
    let [hp, atk, def, spa, spd, spe] = values;
    Ivs::new(hp, atk, def, spa, spd, spe)
}

fn parent(
    ivs_values: [u8; 6],
    item: Gen7EggItem,
    ability: AbilityType,
    nature: Nature,
) -> Gen7EggParent {
    Gen7EggParent {
        ivs: ivs(ivs_values),
        item,
        ability,
        nature,
    }
}

struct Fixture {
    name: &'static str,
    rows: &'static str,
    paths: &'static str,
    pid_method: Gen7EggPidMethod,
    gender: Gen7EggGender,
    parents: Gen7EggParents,
}

impl Fixture {
    fn tsv(&self) -> u16 {
        let header = self.rows.lines().next().unwrap();
        header.strip_prefix("# tsv ").unwrap().parse().unwrap()
    }

    fn seed(&self) -> [u32; 4] {
        self.expected_eggs()[0].seed
    }

    fn opts(&self, max_advance: usize) -> Gen7EggSearchOpts {
        Gen7EggSearchOpts {
            seed: self.seed(),
            tsv: self.tsv(),
            pid_method: self.pid_method,
            gender: self.gender,
            parents: self.parents.clone(),
            max_advance,
            filter: PkmFilter::new_allow_all(),
        }
    }

    fn parent_nature(&self, column: &str) -> Option<Nature> {
        match column {
            "M" => Some(self.parents.male.nature),
            "F" => Some(self.parents.female.nature),
            _ => None,
        }
    }

    fn expected_eggs(&self) -> Vec<Gen7Egg> {
        let tsv = self.tsv();
        self.rows
            .lines()
            .skip(1)
            .map(|line| {
                let cols: Vec<&str> = line.split('\t').collect();
                let hex = |text: &str| u32::from_str_radix(text, 16).unwrap();
                let parent_slot = |text: &str| match text {
                    "M" => Gen7EggParentSlot::Male,
                    "F" => Gen7EggParentSlot::Female,
                    other => panic!("unexpected parent {other}"),
                };

                let seed: Vec<u32> = cols[1].split(',').map(hex).collect();
                let iv_values: Vec<u8> = cols[6].split('/').map(|iv| iv.parse().unwrap()).collect();
                let mut inherited_ivs = [None; 6];
                for (inherited, text) in inherited_ivs.iter_mut().zip(cols[7].chars()) {
                    if text != '-' {
                        *inherited = Some(parent_slot(&text.to_string()));
                    }
                }
                let pid = hex(cols[4]);
                let random_nature = Nature::from(cols[9].parse::<u8>().unwrap());

                Gen7Egg {
                    advance: cols[0].parse().unwrap(),
                    accept_advances: cols[2].parse().unwrap(),
                    seed: [seed[0], seed[1], seed[2], seed[3]],
                    ec: hex(cols[3]),
                    pid,
                    psv: gen6_psv(pid),
                    shiny: match cols[5] {
                        "1" => true,
                        "0" => false,
                        other => panic!("unexpected shiny {other}"),
                    },
                    ivs: ivs(iv_values.try_into().unwrap()),
                    inherited_ivs,
                    ability: match cols[8] {
                        "1" => AbilityType::First,
                        "2" => AbilityType::Second,
                        "3" => AbilityType::Hidden,
                        other => panic!("unexpected ability {other}"),
                    },
                    nature: self.parent_nature(cols[10]).unwrap_or(random_nature),
                    gender: match cols[11] {
                        "M" => Gender::Male,
                        "F" => Gender::Female,
                        _ => Gender::Genderless,
                    },
                    ball: parent_slot(cols[12]),
                }
            })
            .inspect(|egg: &Gen7Egg| assert_eq!(egg.shiny, egg.psv == tsv, "shiny column"))
            .collect()
    }

    /// The target, then each advance on its shortest path.
    fn expected_paths(&self) -> Vec<(usize, Vec<usize>)> {
        self.paths
            .lines()
            .map(|line| {
                let (target, path) = line.split_once('\t').unwrap();
                let path = path.split(',').map(|advance| advance.parse().unwrap());
                (target.parse().unwrap(), path.collect())
            })
            .collect()
    }
}

macro_rules! fixture {
    ($name:literal) => {
        (
            $name,
            include_str!(concat!("test_data/", $name, ".txt")),
            include_str!(concat!("test_data/", $name, "_path.txt")),
        )
    };
}

fn fixtures() -> Vec<Fixture> {
    use Gen7EggItem::*;
    let make = |(name, rows, paths): (&'static str, &'static str, &'static str),
                pid_method,
                gender,
                parents| Fixture {
        name,
        rows,
        paths,
        pid_method,
        gender,
        parents,
    };

    vec![
        make(
            fixture!("mm_no_items"),
            Gen7EggPidMethod::MasudaMethod,
            Gen7EggGender::Ratio(GenderRatio::OneToOne),
            Gen7EggParents {
                male: parent(ALL_31, None, AbilityType::Hidden, MALE_NATURE),
                female: parent(VARIED, None, AbilityType::First, FEMALE_NATURE),
                ditto: Option::None,
                same_species: false,
            },
        ),
        make(
            fixture!("sc_knot_everstone"),
            Gen7EggPidMethod::ShinyCharm,
            Gen7EggGender::Ratio(GenderRatio::OneToSeven),
            Gen7EggParents {
                male: parent(VARIED, DestinyKnot, AbilityType::First, MALE_NATURE),
                female: parent(MIXED, Everstone, AbilityType::Hidden, FEMALE_NATURE),
                ditto: Option::None,
                same_species: false,
            },
        ),
        make(
            fixture!("mm_sc_power_items"),
            Gen7EggPidMethod::MasudaAndShinyCharm,
            Gen7EggGender::Ratio(GenderRatio::ThreeToOne),
            Gen7EggParents {
                male: parent(ALL_31, PowerBracer, AbilityType::First, MALE_NATURE),
                female: parent(VARIED, PowerAnklet, AbilityType::Second, FEMALE_NATURE),
                ditto: Option::None,
                same_species: true,
            },
        ),
        make(
            fixture!("mm_ditto_genderless"),
            Gen7EggPidMethod::MasudaMethod,
            Gen7EggGender::Ratio(GenderRatio::Genderless),
            Gen7EggParents {
                male: parent(MIXED, DestinyKnot, AbilityType::Hidden, MALE_NATURE),
                female: parent(ALL_31, Everstone, AbilityType::First, FEMALE_NATURE),
                ditto: Some(Gen7EggParentSlot::Female),
                same_species: false,
            },
        ),
        make(
            fixture!("sc_nidoran_everstones"),
            Gen7EggPidMethod::ShinyCharm,
            Gen7EggGender::CoinFlip,
            Gen7EggParents {
                male: parent(VARIED, Everstone, AbilityType::Second, MALE_NATURE),
                female: parent(ALL_31, Everstone, AbilityType::First, FEMALE_NATURE),
                ditto: Option::None,
                same_species: false,
            },
        ),
        make(
            fixture!("mm_ditto_male_only_power"),
            Gen7EggPidMethod::MasudaMethod,
            Gen7EggGender::Ratio(GenderRatio::MaleOnly),
            Gen7EggParents {
                male: parent(VARIED, DestinyKnot, AbilityType::Second, MALE_NATURE),
                female: parent(ALL_31, PowerWeight, AbilityType::Hidden, FEMALE_NATURE),
                ditto: Some(Gen7EggParentSlot::Female),
                same_species: false,
            },
        ),
    ]
}

/// Every egg, before filtering.
fn all_eggs(opts: &Gen7EggSearchOpts) -> Vec<Gen7Egg> {
    gen7_search_eggs(opts.clone())
        .into_iter()
        .map(|result| result.egg)
        .collect()
}

#[test]
fn eggs_match_3dsrngtool() {
    for fixture in fixtures() {
        let expected = fixture.expected_eggs();
        let eggs = all_eggs(&fixture.opts(expected.len() - 1));
        assert!(expected.iter().any(|egg| egg.shiny), "{}", fixture.name);
        assert_list_eq!(eggs, expected);
    }
}

#[test]
fn paths_match_3dsrngtool() {
    for fixture in fixtures() {
        for (target, expected) in fixture.expected_paths() {
            let opts = fixture.opts(target);
            let accept_advances: Vec<usize> = all_eggs(&opts)
                .iter()
                .map(|egg| egg.accept_advances)
                .collect();
            let paths = ShortestPaths::new(&accept_advances);
            assert_eq!(
                paths.advances_to(target),
                expected,
                "{} {target}",
                fixture.name
            );
            assert_eq!(
                paths.actions(target) as usize,
                expected.len() - 1,
                "{} {target}",
                fixture.name
            );
        }
    }
}

/// The advances a path lands on, from its steps.
fn advances_from_steps(path: &Gen7EggPath, eggs: &[Gen7Egg]) -> Vec<usize> {
    let mut advances = vec![0];
    for step in &path.steps {
        let mut advance = step.advance_before;
        for _ in 0..step.count {
            advance += match step.action {
                Gen7EggAction::Reject => 1,
                Gen7EggAction::Accept => eggs[advance].accept_advances,
            };
            advances.push(advance);
        }
    }
    advances
}

#[test]
fn egg_path_steps_follow_the_shortest_path() {
    for fixture in fixtures() {
        for (target, expected) in fixture.expected_paths() {
            let opts = fixture.opts(target);
            let eggs = all_eggs(&opts);
            let path = gen7_egg_path(opts, target);

            assert_eq!(path.target, eggs[target], "{} {target}", fixture.name);
            assert_eq!(advances_from_steps(&path, &eggs), expected);
            assert_eq!(path.accepts + path.rejects, expected.len() - 1);
            for step in &path.steps {
                assert_eq!(step.seed_before, eggs[step.advance_before].seed);
            }
        }
    }
}

#[test]
fn seed_after_target_is_the_seed_after_accepting() {
    let fixture = &fixtures()[0];
    let eggs = fixture.expected_eggs();
    let target = &eggs[57];
    let path = gen7_egg_path(fixture.opts(57), 57);
    assert_eq!(
        path.seed_after_target,
        eggs[57 + target.accept_advances].seed
    );
}

#[test]
fn search_ranks_by_the_shortest_path() {
    let fixture = &fixtures()[0];
    let results = gen7_search_eggs(fixture.opts(400));
    let expected_actions: Vec<u32> = fixture
        .expected_paths()
        .iter()
        .map(|(_, path)| path.len() as u32 - 1)
        .collect();
    let actions: Vec<u32> = fixture
        .expected_paths()
        .iter()
        .map(|(target, _)| results[*target].actions)
        .collect();
    assert_eq!(actions, expected_actions);
}

#[test]
fn search_filters_eggs() {
    let fixture = &fixtures()[0];
    let mut filter = PkmFilter::new_allow_all();
    filter.shiny = true;
    let results = gen7_search_eggs(Gen7EggSearchOpts {
        filter,
        ..fixture.opts(400)
    });
    let expected: Vec<Gen7Egg> = fixture
        .expected_eggs()
        .into_iter()
        .filter(|egg| egg.shiny)
        .collect();
    let eggs: Vec<Gen7Egg> = results.into_iter().map(|result| result.egg).collect();
    assert_eq!(eggs, expected);
}

#[test]
fn path_to_advance_0_is_empty() {
    let fixture = &fixtures()[0];
    let path = gen7_egg_path(fixture.opts(0), 0);
    assert!(path.steps.is_empty());
    assert_eq!((path.accepts, path.rejects), (0, 0));
}

#[test]
fn rejects_group_but_accepts_do_not() {
    let seeds: Vec<[u32; 4]> = (0..60).map(|advance| [advance; 4]).collect();
    let steps = path_steps(&[0, 1, 2, 3, 25, 50, 51], &seeds);
    let summary: Vec<(Gen7EggAction, usize, usize)> = steps
        .iter()
        .map(|step| (step.action, step.count, step.advance_before))
        .collect();
    assert_eq!(
        summary,
        vec![
            (Gen7EggAction::Reject, 3, 0),
            (Gen7EggAction::Accept, 1, 3),
            (Gen7EggAction::Accept, 1, 25),
            (Gen7EggAction::Reject, 1, 50),
        ]
    );
    assert_eq!(steps[1].seed_before, [3; 4]);
}

#[test]
fn pid_rolls_stop_on_a_shiny() {
    let fixture = &fixtures()[0];
    let settings = EggSettings::new(fixture.gender, &fixture.parents, fixture.tsv());
    let state = || {
        let mut rng = TinyMT::from_state(fixture.seed());
        rng.advance(40);
        rng
    };
    let never_shiny = EggSettings::new(fixture.gender, &fixture.parents, 0xffff);

    let shiny = generate_egg::<MasudaMethod>(state(), 40, &settings);
    let not_shiny = generate_egg::<MasudaMethod>(state(), 40, &never_shiny);

    assert!(shiny.shiny);
    // The harness made the second roll shiny.
    let unused_rolls = MasudaMethod::ROLLS as usize - 2;
    assert_eq!(
        not_shiny.accept_advances - shiny.accept_advances,
        unused_rolls
    );
}
