use crate::{G3Idx, Ivs};
use num_enum::FromPrimitive;
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Default, Clone, Copy, PartialEq, FromPrimitive, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
#[repr(u8)]
pub enum Characteristic {
    #[default]
    LovesToEat = 0,
    TakesPlentyOfSiestas = 1,
    NodsOffALot = 2,
    ScattersThingsOften = 3,
    LikesToRelax = 4,
    ProudOfItsPower = 5,
    LikesToThrashAbout = 6,
    ALittleQuickTempered = 7,
    LikesToFight = 8,
    QuickTempered = 9,
    SturdyBody = 10,
    CapableOfTakingHits = 11,
    HighlyPersistent = 12,
    GoodEndurance = 13,
    GoodPerseverance = 14,
    LikesToRun = 15,
    AlertToSounds = 16,
    ImpetuousAndSilly = 17,
    SomewhatOfAClown = 18,
    QuickToFlee = 19,
    HighlyCurious = 20,
    Mischievous = 21,
    ThoroughlyCunning = 22,
    OftenLostInThought = 23,
    VeryFinicky = 24,
    StrongWilled = 25,
    SomewhatVain = 26,
    StronglyDefiant = 27,
    HatesToLose = 28,
    SomewhatStubborn = 29,
}

const ORDER: [G3Idx; 6] = [
    G3Idx::Hp,
    G3Idx::Atk,
    G3Idx::Def,
    G3Idx::Spe,
    G3Idx::Spa,
    G3Idx::Spd,
];
const CHAR_ORDER: [usize; 11] = [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4];

impl Characteristic {
    pub fn new(ec: u32, ivs: &Ivs) -> Self {
        let ec_index = (ec % 6) as usize;
        let mut char_index = ec_index;
        let mut max_iv = 0;

        for i in 0..6 {
            let index = CHAR_ORDER[ec_index + i];
            let iv = ivs[ORDER[index]];
            if iv > max_iv {
                char_index = index;
                max_iv = iv;
            }
        }

        (((char_index as u8) * 5) + (max_iv % 5)).into()
    }

    #[cfg(test)]
    pub fn from_pokefinder_str(str: &str) -> Self {
        match str {
            "A little quick tempered" => Characteristic::ALittleQuickTempered,
            "Alert to sounds" => Characteristic::AlertToSounds,
            "Capable of taking hits" => Characteristic::CapableOfTakingHits,
            "Good endurance" => Characteristic::GoodEndurance,
            "Good perseverance" => Characteristic::GoodPerseverance,
            "Hates to lose" => Characteristic::HatesToLose,
            "Highly curious" => Characteristic::HighlyCurious,
            "Highly persistent" => Characteristic::HighlyPersistent,
            "Impetuous and silly" => Characteristic::ImpetuousAndSilly,
            "Likes to fight" => Characteristic::LikesToFight,
            "Likes to relax" => Characteristic::LikesToRelax,
            "Likes to run" => Characteristic::LikesToRun,
            "Likes to thrash about" => Characteristic::LikesToThrashAbout,
            "Loves to eat" => Characteristic::LovesToEat,
            "Mischievous" => Characteristic::Mischievous,
            "Nods off a lot" => Characteristic::NodsOffALot,
            "Often lost in thought" => Characteristic::OftenLostInThought,
            "Proud of its power" => Characteristic::ProudOfItsPower,
            "Quick tempered" => Characteristic::QuickTempered,
            "Quick to flee" => Characteristic::QuickToFlee,
            "Scatters things often" => Characteristic::ScattersThingsOften,
            "Somewhat of a clown" => Characteristic::SomewhatOfAClown,
            "Somewhat stubborn" => Characteristic::SomewhatStubborn,
            "Somewhat vain" => Characteristic::SomewhatVain,
            "Strong willed" => Characteristic::StrongWilled,
            "Strongly defiant" => Characteristic::StronglyDefiant,
            "Sturdy body" => Characteristic::SturdyBody,
            "Takes plenty of siestas" => Characteristic::TakesPlentyOfSiestas,
            "Thoroughly cunning" => Characteristic::ThoroughlyCunning,
            "Very finicky" => Characteristic::VeryFinicky,
            _ => panic!("Unknown characteristic string: {}", str),
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::{assert_list_eq, ivs};

    #[test]
    fn test_characteristic() {
        let test_cases = [
            (0x74313CBB, ivs!(30 / 30 / 21 / 21 / 27 / 26)),
            (0xF431BCBB, ivs!(30 / 30 / 21 / 21 / 27 / 26)),
            (0xD831B0BB, ivs!(30 / 30 / 26 / 21 / 28 / 26)),
        ];

        let results = test_cases
            .into_iter()
            .map(|(ec, ivs)| Characteristic::new(ec, &ivs))
            .collect::<Vec<_>>();

        let expected = [
            Characteristic::ProudOfItsPower,
            Characteristic::LovesToEat,
            Characteristic::ProudOfItsPower,
        ];

        assert_list_eq!(results, expected);
    }
}
