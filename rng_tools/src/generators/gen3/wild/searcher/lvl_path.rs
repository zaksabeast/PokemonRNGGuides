use crate::{
    gen3::{
        Gen3Lead,
        wild::searcher::{NatureGenderPath, NatureGenderToPidArc, PidPath},
    },
    rng::lcrng::Pokerng,
};

#[derive(Default, PartialEq, Debug, Clone, Copy)]
/** path used to generate lvl (state right before Hustle or level) */
pub struct LvlPath {
    pub seed: u32,
    pub lvl_to_nature_gender_arc: LvlToNatureGenderArc,
    pub nature_gender_to_pid_arc: NatureGenderToPidArc,
    pub pid_path: PidPath,
    pub debug_nature_gender_path: Option<NatureGenderPath>,
}

#[derive(Default, Debug, PartialEq, Clone, Copy)]
pub enum LvlToNatureGenderArc {
    #[default]
    Vanilla,
    Hustle,
}

pub struct LvlPathGenerator {
    arcs: Vec<LvlToNatureGenderArc>,
}

impl LvlPathGenerator {
    pub fn new(leads: &[Gen3Lead]) -> Self {
        let mut arcs: Vec<LvlToNatureGenderArc> = vec![];

        if permit_vanilla_arc(leads) {
            arcs.push(LvlToNatureGenderArc::Vanilla);
        }
        if permit_hustle_arc(leads) {
            arcs.push(LvlToNatureGenderArc::Hustle);
        }
        Self { arcs }
    }
    pub fn extend_path_for_all_arcs(&self, nature_gender_path: &NatureGenderPath) -> Vec<LvlPath> {
        self.arcs
            .iter()
            .filter_map(|arc| {
                if *arc == LvlToNatureGenderArc::Hustle
                    && !permit_hustle_arc_for_path(nature_gender_path)
                {
                    None
                } else {
                    extend_path_for_arc(nature_gender_path, *arc)
                }
            })
            .collect()
    }
}

fn permit_vanilla_arc(leads: &[Gen3Lead]) -> bool {
    leads
        .iter()
        .any(|lead| *lead != Gen3Lead::HustleVitalSpiritPressure)
}

fn permit_hustle_arc(leads: &[Gen3Lead]) -> bool {
    leads.contains(&Gen3Lead::HustleVitalSpiritPressure)
}

fn permit_hustle_arc_for_path(nature_gender_path: &NatureGenderPath) -> bool {
    // Cant' be Hustle and another ability at the same time
    !matches!(
        nature_gender_path.nature_gender_arc,
        NatureGenderToPidArc::SynchronizeFailure
            | NatureGenderToPidArc::SynchronizeSuccess
            | NatureGenderToPidArc::CuteCharmSuccess
            | NatureGenderToPidArc::CuteCharmFailure
    )
}

fn extend_path_for_arc(
    nature_gender_path: &NatureGenderPath,
    arc: LvlToNatureGenderArc,
) -> Option<LvlPath> {
    let mut rng = Pokerng::new(nature_gender_path.seed);

    rng.prev_rand();
    if arc == LvlToNatureGenderArc::Hustle {
        rng.prev_rand();
    }

    Some(LvlPath {
        seed: rng.seed(),
        lvl_to_nature_gender_arc: arc,
        nature_gender_to_pid_arc: nature_gender_path.nature_gender_arc,
        pid_path: nature_gender_path.pid_path,
        debug_nature_gender_path: if cfg!(debug_assertions) {
            Some(*nature_gender_path)
        } else {
            None
        },
    })
}
