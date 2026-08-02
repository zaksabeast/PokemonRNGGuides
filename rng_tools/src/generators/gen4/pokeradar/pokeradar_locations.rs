use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use super::generated_wild4::{DIAMOND_ENTRIES, PEARL_ENTRIES, PLATINUM_ENTRIES};
use super::wild4_types::Wild4DpptGame; // adegua il path se il file/modulo si chiama diversamente
use crate::Species;

const ROUTE_NAMES: &[(u8, &str)] = &[
    (140, "Route 201"),
    (141, "Route 202"),
    (142, "Route 203"),
    (143, "Route 204 (South)"),
    (144, "Route 204 (North)"),
    (145, "Route 205 (South)"),
    (146, "Route 205 (North)"),
    (147, "Route 206"),
    (148, "Route 207"),
    (149, "Route 208"),
    (150, "Route 209"),
    (156, "Route 210 (South)"),
    (157, "Route 210 (North)"),
    (158, "Route 211 (West)"),
    (159, "Route 211 (East)"),
    (160, "Route 212 (North)"),
    (161, "Route 212 (South)"),
    (162, "Route 213"),
    (163, "Route 214"),
    (164, "Route 215"),
    (165, "Route 216"),
    (166, "Route 217"),
    (167, "Route 218"),
    (168, "Route 219"),
    (169, "Route 221"),
    (170, "Route 222"),
    (171, "Route 224"),
    (172, "Route 225"),
    (173, "Route 227"),
    (174, "Route 228"),
    (175, "Route 229"),
    (179, "Route 220"),
    (180, "Route 223"),
    (181, "Route 226"),
    (182, "Route 230"),
    (183, "Floaroma Meadow"),
];

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct PokeRadarLocation {
    pub location_id: u8,
    pub name: String,
    pub species: [Species; 4],
}

#[wasm_bindgen]
pub fn get_gen4_pokeradar_locations(game: Wild4DpptGame) -> Vec<PokeRadarLocation> {
    let entries: &[_] = match game {
        Wild4DpptGame::Diamond => DIAMOND_ENTRIES,
        Wild4DpptGame::Pearl => PEARL_ENTRIES,
        Wild4DpptGame::Platinum => PLATINUM_ENTRIES,
    };

    ROUTE_NAMES
        .iter()
        .filter_map(|&(location_id, name)| {
            let entry = entries.iter().find(|e| e.location == location_id)?;

            if entry.radar.iter().all(|&s| s == 0) {
                return None;
            }

            // entry.radar contiene indici Pokedex nazionali grezzi (u16)
            let species = [
                species_from_dex_index(entry.radar[0]),
                species_from_dex_index(entry.radar[1]),
                species_from_dex_index(entry.radar[2]),
                species_from_dex_index(entry.radar[3]),
            ];

            Some(PokeRadarLocation {
                location_id,
                name: name.to_string(),
                species,
            })
        })
        .collect()
}

const DEX_TO_SPECIES: [Species; 494] = [
    Species::None, Species::Bulbasaur, Species::Ivysaur, Species::Venusaur, Species::Charmander,
    Species::Charmeleon, Species::Charizard, Species::Squirtle, Species::Wartortle, Species::Blastoise,
    Species::Caterpie, Species::Metapod, Species::Butterfree, Species::Weedle, Species::Kakuna,
    Species::Beedrill, Species::Pidgey, Species::Pidgeotto, Species::Pidgeot, Species::Rattata,
    Species::Raticate, Species::Spearow, Species::Fearow, Species::Ekans, Species::Arbok,
    Species::Pikachu, Species::Raichu, Species::Sandshrew, Species::Sandslash, Species::NidoranF,
    Species::Nidorina, Species::Nidoqueen, Species::NidoranM, Species::Nidorino, Species::Nidoking,
    Species::Clefairy, Species::Clefable, Species::Vulpix, Species::Ninetales, Species::Jigglypuff,
    Species::Wigglytuff, Species::Zubat, Species::Golbat, Species::Oddish, Species::Gloom,
    Species::Vileplume, Species::Paras, Species::Parasect, Species::Venonat, Species::Venomoth,
    Species::Diglett, Species::Dugtrio, Species::Meowth, Species::Persian, Species::Psyduck,
    Species::Golduck, Species::Mankey, Species::Primeape, Species::Growlithe, Species::Arcanine,
    Species::Poliwag, Species::Poliwhirl, Species::Poliwrath, Species::Abra, Species::Kadabra,
    Species::Alakazam, Species::Machop, Species::Machoke, Species::Machamp, Species::Bellsprout,
    Species::Weepinbell, Species::Victreebel, Species::Tentacool, Species::Tentacruel, Species::Geodude,
    Species::Graveler, Species::Golem, Species::Ponyta, Species::Rapidash, Species::Slowpoke,
    Species::Slowbro, Species::Magnemite, Species::Magneton, Species::FarfetchD, Species::Doduo,
    Species::Dodrio, Species::Seel, Species::Dewgong, Species::Grimer, Species::Muk,
    Species::Shellder, Species::Cloyster, Species::Gastly, Species::Haunter, Species::Gengar,
    Species::Onix, Species::Drowzee, Species::Hypno, Species::Krabby, Species::Kingler,
    Species::Voltorb, Species::Electrode, Species::Exeggcute, Species::Exeggutor, Species::Cubone,
    Species::Marowak, Species::Hitmonlee, Species::Hitmonchan, Species::Lickitung, Species::Koffing,
    Species::Weezing, Species::Rhyhorn, Species::Rhydon, Species::Chansey, Species::Tangela,
    Species::Kangaskhan, Species::Horsea, Species::Seadra, Species::Goldeen, Species::Seaking,
    Species::Staryu, Species::Starmie, Species::MrMime, Species::Scyther, Species::Jynx,
    Species::Electabuzz, Species::Magmar, Species::Pinsir, Species::Tauros, Species::Magikarp,
    Species::Gyarados, Species::Lapras, Species::Ditto, Species::Eevee, Species::Vaporeon,
    Species::Jolteon, Species::Flareon, Species::Porygon, Species::Omanyte, Species::Omastar,
    Species::Kabuto, Species::Kabutops, Species::Aerodactyl, Species::Snorlax, Species::Articuno,
    Species::Zapdos, Species::Moltres, Species::Dratini, Species::Dragonair, Species::Dragonite,
    Species::Mewtwo, Species::Mew, Species::Chikorita, Species::Bayleef, Species::Meganium,
    Species::Cyndaquil, Species::Quilava, Species::Typhlosion, Species::Totodile, Species::Croconaw,
    Species::Feraligatr, Species::Sentret, Species::Furret, Species::Hoothoot, Species::Noctowl,
    Species::Ledyba, Species::Ledian, Species::Spinarak, Species::Ariados, Species::Crobat,
    Species::Chinchou, Species::Lanturn, Species::Pichu, Species::Cleffa, Species::Igglybuff,
    Species::Togepi, Species::Togetic, Species::Natu, Species::Xatu, Species::Mareep,
    Species::Flaaffy, Species::Ampharos, Species::Bellossom, Species::Marill, Species::Azumarill,
    Species::Sudowoodo, Species::Politoed, Species::Hoppip, Species::Skiploom, Species::Jumpluff,
    Species::Aipom, Species::Sunkern, Species::Sunflora, Species::Yanma, Species::Wooper,
    Species::Quagsire, Species::Espeon, Species::Umbreon, Species::Murkrow, Species::Slowking,
    Species::Misdreavus, Species::Unown, Species::Wobbuffet, Species::Girafarig, Species::Pineco,
    Species::Forretress, Species::Dunsparce, Species::Gligar, Species::Steelix, Species::Snubbull,
    Species::Granbull, Species::Qwilfish, Species::Scizor, Species::Shuckle, Species::Heracross,
    Species::Sneasel, Species::Teddiursa, Species::Ursaring, Species::Slugma, Species::Magcargo,
    Species::Swinub, Species::Piloswine, Species::Corsola, Species::Remoraid, Species::Octillery,
    Species::Delibird, Species::Mantine, Species::Skarmory, Species::Houndour, Species::Houndoom,
    Species::Kingdra, Species::Phanpy, Species::Donphan, Species::Porygon2, Species::Stantler,
    Species::Smeargle, Species::Tyrogue, Species::Hitmontop, Species::Smoochum, Species::Elekid,
    Species::Magby, Species::Miltank, Species::Blissey, Species::Raikou, Species::Entei,
    Species::Suicune, Species::Larvitar, Species::Pupitar, Species::Tyranitar, Species::Lugia,
    Species::HoOh, Species::Celebi, Species::Treecko, Species::Grovyle, Species::Sceptile,
    Species::Torchic, Species::Combusken, Species::Blaziken, Species::Mudkip, Species::Marshtomp,
    Species::Swampert, Species::Poochyena, Species::Mightyena, Species::Zigzagoon, Species::Linoone,
    Species::Wurmple, Species::Silcoon, Species::Beautifly, Species::Cascoon, Species::Dustox,
    Species::Lotad, Species::Lombre, Species::Ludicolo, Species::Seedot, Species::Nuzleaf,
    Species::Shiftry, Species::Taillow, Species::Swellow, Species::Wingull, Species::Pelipper,
    Species::Ralts, Species::Kirlia, Species::Gardevoir, Species::Surskit, Species::Masquerain,
    Species::Shroomish, Species::Breloom, Species::Slakoth, Species::Vigoroth, Species::Slaking,
    Species::Nincada, Species::Ninjask, Species::Shedinja, Species::Whismur, Species::Loudred,
    Species::Exploud, Species::Makuhita, Species::Hariyama, Species::Azurill, Species::Nosepass,
    Species::Skitty, Species::Delcatty, Species::Sableye, Species::Mawile, Species::Aron,
    Species::Lairon, Species::Aggron, Species::Meditite, Species::Medicham, Species::Electrike,
    Species::Manectric, Species::Plusle, Species::Minun, Species::Volbeat, Species::Illumise,
    Species::Roselia, Species::Gulpin, Species::Swalot, Species::Carvanha, Species::Sharpedo,
    Species::Wailmer, Species::Wailord, Species::Numel, Species::Camerupt, Species::Torkoal,
    Species::Spoink, Species::Grumpig, Species::Spinda, Species::Trapinch, Species::Vibrava,
    Species::Flygon, Species::Cacnea, Species::Cacturne, Species::Swablu, Species::Altaria,
    Species::Zangoose, Species::Seviper, Species::Lunatone, Species::Solrock, Species::Barboach,
    Species::Whiscash, Species::Corphish, Species::Crawdaunt, Species::Baltoy, Species::Claydol,
    Species::Lileep, Species::Cradily, Species::Anorith, Species::Armaldo, Species::Feebas,
    Species::Milotic, Species::Castform_Normal, Species::Kecleon, Species::Shuppet, Species::Banette,
    Species::Duskull, Species::Dusclops, Species::Tropius, Species::Chimecho, Species::Absol,
    Species::Wynaut, Species::Snorunt, Species::Glalie, Species::Spheal, Species::Sealeo,
    Species::Walrein, Species::Clamperl, Species::Huntail, Species::Gorebyss, Species::Relicanth,
    Species::Luvdisc, Species::Bagon, Species::Shelgon, Species::Salamence, Species::Beldum,
    Species::Metang, Species::Metagross, Species::Regirock, Species::Regice, Species::Registeel,
    Species::Latias, Species::Latios, Species::Kyogre, Species::Groudon, Species::Rayquaza,
    Species::Jirachi, Species::Deoxys_Normal, Species::Turtwig, Species::Grotle, Species::Torterra,
    Species::Chimchar, Species::Monferno, Species::Infernape, Species::Piplup, Species::Prinplup,
    Species::Empoleon, Species::Starly, Species::Staravia, Species::Staraptor, Species::Bidoof,
    Species::Bibarel, Species::Kricketot, Species::Kricketune, Species::Shinx, Species::Luxio,
    Species::Luxray, Species::Budew, Species::Roserade, Species::Cranidos, Species::Rampardos,
    Species::Shieldon, Species::Bastiodon, Species::Burmy_Plant, Species::Wormadam_Plant, Species::Mothim,
    Species::Combee, Species::Vespiquen, Species::Pachirisu, Species::Buizel, Species::Floatzel,
    Species::Cherubi, Species::Cherrim, Species::Shellos_West, Species::Gastrodon_West, Species::Ambipom,
    Species::Drifloon, Species::Drifblim, Species::Buneary, Species::Lopunny, Species::Mismagius,
    Species::Honchkrow, Species::Glameow, Species::Purugly, Species::Chingling, Species::Stunky,
    Species::Skuntank, Species::Bronzor, Species::Bronzong, Species::Bonsly, Species::MimeJr,
    Species::Happiny, Species::Chatot, Species::Spiritomb, Species::Gible, Species::Gabite,
    Species::Garchomp, Species::Munchlax, Species::Riolu, Species::Lucario, Species::Hippopotas,
    Species::Hippowdon, Species::Skorupi, Species::Drapion, Species::Croagunk, Species::Toxicroak,
    Species::Carnivine, Species::Finneon, Species::Lumineon, Species::Mantyke, Species::Snover,
    Species::Abomasnow, Species::Weavile, Species::Magnezone, Species::Lickilicky, Species::Rhyperior,
    Species::Tangrowth, Species::Electivire, Species::Magmortar, Species::Togekiss, Species::Yanmega,
    Species::Leafeon, Species::Glaceon, Species::Gliscor, Species::Mamoswine, Species::PorygonZ,
    Species::Gallade, Species::Probopass, Species::Dusknoir, Species::Froslass, Species::Rotom_Normal,
    Species::Uxie, Species::Mesprit, Species::Azelf, Species::Dialga, Species::Palkia,
    Species::Heatran, Species::Regigigas, Species::Giratina_Altered, Species::Cresselia, Species::Phione,
    Species::Manaphy, Species::Darkrai, Species::Shaymin_Land, Species::Arceus_Normal,
];

fn species_from_dex_index(idx: u16) -> Species {
    DEX_TO_SPECIES
        .get(idx as usize)
        .copied()
        .unwrap_or(Species::None)
}