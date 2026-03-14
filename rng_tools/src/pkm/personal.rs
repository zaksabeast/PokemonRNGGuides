use crate::{GenderRatio, Species, StatsValue, stats};

use GenderRatio::*;

pub struct Personal {
    pub base_stats: StatsValue,
    pub gender_ratio: GenderRatio,
    pub forms: &'static [Personal],
}

const PERSONALS: &[Personal] = &[
    /* None */
    Personal {
        base_stats: stats!(0 / 0 / 0 / 0 / 0 / 0),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Bulbasaur */
    Personal {
        base_stats: stats!(45 / 49 / 49 / 65 / 65 / 45),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Ivysaur */
    Personal {
        base_stats: stats!(60 / 62 / 63 / 80 / 80 / 60),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Venusaur */
    Personal {
        base_stats: stats!(80 / 82 / 83 / 100 / 100 / 80),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Charmander */
    Personal {
        base_stats: stats!(39 / 52 / 43 / 60 / 50 / 65),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Charmeleon */
    Personal {
        base_stats: stats!(58 / 64 / 58 / 80 / 65 / 80),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Charizard */
    Personal {
        base_stats: stats!(78 / 84 / 78 / 109 / 85 / 100),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Squirtle */
    Personal {
        base_stats: stats!(44 / 48 / 65 / 50 / 64 / 43),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Wartortle */
    Personal {
        base_stats: stats!(59 / 63 / 80 / 65 / 80 / 58),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Blastoise */
    Personal {
        base_stats: stats!(79 / 83 / 100 / 85 / 105 / 78),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Caterpie */
    Personal {
        base_stats: stats!(45 / 30 / 35 / 20 / 20 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Metapod */
    Personal {
        base_stats: stats!(50 / 20 / 55 / 25 / 25 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Butterfree */
    Personal {
        base_stats: stats!(60 / 45 / 50 / 80 / 80 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Weedle */
    Personal {
        base_stats: stats!(40 / 35 / 30 / 20 / 20 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Kakuna */
    Personal {
        base_stats: stats!(45 / 25 / 50 / 25 / 25 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Beedrill */
    Personal {
        base_stats: stats!(65 / 80 / 40 / 45 / 80 / 75),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Pidgey */
    Personal {
        base_stats: stats!(40 / 45 / 40 / 35 / 35 / 56),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Pidgeotto */
    Personal {
        base_stats: stats!(63 / 60 / 55 / 50 / 50 / 71),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Pidgeot */
    Personal {
        base_stats: stats!(83 / 80 / 75 / 70 / 70 / 91),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Rattata */
    Personal {
        base_stats: stats!(30 / 56 / 35 / 25 / 35 / 72),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Raticate */
    Personal {
        base_stats: stats!(55 / 81 / 60 / 50 / 70 / 97),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Spearow */
    Personal {
        base_stats: stats!(40 / 60 / 30 / 31 / 31 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Fearow */
    Personal {
        base_stats: stats!(65 / 90 / 65 / 61 / 61 / 100),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Ekans */
    Personal {
        base_stats: stats!(35 / 60 / 44 / 40 / 54 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Arbok */
    Personal {
        base_stats: stats!(60 / 85 / 69 / 65 / 79 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Pikachu */
    Personal {
        base_stats: stats!(35 / 55 / 30 / 50 / 40 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Raichu */
    Personal {
        base_stats: stats!(60 / 90 / 55 / 90 / 80 / 100),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Sandshrew */
    Personal {
        base_stats: stats!(50 / 75 / 85 / 20 / 30 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Sandslash */
    Personal {
        base_stats: stats!(75 / 100 / 110 / 45 / 55 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Nidoran F */
    Personal {
        base_stats: stats!(55 / 47 / 52 / 40 / 40 / 41),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Nidorina */
    Personal {
        base_stats: stats!(70 / 62 / 67 / 55 / 55 / 56),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Nidoqueen */
    Personal {
        base_stats: stats!(90 / 82 / 87 / 75 / 85 / 76),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Nidoran M */
    Personal {
        base_stats: stats!(46 / 57 / 40 / 40 / 40 / 50),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Nidorino */
    Personal {
        base_stats: stats!(61 / 72 / 57 / 55 / 55 / 65),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Nidoking */
    Personal {
        base_stats: stats!(81 / 92 / 77 / 85 / 75 / 85),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Clefairy */
    Personal {
        base_stats: stats!(70 / 45 / 48 / 60 / 65 / 35),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Clefable */
    Personal {
        base_stats: stats!(95 / 70 / 73 / 85 / 90 / 60),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Vulpix */
    Personal {
        base_stats: stats!(38 / 41 / 40 / 50 / 65 / 65),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Ninetales */
    Personal {
        base_stats: stats!(73 / 76 / 75 / 81 / 100 / 100),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Jigglypuff */
    Personal {
        base_stats: stats!(115 / 45 / 20 / 45 / 25 / 20),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Wigglytuff */
    Personal {
        base_stats: stats!(140 / 70 / 45 / 75 / 50 / 45),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Zubat */
    Personal {
        base_stats: stats!(40 / 45 / 35 / 30 / 40 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Golbat */
    Personal {
        base_stats: stats!(75 / 80 / 70 / 65 / 75 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Oddish */
    Personal {
        base_stats: stats!(45 / 50 / 55 / 75 / 65 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Gloom */
    Personal {
        base_stats: stats!(60 / 65 / 70 / 85 / 75 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Vileplume */
    Personal {
        base_stats: stats!(75 / 80 / 85 / 100 / 90 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Paras */
    Personal {
        base_stats: stats!(35 / 70 / 55 / 45 / 55 / 25),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Parasect */
    Personal {
        base_stats: stats!(60 / 95 / 80 / 60 / 80 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Venonat */
    Personal {
        base_stats: stats!(60 / 55 / 50 / 40 / 55 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Venomoth */
    Personal {
        base_stats: stats!(70 / 65 / 60 / 90 / 75 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Diglett */
    Personal {
        base_stats: stats!(10 / 55 / 25 / 35 / 45 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Dugtrio */
    Personal {
        base_stats: stats!(35 / 80 / 50 / 50 / 70 / 120),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Meowth */
    Personal {
        base_stats: stats!(40 / 45 / 35 / 40 / 40 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Persian */
    Personal {
        base_stats: stats!(65 / 70 / 60 / 65 / 65 / 115),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Psyduck */
    Personal {
        base_stats: stats!(50 / 52 / 48 / 65 / 50 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Golduck */
    Personal {
        base_stats: stats!(80 / 82 / 78 / 95 / 80 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Mankey */
    Personal {
        base_stats: stats!(40 / 80 / 35 / 35 / 45 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Primeape */
    Personal {
        base_stats: stats!(65 / 105 / 60 / 60 / 70 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Growlithe */
    Personal {
        base_stats: stats!(55 / 70 / 45 / 70 / 50 / 60),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Arcanine */
    Personal {
        base_stats: stats!(90 / 110 / 80 / 100 / 80 / 95),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Poliwag */
    Personal {
        base_stats: stats!(40 / 50 / 40 / 40 / 40 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Poliwhirl */
    Personal {
        base_stats: stats!(65 / 65 / 65 / 50 / 50 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Poliwrath */
    Personal {
        base_stats: stats!(90 / 85 / 95 / 70 / 90 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Abra */
    Personal {
        base_stats: stats!(25 / 20 / 15 / 105 / 55 / 90),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Kadabra */
    Personal {
        base_stats: stats!(40 / 35 / 30 / 120 / 70 / 105),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Alakazam */
    Personal {
        base_stats: stats!(55 / 50 / 45 / 135 / 85 / 120),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Machop */
    Personal {
        base_stats: stats!(70 / 80 / 50 / 35 / 35 / 35),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Machoke */
    Personal {
        base_stats: stats!(80 / 100 / 70 / 50 / 60 / 45),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Machamp */
    Personal {
        base_stats: stats!(90 / 130 / 80 / 65 / 85 / 55),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Bellsprout */
    Personal {
        base_stats: stats!(50 / 75 / 35 / 70 / 30 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Weepinbell */
    Personal {
        base_stats: stats!(65 / 90 / 50 / 85 / 45 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Victreebel */
    Personal {
        base_stats: stats!(80 / 105 / 65 / 100 / 60 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Tentacool */
    Personal {
        base_stats: stats!(40 / 40 / 35 / 50 / 100 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Tentacruel */
    Personal {
        base_stats: stats!(80 / 70 / 65 / 80 / 120 / 100),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Geodude */
    Personal {
        base_stats: stats!(40 / 80 / 100 / 30 / 30 / 20),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Graveler */
    Personal {
        base_stats: stats!(55 / 95 / 115 / 45 / 45 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Golem */
    Personal {
        base_stats: stats!(80 / 110 / 130 / 55 / 65 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Ponyta */
    Personal {
        base_stats: stats!(50 / 85 / 55 / 65 / 65 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Rapidash */
    Personal {
        base_stats: stats!(65 / 100 / 70 / 80 / 80 / 105),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Slowpoke */
    Personal {
        base_stats: stats!(90 / 65 / 65 / 40 / 40 / 15),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Slowbro */
    Personal {
        base_stats: stats!(95 / 75 / 110 / 100 / 80 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Magnemite */
    Personal {
        base_stats: stats!(25 / 35 / 70 / 95 / 55 / 45),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Magneton */
    Personal {
        base_stats: stats!(50 / 60 / 95 / 120 / 70 / 70),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Farfetchd */
    Personal {
        base_stats: stats!(52 / 65 / 55 / 58 / 62 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Doduo */
    Personal {
        base_stats: stats!(35 / 85 / 45 / 35 / 35 / 75),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Dodrio */
    Personal {
        base_stats: stats!(60 / 110 / 70 / 60 / 60 / 100),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Seel */
    Personal {
        base_stats: stats!(65 / 45 / 55 / 45 / 70 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Dewgong */
    Personal {
        base_stats: stats!(90 / 70 / 80 / 70 / 95 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Grimer */
    Personal {
        base_stats: stats!(80 / 80 / 50 / 40 / 50 / 25),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Muk */
    Personal {
        base_stats: stats!(105 / 105 / 75 / 65 / 100 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Shellder */
    Personal {
        base_stats: stats!(30 / 65 / 100 / 45 / 25 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Cloyster */
    Personal {
        base_stats: stats!(50 / 95 / 180 / 85 / 45 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Gastly */
    Personal {
        base_stats: stats!(30 / 35 / 30 / 100 / 35 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Haunter */
    Personal {
        base_stats: stats!(45 / 50 / 45 / 115 / 55 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Gengar */
    Personal {
        base_stats: stats!(60 / 65 / 60 / 130 / 75 / 110),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Onix */
    Personal {
        base_stats: stats!(35 / 45 / 160 / 30 / 45 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Drowzee */
    Personal {
        base_stats: stats!(60 / 48 / 45 / 43 / 90 / 42),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Hypno */
    Personal {
        base_stats: stats!(85 / 73 / 70 / 73 / 115 / 67),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Krabby */
    Personal {
        base_stats: stats!(30 / 105 / 90 / 25 / 25 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Kingler */
    Personal {
        base_stats: stats!(55 / 130 / 115 / 50 / 50 / 75),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Voltorb */
    Personal {
        base_stats: stats!(40 / 30 / 50 / 55 / 55 / 100),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Electrode */
    Personal {
        base_stats: stats!(60 / 50 / 70 / 80 / 80 / 140),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Exeggcute */
    Personal {
        base_stats: stats!(60 / 40 / 80 / 60 / 45 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Exeggutor */
    Personal {
        base_stats: stats!(95 / 95 / 85 / 125 / 65 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Cubone */
    Personal {
        base_stats: stats!(50 / 50 / 95 / 40 / 50 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Marowak */
    Personal {
        base_stats: stats!(60 / 80 / 110 / 50 / 80 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Hitmonlee */
    Personal {
        base_stats: stats!(50 / 120 / 53 / 35 / 110 / 87),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Hitmonchan */
    Personal {
        base_stats: stats!(50 / 105 / 79 / 35 / 110 / 76),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Lickitung */
    Personal {
        base_stats: stats!(90 / 55 / 75 / 60 / 75 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Koffing */
    Personal {
        base_stats: stats!(40 / 65 / 95 / 60 / 45 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Weezing */
    Personal {
        base_stats: stats!(65 / 90 / 120 / 85 / 70 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Rhyhorn */
    Personal {
        base_stats: stats!(80 / 85 / 95 / 30 / 30 / 25),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Rhydon */
    Personal {
        base_stats: stats!(105 / 130 / 120 / 45 / 45 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Chansey */
    Personal {
        base_stats: stats!(250 / 5 / 5 / 35 / 105 / 50),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Tangela */
    Personal {
        base_stats: stats!(65 / 55 / 115 / 100 / 40 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Kangaskhan */
    Personal {
        base_stats: stats!(105 / 95 / 80 / 40 / 80 / 90),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Horsea */
    Personal {
        base_stats: stats!(30 / 40 / 70 / 70 / 25 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Seadra */
    Personal {
        base_stats: stats!(55 / 65 / 95 / 95 / 45 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Goldeen */
    Personal {
        base_stats: stats!(45 / 67 / 60 / 35 / 50 / 63),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Seaking */
    Personal {
        base_stats: stats!(80 / 92 / 65 / 65 / 80 / 68),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Staryu */
    Personal {
        base_stats: stats!(30 / 45 / 55 / 70 / 55 / 85),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Starmie */
    Personal {
        base_stats: stats!(60 / 75 / 85 / 100 / 85 / 115),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Mr. mime */
    Personal {
        base_stats: stats!(40 / 45 / 65 / 100 / 120 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Scyther */
    Personal {
        base_stats: stats!(70 / 110 / 80 / 55 / 80 / 105),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Jynx */
    Personal {
        base_stats: stats!(65 / 50 / 35 / 115 / 95 / 95),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Electabuzz */
    Personal {
        base_stats: stats!(65 / 83 / 57 / 95 / 85 / 105),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Magmar */
    Personal {
        base_stats: stats!(65 / 95 / 57 / 100 / 85 / 93),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Pinsir */
    Personal {
        base_stats: stats!(65 / 125 / 100 / 55 / 70 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Tauros */
    Personal {
        base_stats: stats!(75 / 100 / 95 / 40 / 70 / 110),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Magikarp */
    Personal {
        base_stats: stats!(20 / 10 / 55 / 15 / 20 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Gyarados */
    Personal {
        base_stats: stats!(95 / 125 / 79 / 60 / 100 / 81),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Lapras */
    Personal {
        base_stats: stats!(130 / 85 / 80 / 85 / 95 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Ditto */
    Personal {
        base_stats: stats!(48 / 48 / 48 / 48 / 48 / 48),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Eevee */
    Personal {
        base_stats: stats!(55 / 55 / 50 / 45 / 65 / 55),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Vaporeon */
    Personal {
        base_stats: stats!(130 / 65 / 60 / 110 / 95 / 65),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Jolteon */
    Personal {
        base_stats: stats!(65 / 65 / 60 / 110 / 95 / 130),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Flareon */
    Personal {
        base_stats: stats!(65 / 130 / 60 / 95 / 110 / 65),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Porygon */
    Personal {
        base_stats: stats!(65 / 60 / 70 / 85 / 75 / 40),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Omanyte */
    Personal {
        base_stats: stats!(35 / 40 / 100 / 90 / 55 / 35),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Omastar */
    Personal {
        base_stats: stats!(70 / 60 / 125 / 115 / 70 / 55),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Kabuto */
    Personal {
        base_stats: stats!(30 / 80 / 90 / 55 / 45 / 55),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Kabutops */
    Personal {
        base_stats: stats!(60 / 115 / 105 / 65 / 70 / 80),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Aerodactyl */
    Personal {
        base_stats: stats!(80 / 105 / 65 / 60 / 75 / 130),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Snorlax */
    Personal {
        base_stats: stats!(160 / 110 / 65 / 65 / 110 / 30),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Articuno */
    Personal {
        base_stats: stats!(90 / 85 / 100 / 95 / 125 / 85),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Zapdos */
    Personal {
        base_stats: stats!(90 / 90 / 85 / 125 / 90 / 100),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Moltres */
    Personal {
        base_stats: stats!(90 / 100 / 90 / 125 / 85 / 90),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Dratini */
    Personal {
        base_stats: stats!(41 / 64 / 45 / 50 / 50 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Dragonair */
    Personal {
        base_stats: stats!(61 / 84 / 65 / 70 / 70 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Dragonite */
    Personal {
        base_stats: stats!(91 / 134 / 95 / 100 / 100 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Mewtwo */
    Personal {
        base_stats: stats!(106 / 110 / 90 / 154 / 90 / 130),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Mew */
    Personal {
        base_stats: stats!(100 / 100 / 100 / 100 / 100 / 100),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Chikorita */
    Personal {
        base_stats: stats!(45 / 49 / 65 / 49 / 65 / 45),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Bayleef */
    Personal {
        base_stats: stats!(60 / 62 / 80 / 63 / 80 / 60),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Meganium */
    Personal {
        base_stats: stats!(80 / 82 / 100 / 83 / 100 / 80),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Cyndaquil */
    Personal {
        base_stats: stats!(39 / 52 / 43 / 60 / 50 / 65),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Quilava */
    Personal {
        base_stats: stats!(58 / 64 / 58 / 80 / 65 / 80),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Typhlosion */
    Personal {
        base_stats: stats!(78 / 84 / 78 / 109 / 85 / 100),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Totodile */
    Personal {
        base_stats: stats!(50 / 65 / 64 / 44 / 48 / 43),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Croconaw */
    Personal {
        base_stats: stats!(65 / 80 / 80 / 59 / 63 / 58),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Feraligatr */
    Personal {
        base_stats: stats!(85 / 105 / 100 / 79 / 83 / 78),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Sentret */
    Personal {
        base_stats: stats!(35 / 46 / 34 / 35 / 45 / 20),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Furret */
    Personal {
        base_stats: stats!(85 / 76 / 64 / 45 / 55 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Hoothoot */
    Personal {
        base_stats: stats!(60 / 30 / 30 / 36 / 56 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Noctowl */
    Personal {
        base_stats: stats!(100 / 50 / 50 / 76 / 96 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Ledyba */
    Personal {
        base_stats: stats!(40 / 20 / 30 / 40 / 80 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Ledian */
    Personal {
        base_stats: stats!(55 / 35 / 50 / 55 / 110 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Spinarak */
    Personal {
        base_stats: stats!(40 / 60 / 40 / 40 / 40 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Ariados */
    Personal {
        base_stats: stats!(70 / 90 / 70 / 60 / 60 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Crobat */
    Personal {
        base_stats: stats!(85 / 90 / 80 / 70 / 80 / 130),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Chinchou */
    Personal {
        base_stats: stats!(75 / 38 / 38 / 56 / 56 / 67),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Lanturn */
    Personal {
        base_stats: stats!(125 / 58 / 58 / 76 / 76 / 67),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Pichu */
    Personal {
        base_stats: stats!(20 / 40 / 15 / 35 / 35 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Cleffa */
    Personal {
        base_stats: stats!(50 / 25 / 28 / 45 / 55 / 15),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Igglybuff */
    Personal {
        base_stats: stats!(90 / 30 / 15 / 40 / 20 / 15),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Togepi */
    Personal {
        base_stats: stats!(35 / 20 / 65 / 40 / 65 / 20),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Togetic */
    Personal {
        base_stats: stats!(55 / 40 / 85 / 80 / 105 / 40),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Natu */
    Personal {
        base_stats: stats!(40 / 50 / 45 / 70 / 45 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Xatu */
    Personal {
        base_stats: stats!(65 / 75 / 70 / 95 / 70 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Mareep */
    Personal {
        base_stats: stats!(55 / 40 / 40 / 65 / 45 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Flaaffy */
    Personal {
        base_stats: stats!(70 / 55 / 55 / 80 / 60 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Ampharos */
    Personal {
        base_stats: stats!(90 / 75 / 75 / 115 / 90 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Bellossom */
    Personal {
        base_stats: stats!(75 / 80 / 85 / 90 / 100 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Marill */
    Personal {
        base_stats: stats!(70 / 20 / 50 / 20 / 50 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Azumarill */
    Personal {
        base_stats: stats!(100 / 50 / 80 / 50 / 80 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Sudowoodo */
    Personal {
        base_stats: stats!(70 / 100 / 115 / 30 / 65 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Politoed */
    Personal {
        base_stats: stats!(90 / 75 / 75 / 90 / 100 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Hoppip */
    Personal {
        base_stats: stats!(35 / 35 / 40 / 35 / 55 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Skiploom */
    Personal {
        base_stats: stats!(55 / 45 / 50 / 45 / 65 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Jumpluff */
    Personal {
        base_stats: stats!(75 / 55 / 70 / 55 / 85 / 110),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Aipom */
    Personal {
        base_stats: stats!(55 / 70 / 55 / 40 / 55 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Sunkern */
    Personal {
        base_stats: stats!(30 / 30 / 30 / 30 / 30 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Sunflora */
    Personal {
        base_stats: stats!(75 / 75 / 55 / 105 / 85 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Yanma */
    Personal {
        base_stats: stats!(65 / 65 / 45 / 75 / 45 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Wooper */
    Personal {
        base_stats: stats!(55 / 45 / 45 / 25 / 25 / 15),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Quagsire */
    Personal {
        base_stats: stats!(95 / 85 / 85 / 65 / 65 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Espeon */
    Personal {
        base_stats: stats!(65 / 65 / 60 / 130 / 95 / 110),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Umbreon */
    Personal {
        base_stats: stats!(95 / 65 / 110 / 60 / 130 / 65),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Murkrow */
    Personal {
        base_stats: stats!(60 / 85 / 42 / 85 / 42 / 91),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Slowking */
    Personal {
        base_stats: stats!(95 / 75 / 80 / 100 / 110 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Misdreavus */
    Personal {
        base_stats: stats!(60 / 60 / 60 / 85 / 85 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Unown */
    Personal {
        base_stats: stats!(48 / 72 / 48 / 72 / 48 / 48),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Wobbuffet */
    Personal {
        base_stats: stats!(190 / 33 / 58 / 33 / 58 / 33),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Girafarig */
    Personal {
        base_stats: stats!(70 / 80 / 65 / 90 / 65 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Pineco */
    Personal {
        base_stats: stats!(50 / 65 / 90 / 35 / 35 / 15),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Forretress */
    Personal {
        base_stats: stats!(75 / 90 / 140 / 60 / 60 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Dunsparce */
    Personal {
        base_stats: stats!(100 / 70 / 70 / 65 / 65 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Gligar */
    Personal {
        base_stats: stats!(65 / 75 / 105 / 35 / 65 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Steelix */
    Personal {
        base_stats: stats!(75 / 85 / 200 / 55 / 65 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Snubbull */
    Personal {
        base_stats: stats!(60 / 80 / 50 / 40 / 40 / 30),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Granbull */
    Personal {
        base_stats: stats!(90 / 120 / 75 / 60 / 60 / 45),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Qwilfish */
    Personal {
        base_stats: stats!(65 / 95 / 75 / 55 / 55 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Scizor */
    Personal {
        base_stats: stats!(70 / 130 / 100 / 55 / 80 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Shuckle */
    Personal {
        base_stats: stats!(20 / 10 / 230 / 10 / 230 / 5),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Heracross */
    Personal {
        base_stats: stats!(80 / 125 / 75 / 40 / 95 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Sneasel */
    Personal {
        base_stats: stats!(55 / 95 / 55 / 35 / 75 / 115),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Teddiursa */
    Personal {
        base_stats: stats!(60 / 80 / 50 / 50 / 50 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Ursaring */
    Personal {
        base_stats: stats!(90 / 130 / 75 / 75 / 75 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Slugma */
    Personal {
        base_stats: stats!(40 / 40 / 40 / 70 / 40 / 20),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Magcargo */
    Personal {
        base_stats: stats!(50 / 50 / 120 / 80 / 80 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Swinub */
    Personal {
        base_stats: stats!(50 / 50 / 40 / 30 / 30 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Piloswine */
    Personal {
        base_stats: stats!(100 / 100 / 80 / 60 / 60 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Corsola */
    Personal {
        base_stats: stats!(55 / 55 / 85 / 65 / 85 / 35),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Remoraid */
    Personal {
        base_stats: stats!(35 / 65 / 35 / 65 / 35 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Octillery */
    Personal {
        base_stats: stats!(75 / 105 / 75 / 105 / 75 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Delibird */
    Personal {
        base_stats: stats!(45 / 55 / 45 / 65 / 45 / 75),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Mantine */
    Personal {
        base_stats: stats!(65 / 40 / 70 / 80 / 140 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Skarmory */
    Personal {
        base_stats: stats!(65 / 80 / 140 / 40 / 70 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Houndour */
    Personal {
        base_stats: stats!(45 / 60 / 30 / 80 / 50 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Houndoom */
    Personal {
        base_stats: stats!(75 / 90 / 50 / 110 / 80 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Kingdra */
    Personal {
        base_stats: stats!(75 / 95 / 95 / 95 / 95 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Phanpy */
    Personal {
        base_stats: stats!(90 / 60 / 60 / 40 / 40 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Donphan */
    Personal {
        base_stats: stats!(90 / 120 / 120 / 60 / 60 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Porygon2 */
    Personal {
        base_stats: stats!(85 / 80 / 90 / 105 / 95 / 60),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Stantler */
    Personal {
        base_stats: stats!(73 / 95 / 62 / 85 / 65 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Smeargle */
    Personal {
        base_stats: stats!(55 / 20 / 35 / 20 / 45 / 75),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Tyrogue */
    Personal {
        base_stats: stats!(35 / 35 / 35 / 35 / 35 / 35),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Hitmontop */
    Personal {
        base_stats: stats!(50 / 95 / 95 / 35 / 110 / 70),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Smoochum */
    Personal {
        base_stats: stats!(45 / 30 / 15 / 85 / 65 / 65),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Elekid */
    Personal {
        base_stats: stats!(45 / 63 / 37 / 65 / 55 / 95),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Magby */
    Personal {
        base_stats: stats!(45 / 75 / 37 / 70 / 55 / 83),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Miltank */
    Personal {
        base_stats: stats!(95 / 80 / 105 / 40 / 70 / 100),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Blissey */
    Personal {
        base_stats: stats!(255 / 10 / 10 / 75 / 135 / 55),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Raikou */
    Personal {
        base_stats: stats!(90 / 85 / 75 / 115 / 100 / 115),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Entei */
    Personal {
        base_stats: stats!(115 / 115 / 85 / 90 / 75 / 100),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Suicune */
    Personal {
        base_stats: stats!(100 / 75 / 115 / 90 / 115 / 85),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Larvitar */
    Personal {
        base_stats: stats!(50 / 64 / 50 / 45 / 50 / 41),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Pupitar */
    Personal {
        base_stats: stats!(70 / 84 / 70 / 65 / 70 / 51),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Tyranitar */
    Personal {
        base_stats: stats!(100 / 134 / 110 / 95 / 100 / 61),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Lugia */
    Personal {
        base_stats: stats!(106 / 90 / 130 / 90 / 154 / 110),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Ho-Oh */
    Personal {
        base_stats: stats!(106 / 130 / 90 / 110 / 154 / 90),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Celebi */
    Personal {
        base_stats: stats!(100 / 100 / 100 / 100 / 100 / 100),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Treecko */
    Personal {
        base_stats: stats!(40 / 45 / 35 / 65 / 55 / 70),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Grovyle */
    Personal {
        base_stats: stats!(50 / 65 / 45 / 85 / 65 / 95),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Sceptile */
    Personal {
        base_stats: stats!(70 / 85 / 65 / 105 / 85 / 120),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Torchic */
    Personal {
        base_stats: stats!(45 / 60 / 40 / 70 / 50 / 45),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Combusken */
    Personal {
        base_stats: stats!(60 / 85 / 60 / 85 / 60 / 55),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Blaziken */
    Personal {
        base_stats: stats!(80 / 120 / 70 / 110 / 70 / 80),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Mudkip */
    Personal {
        base_stats: stats!(50 / 70 / 50 / 50 / 50 / 40),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Marshtomp */
    Personal {
        base_stats: stats!(70 / 85 / 70 / 60 / 70 / 50),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Swampert */
    Personal {
        base_stats: stats!(100 / 110 / 90 / 85 / 90 / 60),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Poochyena */
    Personal {
        base_stats: stats!(35 / 55 / 35 / 30 / 30 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Mightyena */
    Personal {
        base_stats: stats!(70 / 90 / 70 / 60 / 60 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Zigzagoon */
    Personal {
        base_stats: stats!(38 / 30 / 41 / 30 / 41 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Linoone */
    Personal {
        base_stats: stats!(78 / 70 / 61 / 50 / 61 / 100),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Wurmple */
    Personal {
        base_stats: stats!(45 / 45 / 35 / 20 / 30 / 20),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Silcoon */
    Personal {
        base_stats: stats!(50 / 35 / 55 / 25 / 25 / 15),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Beautifly */
    Personal {
        base_stats: stats!(60 / 70 / 50 / 90 / 50 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Cascoon */
    Personal {
        base_stats: stats!(50 / 35 / 55 / 25 / 25 / 15),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Dustox */
    Personal {
        base_stats: stats!(60 / 50 / 70 / 50 / 90 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Lotad */
    Personal {
        base_stats: stats!(40 / 30 / 30 / 40 / 50 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Lombre */
    Personal {
        base_stats: stats!(60 / 50 / 50 / 60 / 70 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Ludicolo */
    Personal {
        base_stats: stats!(80 / 70 / 70 / 90 / 100 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Seedot */
    Personal {
        base_stats: stats!(40 / 40 / 50 / 30 / 30 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Nuzleaf */
    Personal {
        base_stats: stats!(70 / 70 / 40 / 60 / 40 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Shiftry */
    Personal {
        base_stats: stats!(90 / 100 / 60 / 90 / 60 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Taillow */
    Personal {
        base_stats: stats!(40 / 55 / 30 / 30 / 30 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Swellow */
    Personal {
        base_stats: stats!(60 / 85 / 60 / 50 / 50 / 125),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Wingull */
    Personal {
        base_stats: stats!(40 / 30 / 30 / 55 / 30 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Pelipper */
    Personal {
        base_stats: stats!(60 / 50 / 100 / 85 / 70 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Ralts */
    Personal {
        base_stats: stats!(28 / 25 / 25 / 45 / 35 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Kirlia */
    Personal {
        base_stats: stats!(38 / 35 / 35 / 65 / 55 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Gardevoir */
    Personal {
        base_stats: stats!(68 / 65 / 65 / 125 / 115 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Surskit */
    Personal {
        base_stats: stats!(40 / 30 / 32 / 50 / 52 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Masquerain */
    Personal {
        base_stats: stats!(70 / 60 / 62 / 80 / 82 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Shroomish */
    Personal {
        base_stats: stats!(60 / 40 / 60 / 40 / 60 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Breloom */
    Personal {
        base_stats: stats!(60 / 130 / 80 / 60 / 60 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Slakoth */
    Personal {
        base_stats: stats!(60 / 60 / 60 / 35 / 35 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Vigoroth */
    Personal {
        base_stats: stats!(80 / 80 / 80 / 55 / 55 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Slaking */
    Personal {
        base_stats: stats!(150 / 160 / 100 / 95 / 65 / 100),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Nincada */
    Personal {
        base_stats: stats!(31 / 45 / 90 / 30 / 30 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Ninjask */
    Personal {
        base_stats: stats!(61 / 90 / 45 / 50 / 50 / 160),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Shedinja */
    Personal {
        base_stats: stats!(1 / 90 / 45 / 30 / 30 / 40),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Whismur */
    Personal {
        base_stats: stats!(64 / 51 / 23 / 51 / 23 / 28),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Loudred */
    Personal {
        base_stats: stats!(84 / 71 / 43 / 71 / 43 / 48),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Exploud */
    Personal {
        base_stats: stats!(104 / 91 / 63 / 91 / 63 / 68),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Makuhita */
    Personal {
        base_stats: stats!(72 / 60 / 30 / 20 / 30 / 25),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Hariyama */
    Personal {
        base_stats: stats!(144 / 120 / 60 / 40 / 60 / 50),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Azurill */
    Personal {
        base_stats: stats!(50 / 20 / 40 / 20 / 40 / 20),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Nosepass */
    Personal {
        base_stats: stats!(30 / 45 / 135 / 45 / 90 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Skitty */
    Personal {
        base_stats: stats!(50 / 45 / 45 / 35 / 35 / 50),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Delcatty */
    Personal {
        base_stats: stats!(70 / 65 / 65 / 55 / 55 / 70),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Sableye */
    Personal {
        base_stats: stats!(50 / 75 / 75 / 65 / 65 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Mawile */
    Personal {
        base_stats: stats!(50 / 85 / 85 / 55 / 55 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Aron */
    Personal {
        base_stats: stats!(50 / 70 / 100 / 40 / 40 / 30),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Lairon */
    Personal {
        base_stats: stats!(60 / 90 / 140 / 50 / 50 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Aggron */
    Personal {
        base_stats: stats!(70 / 110 / 180 / 60 / 60 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Meditite */
    Personal {
        base_stats: stats!(30 / 40 / 55 / 40 / 55 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Medicham */
    Personal {
        base_stats: stats!(60 / 60 / 75 / 60 / 75 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Electrike */
    Personal {
        base_stats: stats!(40 / 45 / 40 / 65 / 40 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Manectric */
    Personal {
        base_stats: stats!(70 / 75 / 60 / 105 / 60 / 105),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Plusle */
    Personal {
        base_stats: stats!(60 / 50 / 40 / 85 / 75 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Minun */
    Personal {
        base_stats: stats!(60 / 40 / 50 / 75 / 85 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Volbeat */
    Personal {
        base_stats: stats!(65 / 73 / 55 / 47 / 75 / 85),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Illumise */
    Personal {
        base_stats: stats!(65 / 47 / 55 / 73 / 75 / 85),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Roselia */
    Personal {
        base_stats: stats!(50 / 60 / 45 / 100 / 80 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Gulpin */
    Personal {
        base_stats: stats!(70 / 43 / 53 / 43 / 53 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Swalot */
    Personal {
        base_stats: stats!(100 / 73 / 83 / 73 / 83 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Carvanha */
    Personal {
        base_stats: stats!(45 / 90 / 20 / 65 / 20 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Sharpedo */
    Personal {
        base_stats: stats!(70 / 120 / 40 / 95 / 40 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Wailmer */
    Personal {
        base_stats: stats!(130 / 70 / 35 / 70 / 35 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Wailord */
    Personal {
        base_stats: stats!(170 / 90 / 45 / 90 / 45 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Numel */
    Personal {
        base_stats: stats!(60 / 60 / 40 / 65 / 45 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Camerupt */
    Personal {
        base_stats: stats!(70 / 100 / 70 / 105 / 75 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Torkoal */
    Personal {
        base_stats: stats!(70 / 85 / 140 / 85 / 70 / 20),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Spoink */
    Personal {
        base_stats: stats!(60 / 25 / 35 / 70 / 80 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Grumpig */
    Personal {
        base_stats: stats!(80 / 45 / 65 / 90 / 110 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Spinda */
    Personal {
        base_stats: stats!(60 / 60 / 60 / 60 / 60 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Trapinch */
    Personal {
        base_stats: stats!(45 / 100 / 45 / 45 / 45 / 10),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Vibrava */
    Personal {
        base_stats: stats!(50 / 70 / 50 / 50 / 50 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Flygon */
    Personal {
        base_stats: stats!(80 / 100 / 80 / 80 / 80 / 100),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Cacnea */
    Personal {
        base_stats: stats!(50 / 85 / 40 / 85 / 40 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Cacturne */
    Personal {
        base_stats: stats!(70 / 115 / 60 / 115 / 60 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Swablu */
    Personal {
        base_stats: stats!(45 / 40 / 60 / 40 / 75 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Altaria */
    Personal {
        base_stats: stats!(75 / 70 / 90 / 70 / 105 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Zangoose */
    Personal {
        base_stats: stats!(73 / 115 / 60 / 60 / 60 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Seviper */
    Personal {
        base_stats: stats!(73 / 100 / 60 / 100 / 60 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Lunatone */
    Personal {
        base_stats: stats!(70 / 55 / 65 / 95 / 85 / 70),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Solrock */
    Personal {
        base_stats: stats!(70 / 95 / 85 / 55 / 65 / 70),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Barboach */
    Personal {
        base_stats: stats!(50 / 48 / 43 / 46 / 41 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Whiscash */
    Personal {
        base_stats: stats!(110 / 78 / 73 / 76 / 71 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Corphish */
    Personal {
        base_stats: stats!(43 / 80 / 65 / 50 / 35 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Crawdaunt */
    Personal {
        base_stats: stats!(63 / 120 / 85 / 90 / 55 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Baltoy */
    Personal {
        base_stats: stats!(40 / 40 / 55 / 40 / 70 / 55),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Claydol */
    Personal {
        base_stats: stats!(60 / 70 / 105 / 70 / 120 / 75),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Lileep */
    Personal {
        base_stats: stats!(66 / 41 / 77 / 61 / 87 / 23),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Cradily */
    Personal {
        base_stats: stats!(86 / 81 / 97 / 81 / 107 / 43),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Anorith */
    Personal {
        base_stats: stats!(45 / 95 / 50 / 40 / 50 / 75),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Armaldo */
    Personal {
        base_stats: stats!(75 / 125 / 100 / 70 / 80 / 45),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Feebas */
    Personal {
        base_stats: stats!(20 / 15 / 20 / 10 / 55 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Milotic */
    Personal {
        base_stats: stats!(95 / 60 / 79 / 100 / 125 / 81),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Castform */
    Personal {
        base_stats: stats!(70 / 70 / 70 / 70 / 70 / 70),
        gender_ratio: OneToOne,
        forms: &[
            /* Sunny */
            Personal {
                base_stats: stats!(70 / 70 / 70 / 70 / 70 / 70),
                gender_ratio: OneToOne,
                forms: &[],
            },
            /* Rainy */
            Personal {
                base_stats: stats!(70 / 70 / 70 / 70 / 70 / 70),
                gender_ratio: OneToOne,
                forms: &[],
            },
            /* Snowy */
            Personal {
                base_stats: stats!(70 / 70 / 70 / 70 / 70 / 70),
                gender_ratio: OneToOne,
                forms: &[],
            },
        ],
    },
    /* Kecleon */
    Personal {
        base_stats: stats!(60 / 90 / 70 / 60 / 120 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Shuppet */
    Personal {
        base_stats: stats!(44 / 75 / 35 / 63 / 33 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Banette */
    Personal {
        base_stats: stats!(64 / 115 / 65 / 83 / 63 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Duskull */
    Personal {
        base_stats: stats!(20 / 40 / 90 / 30 / 90 / 25),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Dusclops */
    Personal {
        base_stats: stats!(40 / 70 / 130 / 60 / 130 / 25),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Tropius */
    Personal {
        base_stats: stats!(99 / 68 / 83 / 72 / 87 / 51),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Chimecho */
    Personal {
        base_stats: stats!(65 / 50 / 70 / 95 / 80 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Absol */
    Personal {
        base_stats: stats!(65 / 130 / 60 / 75 / 60 / 75),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Wynaut */
    Personal {
        base_stats: stats!(95 / 23 / 48 / 23 / 48 / 23),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Snorunt */
    Personal {
        base_stats: stats!(50 / 50 / 50 / 50 / 50 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Glalie */
    Personal {
        base_stats: stats!(80 / 80 / 80 / 80 / 80 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Spheal */
    Personal {
        base_stats: stats!(70 / 40 / 50 / 55 / 50 / 25),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Sealeo */
    Personal {
        base_stats: stats!(90 / 60 / 70 / 75 / 70 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Walrein */
    Personal {
        base_stats: stats!(110 / 80 / 90 / 95 / 90 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Clamperl */
    Personal {
        base_stats: stats!(35 / 64 / 85 / 74 / 55 / 32),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Huntail */
    Personal {
        base_stats: stats!(55 / 104 / 105 / 94 / 75 / 52),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Gorebyss */
    Personal {
        base_stats: stats!(55 / 84 / 105 / 114 / 75 / 52),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Relicanth */
    Personal {
        base_stats: stats!(100 / 90 / 130 / 45 / 65 / 55),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Luvdisc */
    Personal {
        base_stats: stats!(43 / 30 / 55 / 40 / 65 / 97),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Bagon */
    Personal {
        base_stats: stats!(45 / 75 / 60 / 40 / 30 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Shelgon */
    Personal {
        base_stats: stats!(65 / 95 / 100 / 60 / 50 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Salamence */
    Personal {
        base_stats: stats!(95 / 135 / 80 / 110 / 80 / 100),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Beldum */
    Personal {
        base_stats: stats!(40 / 55 / 80 / 35 / 60 / 30),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Metang */
    Personal {
        base_stats: stats!(60 / 75 / 100 / 55 / 80 / 50),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Metagross */
    Personal {
        base_stats: stats!(80 / 135 / 130 / 95 / 90 / 70),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Regirock */
    Personal {
        base_stats: stats!(80 / 100 / 200 / 50 / 100 / 50),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Regice */
    Personal {
        base_stats: stats!(80 / 50 / 100 / 100 / 200 / 50),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Registeel */
    Personal {
        base_stats: stats!(80 / 75 / 150 / 75 / 150 / 50),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Latias */
    Personal {
        base_stats: stats!(80 / 80 / 90 / 110 / 130 / 110),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Latios */
    Personal {
        base_stats: stats!(80 / 90 / 80 / 130 / 110 / 110),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Kyogre */
    Personal {
        base_stats: stats!(100 / 100 / 90 / 150 / 140 / 90),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Groudon */
    Personal {
        base_stats: stats!(100 / 150 / 140 / 100 / 90 / 90),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Rayquaza */
    Personal {
        base_stats: stats!(105 / 150 / 90 / 150 / 90 / 95),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Jirachi */
    Personal {
        base_stats: stats!(100 / 100 / 100 / 100 / 100 / 100),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Deoxys */
    Personal {
        base_stats: stats!(50 / 150 / 50 / 150 / 50 / 150),
        gender_ratio: Genderless,
        forms: &[
            /* Attack */
            Personal {
                base_stats: stats!(50 / 180 / 20 / 180 / 20 / 150),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Defense */
            Personal {
                base_stats: stats!(50 / 70 / 160 / 70 / 160 / 90),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Speed */
            Personal {
                base_stats: stats!(50 / 95 / 90 / 95 / 90 / 180),
                gender_ratio: Genderless,
                forms: &[],
            },
        ],
    },
    /* Turtwig */
    Personal {
        base_stats: stats!(55 / 68 / 64 / 45 / 55 / 31),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Grotle */
    Personal {
        base_stats: stats!(75 / 89 / 85 / 55 / 65 / 36),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Torterra */
    Personal {
        base_stats: stats!(95 / 109 / 105 / 75 / 85 / 56),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Chimchar */
    Personal {
        base_stats: stats!(44 / 58 / 44 / 58 / 44 / 61),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Monferno */
    Personal {
        base_stats: stats!(64 / 78 / 52 / 78 / 52 / 81),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Infernape */
    Personal {
        base_stats: stats!(76 / 104 / 71 / 104 / 71 / 108),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Piplup */
    Personal {
        base_stats: stats!(53 / 51 / 53 / 61 / 56 / 40),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Prinplup */
    Personal {
        base_stats: stats!(64 / 66 / 68 / 81 / 76 / 50),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Empoleon */
    Personal {
        base_stats: stats!(84 / 86 / 88 / 111 / 101 / 60),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Starly */
    Personal {
        base_stats: stats!(40 / 55 / 30 / 30 / 30 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Staravia */
    Personal {
        base_stats: stats!(55 / 75 / 50 / 40 / 40 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Staraptor */
    Personal {
        base_stats: stats!(85 / 120 / 70 / 50 / 50 / 100),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Bidoof */
    Personal {
        base_stats: stats!(59 / 45 / 40 / 35 / 40 / 31),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Bibarel */
    Personal {
        base_stats: stats!(79 / 85 / 60 / 55 / 60 / 71),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Kricketot */
    Personal {
        base_stats: stats!(37 / 25 / 41 / 25 / 41 / 25),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Kricketune */
    Personal {
        base_stats: stats!(77 / 85 / 51 / 55 / 51 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Shinx */
    Personal {
        base_stats: stats!(45 / 65 / 34 / 40 / 34 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Luxio */
    Personal {
        base_stats: stats!(60 / 85 / 49 / 60 / 49 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Luxray */
    Personal {
        base_stats: stats!(80 / 120 / 79 / 95 / 79 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Budew */
    Personal {
        base_stats: stats!(40 / 30 / 35 / 50 / 70 / 55),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Roserade */
    Personal {
        base_stats: stats!(60 / 70 / 55 / 125 / 105 / 90),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Cranidos */
    Personal {
        base_stats: stats!(67 / 125 / 40 / 30 / 30 / 58),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Rampardos */
    Personal {
        base_stats: stats!(97 / 165 / 60 / 65 / 50 / 58),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Shieldon */
    Personal {
        base_stats: stats!(30 / 42 / 118 / 42 / 88 / 30),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Bastiodon */
    Personal {
        base_stats: stats!(60 / 52 / 168 / 47 / 138 / 30),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Burmy */ /* Plant */
    Personal {
        base_stats: stats!(40 / 29 / 45 / 29 / 45 / 36),
        gender_ratio: OneToOne,
        forms: &[
            /* Sandy */
            Personal {
                base_stats: stats!(40 / 29 / 45 / 29 / 45 / 36),
                gender_ratio: OneToOne,
                forms: &[],
            },
            /* Trash */
            Personal {
                base_stats: stats!(40 / 29 / 45 / 29 / 45 / 36),
                gender_ratio: OneToOne,
                forms: &[],
            },
        ],
    },
    /* Wormadam */ /* Plant */
    Personal {
        base_stats: stats!(60 / 59 / 85 / 79 / 105 / 36),
        gender_ratio: FemaleOnly,
        forms: &[
            /* Sandy */
            Personal {
                base_stats: stats!(60 / 79 / 105 / 59 / 85 / 36),
                gender_ratio: FemaleOnly,
                forms: &[],
            },
            /* Trash */
            Personal {
                base_stats: stats!(60 / 69 / 95 / 69 / 95 / 36),
                gender_ratio: FemaleOnly,
                forms: &[],
            },
        ],
    },
    /* Mothim */
    Personal {
        base_stats: stats!(70 / 94 / 50 / 94 / 50 / 66),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Combee */
    Personal {
        base_stats: stats!(30 / 30 / 42 / 30 / 42 / 70),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Vespiquen */
    Personal {
        base_stats: stats!(70 / 80 / 102 / 80 / 102 / 40),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Pachirisu */
    Personal {
        base_stats: stats!(60 / 45 / 70 / 45 / 90 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Buizel */
    Personal {
        base_stats: stats!(55 / 65 / 35 / 60 / 30 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Floatzel */
    Personal {
        base_stats: stats!(85 / 105 / 55 / 85 / 50 / 115),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Cherubi */
    Personal {
        base_stats: stats!(45 / 35 / 45 / 62 / 53 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Cherrim */
    Personal {
        base_stats: stats!(70 / 60 / 70 / 87 / 78 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Shellos */
    Personal {
        base_stats: stats!(76 / 48 / 48 / 57 / 62 / 34),
        gender_ratio: OneToOne,
        forms: &[Personal {
            base_stats: stats!(76 / 48 / 48 / 57 / 62 / 34),
            gender_ratio: OneToOne,
            forms: &[],
        }],
    },
    /* Gastrodon */
    Personal {
        base_stats: stats!(111 / 83 / 68 / 92 / 82 / 39),
        gender_ratio: OneToOne,
        forms: &[Personal {
            base_stats: stats!(111 / 83 / 68 / 92 / 82 / 39),
            gender_ratio: OneToOne,
            forms: &[],
        }],
    },
    /* Ambipom */
    Personal {
        base_stats: stats!(75 / 100 / 66 / 60 / 66 / 115),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Drifloon */
    Personal {
        base_stats: stats!(90 / 50 / 34 / 60 / 44 / 70),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Drifblim */
    Personal {
        base_stats: stats!(150 / 80 / 44 / 90 / 54 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Buneary */
    Personal {
        base_stats: stats!(55 / 66 / 44 / 44 / 56 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Lopunny */
    Personal {
        base_stats: stats!(65 / 76 / 84 / 54 / 96 / 105),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Mismagius */
    Personal {
        base_stats: stats!(60 / 60 / 60 / 105 / 105 / 105),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Honchkrow */
    Personal {
        base_stats: stats!(100 / 125 / 52 / 105 / 52 / 71),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Glameow */
    Personal {
        base_stats: stats!(49 / 55 / 42 / 42 / 37 / 85),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Purugly */
    Personal {
        base_stats: stats!(71 / 82 / 64 / 64 / 59 / 112),
        gender_ratio: ThreeToOne,
        forms: &[],
    },
    /* Chingling */
    Personal {
        base_stats: stats!(45 / 30 / 50 / 65 / 50 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Stunky */
    Personal {
        base_stats: stats!(63 / 63 / 47 / 41 / 41 / 74),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Skuntank */
    Personal {
        base_stats: stats!(103 / 93 / 67 / 71 / 61 / 84),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Bronzor */
    Personal {
        base_stats: stats!(57 / 24 / 86 / 24 / 86 / 23),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Bronzong */
    Personal {
        base_stats: stats!(67 / 89 / 116 / 79 / 116 / 33),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Bonsly */
    Personal {
        base_stats: stats!(50 / 80 / 95 / 10 / 45 / 10),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Mime. Jr */
    Personal {
        base_stats: stats!(20 / 25 / 45 / 70 / 90 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Happiny */
    Personal {
        base_stats: stats!(100 / 5 / 5 / 15 / 65 / 30),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Chatot */
    Personal {
        base_stats: stats!(76 / 65 / 45 / 92 / 42 / 91),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Spiritomb */
    Personal {
        base_stats: stats!(50 / 92 / 108 / 92 / 108 / 35),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Gible */
    Personal {
        base_stats: stats!(58 / 70 / 45 / 40 / 45 / 42),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Gabite */
    Personal {
        base_stats: stats!(68 / 90 / 65 / 50 / 55 / 82),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Garchomp */
    Personal {
        base_stats: stats!(108 / 130 / 95 / 80 / 85 / 102),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Munchlax */
    Personal {
        base_stats: stats!(135 / 85 / 40 / 40 / 85 / 5),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Riolu */
    Personal {
        base_stats: stats!(40 / 70 / 40 / 35 / 40 / 60),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Lucario */
    Personal {
        base_stats: stats!(70 / 110 / 70 / 115 / 70 / 90),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Hippopotas */
    Personal {
        base_stats: stats!(68 / 72 / 78 / 38 / 42 / 32),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Hippowdon */
    Personal {
        base_stats: stats!(108 / 112 / 118 / 68 / 72 / 47),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Skorupi */
    Personal {
        base_stats: stats!(40 / 50 / 90 / 30 / 55 / 65),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Drapion */
    Personal {
        base_stats: stats!(70 / 90 / 110 / 60 / 75 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Croagunk */
    Personal {
        base_stats: stats!(48 / 61 / 40 / 61 / 40 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Toxicroak */
    Personal {
        base_stats: stats!(83 / 106 / 65 / 86 / 65 / 85),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Carnivine */
    Personal {
        base_stats: stats!(74 / 100 / 72 / 90 / 72 / 46),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Finneon */
    Personal {
        base_stats: stats!(49 / 49 / 56 / 49 / 61 / 66),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Lumineon */
    Personal {
        base_stats: stats!(69 / 69 / 76 / 69 / 86 / 91),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Mantyke */
    Personal {
        base_stats: stats!(45 / 20 / 50 / 60 / 120 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Snover */
    Personal {
        base_stats: stats!(60 / 62 / 50 / 62 / 60 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Abomasnow */
    Personal {
        base_stats: stats!(90 / 92 / 75 / 92 / 85 / 60),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Weavile */
    Personal {
        base_stats: stats!(70 / 120 / 65 / 45 / 85 / 125),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Magnezone */
    Personal {
        base_stats: stats!(70 / 70 / 115 / 130 / 90 / 60),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Lickilicky */
    Personal {
        base_stats: stats!(110 / 85 / 95 / 80 / 95 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Rhyperior */
    Personal {
        base_stats: stats!(115 / 140 / 130 / 55 / 55 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Tangrowth */
    Personal {
        base_stats: stats!(100 / 100 / 125 / 110 / 50 / 50),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Electivire */
    Personal {
        base_stats: stats!(75 / 123 / 67 / 95 / 85 / 95),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Magmortar */
    Personal {
        base_stats: stats!(75 / 95 / 67 / 125 / 95 / 83),
        gender_ratio: OneToThree,
        forms: &[],
    },
    /* Togekiss */
    Personal {
        base_stats: stats!(85 / 50 / 95 / 120 / 115 / 80),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Yanmega */
    Personal {
        base_stats: stats!(86 / 76 / 86 / 116 / 56 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Leafeon */
    Personal {
        base_stats: stats!(65 / 110 / 130 / 60 / 65 / 95),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Glaceon */
    Personal {
        base_stats: stats!(65 / 60 / 110 / 130 / 95 / 65),
        gender_ratio: OneToSeven,
        forms: &[],
    },
    /* Gliscor */
    Personal {
        base_stats: stats!(75 / 95 / 125 / 45 / 75 / 95),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Mamoswine */
    Personal {
        base_stats: stats!(110 / 130 / 80 / 70 / 60 / 80),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Porygon Z */
    Personal {
        base_stats: stats!(85 / 80 / 70 / 135 / 75 / 90),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Gallade */
    Personal {
        base_stats: stats!(68 / 125 / 65 / 65 / 115 / 80),
        gender_ratio: MaleOnly,
        forms: &[],
    },
    /* Probopass */
    Personal {
        base_stats: stats!(60 / 55 / 145 / 75 / 150 / 40),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Dusknoir */
    Personal {
        base_stats: stats!(45 / 100 / 135 / 65 / 135 / 45),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Froslass */
    Personal {
        base_stats: stats!(70 / 80 / 70 / 80 / 70 / 110),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Rotom */
    Personal {
        base_stats: stats!(50 / 50 / 77 / 95 / 77 / 91),
        gender_ratio: Genderless,
        forms: &[
            /* Heat */
            Personal {
                base_stats: stats!(50 / 65 / 107 / 105 / 107 / 86),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Wash */
            Personal {
                base_stats: stats!(50 / 65 / 107 / 105 / 107 / 86),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Frost */
            Personal {
                base_stats: stats!(50 / 65 / 107 / 105 / 107 / 86),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Fan */
            Personal {
                base_stats: stats!(50 / 65 / 107 / 105 / 107 / 86),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Mow */
            Personal {
                base_stats: stats!(50 / 65 / 107 / 105 / 107 / 86),
                gender_ratio: Genderless,
                forms: &[],
            },
        ],
    },
    /* Uxie */
    Personal {
        base_stats: stats!(75 / 75 / 130 / 75 / 130 / 95),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Mesprit */
    Personal {
        base_stats: stats!(80 / 105 / 105 / 105 / 105 / 80),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Azelf */
    Personal {
        base_stats: stats!(75 / 125 / 70 / 125 / 70 / 115),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Dialga */
    Personal {
        base_stats: stats!(100 / 120 / 120 / 150 / 100 / 90),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Palkia */
    Personal {
        base_stats: stats!(90 / 120 / 100 / 150 / 120 / 100),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Heatran */
    Personal {
        base_stats: stats!(91 / 90 / 106 / 130 / 106 / 77),
        gender_ratio: OneToOne,
        forms: &[],
    },
    /* Regigigas */
    Personal {
        base_stats: stats!(110 / 160 / 110 / 80 / 110 / 100),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Giratina */
    Personal {
        base_stats: stats!(150 / 100 / 120 / 100 / 120 / 90),
        gender_ratio: Genderless,
        forms: &[Personal {
            base_stats: stats!(150 / 120 / 100 / 120 / 100 / 90),
            gender_ratio: Genderless,
            forms: &[],
        }],
    },
    /* Cresselia */
    Personal {
        base_stats: stats!(120 / 70 / 120 / 75 / 130 / 85),
        gender_ratio: FemaleOnly,
        forms: &[],
    },
    /* Phione */
    Personal {
        base_stats: stats!(80 / 80 / 80 / 80 / 80 / 80),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Manaphy */
    Personal {
        base_stats: stats!(100 / 100 / 100 / 100 / 100 / 100),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Darkrai */
    Personal {
        base_stats: stats!(70 / 90 / 90 / 135 / 90 / 125),
        gender_ratio: Genderless,
        forms: &[],
    },
    /* Shaymin */
    Personal {
        base_stats: stats!(100 / 100 / 100 / 100 / 100 / 100),
        gender_ratio: Genderless,
        forms: &[Personal {
            base_stats: stats!(100 / 103 / 75 / 120 / 75 / 127),
            gender_ratio: Genderless,
            forms: &[],
        }],
    },
    /* Arceus */ /* Normal */
    Personal {
        base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
        gender_ratio: Genderless,
        forms: &[
            /* Fighting */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Flying */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Poison */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Ground */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Rock */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Bug */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Ghost */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Steel */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Fire */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Water */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Grass */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Electric */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Psychic */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Ice */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Dragon */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Dark */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
            /* Fairy */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                forms: &[],
            },
        ],
    },
];

pub fn get_personal(species: Species) -> &'static Personal {
    &PERSONALS.get(species as usize).unwrap_or(&PERSONALS[0])
}

pub fn get_form_personal(species: Species, form: usize) -> &'static Personal {
    let personal = get_personal(species);
    personal.forms.get(form).unwrap_or(personal)
}
