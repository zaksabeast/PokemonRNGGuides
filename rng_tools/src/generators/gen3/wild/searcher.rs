
use crate::Ivs;
use crate::gen3::EncounterSlot;
use crate::gen3::Gen3Lead;
use crate::gen3::Gen3Method;
use crate::rng::Rng;
use crate::rng::StateIterator;
use crate::rng::lcrng::Pokerng;
use super::{generate_gen3_wild, Wild3GeneratorResult,Wild3GeneratorOptions};
use crate::{AbilityType, Gender, GenderRatio, Nature, PkmFilter, gen3_shiny};


pub struct Wild3SearcherOptions {
    pub initial_seed: u32,
    pub tid: u16,
    pub sid: u16,
    pub gender_ratio: GenderRatio,
    pub initial_advances: usize,
    pub max_advances: usize,
    pub filter: PkmFilter,
    pub leads: Vec<Option<Gen3Lead>>,
    pub encounter_slots_by_map: Vec<Option<Vec<EncounterSlot>>>,
    pub methods: Vec<Gen3Method>,
}


fn search_wild3_at_given_advance(rng: &mut Pokerng, advance:usize, opts: &Wild3SearcherOptions) -> Vec<Wild3GeneratorResult> {
    let mut results:Vec<Wild3GeneratorResult> = vec![];
    for lead in opts.leads.iter() {
        for (encounter_idx, encounter_slots) in opts.encounter_slots_by_map.iter().enumerate() {
            for method in opts.methods.iter() {
                let gen_opts = Wild3GeneratorOptions {
                    tid: opts.tid,
                    sid: opts.sid,
                    advance,
                    encounter_idx,
                    gender_ratio: opts.gender_ratio,
                    encounter_slot: encounter_slots.clone(),
                    method:*method,
                    synchronize: *lead,
                    filter: opts.filter.clone(),
                };

                if let Some(result) = generate_gen3_wild(rng,advance,&gen_opts) {
                    results.push(result)
                }
            }
        }
    }
    results
}


pub fn search_wild3(opts: &Wild3SearcherOptions) -> Vec<Wild3GeneratorResult> {
    let base_rng = Pokerng::new(opts.initial_seed);
    StateIterator::new(base_rng)
        .enumerate()
        .skip(opts.initial_advances)
        .take(opts.max_advances.wrapping_add(1))
        .map(|(adv, mut rng)| {
            search_wild3_at_given_advance(&mut rng,adv, opts)
        })
        .flatten()
        .collect::<Vec<Wild3GeneratorResult>>()
}
