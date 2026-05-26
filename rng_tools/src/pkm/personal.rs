use crate::{Ability, GenderRatio, PokemonType, StatsValue, stats};

use Ability::*;
use GenderRatio::*;
use PokemonType::*;

pub struct Personal {
    pub base_stats: StatsValue,
    pub gender_ratio: GenderRatio,
    pub abilities: &'static [Ability],
    pub types: [PokemonType; 2],
    pub forms: &'static [Personal],
}

const PERSONALS: &[Personal] = &[
    /* None */
    Personal {
        base_stats: stats!(0 / 0 / 0 / 0 / 0 / 0),
        gender_ratio: Genderless,
        abilities: &[None, None],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Bulbasaur */
    Personal {
        base_stats: stats!(45 / 49 / 49 / 65 / 65 / 45),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Ivysaur */
    Personal {
        base_stats: stats!(60 / 62 / 63 / 80 / 80 / 60),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Venusaur */
    Personal {
        base_stats: stats!(80 / 82 / 83 / 100 / 100 / 80),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Charmander */
    Personal {
        base_stats: stats!(39 / 52 / 43 / 60 / 50 / 65),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Charmeleon */
    Personal {
        base_stats: stats!(58 / 64 / 58 / 80 / 65 / 80),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Charizard */
    Personal {
        base_stats: stats!(78 / 84 / 78 / 109 / 85 / 100),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Flying],
        forms: &[],
    },
    /* Squirtle */
    Personal {
        base_stats: stats!(44 / 48 / 65 / 50 / 64 / 43),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Wartortle */
    Personal {
        base_stats: stats!(59 / 63 / 80 / 65 / 80 / 58),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Blastoise */
    Personal {
        base_stats: stats!(79 / 83 / 100 / 85 / 105 / 78),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Caterpie */
    Personal {
        base_stats: stats!(45 / 30 / 35 / 20 / 20 / 45),
        gender_ratio: OneToOne,
        abilities: &[ShieldDust, ShieldDust],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Metapod */
    Personal {
        base_stats: stats!(50 / 20 / 55 / 25 / 25 / 30),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, ShedSkin],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Butterfree */
    Personal {
        base_stats: stats!(60 / 45 / 50 / 80 / 80 / 70),
        gender_ratio: OneToOne,
        abilities: &[CompoundEyes, CompoundEyes],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Weedle */
    Personal {
        base_stats: stats!(40 / 35 / 30 / 20 / 20 / 50),
        gender_ratio: OneToOne,
        abilities: &[ShieldDust, ShieldDust],
        types: [Bug, Poison],
        forms: &[],
    },
    /* Kakuna */
    Personal {
        base_stats: stats!(45 / 25 / 50 / 25 / 25 / 35),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, ShedSkin],
        types: [Bug, Poison],
        forms: &[],
    },
    /* Beedrill */
    Personal {
        base_stats: stats!(65 / 80 / 40 / 45 / 80 / 75),
        gender_ratio: OneToOne,
        abilities: &[Swarm, Swarm],
        types: [Bug, Poison],
        forms: &[],
    },
    /* Pidgey */
    Personal {
        base_stats: stats!(40 / 45 / 40 / 35 / 35 / 56),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, TangledFeet],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Pidgeotto */
    Personal {
        base_stats: stats!(63 / 60 / 55 / 50 / 50 / 71),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, TangledFeet],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Pidgeot */
    Personal {
        base_stats: stats!(83 / 80 / 75 / 70 / 70 / 91),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, TangledFeet],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Rattata */
    Personal {
        base_stats: stats!(30 / 56 / 35 / 25 / 35 / 72),
        gender_ratio: OneToOne,
        abilities: &[RunAway, Guts],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Raticate */
    Personal {
        base_stats: stats!(55 / 81 / 60 / 50 / 70 / 97),
        gender_ratio: OneToOne,
        abilities: &[RunAway, Guts],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Spearow */
    Personal {
        base_stats: stats!(40 / 60 / 30 / 31 / 31 / 70),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, KeenEye],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Fearow */
    Personal {
        base_stats: stats!(65 / 90 / 65 / 61 / 61 / 100),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, KeenEye],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Ekans */
    Personal {
        base_stats: stats!(35 / 60 / 44 / 40 / 54 / 55),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, ShedSkin],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Arbok */
    Personal {
        base_stats: stats!(60 / 85 / 69 / 65 / 79 / 80),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, ShedSkin],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Pikachu */
    Personal {
        base_stats: stats!(35 / 55 / 30 / 50 / 40 / 90),
        gender_ratio: OneToOne,
        abilities: &[Static, Static],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Raichu */
    Personal {
        base_stats: stats!(60 / 90 / 55 / 90 / 80 / 100),
        gender_ratio: OneToOne,
        abilities: &[Static, Static],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Sandshrew */
    Personal {
        base_stats: stats!(50 / 75 / 85 / 20 / 30 / 40),
        gender_ratio: OneToOne,
        abilities: &[SandVeil, SandVeil],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Sandslash */
    Personal {
        base_stats: stats!(75 / 100 / 110 / 45 / 55 / 65),
        gender_ratio: OneToOne,
        abilities: &[SandVeil, SandVeil],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Nidoran F */
    Personal {
        base_stats: stats!(55 / 47 / 52 / 40 / 40 / 41),
        gender_ratio: FemaleOnly,
        abilities: &[PoisonPoint, Rivalry],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Nidorina */
    Personal {
        base_stats: stats!(70 / 62 / 67 / 55 / 55 / 56),
        gender_ratio: FemaleOnly,
        abilities: &[PoisonPoint, Rivalry],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Nidoqueen */
    Personal {
        base_stats: stats!(90 / 82 / 87 / 75 / 85 / 76),
        gender_ratio: FemaleOnly,
        abilities: &[PoisonPoint, Rivalry],
        types: [Poison, Ground],
        forms: &[],
    },
    /* Nidoran M */
    Personal {
        base_stats: stats!(46 / 57 / 40 / 40 / 40 / 50),
        gender_ratio: MaleOnly,
        abilities: &[PoisonPoint, Rivalry],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Nidorino */
    Personal {
        base_stats: stats!(61 / 72 / 57 / 55 / 55 / 65),
        gender_ratio: MaleOnly,
        abilities: &[PoisonPoint, Rivalry],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Nidoking */
    Personal {
        base_stats: stats!(81 / 92 / 77 / 85 / 75 / 85),
        gender_ratio: MaleOnly,
        abilities: &[PoisonPoint, Rivalry],
        types: [Poison, Ground],
        forms: &[],
    },
    /* Clefairy */
    Personal {
        base_stats: stats!(70 / 45 / 48 / 60 / 65 / 35),
        gender_ratio: ThreeToOne,
        abilities: &[CuteCharm, MagicGuard],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Clefable */
    Personal {
        base_stats: stats!(95 / 70 / 73 / 85 / 90 / 60),
        gender_ratio: ThreeToOne,
        abilities: &[CuteCharm, MagicGuard],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Vulpix */
    Personal {
        base_stats: stats!(38 / 41 / 40 / 50 / 65 / 65),
        gender_ratio: ThreeToOne,
        abilities: &[FlashFire, FlashFire],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Ninetales */
    Personal {
        base_stats: stats!(73 / 76 / 75 / 81 / 100 / 100),
        gender_ratio: ThreeToOne,
        abilities: &[FlashFire, FlashFire],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Jigglypuff */
    Personal {
        base_stats: stats!(115 / 45 / 20 / 45 / 25 / 20),
        gender_ratio: ThreeToOne,
        abilities: &[CuteCharm, CuteCharm],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Wigglytuff */
    Personal {
        base_stats: stats!(140 / 70 / 45 / 75 / 50 / 45),
        gender_ratio: ThreeToOne,
        abilities: &[CuteCharm, CuteCharm],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Zubat */
    Personal {
        base_stats: stats!(40 / 45 / 35 / 30 / 40 / 55),
        gender_ratio: OneToOne,
        abilities: &[InnerFocus, InnerFocus],
        types: [Poison, Flying],
        forms: &[],
    },
    /* Golbat */
    Personal {
        base_stats: stats!(75 / 80 / 70 / 65 / 75 / 90),
        gender_ratio: OneToOne,
        abilities: &[InnerFocus, InnerFocus],
        types: [Poison, Flying],
        forms: &[],
    },
    /* Oddish */
    Personal {
        base_stats: stats!(45 / 50 / 55 / 75 / 65 / 30),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, Chlorophyll],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Gloom */
    Personal {
        base_stats: stats!(60 / 65 / 70 / 85 / 75 / 40),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, Chlorophyll],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Vileplume */
    Personal {
        base_stats: stats!(75 / 80 / 85 / 100 / 90 / 50),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, Chlorophyll],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Paras */
    Personal {
        base_stats: stats!(35 / 70 / 55 / 45 / 55 / 25),
        gender_ratio: OneToOne,
        abilities: &[EffectSpore, DrySkin],
        types: [Bug, Grass],
        forms: &[],
    },
    /* Parasect */
    Personal {
        base_stats: stats!(60 / 95 / 80 / 60 / 80 / 30),
        gender_ratio: OneToOne,
        abilities: &[EffectSpore, DrySkin],
        types: [Bug, Grass],
        forms: &[],
    },
    /* Venonat */
    Personal {
        base_stats: stats!(60 / 55 / 50 / 40 / 55 / 45),
        gender_ratio: OneToOne,
        abilities: &[CompoundEyes, TintedLens],
        types: [Bug, Poison],
        forms: &[],
    },
    /* Venomoth */
    Personal {
        base_stats: stats!(70 / 65 / 60 / 90 / 75 / 90),
        gender_ratio: OneToOne,
        abilities: &[ShieldDust, TintedLens],
        types: [Bug, Poison],
        forms: &[],
    },
    /* Diglett */
    Personal {
        base_stats: stats!(10 / 55 / 25 / 35 / 45 / 95),
        gender_ratio: OneToOne,
        abilities: &[SandVeil, ArenaTrap],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Dugtrio */
    Personal {
        base_stats: stats!(35 / 80 / 50 / 50 / 70 / 120),
        gender_ratio: OneToOne,
        abilities: &[SandVeil, ArenaTrap],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Meowth */
    Personal {
        base_stats: stats!(40 / 45 / 35 / 40 / 40 / 90),
        gender_ratio: OneToOne,
        abilities: &[Pickup, Technician],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Persian */
    Personal {
        base_stats: stats!(65 / 70 / 60 / 65 / 65 / 115),
        gender_ratio: OneToOne,
        abilities: &[Limber, Technician],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Psyduck */
    Personal {
        base_stats: stats!(50 / 52 / 48 / 65 / 50 / 55),
        gender_ratio: OneToOne,
        abilities: &[Damp, CloudNine],
        types: [Water, Water],
        forms: &[],
    },
    /* Golduck */
    Personal {
        base_stats: stats!(80 / 82 / 78 / 95 / 80 / 85),
        gender_ratio: OneToOne,
        abilities: &[Damp, CloudNine],
        types: [Water, Water],
        forms: &[],
    },
    /* Mankey */
    Personal {
        base_stats: stats!(40 / 80 / 35 / 35 / 45 / 70),
        gender_ratio: OneToOne,
        abilities: &[VitalSpirit, AngerPoint],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Primeape */
    Personal {
        base_stats: stats!(65 / 105 / 60 / 60 / 70 / 95),
        gender_ratio: OneToOne,
        abilities: &[VitalSpirit, AngerPoint],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Growlithe */
    Personal {
        base_stats: stats!(55 / 70 / 45 / 70 / 50 / 60),
        gender_ratio: OneToThree,
        abilities: &[Intimidate, FlashFire],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Arcanine */
    Personal {
        base_stats: stats!(90 / 110 / 80 / 100 / 80 / 95),
        gender_ratio: OneToThree,
        abilities: &[Intimidate, FlashFire],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Poliwag */
    Personal {
        base_stats: stats!(40 / 50 / 40 / 40 / 40 / 90),
        gender_ratio: OneToOne,
        abilities: &[WaterAbsorb, Damp],
        types: [Water, Water],
        forms: &[],
    },
    /* Poliwhirl */
    Personal {
        base_stats: stats!(65 / 65 / 65 / 50 / 50 / 90),
        gender_ratio: OneToOne,
        abilities: &[WaterAbsorb, Damp],
        types: [Water, Water],
        forms: &[],
    },
    /* Poliwrath */
    Personal {
        base_stats: stats!(90 / 85 / 95 / 70 / 90 / 70),
        gender_ratio: OneToOne,
        abilities: &[WaterAbsorb, Damp],
        types: [Water, Fighting],
        forms: &[],
    },
    /* Abra */
    Personal {
        base_stats: stats!(25 / 20 / 15 / 105 / 55 / 90),
        gender_ratio: OneToThree,
        abilities: &[Synchronize, InnerFocus],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Kadabra */
    Personal {
        base_stats: stats!(40 / 35 / 30 / 120 / 70 / 105),
        gender_ratio: OneToThree,
        abilities: &[Synchronize, InnerFocus],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Alakazam */
    Personal {
        base_stats: stats!(55 / 50 / 45 / 135 / 85 / 120),
        gender_ratio: OneToThree,
        abilities: &[Synchronize, InnerFocus],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Machop */
    Personal {
        base_stats: stats!(70 / 80 / 50 / 35 / 35 / 35),
        gender_ratio: OneToThree,
        abilities: &[Guts, NoGuard],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Machoke */
    Personal {
        base_stats: stats!(80 / 100 / 70 / 50 / 60 / 45),
        gender_ratio: OneToThree,
        abilities: &[Guts, NoGuard],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Machamp */
    Personal {
        base_stats: stats!(90 / 130 / 80 / 65 / 85 / 55),
        gender_ratio: OneToThree,
        abilities: &[Guts, NoGuard],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Bellsprout */
    Personal {
        base_stats: stats!(50 / 75 / 35 / 70 / 30 / 40),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, Chlorophyll],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Weepinbell */
    Personal {
        base_stats: stats!(65 / 90 / 50 / 85 / 45 / 55),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, Chlorophyll],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Victreebel */
    Personal {
        base_stats: stats!(80 / 105 / 65 / 100 / 60 / 70),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, Chlorophyll],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Tentacool */
    Personal {
        base_stats: stats!(40 / 40 / 35 / 50 / 100 / 70),
        gender_ratio: OneToOne,
        abilities: &[ClearBody, LiquidOoze],
        types: [Water, Poison],
        forms: &[],
    },
    /* Tentacruel */
    Personal {
        base_stats: stats!(80 / 70 / 65 / 80 / 120 / 100),
        gender_ratio: OneToOne,
        abilities: &[ClearBody, LiquidOoze],
        types: [Water, Poison],
        forms: &[],
    },
    /* Geodude */
    Personal {
        base_stats: stats!(40 / 80 / 100 / 30 / 30 / 20),
        gender_ratio: OneToOne,
        abilities: &[RockHead, Sturdy],
        types: [Rock, Ground],
        forms: &[],
    },
    /* Graveler */
    Personal {
        base_stats: stats!(55 / 95 / 115 / 45 / 45 / 35),
        gender_ratio: OneToOne,
        abilities: &[RockHead, Sturdy],
        types: [Rock, Ground],
        forms: &[],
    },
    /* Golem */
    Personal {
        base_stats: stats!(80 / 110 / 130 / 55 / 65 / 45),
        gender_ratio: OneToOne,
        abilities: &[RockHead, Sturdy],
        types: [Rock, Ground],
        forms: &[],
    },
    /* Ponyta */
    Personal {
        base_stats: stats!(50 / 85 / 55 / 65 / 65 / 90),
        gender_ratio: OneToOne,
        abilities: &[RunAway, FlashFire],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Rapidash */
    Personal {
        base_stats: stats!(65 / 100 / 70 / 80 / 80 / 105),
        gender_ratio: OneToOne,
        abilities: &[RunAway, FlashFire],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Slowpoke */
    Personal {
        base_stats: stats!(90 / 65 / 65 / 40 / 40 / 15),
        gender_ratio: OneToOne,
        abilities: &[Oblivious, OwnTempo],
        types: [Water, Psychic],
        forms: &[],
    },
    /* Slowbro */
    Personal {
        base_stats: stats!(95 / 75 / 110 / 100 / 80 / 30),
        gender_ratio: OneToOne,
        abilities: &[Oblivious, OwnTempo],
        types: [Water, Psychic],
        forms: &[],
    },
    /* Magnemite */
    Personal {
        base_stats: stats!(25 / 35 / 70 / 95 / 55 / 45),
        gender_ratio: Genderless,
        abilities: &[MagnetPull, Sturdy],
        types: [Electric, Steel],
        forms: &[],
    },
    /* Magneton */
    Personal {
        base_stats: stats!(50 / 60 / 95 / 120 / 70 / 70),
        gender_ratio: Genderless,
        abilities: &[MagnetPull, Sturdy],
        types: [Electric, Steel],
        forms: &[],
    },
    /* Farfetchd */
    Personal {
        base_stats: stats!(52 / 65 / 55 / 58 / 62 / 60),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, InnerFocus],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Doduo */
    Personal {
        base_stats: stats!(35 / 85 / 45 / 35 / 35 / 75),
        gender_ratio: OneToOne,
        abilities: &[RunAway, EarlyBird],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Dodrio */
    Personal {
        base_stats: stats!(60 / 110 / 70 / 60 / 60 / 100),
        gender_ratio: OneToOne,
        abilities: &[RunAway, EarlyBird],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Seel */
    Personal {
        base_stats: stats!(65 / 45 / 55 / 45 / 70 / 45),
        gender_ratio: OneToOne,
        abilities: &[ThickFat, Hydration],
        types: [Water, Water],
        forms: &[],
    },
    /* Dewgong */
    Personal {
        base_stats: stats!(90 / 70 / 80 / 70 / 95 / 70),
        gender_ratio: OneToOne,
        abilities: &[ThickFat, Hydration],
        types: [Water, Ice],
        forms: &[],
    },
    /* Grimer */
    Personal {
        base_stats: stats!(80 / 80 / 50 / 40 / 50 / 25),
        gender_ratio: OneToOne,
        abilities: &[Stench, StickyHold],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Muk */
    Personal {
        base_stats: stats!(105 / 105 / 75 / 65 / 100 / 50),
        gender_ratio: OneToOne,
        abilities: &[Stench, StickyHold],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Shellder */
    Personal {
        base_stats: stats!(30 / 65 / 100 / 45 / 25 / 40),
        gender_ratio: OneToOne,
        abilities: &[ShellArmor, SkillLink],
        types: [Water, Water],
        forms: &[],
    },
    /* Cloyster */
    Personal {
        base_stats: stats!(50 / 95 / 180 / 85 / 45 / 70),
        gender_ratio: OneToOne,
        abilities: &[ShellArmor, SkillLink],
        types: [Water, Ice],
        forms: &[],
    },
    /* Gastly */
    Personal {
        base_stats: stats!(30 / 35 / 30 / 100 / 35 / 80),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Ghost, Poison],
        forms: &[],
    },
    /* Haunter */
    Personal {
        base_stats: stats!(45 / 50 / 45 / 115 / 55 / 95),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Ghost, Poison],
        forms: &[],
    },
    /* Gengar */
    Personal {
        base_stats: stats!(60 / 65 / 60 / 130 / 75 / 110),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Ghost, Poison],
        forms: &[],
    },
    /* Onix */
    Personal {
        base_stats: stats!(35 / 45 / 160 / 30 / 45 / 70),
        gender_ratio: OneToOne,
        abilities: &[RockHead, Sturdy],
        types: [Rock, Ground],
        forms: &[],
    },
    /* Drowzee */
    Personal {
        base_stats: stats!(60 / 48 / 45 / 43 / 90 / 42),
        gender_ratio: OneToOne,
        abilities: &[Insomnia, Forewarn],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Hypno */
    Personal {
        base_stats: stats!(85 / 73 / 70 / 73 / 115 / 67),
        gender_ratio: OneToOne,
        abilities: &[Insomnia, Forewarn],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Krabby */
    Personal {
        base_stats: stats!(30 / 105 / 90 / 25 / 25 / 50),
        gender_ratio: OneToOne,
        abilities: &[HyperCutter, ShellArmor],
        types: [Water, Water],
        forms: &[],
    },
    /* Kingler */
    Personal {
        base_stats: stats!(55 / 130 / 115 / 50 / 50 / 75),
        gender_ratio: OneToOne,
        abilities: &[HyperCutter, ShellArmor],
        types: [Water, Water],
        forms: &[],
    },
    /* Voltorb */
    Personal {
        base_stats: stats!(40 / 30 / 50 / 55 / 55 / 100),
        gender_ratio: Genderless,
        abilities: &[Soundproof, Static],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Electrode */
    Personal {
        base_stats: stats!(60 / 50 / 70 / 80 / 80 / 140),
        gender_ratio: Genderless,
        abilities: &[Soundproof, Static],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Exeggcute */
    Personal {
        base_stats: stats!(60 / 40 / 80 / 60 / 45 / 40),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, Chlorophyll],
        types: [Grass, Psychic],
        forms: &[],
    },
    /* Exeggutor */
    Personal {
        base_stats: stats!(95 / 95 / 85 / 125 / 65 / 55),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, Chlorophyll],
        types: [Grass, Psychic],
        forms: &[],
    },
    /* Cubone */
    Personal {
        base_stats: stats!(50 / 50 / 95 / 40 / 50 / 35),
        gender_ratio: OneToOne,
        abilities: &[RockHead, LightningRod],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Marowak */
    Personal {
        base_stats: stats!(60 / 80 / 110 / 50 / 80 / 45),
        gender_ratio: OneToOne,
        abilities: &[RockHead, LightningRod],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Hitmonlee */
    Personal {
        base_stats: stats!(50 / 120 / 53 / 35 / 110 / 87),
        gender_ratio: MaleOnly,
        abilities: &[Limber, Reckless],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Hitmonchan */
    Personal {
        base_stats: stats!(50 / 105 / 79 / 35 / 110 / 76),
        gender_ratio: MaleOnly,
        abilities: &[KeenEye, IronFist],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Lickitung */
    Personal {
        base_stats: stats!(90 / 55 / 75 / 60 / 75 / 30),
        gender_ratio: OneToOne,
        abilities: &[OwnTempo, Oblivious],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Koffing */
    Personal {
        base_stats: stats!(40 / 65 / 95 / 60 / 45 / 35),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Weezing */
    Personal {
        base_stats: stats!(65 / 90 / 120 / 85 / 70 / 60),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Rhyhorn */
    Personal {
        base_stats: stats!(80 / 85 / 95 / 30 / 30 / 25),
        gender_ratio: OneToOne,
        abilities: &[LightningRod, RockHead],
        types: [Ground, Rock],
        forms: &[],
    },
    /* Rhydon */
    Personal {
        base_stats: stats!(105 / 130 / 120 / 45 / 45 / 40),
        gender_ratio: OneToOne,
        abilities: &[LightningRod, RockHead],
        types: [Ground, Rock],
        forms: &[],
    },
    /* Chansey */
    Personal {
        base_stats: stats!(250 / 5 / 5 / 35 / 105 / 50),
        gender_ratio: FemaleOnly,
        abilities: &[NaturalCure, SereneGrace],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Tangela */
    Personal {
        base_stats: stats!(65 / 55 / 115 / 100 / 40 / 60),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, LeafGuard],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Kangaskhan */
    Personal {
        base_stats: stats!(105 / 95 / 80 / 40 / 80 / 90),
        gender_ratio: FemaleOnly,
        abilities: &[EarlyBird, Scrappy],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Horsea */
    Personal {
        base_stats: stats!(30 / 40 / 70 / 70 / 25 / 60),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, Sniper],
        types: [Water, Water],
        forms: &[],
    },
    /* Seadra */
    Personal {
        base_stats: stats!(55 / 65 / 95 / 95 / 45 / 85),
        gender_ratio: OneToOne,
        abilities: &[PoisonPoint, Sniper],
        types: [Water, Water],
        forms: &[],
    },
    /* Goldeen */
    Personal {
        base_stats: stats!(45 / 67 / 60 / 35 / 50 / 63),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, WaterVeil],
        types: [Water, Water],
        forms: &[],
    },
    /* Seaking */
    Personal {
        base_stats: stats!(80 / 92 / 65 / 65 / 80 / 68),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, WaterVeil],
        types: [Water, Water],
        forms: &[],
    },
    /* Staryu */
    Personal {
        base_stats: stats!(30 / 45 / 55 / 70 / 55 / 85),
        gender_ratio: Genderless,
        abilities: &[Illuminate, NaturalCure],
        types: [Water, Water],
        forms: &[],
    },
    /* Starmie */
    Personal {
        base_stats: stats!(60 / 75 / 85 / 100 / 85 / 115),
        gender_ratio: Genderless,
        abilities: &[Illuminate, NaturalCure],
        types: [Water, Psychic],
        forms: &[],
    },
    /* Mr. mime */
    Personal {
        base_stats: stats!(40 / 45 / 65 / 100 / 120 / 90),
        gender_ratio: OneToOne,
        abilities: &[Soundproof, Filter],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Scyther */
    Personal {
        base_stats: stats!(70 / 110 / 80 / 55 / 80 / 105),
        gender_ratio: OneToOne,
        abilities: &[Swarm, Technician],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Jynx */
    Personal {
        base_stats: stats!(65 / 50 / 35 / 115 / 95 / 95),
        gender_ratio: FemaleOnly,
        abilities: &[Oblivious, Forewarn],
        types: [Ice, Psychic],
        forms: &[],
    },
    /* Electabuzz */
    Personal {
        base_stats: stats!(65 / 83 / 57 / 95 / 85 / 105),
        gender_ratio: OneToThree,
        abilities: &[Static, Static],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Magmar */
    Personal {
        base_stats: stats!(65 / 95 / 57 / 100 / 85 / 93),
        gender_ratio: OneToThree,
        abilities: &[FlameBody, FlameBody],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Pinsir */
    Personal {
        base_stats: stats!(65 / 125 / 100 / 55 / 70 / 85),
        gender_ratio: OneToOne,
        abilities: &[HyperCutter, MoldBreaker],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Tauros */
    Personal {
        base_stats: stats!(75 / 100 / 95 / 40 / 70 / 110),
        gender_ratio: MaleOnly,
        abilities: &[Intimidate, AngerPoint],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Magikarp */
    Personal {
        base_stats: stats!(20 / 10 / 55 / 15 / 20 / 80),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, SwiftSwim],
        types: [Water, Water],
        forms: &[],
    },
    /* Gyarados */
    Personal {
        base_stats: stats!(95 / 125 / 79 / 60 / 100 / 81),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, Intimidate],
        types: [Water, Flying],
        forms: &[],
    },
    /* Lapras */
    Personal {
        base_stats: stats!(130 / 85 / 80 / 85 / 95 / 60),
        gender_ratio: OneToOne,
        abilities: &[WaterAbsorb, ShellArmor],
        types: [Water, Ice],
        forms: &[],
    },
    /* Ditto */
    Personal {
        base_stats: stats!(48 / 48 / 48 / 48 / 48 / 48),
        gender_ratio: Genderless,
        abilities: &[Limber, Limber],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Eevee */
    Personal {
        base_stats: stats!(55 / 55 / 50 / 45 / 65 / 55),
        gender_ratio: OneToSeven,
        abilities: &[RunAway, Adaptability],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Vaporeon */
    Personal {
        base_stats: stats!(130 / 65 / 60 / 110 / 95 / 65),
        gender_ratio: OneToSeven,
        abilities: &[WaterAbsorb, WaterAbsorb],
        types: [Water, Water],
        forms: &[],
    },
    /* Jolteon */
    Personal {
        base_stats: stats!(65 / 65 / 60 / 110 / 95 / 130),
        gender_ratio: OneToSeven,
        abilities: &[VoltAbsorb, VoltAbsorb],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Flareon */
    Personal {
        base_stats: stats!(65 / 130 / 60 / 95 / 110 / 65),
        gender_ratio: OneToSeven,
        abilities: &[FlashFire, FlashFire],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Porygon */
    Personal {
        base_stats: stats!(65 / 60 / 70 / 85 / 75 / 40),
        gender_ratio: Genderless,
        abilities: &[Trace, Download],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Omanyte */
    Personal {
        base_stats: stats!(35 / 40 / 100 / 90 / 55 / 35),
        gender_ratio: OneToSeven,
        abilities: &[SwiftSwim, ShellArmor],
        types: [Rock, Water],
        forms: &[],
    },
    /* Omastar */
    Personal {
        base_stats: stats!(70 / 60 / 125 / 115 / 70 / 55),
        gender_ratio: OneToSeven,
        abilities: &[SwiftSwim, ShellArmor],
        types: [Rock, Water],
        forms: &[],
    },
    /* Kabuto */
    Personal {
        base_stats: stats!(30 / 80 / 90 / 55 / 45 / 55),
        gender_ratio: OneToSeven,
        abilities: &[SwiftSwim, BattleArmor],
        types: [Rock, Water],
        forms: &[],
    },
    /* Kabutops */
    Personal {
        base_stats: stats!(60 / 115 / 105 / 65 / 70 / 80),
        gender_ratio: OneToSeven,
        abilities: &[SwiftSwim, BattleArmor],
        types: [Rock, Water],
        forms: &[],
    },
    /* Aerodactyl */
    Personal {
        base_stats: stats!(80 / 105 / 65 / 60 / 75 / 130),
        gender_ratio: OneToSeven,
        abilities: &[RockHead, Pressure],
        types: [Rock, Flying],
        forms: &[],
    },
    /* Snorlax */
    Personal {
        base_stats: stats!(160 / 110 / 65 / 65 / 110 / 30),
        gender_ratio: OneToSeven,
        abilities: &[Immunity, ThickFat],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Articuno */
    Personal {
        base_stats: stats!(90 / 85 / 100 / 95 / 125 / 85),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Ice, Flying],
        forms: &[],
    },
    /* Zapdos */
    Personal {
        base_stats: stats!(90 / 90 / 85 / 125 / 90 / 100),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Electric, Flying],
        forms: &[],
    },
    /* Moltres */
    Personal {
        base_stats: stats!(90 / 100 / 90 / 125 / 85 / 90),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Fire, Flying],
        forms: &[],
    },
    /* Dratini */
    Personal {
        base_stats: stats!(41 / 64 / 45 / 50 / 50 / 50),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, ShedSkin],
        types: [Dragon, Dragon],
        forms: &[],
    },
    /* Dragonair */
    Personal {
        base_stats: stats!(61 / 84 / 65 / 70 / 70 / 70),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, ShedSkin],
        types: [Dragon, Dragon],
        forms: &[],
    },
    /* Dragonite */
    Personal {
        base_stats: stats!(91 / 134 / 95 / 100 / 100 / 80),
        gender_ratio: OneToOne,
        abilities: &[InnerFocus, InnerFocus],
        types: [Dragon, Flying],
        forms: &[],
    },
    /* Mewtwo */
    Personal {
        base_stats: stats!(106 / 110 / 90 / 154 / 90 / 130),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Mew */
    Personal {
        base_stats: stats!(100 / 100 / 100 / 100 / 100 / 100),
        gender_ratio: Genderless,
        abilities: &[Synchronize, Synchronize],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Chikorita */
    Personal {
        base_stats: stats!(45 / 49 / 65 / 49 / 65 / 45),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Bayleef */
    Personal {
        base_stats: stats!(60 / 62 / 80 / 63 / 80 / 60),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Meganium */
    Personal {
        base_stats: stats!(80 / 82 / 100 / 83 / 100 / 80),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Cyndaquil */
    Personal {
        base_stats: stats!(39 / 52 / 43 / 60 / 50 / 65),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Quilava */
    Personal {
        base_stats: stats!(58 / 64 / 58 / 80 / 65 / 80),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Typhlosion */
    Personal {
        base_stats: stats!(78 / 84 / 78 / 109 / 85 / 100),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Totodile */
    Personal {
        base_stats: stats!(50 / 65 / 64 / 44 / 48 / 43),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Croconaw */
    Personal {
        base_stats: stats!(65 / 80 / 80 / 59 / 63 / 58),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Feraligatr */
    Personal {
        base_stats: stats!(85 / 105 / 100 / 79 / 83 / 78),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Sentret */
    Personal {
        base_stats: stats!(35 / 46 / 34 / 35 / 45 / 20),
        gender_ratio: OneToOne,
        abilities: &[RunAway, KeenEye],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Furret */
    Personal {
        base_stats: stats!(85 / 76 / 64 / 45 / 55 / 90),
        gender_ratio: OneToOne,
        abilities: &[RunAway, KeenEye],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Hoothoot */
    Personal {
        base_stats: stats!(60 / 30 / 30 / 36 / 56 / 50),
        gender_ratio: OneToOne,
        abilities: &[Insomnia, KeenEye],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Noctowl */
    Personal {
        base_stats: stats!(100 / 50 / 50 / 76 / 96 / 70),
        gender_ratio: OneToOne,
        abilities: &[Insomnia, KeenEye],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Ledyba */
    Personal {
        base_stats: stats!(40 / 20 / 30 / 40 / 80 / 55),
        gender_ratio: OneToOne,
        abilities: &[Swarm, EarlyBird],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Ledian */
    Personal {
        base_stats: stats!(55 / 35 / 50 / 55 / 110 / 85),
        gender_ratio: OneToOne,
        abilities: &[Swarm, EarlyBird],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Spinarak */
    Personal {
        base_stats: stats!(40 / 60 / 40 / 40 / 40 / 30),
        gender_ratio: OneToOne,
        abilities: &[Swarm, Insomnia],
        types: [Bug, Poison],
        forms: &[],
    },
    /* Ariados */
    Personal {
        base_stats: stats!(70 / 90 / 70 / 60 / 60 / 40),
        gender_ratio: OneToOne,
        abilities: &[Swarm, Insomnia],
        types: [Bug, Poison],
        forms: &[],
    },
    /* Crobat */
    Personal {
        base_stats: stats!(85 / 90 / 80 / 70 / 80 / 130),
        gender_ratio: OneToOne,
        abilities: &[InnerFocus, InnerFocus],
        types: [Poison, Flying],
        forms: &[],
    },
    /* Chinchou */
    Personal {
        base_stats: stats!(75 / 38 / 38 / 56 / 56 / 67),
        gender_ratio: OneToOne,
        abilities: &[VoltAbsorb, Illuminate],
        types: [Water, Electric],
        forms: &[],
    },
    /* Lanturn */
    Personal {
        base_stats: stats!(125 / 58 / 58 / 76 / 76 / 67),
        gender_ratio: OneToOne,
        abilities: &[VoltAbsorb, Illuminate],
        types: [Water, Electric],
        forms: &[],
    },
    /* Pichu */
    Personal {
        base_stats: stats!(20 / 40 / 15 / 35 / 35 / 60),
        gender_ratio: OneToOne,
        abilities: &[Static, Static],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Cleffa */
    Personal {
        base_stats: stats!(50 / 25 / 28 / 45 / 55 / 15),
        gender_ratio: ThreeToOne,
        abilities: &[CuteCharm, MagicGuard],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Igglybuff */
    Personal {
        base_stats: stats!(90 / 30 / 15 / 40 / 20 / 15),
        gender_ratio: ThreeToOne,
        abilities: &[CuteCharm, CuteCharm],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Togepi */
    Personal {
        base_stats: stats!(35 / 20 / 65 / 40 / 65 / 20),
        gender_ratio: OneToSeven,
        abilities: &[Hustle, SereneGrace],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Togetic */
    Personal {
        base_stats: stats!(55 / 40 / 85 / 80 / 105 / 40),
        gender_ratio: OneToSeven,
        abilities: &[Hustle, SereneGrace],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Natu */
    Personal {
        base_stats: stats!(40 / 50 / 45 / 70 / 45 / 70),
        gender_ratio: OneToOne,
        abilities: &[Synchronize, EarlyBird],
        types: [Psychic, Flying],
        forms: &[],
    },
    /* Xatu */
    Personal {
        base_stats: stats!(65 / 75 / 70 / 95 / 70 / 95),
        gender_ratio: OneToOne,
        abilities: &[Synchronize, EarlyBird],
        types: [Psychic, Flying],
        forms: &[],
    },
    /* Mareep */
    Personal {
        base_stats: stats!(55 / 40 / 40 / 65 / 45 / 35),
        gender_ratio: OneToOne,
        abilities: &[Static, Static],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Flaaffy */
    Personal {
        base_stats: stats!(70 / 55 / 55 / 80 / 60 / 45),
        gender_ratio: OneToOne,
        abilities: &[Static, Static],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Ampharos */
    Personal {
        base_stats: stats!(90 / 75 / 75 / 115 / 90 / 55),
        gender_ratio: OneToOne,
        abilities: &[Static, Static],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Bellossom */
    Personal {
        base_stats: stats!(75 / 80 / 85 / 90 / 100 / 50),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, Chlorophyll],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Marill */
    Personal {
        base_stats: stats!(70 / 20 / 50 / 20 / 50 / 40),
        gender_ratio: OneToOne,
        abilities: &[ThickFat, HugePower],
        types: [Water, Water],
        forms: &[],
    },
    /* Azumarill */
    Personal {
        base_stats: stats!(100 / 50 / 80 / 50 / 80 / 50),
        gender_ratio: OneToOne,
        abilities: &[ThickFat, HugePower],
        types: [Water, Water],
        forms: &[],
    },
    /* Sudowoodo */
    Personal {
        base_stats: stats!(70 / 100 / 115 / 30 / 65 / 30),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, RockHead],
        types: [Rock, Rock],
        forms: &[],
    },
    /* Politoed */
    Personal {
        base_stats: stats!(90 / 75 / 75 / 90 / 100 / 70),
        gender_ratio: OneToOne,
        abilities: &[WaterAbsorb, Damp],
        types: [Water, Water],
        forms: &[],
    },
    /* Hoppip */
    Personal {
        base_stats: stats!(35 / 35 / 40 / 35 / 55 / 50),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, LeafGuard],
        types: [Grass, Flying],
        forms: &[],
    },
    /* Skiploom */
    Personal {
        base_stats: stats!(55 / 45 / 50 / 45 / 65 / 80),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, LeafGuard],
        types: [Grass, Flying],
        forms: &[],
    },
    /* Jumpluff */
    Personal {
        base_stats: stats!(75 / 55 / 70 / 55 / 85 / 110),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, LeafGuard],
        types: [Grass, Flying],
        forms: &[],
    },
    /* Aipom */
    Personal {
        base_stats: stats!(55 / 70 / 55 / 40 / 55 / 85),
        gender_ratio: OneToOne,
        abilities: &[RunAway, Pickup],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Sunkern */
    Personal {
        base_stats: stats!(30 / 30 / 30 / 30 / 30 / 30),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, SolarPower],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Sunflora */
    Personal {
        base_stats: stats!(75 / 75 / 55 / 105 / 85 / 30),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, SolarPower],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Yanma */
    Personal {
        base_stats: stats!(65 / 65 / 45 / 75 / 45 / 95),
        gender_ratio: OneToOne,
        abilities: &[SpeedBoost, CompoundEyes],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Wooper */
    Personal {
        base_stats: stats!(55 / 45 / 45 / 25 / 25 / 15),
        gender_ratio: OneToOne,
        abilities: &[Damp, WaterAbsorb],
        types: [Water, Ground],
        forms: &[],
    },
    /* Quagsire */
    Personal {
        base_stats: stats!(95 / 85 / 85 / 65 / 65 / 35),
        gender_ratio: OneToOne,
        abilities: &[Damp, WaterAbsorb],
        types: [Water, Ground],
        forms: &[],
    },
    /* Espeon */
    Personal {
        base_stats: stats!(65 / 65 / 60 / 130 / 95 / 110),
        gender_ratio: OneToSeven,
        abilities: &[Synchronize, Synchronize],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Umbreon */
    Personal {
        base_stats: stats!(95 / 65 / 110 / 60 / 130 / 65),
        gender_ratio: OneToSeven,
        abilities: &[Synchronize, Synchronize],
        types: [Dark, Dark],
        forms: &[],
    },
    /* Murkrow */
    Personal {
        base_stats: stats!(60 / 85 / 42 / 85 / 42 / 91),
        gender_ratio: OneToOne,
        abilities: &[Insomnia, SuperLuck],
        types: [Dark, Flying],
        forms: &[],
    },
    /* Slowking */
    Personal {
        base_stats: stats!(95 / 75 / 80 / 100 / 110 / 30),
        gender_ratio: OneToOne,
        abilities: &[Oblivious, OwnTempo],
        types: [Water, Psychic],
        forms: &[],
    },
    /* Misdreavus */
    Personal {
        base_stats: stats!(60 / 60 / 60 / 85 / 85 / 85),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Ghost, Ghost],
        forms: &[],
    },
    /* Unown */
    Personal {
        base_stats: stats!(48 / 72 / 48 / 72 / 48 / 48),
        gender_ratio: Genderless,
        abilities: &[Levitate, Levitate],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Wobbuffet */
    Personal {
        base_stats: stats!(190 / 33 / 58 / 33 / 58 / 33),
        gender_ratio: OneToOne,
        abilities: &[ShadowTag, ShadowTag],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Girafarig */
    Personal {
        base_stats: stats!(70 / 80 / 65 / 90 / 65 / 85),
        gender_ratio: OneToOne,
        abilities: &[InnerFocus, EarlyBird],
        types: [Normal, Psychic],
        forms: &[],
    },
    /* Pineco */
    Personal {
        base_stats: stats!(50 / 65 / 90 / 35 / 35 / 15),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, Sturdy],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Forretress */
    Personal {
        base_stats: stats!(75 / 90 / 140 / 60 / 60 / 40),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, Sturdy],
        types: [Bug, Steel],
        forms: &[],
    },
    /* Dunsparce */
    Personal {
        base_stats: stats!(100 / 70 / 70 / 65 / 65 / 45),
        gender_ratio: OneToOne,
        abilities: &[SereneGrace, RunAway],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Gligar */
    Personal {
        base_stats: stats!(65 / 75 / 105 / 35 / 65 / 85),
        gender_ratio: OneToOne,
        abilities: &[HyperCutter, SandVeil],
        types: [Ground, Flying],
        forms: &[],
    },
    /* Steelix */
    Personal {
        base_stats: stats!(75 / 85 / 200 / 55 / 65 / 30),
        gender_ratio: OneToOne,
        abilities: &[RockHead, Sturdy],
        types: [Steel, Ground],
        forms: &[],
    },
    /* Snubbull */
    Personal {
        base_stats: stats!(60 / 80 / 50 / 40 / 40 / 30),
        gender_ratio: ThreeToOne,
        abilities: &[Intimidate, RunAway],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Granbull */
    Personal {
        base_stats: stats!(90 / 120 / 75 / 60 / 60 / 45),
        gender_ratio: ThreeToOne,
        abilities: &[Intimidate, QuickFeet],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Qwilfish */
    Personal {
        base_stats: stats!(65 / 95 / 75 / 55 / 55 / 85),
        gender_ratio: OneToOne,
        abilities: &[PoisonPoint, SwiftSwim],
        types: [Water, Poison],
        forms: &[],
    },
    /* Scizor */
    Personal {
        base_stats: stats!(70 / 130 / 100 / 55 / 80 / 65),
        gender_ratio: OneToOne,
        abilities: &[Swarm, Technician],
        types: [Bug, Steel],
        forms: &[],
    },
    /* Shuckle */
    Personal {
        base_stats: stats!(20 / 10 / 230 / 10 / 230 / 5),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, Gluttony],
        types: [Bug, Rock],
        forms: &[],
    },
    /* Heracross */
    Personal {
        base_stats: stats!(80 / 125 / 75 / 40 / 95 / 85),
        gender_ratio: OneToOne,
        abilities: &[Swarm, Guts],
        types: [Bug, Fighting],
        forms: &[],
    },
    /* Sneasel */
    Personal {
        base_stats: stats!(55 / 95 / 55 / 35 / 75 / 115),
        gender_ratio: OneToOne,
        abilities: &[InnerFocus, KeenEye],
        types: [Dark, Ice],
        forms: &[],
    },
    /* Teddiursa */
    Personal {
        base_stats: stats!(60 / 80 / 50 / 50 / 50 / 40),
        gender_ratio: OneToOne,
        abilities: &[Pickup, QuickFeet],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Ursaring */
    Personal {
        base_stats: stats!(90 / 130 / 75 / 75 / 75 / 55),
        gender_ratio: OneToOne,
        abilities: &[Guts, QuickFeet],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Slugma */
    Personal {
        base_stats: stats!(40 / 40 / 40 / 70 / 40 / 20),
        gender_ratio: OneToOne,
        abilities: &[MagmaArmor, FlameBody],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Magcargo */
    Personal {
        base_stats: stats!(50 / 50 / 120 / 80 / 80 / 30),
        gender_ratio: OneToOne,
        abilities: &[MagmaArmor, FlameBody],
        types: [Fire, Rock],
        forms: &[],
    },
    /* Swinub */
    Personal {
        base_stats: stats!(50 / 50 / 40 / 30 / 30 / 50),
        gender_ratio: OneToOne,
        abilities: &[Oblivious, SnowCloak],
        types: [Ice, Ground],
        forms: &[],
    },
    /* Piloswine */
    Personal {
        base_stats: stats!(100 / 100 / 80 / 60 / 60 / 50),
        gender_ratio: OneToOne,
        abilities: &[Oblivious, SnowCloak],
        types: [Ice, Ground],
        forms: &[],
    },
    /* Corsola */
    Personal {
        base_stats: stats!(55 / 55 / 85 / 65 / 85 / 35),
        gender_ratio: ThreeToOne,
        abilities: &[Hustle, NaturalCure],
        types: [Water, Rock],
        forms: &[],
    },
    /* Remoraid */
    Personal {
        base_stats: stats!(35 / 65 / 35 / 65 / 35 / 65),
        gender_ratio: OneToOne,
        abilities: &[Hustle, Sniper],
        types: [Water, Water],
        forms: &[],
    },
    /* Octillery */
    Personal {
        base_stats: stats!(75 / 105 / 75 / 105 / 75 / 45),
        gender_ratio: OneToOne,
        abilities: &[SuctionCups, Sniper],
        types: [Water, Water],
        forms: &[],
    },
    /* Delibird */
    Personal {
        base_stats: stats!(45 / 55 / 45 / 65 / 45 / 75),
        gender_ratio: OneToOne,
        abilities: &[VitalSpirit, Hustle],
        types: [Ice, Flying],
        forms: &[],
    },
    /* Mantine */
    Personal {
        base_stats: stats!(65 / 40 / 70 / 80 / 140 / 70),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, WaterAbsorb],
        types: [Water, Flying],
        forms: &[],
    },
    /* Skarmory */
    Personal {
        base_stats: stats!(65 / 80 / 140 / 40 / 70 / 70),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, Sturdy],
        types: [Steel, Flying],
        forms: &[],
    },
    /* Houndour */
    Personal {
        base_stats: stats!(45 / 60 / 30 / 80 / 50 / 65),
        gender_ratio: OneToOne,
        abilities: &[EarlyBird, FlashFire],
        types: [Dark, Fire],
        forms: &[],
    },
    /* Houndoom */
    Personal {
        base_stats: stats!(75 / 90 / 50 / 110 / 80 / 95),
        gender_ratio: OneToOne,
        abilities: &[EarlyBird, FlashFire],
        types: [Dark, Fire],
        forms: &[],
    },
    /* Kingdra */
    Personal {
        base_stats: stats!(75 / 95 / 95 / 95 / 95 / 85),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, Sniper],
        types: [Water, Dragon],
        forms: &[],
    },
    /* Phanpy */
    Personal {
        base_stats: stats!(90 / 60 / 60 / 40 / 40 / 40),
        gender_ratio: OneToOne,
        abilities: &[Pickup, Pickup],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Donphan */
    Personal {
        base_stats: stats!(90 / 120 / 120 / 60 / 60 / 50),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, Sturdy],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Porygon2 */
    Personal {
        base_stats: stats!(85 / 80 / 90 / 105 / 95 / 60),
        gender_ratio: Genderless,
        abilities: &[Trace, Download],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Stantler */
    Personal {
        base_stats: stats!(73 / 95 / 62 / 85 / 65 / 85),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, Frisk],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Smeargle */
    Personal {
        base_stats: stats!(55 / 20 / 35 / 20 / 45 / 75),
        gender_ratio: OneToOne,
        abilities: &[OwnTempo, Technician],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Tyrogue */
    Personal {
        base_stats: stats!(35 / 35 / 35 / 35 / 35 / 35),
        gender_ratio: MaleOnly,
        abilities: &[Guts, Steadfast],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Hitmontop */
    Personal {
        base_stats: stats!(50 / 95 / 95 / 35 / 110 / 70),
        gender_ratio: MaleOnly,
        abilities: &[Intimidate, Technician],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Smoochum */
    Personal {
        base_stats: stats!(45 / 30 / 15 / 85 / 65 / 65),
        gender_ratio: FemaleOnly,
        abilities: &[Oblivious, Forewarn],
        types: [Ice, Psychic],
        forms: &[],
    },
    /* Elekid */
    Personal {
        base_stats: stats!(45 / 63 / 37 / 65 / 55 / 95),
        gender_ratio: OneToThree,
        abilities: &[Static, Static],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Magby */
    Personal {
        base_stats: stats!(45 / 75 / 37 / 70 / 55 / 83),
        gender_ratio: OneToThree,
        abilities: &[FlameBody, FlameBody],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Miltank */
    Personal {
        base_stats: stats!(95 / 80 / 105 / 40 / 70 / 100),
        gender_ratio: FemaleOnly,
        abilities: &[ThickFat, Scrappy],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Blissey */
    Personal {
        base_stats: stats!(255 / 10 / 10 / 75 / 135 / 55),
        gender_ratio: FemaleOnly,
        abilities: &[NaturalCure, SereneGrace],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Raikou */
    Personal {
        base_stats: stats!(90 / 85 / 75 / 115 / 100 / 115),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Entei */
    Personal {
        base_stats: stats!(115 / 115 / 85 / 90 / 75 / 100),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Suicune */
    Personal {
        base_stats: stats!(100 / 75 / 115 / 90 / 115 / 85),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Water, Water],
        forms: &[],
    },
    /* Larvitar */
    Personal {
        base_stats: stats!(50 / 64 / 50 / 45 / 50 / 41),
        gender_ratio: OneToOne,
        abilities: &[Guts, Guts],
        types: [Rock, Ground],
        forms: &[],
    },
    /* Pupitar */
    Personal {
        base_stats: stats!(70 / 84 / 70 / 65 / 70 / 51),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, ShedSkin],
        types: [Rock, Ground],
        forms: &[],
    },
    /* Tyranitar */
    Personal {
        base_stats: stats!(100 / 134 / 110 / 95 / 100 / 61),
        gender_ratio: OneToOne,
        abilities: &[SandStream, SandStream],
        types: [Rock, Dark],
        forms: &[],
    },
    /* Lugia */
    Personal {
        base_stats: stats!(106 / 90 / 130 / 90 / 154 / 110),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Psychic, Flying],
        forms: &[],
    },
    /* Ho-Oh */
    Personal {
        base_stats: stats!(106 / 130 / 90 / 110 / 154 / 90),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Fire, Flying],
        forms: &[],
    },
    /* Celebi */
    Personal {
        base_stats: stats!(100 / 100 / 100 / 100 / 100 / 100),
        gender_ratio: Genderless,
        abilities: &[NaturalCure, NaturalCure],
        types: [Psychic, Grass],
        forms: &[],
    },
    /* Treecko */
    Personal {
        base_stats: stats!(40 / 45 / 35 / 65 / 55 / 70),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Grovyle */
    Personal {
        base_stats: stats!(50 / 65 / 45 / 85 / 65 / 95),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Sceptile */
    Personal {
        base_stats: stats!(70 / 85 / 65 / 105 / 85 / 120),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Torchic */
    Personal {
        base_stats: stats!(45 / 60 / 40 / 70 / 50 / 45),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Combusken */
    Personal {
        base_stats: stats!(60 / 85 / 60 / 85 / 60 / 55),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fighting],
        forms: &[],
    },
    /* Blaziken */
    Personal {
        base_stats: stats!(80 / 120 / 70 / 110 / 70 / 80),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fighting],
        forms: &[],
    },
    /* Mudkip */
    Personal {
        base_stats: stats!(50 / 70 / 50 / 50 / 50 / 40),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Marshtomp */
    Personal {
        base_stats: stats!(70 / 85 / 70 / 60 / 70 / 50),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Ground],
        forms: &[],
    },
    /* Swampert */
    Personal {
        base_stats: stats!(100 / 110 / 90 / 85 / 90 / 60),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Ground],
        forms: &[],
    },
    /* Poochyena */
    Personal {
        base_stats: stats!(35 / 55 / 35 / 30 / 30 / 35),
        gender_ratio: OneToOne,
        abilities: &[RunAway, QuickFeet],
        types: [Dark, Dark],
        forms: &[],
    },
    /* Mightyena */
    Personal {
        base_stats: stats!(70 / 90 / 70 / 60 / 60 / 70),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, QuickFeet],
        types: [Dark, Dark],
        forms: &[],
    },
    /* Zigzagoon */
    Personal {
        base_stats: stats!(38 / 30 / 41 / 30 / 41 / 60),
        gender_ratio: OneToOne,
        abilities: &[Pickup, Gluttony],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Linoone */
    Personal {
        base_stats: stats!(78 / 70 / 61 / 50 / 61 / 100),
        gender_ratio: OneToOne,
        abilities: &[Pickup, Gluttony],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Wurmple */
    Personal {
        base_stats: stats!(45 / 45 / 35 / 20 / 30 / 20),
        gender_ratio: OneToOne,
        abilities: &[ShieldDust, ShieldDust],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Silcoon */
    Personal {
        base_stats: stats!(50 / 35 / 55 / 25 / 25 / 15),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, ShedSkin],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Beautifly */
    Personal {
        base_stats: stats!(60 / 70 / 50 / 90 / 50 / 65),
        gender_ratio: OneToOne,
        abilities: &[Swarm, Swarm],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Cascoon */
    Personal {
        base_stats: stats!(50 / 35 / 55 / 25 / 25 / 15),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, ShedSkin],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Dustox */
    Personal {
        base_stats: stats!(60 / 50 / 70 / 50 / 90 / 65),
        gender_ratio: OneToOne,
        abilities: &[ShieldDust, ShieldDust],
        types: [Bug, Poison],
        forms: &[],
    },
    /* Lotad */
    Personal {
        base_stats: stats!(40 / 30 / 30 / 40 / 50 / 30),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, RainDish],
        types: [Water, Grass],
        forms: &[],
    },
    /* Lombre */
    Personal {
        base_stats: stats!(60 / 50 / 50 / 60 / 70 / 50),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, RainDish],
        types: [Water, Grass],
        forms: &[],
    },
    /* Ludicolo */
    Personal {
        base_stats: stats!(80 / 70 / 70 / 90 / 100 / 70),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, RainDish],
        types: [Water, Grass],
        forms: &[],
    },
    /* Seedot */
    Personal {
        base_stats: stats!(40 / 40 / 50 / 30 / 30 / 30),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, EarlyBird],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Nuzleaf */
    Personal {
        base_stats: stats!(70 / 70 / 40 / 60 / 40 / 60),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, EarlyBird],
        types: [Grass, Dark],
        forms: &[],
    },
    /* Shiftry */
    Personal {
        base_stats: stats!(90 / 100 / 60 / 90 / 60 / 80),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, EarlyBird],
        types: [Grass, Dark],
        forms: &[],
    },
    /* Taillow */
    Personal {
        base_stats: stats!(40 / 55 / 30 / 30 / 30 / 85),
        gender_ratio: OneToOne,
        abilities: &[Guts, Guts],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Swellow */
    Personal {
        base_stats: stats!(60 / 85 / 60 / 50 / 50 / 125),
        gender_ratio: OneToOne,
        abilities: &[Guts, Guts],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Wingull */
    Personal {
        base_stats: stats!(40 / 30 / 30 / 55 / 30 / 85),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, KeenEye],
        types: [Water, Flying],
        forms: &[],
    },
    /* Pelipper */
    Personal {
        base_stats: stats!(60 / 50 / 100 / 85 / 70 / 65),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, KeenEye],
        types: [Water, Flying],
        forms: &[],
    },
    /* Ralts */
    Personal {
        base_stats: stats!(28 / 25 / 25 / 45 / 35 / 40),
        gender_ratio: OneToOne,
        abilities: &[Synchronize, Trace],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Kirlia */
    Personal {
        base_stats: stats!(38 / 35 / 35 / 65 / 55 / 50),
        gender_ratio: OneToOne,
        abilities: &[Synchronize, Trace],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Gardevoir */
    Personal {
        base_stats: stats!(68 / 65 / 65 / 125 / 115 / 80),
        gender_ratio: OneToOne,
        abilities: &[Synchronize, Trace],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Surskit */
    Personal {
        base_stats: stats!(40 / 30 / 32 / 50 / 52 / 65),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, SwiftSwim],
        types: [Bug, Water],
        forms: &[],
    },
    /* Masquerain */
    Personal {
        base_stats: stats!(70 / 60 / 62 / 80 / 82 / 60),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, Intimidate],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Shroomish */
    Personal {
        base_stats: stats!(60 / 40 / 60 / 40 / 60 / 35),
        gender_ratio: OneToOne,
        abilities: &[EffectSpore, PoisonHeal],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Breloom */
    Personal {
        base_stats: stats!(60 / 130 / 80 / 60 / 60 / 70),
        gender_ratio: OneToOne,
        abilities: &[EffectSpore, PoisonHeal],
        types: [Grass, Fighting],
        forms: &[],
    },
    /* Slakoth */
    Personal {
        base_stats: stats!(60 / 60 / 60 / 35 / 35 / 30),
        gender_ratio: OneToOne,
        abilities: &[Truant, Truant],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Vigoroth */
    Personal {
        base_stats: stats!(80 / 80 / 80 / 55 / 55 / 90),
        gender_ratio: OneToOne,
        abilities: &[VitalSpirit, VitalSpirit],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Slaking */
    Personal {
        base_stats: stats!(150 / 160 / 100 / 95 / 65 / 100),
        gender_ratio: OneToOne,
        abilities: &[Truant, Truant],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Nincada */
    Personal {
        base_stats: stats!(31 / 45 / 90 / 30 / 30 / 40),
        gender_ratio: OneToOne,
        abilities: &[CompoundEyes, CompoundEyes],
        types: [Bug, Ground],
        forms: &[],
    },
    /* Ninjask */
    Personal {
        base_stats: stats!(61 / 90 / 45 / 50 / 50 / 160),
        gender_ratio: OneToOne,
        abilities: &[SpeedBoost, SpeedBoost],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Shedinja */
    Personal {
        base_stats: stats!(1 / 90 / 45 / 30 / 30 / 40),
        gender_ratio: Genderless,
        abilities: &[WonderGuard, WonderGuard],
        types: [Bug, Ghost],
        forms: &[],
    },
    /* Whismur */
    Personal {
        base_stats: stats!(64 / 51 / 23 / 51 / 23 / 28),
        gender_ratio: OneToOne,
        abilities: &[Soundproof, Soundproof],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Loudred */
    Personal {
        base_stats: stats!(84 / 71 / 43 / 71 / 43 / 48),
        gender_ratio: OneToOne,
        abilities: &[Soundproof, Soundproof],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Exploud */
    Personal {
        base_stats: stats!(104 / 91 / 63 / 91 / 63 / 68),
        gender_ratio: OneToOne,
        abilities: &[Soundproof, Soundproof],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Makuhita */
    Personal {
        base_stats: stats!(72 / 60 / 30 / 20 / 30 / 25),
        gender_ratio: OneToThree,
        abilities: &[ThickFat, Guts],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Hariyama */
    Personal {
        base_stats: stats!(144 / 120 / 60 / 40 / 60 / 50),
        gender_ratio: OneToThree,
        abilities: &[ThickFat, Guts],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Azurill */
    Personal {
        base_stats: stats!(50 / 20 / 40 / 20 / 40 / 20),
        gender_ratio: ThreeToOne,
        abilities: &[ThickFat, HugePower],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Nosepass */
    Personal {
        base_stats: stats!(30 / 45 / 135 / 45 / 90 / 30),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, MagnetPull],
        types: [Rock, Rock],
        forms: &[],
    },
    /* Skitty */
    Personal {
        base_stats: stats!(50 / 45 / 45 / 35 / 35 / 50),
        gender_ratio: ThreeToOne,
        abilities: &[CuteCharm, Normalize],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Delcatty */
    Personal {
        base_stats: stats!(70 / 65 / 65 / 55 / 55 / 70),
        gender_ratio: ThreeToOne,
        abilities: &[CuteCharm, Normalize],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Sableye */
    Personal {
        base_stats: stats!(50 / 75 / 75 / 65 / 65 / 50),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, Stall],
        types: [Dark, Ghost],
        forms: &[],
    },
    /* Mawile */
    Personal {
        base_stats: stats!(50 / 85 / 85 / 55 / 55 / 50),
        gender_ratio: OneToOne,
        abilities: &[HyperCutter, Intimidate],
        types: [Steel, Steel],
        forms: &[],
    },
    /* Aron */
    Personal {
        base_stats: stats!(50 / 70 / 100 / 40 / 40 / 30),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, RockHead],
        types: [Steel, Rock],
        forms: &[],
    },
    /* Lairon */
    Personal {
        base_stats: stats!(60 / 90 / 140 / 50 / 50 / 40),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, RockHead],
        types: [Steel, Rock],
        forms: &[],
    },
    /* Aggron */
    Personal {
        base_stats: stats!(70 / 110 / 180 / 60 / 60 / 50),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, RockHead],
        types: [Steel, Rock],
        forms: &[],
    },
    /* Meditite */
    Personal {
        base_stats: stats!(30 / 40 / 55 / 40 / 55 / 60),
        gender_ratio: OneToOne,
        abilities: &[PurePower, PurePower],
        types: [Fighting, Psychic],
        forms: &[],
    },
    /* Medicham */
    Personal {
        base_stats: stats!(60 / 60 / 75 / 60 / 75 / 80),
        gender_ratio: OneToOne,
        abilities: &[PurePower, PurePower],
        types: [Fighting, Psychic],
        forms: &[],
    },
    /* Electrike */
    Personal {
        base_stats: stats!(40 / 45 / 40 / 65 / 40 / 65),
        gender_ratio: OneToOne,
        abilities: &[Static, LightningRod],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Manectric */
    Personal {
        base_stats: stats!(70 / 75 / 60 / 105 / 60 / 105),
        gender_ratio: OneToOne,
        abilities: &[Static, LightningRod],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Plusle */
    Personal {
        base_stats: stats!(60 / 50 / 40 / 85 / 75 / 95),
        gender_ratio: OneToOne,
        abilities: &[Plus, Plus],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Minun */
    Personal {
        base_stats: stats!(60 / 40 / 50 / 75 / 85 / 95),
        gender_ratio: OneToOne,
        abilities: &[Minus, Minus],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Volbeat */
    Personal {
        base_stats: stats!(65 / 73 / 55 / 47 / 75 / 85),
        gender_ratio: MaleOnly,
        abilities: &[Illuminate, Swarm],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Illumise */
    Personal {
        base_stats: stats!(65 / 47 / 55 / 73 / 75 / 85),
        gender_ratio: FemaleOnly,
        abilities: &[Oblivious, TintedLens],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Roselia */
    Personal {
        base_stats: stats!(50 / 60 / 45 / 100 / 80 / 65),
        gender_ratio: OneToOne,
        abilities: &[NaturalCure, PoisonPoint],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Gulpin */
    Personal {
        base_stats: stats!(70 / 43 / 53 / 43 / 53 / 40),
        gender_ratio: OneToOne,
        abilities: &[LiquidOoze, StickyHold],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Swalot */
    Personal {
        base_stats: stats!(100 / 73 / 83 / 73 / 83 / 55),
        gender_ratio: OneToOne,
        abilities: &[LiquidOoze, StickyHold],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Carvanha */
    Personal {
        base_stats: stats!(45 / 90 / 20 / 65 / 20 / 65),
        gender_ratio: OneToOne,
        abilities: &[RoughSkin, RoughSkin],
        types: [Water, Dark],
        forms: &[],
    },
    /* Sharpedo */
    Personal {
        base_stats: stats!(70 / 120 / 40 / 95 / 40 / 95),
        gender_ratio: OneToOne,
        abilities: &[RoughSkin, RoughSkin],
        types: [Water, Dark],
        forms: &[],
    },
    /* Wailmer */
    Personal {
        base_stats: stats!(130 / 70 / 35 / 70 / 35 / 60),
        gender_ratio: OneToOne,
        abilities: &[WaterVeil, Oblivious],
        types: [Water, Water],
        forms: &[],
    },
    /* Wailord */
    Personal {
        base_stats: stats!(170 / 90 / 45 / 90 / 45 / 60),
        gender_ratio: OneToOne,
        abilities: &[WaterVeil, Oblivious],
        types: [Water, Water],
        forms: &[],
    },
    /* Numel */
    Personal {
        base_stats: stats!(60 / 60 / 40 / 65 / 45 / 35),
        gender_ratio: OneToOne,
        abilities: &[Oblivious, Simple],
        types: [Fire, Ground],
        forms: &[],
    },
    /* Camerupt */
    Personal {
        base_stats: stats!(70 / 100 / 70 / 105 / 75 / 40),
        gender_ratio: OneToOne,
        abilities: &[MagmaArmor, SolidRock],
        types: [Fire, Ground],
        forms: &[],
    },
    /* Torkoal */
    Personal {
        base_stats: stats!(70 / 85 / 140 / 85 / 70 / 20),
        gender_ratio: OneToOne,
        abilities: &[WhiteSmoke, WhiteSmoke],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Spoink */
    Personal {
        base_stats: stats!(60 / 25 / 35 / 70 / 80 / 60),
        gender_ratio: OneToOne,
        abilities: &[ThickFat, OwnTempo],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Grumpig */
    Personal {
        base_stats: stats!(80 / 45 / 65 / 90 / 110 / 80),
        gender_ratio: OneToOne,
        abilities: &[ThickFat, OwnTempo],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Spinda */
    Personal {
        base_stats: stats!(60 / 60 / 60 / 60 / 60 / 60),
        gender_ratio: OneToOne,
        abilities: &[OwnTempo, TangledFeet],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Trapinch */
    Personal {
        base_stats: stats!(45 / 100 / 45 / 45 / 45 / 10),
        gender_ratio: OneToOne,
        abilities: &[HyperCutter, ArenaTrap],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Vibrava */
    Personal {
        base_stats: stats!(50 / 70 / 50 / 50 / 50 / 70),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Ground, Dragon],
        forms: &[],
    },
    /* Flygon */
    Personal {
        base_stats: stats!(80 / 100 / 80 / 80 / 80 / 100),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Ground, Dragon],
        forms: &[],
    },
    /* Cacnea */
    Personal {
        base_stats: stats!(50 / 85 / 40 / 85 / 40 / 35),
        gender_ratio: OneToOne,
        abilities: &[SandVeil, SandVeil],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Cacturne */
    Personal {
        base_stats: stats!(70 / 115 / 60 / 115 / 60 / 55),
        gender_ratio: OneToOne,
        abilities: &[SandVeil, SandVeil],
        types: [Grass, Dark],
        forms: &[],
    },
    /* Swablu */
    Personal {
        base_stats: stats!(45 / 40 / 60 / 40 / 75 / 50),
        gender_ratio: OneToOne,
        abilities: &[NaturalCure, NaturalCure],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Altaria */
    Personal {
        base_stats: stats!(75 / 70 / 90 / 70 / 105 / 80),
        gender_ratio: OneToOne,
        abilities: &[NaturalCure, NaturalCure],
        types: [Dragon, Flying],
        forms: &[],
    },
    /* Zangoose */
    Personal {
        base_stats: stats!(73 / 115 / 60 / 60 / 60 / 90),
        gender_ratio: OneToOne,
        abilities: &[Immunity, Immunity],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Seviper */
    Personal {
        base_stats: stats!(73 / 100 / 60 / 100 / 60 / 65),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, ShedSkin],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Lunatone */
    Personal {
        base_stats: stats!(70 / 55 / 65 / 95 / 85 / 70),
        gender_ratio: Genderless,
        abilities: &[Levitate, Levitate],
        types: [Rock, Psychic],
        forms: &[],
    },
    /* Solrock */
    Personal {
        base_stats: stats!(70 / 95 / 85 / 55 / 65 / 70),
        gender_ratio: Genderless,
        abilities: &[Levitate, Levitate],
        types: [Rock, Psychic],
        forms: &[],
    },
    /* Barboach */
    Personal {
        base_stats: stats!(50 / 48 / 43 / 46 / 41 / 60),
        gender_ratio: OneToOne,
        abilities: &[Oblivious, Anticipation],
        types: [Water, Ground],
        forms: &[],
    },
    /* Whiscash */
    Personal {
        base_stats: stats!(110 / 78 / 73 / 76 / 71 / 60),
        gender_ratio: OneToOne,
        abilities: &[Oblivious, Anticipation],
        types: [Water, Ground],
        forms: &[],
    },
    /* Corphish */
    Personal {
        base_stats: stats!(43 / 80 / 65 / 50 / 35 / 35),
        gender_ratio: OneToOne,
        abilities: &[HyperCutter, ShellArmor],
        types: [Water, Water],
        forms: &[],
    },
    /* Crawdaunt */
    Personal {
        base_stats: stats!(63 / 120 / 85 / 90 / 55 / 55),
        gender_ratio: OneToOne,
        abilities: &[HyperCutter, ShellArmor],
        types: [Water, Dark],
        forms: &[],
    },
    /* Baltoy */
    Personal {
        base_stats: stats!(40 / 40 / 55 / 40 / 70 / 55),
        gender_ratio: Genderless,
        abilities: &[Levitate, Levitate],
        types: [Ground, Psychic],
        forms: &[],
    },
    /* Claydol */
    Personal {
        base_stats: stats!(60 / 70 / 105 / 70 / 120 / 75),
        gender_ratio: Genderless,
        abilities: &[Levitate, Levitate],
        types: [Ground, Psychic],
        forms: &[],
    },
    /* Lileep */
    Personal {
        base_stats: stats!(66 / 41 / 77 / 61 / 87 / 23),
        gender_ratio: OneToSeven,
        abilities: &[SuctionCups, SuctionCups],
        types: [Rock, Grass],
        forms: &[],
    },
    /* Cradily */
    Personal {
        base_stats: stats!(86 / 81 / 97 / 81 / 107 / 43),
        gender_ratio: OneToSeven,
        abilities: &[SuctionCups, SuctionCups],
        types: [Rock, Grass],
        forms: &[],
    },
    /* Anorith */
    Personal {
        base_stats: stats!(45 / 95 / 50 / 40 / 50 / 75),
        gender_ratio: OneToSeven,
        abilities: &[BattleArmor, BattleArmor],
        types: [Rock, Bug],
        forms: &[],
    },
    /* Armaldo */
    Personal {
        base_stats: stats!(75 / 125 / 100 / 70 / 80 / 45),
        gender_ratio: OneToSeven,
        abilities: &[BattleArmor, BattleArmor],
        types: [Rock, Bug],
        forms: &[],
    },
    /* Feebas */
    Personal {
        base_stats: stats!(20 / 15 / 20 / 10 / 55 / 80),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, SwiftSwim],
        types: [Water, Water],
        forms: &[],
    },
    /* Milotic */
    Personal {
        base_stats: stats!(95 / 60 / 79 / 100 / 125 / 81),
        gender_ratio: OneToOne,
        abilities: &[MarvelScale, MarvelScale],
        types: [Water, Water],
        forms: &[],
    },
    /* Castform */ /* Normal */
    Personal {
        base_stats: stats!(70 / 70 / 70 / 70 / 70 / 70),
        gender_ratio: OneToOne,
        abilities: &[Forecast, Forecast],
        types: [Normal, Normal],
        forms: &[
            /* Sunny */
            Personal {
                base_stats: stats!(70 / 70 / 70 / 70 / 70 / 70),
                gender_ratio: OneToOne,
                abilities: &[Forecast, Forecast],
                types: [Fire, Fire],
                forms: &[],
            },
            /* Rainy */
            Personal {
                base_stats: stats!(70 / 70 / 70 / 70 / 70 / 70),
                gender_ratio: OneToOne,
                abilities: &[Forecast, Forecast],
                types: [Water, Water],
                forms: &[],
            },
            /* Snowy */
            Personal {
                base_stats: stats!(70 / 70 / 70 / 70 / 70 / 70),
                gender_ratio: OneToOne,
                abilities: &[Forecast, Forecast],
                types: [Ice, Ice],
                forms: &[],
            },
        ],
    },
    /* Kecleon */
    Personal {
        base_stats: stats!(60 / 90 / 70 / 60 / 120 / 40),
        gender_ratio: OneToOne,
        abilities: &[ColorChange, ColorChange],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Shuppet */
    Personal {
        base_stats: stats!(44 / 75 / 35 / 63 / 33 / 45),
        gender_ratio: OneToOne,
        abilities: &[Insomnia, Frisk],
        types: [Ghost, Ghost],
        forms: &[],
    },
    /* Banette */
    Personal {
        base_stats: stats!(64 / 115 / 65 / 83 / 63 / 65),
        gender_ratio: OneToOne,
        abilities: &[Insomnia, Frisk],
        types: [Ghost, Ghost],
        forms: &[],
    },
    /* Duskull */
    Personal {
        base_stats: stats!(20 / 40 / 90 / 30 / 90 / 25),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Ghost, Ghost],
        forms: &[],
    },
    /* Dusclops */
    Personal {
        base_stats: stats!(40 / 70 / 130 / 60 / 130 / 25),
        gender_ratio: OneToOne,
        abilities: &[Pressure, Pressure],
        types: [Ghost, Ghost],
        forms: &[],
    },
    /* Tropius */
    Personal {
        base_stats: stats!(99 / 68 / 83 / 72 / 87 / 51),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, SolarPower],
        types: [Grass, Flying],
        forms: &[],
    },
    /* Chimecho */
    Personal {
        base_stats: stats!(65 / 50 / 70 / 95 / 80 / 65),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Absol */
    Personal {
        base_stats: stats!(65 / 130 / 60 / 75 / 60 / 75),
        gender_ratio: OneToOne,
        abilities: &[Pressure, SuperLuck],
        types: [Dark, Dark],
        forms: &[],
    },
    /* Wynaut */
    Personal {
        base_stats: stats!(95 / 23 / 48 / 23 / 48 / 23),
        gender_ratio: OneToOne,
        abilities: &[ShadowTag, ShadowTag],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Snorunt */
    Personal {
        base_stats: stats!(50 / 50 / 50 / 50 / 50 / 50),
        gender_ratio: OneToOne,
        abilities: &[InnerFocus, IceBody],
        types: [Ice, Ice],
        forms: &[],
    },
    /* Glalie */
    Personal {
        base_stats: stats!(80 / 80 / 80 / 80 / 80 / 80),
        gender_ratio: OneToOne,
        abilities: &[InnerFocus, IceBody],
        types: [Ice, Ice],
        forms: &[],
    },
    /* Spheal */
    Personal {
        base_stats: stats!(70 / 40 / 50 / 55 / 50 / 25),
        gender_ratio: OneToOne,
        abilities: &[ThickFat, IceBody],
        types: [Ice, Water],
        forms: &[],
    },
    /* Sealeo */
    Personal {
        base_stats: stats!(90 / 60 / 70 / 75 / 70 / 45),
        gender_ratio: OneToOne,
        abilities: &[ThickFat, IceBody],
        types: [Ice, Water],
        forms: &[],
    },
    /* Walrein */
    Personal {
        base_stats: stats!(110 / 80 / 90 / 95 / 90 / 65),
        gender_ratio: OneToOne,
        abilities: &[ThickFat, IceBody],
        types: [Ice, Water],
        forms: &[],
    },
    /* Clamperl */
    Personal {
        base_stats: stats!(35 / 64 / 85 / 74 / 55 / 32),
        gender_ratio: OneToOne,
        abilities: &[ShellArmor, ShellArmor],
        types: [Water, Water],
        forms: &[],
    },
    /* Huntail */
    Personal {
        base_stats: stats!(55 / 104 / 105 / 94 / 75 / 52),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, SwiftSwim],
        types: [Water, Water],
        forms: &[],
    },
    /* Gorebyss */
    Personal {
        base_stats: stats!(55 / 84 / 105 / 114 / 75 / 52),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, SwiftSwim],
        types: [Water, Water],
        forms: &[],
    },
    /* Relicanth */
    Personal {
        base_stats: stats!(100 / 90 / 130 / 45 / 65 / 55),
        gender_ratio: OneToSeven,
        abilities: &[SwiftSwim, RockHead],
        types: [Water, Rock],
        forms: &[],
    },
    /* Luvdisc */
    Personal {
        base_stats: stats!(43 / 30 / 55 / 40 / 65 / 97),
        gender_ratio: ThreeToOne,
        abilities: &[SwiftSwim, SwiftSwim],
        types: [Water, Water],
        forms: &[],
    },
    /* Bagon */
    Personal {
        base_stats: stats!(45 / 75 / 60 / 40 / 30 / 50),
        gender_ratio: OneToOne,
        abilities: &[RockHead, RockHead],
        types: [Dragon, Dragon],
        forms: &[],
    },
    /* Shelgon */
    Personal {
        base_stats: stats!(65 / 95 / 100 / 60 / 50 / 50),
        gender_ratio: OneToOne,
        abilities: &[RockHead, RockHead],
        types: [Dragon, Dragon],
        forms: &[],
    },
    /* Salamence */
    Personal {
        base_stats: stats!(95 / 135 / 80 / 110 / 80 / 100),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, Intimidate],
        types: [Dragon, Flying],
        forms: &[],
    },
    /* Beldum */
    Personal {
        base_stats: stats!(40 / 55 / 80 / 35 / 60 / 30),
        gender_ratio: Genderless,
        abilities: &[ClearBody, ClearBody],
        types: [Steel, Psychic],
        forms: &[],
    },
    /* Metang */
    Personal {
        base_stats: stats!(60 / 75 / 100 / 55 / 80 / 50),
        gender_ratio: Genderless,
        abilities: &[ClearBody, ClearBody],
        types: [Steel, Psychic],
        forms: &[],
    },
    /* Metagross */
    Personal {
        base_stats: stats!(80 / 135 / 130 / 95 / 90 / 70),
        gender_ratio: Genderless,
        abilities: &[ClearBody, ClearBody],
        types: [Steel, Psychic],
        forms: &[],
    },
    /* Regirock */
    Personal {
        base_stats: stats!(80 / 100 / 200 / 50 / 100 / 50),
        gender_ratio: Genderless,
        abilities: &[ClearBody, ClearBody],
        types: [Rock, Rock],
        forms: &[],
    },
    /* Regice */
    Personal {
        base_stats: stats!(80 / 50 / 100 / 100 / 200 / 50),
        gender_ratio: Genderless,
        abilities: &[ClearBody, ClearBody],
        types: [Ice, Ice],
        forms: &[],
    },
    /* Registeel */
    Personal {
        base_stats: stats!(80 / 75 / 150 / 75 / 150 / 50),
        gender_ratio: Genderless,
        abilities: &[ClearBody, ClearBody],
        types: [Steel, Steel],
        forms: &[],
    },
    /* Latias */
    Personal {
        base_stats: stats!(80 / 80 / 90 / 110 / 130 / 110),
        gender_ratio: FemaleOnly,
        abilities: &[Levitate, Levitate],
        types: [Dragon, Psychic],
        forms: &[],
    },
    /* Latios */
    Personal {
        base_stats: stats!(80 / 90 / 80 / 130 / 110 / 110),
        gender_ratio: MaleOnly,
        abilities: &[Levitate, Levitate],
        types: [Dragon, Psychic],
        forms: &[],
    },
    /* Kyogre */
    Personal {
        base_stats: stats!(100 / 100 / 90 / 150 / 140 / 90),
        gender_ratio: Genderless,
        abilities: &[Drizzle, Drizzle],
        types: [Water, Water],
        forms: &[],
    },
    /* Groudon */
    Personal {
        base_stats: stats!(100 / 150 / 140 / 100 / 90 / 90),
        gender_ratio: Genderless,
        abilities: &[Drought, Drought],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Rayquaza */
    Personal {
        base_stats: stats!(105 / 150 / 90 / 150 / 90 / 95),
        gender_ratio: Genderless,
        abilities: &[AirLock, AirLock],
        types: [Dragon, Flying],
        forms: &[],
    },
    /* Jirachi */
    Personal {
        base_stats: stats!(100 / 100 / 100 / 100 / 100 / 100),
        gender_ratio: Genderless,
        abilities: &[SereneGrace, SereneGrace],
        types: [Steel, Psychic],
        forms: &[],
    },
    /* Deoxys */ /* Normal */
    Personal {
        base_stats: stats!(50 / 150 / 50 / 150 / 50 / 150),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Psychic, Psychic],
        forms: &[
            /* Attack */
            Personal {
                base_stats: stats!(50 / 180 / 20 / 180 / 20 / 150),
                gender_ratio: Genderless,
                abilities: &[Pressure, Pressure],
                types: [Psychic, Psychic],
                forms: &[],
            },
            /* Defense */
            Personal {
                base_stats: stats!(50 / 70 / 160 / 70 / 160 / 90),
                gender_ratio: Genderless,
                abilities: &[Pressure, Pressure],
                types: [Psychic, Psychic],
                forms: &[],
            },
            /* Speed */
            Personal {
                base_stats: stats!(50 / 95 / 90 / 95 / 90 / 180),
                gender_ratio: Genderless,
                abilities: &[Pressure, Pressure],
                types: [Psychic, Psychic],
                forms: &[],
            },
        ],
    },
    /* Turtwig */
    Personal {
        base_stats: stats!(55 / 68 / 64 / 45 / 55 / 31),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Grotle */
    Personal {
        base_stats: stats!(75 / 89 / 85 / 55 / 65 / 36),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Torterra */
    Personal {
        base_stats: stats!(95 / 109 / 105 / 75 / 85 / 56),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Ground],
        forms: &[],
    },
    /* Chimchar */
    Personal {
        base_stats: stats!(44 / 58 / 44 / 58 / 44 / 61),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Monferno */
    Personal {
        base_stats: stats!(64 / 78 / 52 / 78 / 52 / 81),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fighting],
        forms: &[],
    },
    /* Infernape */
    Personal {
        base_stats: stats!(76 / 104 / 71 / 104 / 71 / 108),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fighting],
        forms: &[],
    },
    /* Piplup */
    Personal {
        base_stats: stats!(53 / 51 / 53 / 61 / 56 / 40),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Prinplup */
    Personal {
        base_stats: stats!(64 / 66 / 68 / 81 / 76 / 50),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Empoleon */
    Personal {
        base_stats: stats!(84 / 86 / 88 / 111 / 101 / 60),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Steel],
        forms: &[],
    },
    /* Starly */
    Personal {
        base_stats: stats!(40 / 55 / 30 / 30 / 30 / 60),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, KeenEye],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Staravia */
    Personal {
        base_stats: stats!(55 / 75 / 50 / 40 / 40 / 80),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, Intimidate],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Staraptor */
    Personal {
        base_stats: stats!(85 / 120 / 70 / 50 / 50 / 100),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, Intimidate],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Bidoof */
    Personal {
        base_stats: stats!(59 / 45 / 40 / 35 / 40 / 31),
        gender_ratio: OneToOne,
        abilities: &[Simple, Unaware],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Bibarel */
    Personal {
        base_stats: stats!(79 / 85 / 60 / 55 / 60 / 71),
        gender_ratio: OneToOne,
        abilities: &[Simple, Unaware],
        types: [Normal, Water],
        forms: &[],
    },
    /* Kricketot */
    Personal {
        base_stats: stats!(37 / 25 / 41 / 25 / 41 / 25),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, ShedSkin],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Kricketune */
    Personal {
        base_stats: stats!(77 / 85 / 51 / 55 / 51 / 65),
        gender_ratio: OneToOne,
        abilities: &[Swarm, Swarm],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Shinx */
    Personal {
        base_stats: stats!(45 / 65 / 34 / 40 / 34 / 45),
        gender_ratio: OneToOne,
        abilities: &[Rivalry, Intimidate],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Luxio */
    Personal {
        base_stats: stats!(60 / 85 / 49 / 60 / 49 / 60),
        gender_ratio: OneToOne,
        abilities: &[Rivalry, Intimidate],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Luxray */
    Personal {
        base_stats: stats!(80 / 120 / 79 / 95 / 79 / 70),
        gender_ratio: OneToOne,
        abilities: &[Rivalry, Intimidate],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Budew */
    Personal {
        base_stats: stats!(40 / 30 / 35 / 50 / 70 / 55),
        gender_ratio: OneToOne,
        abilities: &[NaturalCure, PoisonPoint],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Roserade */
    Personal {
        base_stats: stats!(60 / 70 / 55 / 125 / 105 / 90),
        gender_ratio: OneToOne,
        abilities: &[NaturalCure, PoisonPoint],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Cranidos */
    Personal {
        base_stats: stats!(67 / 125 / 40 / 30 / 30 / 58),
        gender_ratio: OneToSeven,
        abilities: &[MoldBreaker, MoldBreaker],
        types: [Rock, Rock],
        forms: &[],
    },
    /* Rampardos */
    Personal {
        base_stats: stats!(97 / 165 / 60 / 65 / 50 / 58),
        gender_ratio: OneToSeven,
        abilities: &[MoldBreaker, MoldBreaker],
        types: [Rock, Rock],
        forms: &[],
    },
    /* Shieldon */
    Personal {
        base_stats: stats!(30 / 42 / 118 / 42 / 88 / 30),
        gender_ratio: OneToSeven,
        abilities: &[Sturdy, Sturdy],
        types: [Rock, Steel],
        forms: &[],
    },
    /* Bastiodon */
    Personal {
        base_stats: stats!(60 / 52 / 168 / 47 / 138 / 30),
        gender_ratio: OneToSeven,
        abilities: &[Sturdy, Sturdy],
        types: [Rock, Steel],
        forms: &[],
    },
    /* Burmy */ /* Plant */
    Personal {
        base_stats: stats!(40 / 29 / 45 / 29 / 45 / 36),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, ShedSkin],
        types: [Bug, Bug],
        forms: &[
            /* Sandy */
            Personal {
                base_stats: stats!(40 / 29 / 45 / 29 / 45 / 36),
                gender_ratio: OneToOne,
                abilities: &[ShedSkin, ShedSkin],
                types: [Bug, Bug],
                forms: &[],
            },
            /* Trash */
            Personal {
                base_stats: stats!(40 / 29 / 45 / 29 / 45 / 36),
                gender_ratio: OneToOne,
                abilities: &[ShedSkin, ShedSkin],
                types: [Bug, Bug],
                forms: &[],
            },
        ],
    },
    /* Wormadam */ /* Plant */
    Personal {
        base_stats: stats!(60 / 59 / 85 / 79 / 105 / 36),
        gender_ratio: FemaleOnly,
        abilities: &[Anticipation, Anticipation],
        types: [Bug, Grass],
        forms: &[
            /* Sandy */
            Personal {
                base_stats: stats!(60 / 79 / 105 / 59 / 85 / 36),
                gender_ratio: FemaleOnly,
                abilities: &[Anticipation, Anticipation],
                types: [Bug, Ground],
                forms: &[],
            },
            /* Trash */
            Personal {
                base_stats: stats!(60 / 69 / 95 / 69 / 95 / 36),
                gender_ratio: FemaleOnly,
                abilities: &[Anticipation, Anticipation],
                types: [Bug, Steel],
                forms: &[],
            },
        ],
    },
    /* Mothim */
    Personal {
        base_stats: stats!(70 / 94 / 50 / 94 / 50 / 66),
        gender_ratio: MaleOnly,
        abilities: &[Swarm, Swarm],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Combee */
    Personal {
        base_stats: stats!(30 / 30 / 42 / 30 / 42 / 70),
        gender_ratio: OneToSeven,
        abilities: &[HoneyGather, HoneyGather],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Vespiquen */
    Personal {
        base_stats: stats!(70 / 80 / 102 / 80 / 102 / 40),
        gender_ratio: FemaleOnly,
        abilities: &[Pressure, Pressure],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Pachirisu */
    Personal {
        base_stats: stats!(60 / 45 / 70 / 45 / 90 / 95),
        gender_ratio: OneToOne,
        abilities: &[RunAway, Pickup],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Buizel */
    Personal {
        base_stats: stats!(55 / 65 / 35 / 60 / 30 / 85),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, SwiftSwim],
        types: [Water, Water],
        forms: &[],
    },
    /* Floatzel */
    Personal {
        base_stats: stats!(85 / 105 / 55 / 85 / 50 / 115),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, SwiftSwim],
        types: [Water, Water],
        forms: &[],
    },
    /* Cherubi */
    Personal {
        base_stats: stats!(45 / 35 / 45 / 62 / 53 / 35),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, Chlorophyll],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Cherrim */ /* Overcast */
    Personal {
        base_stats: stats!(70 / 60 / 70 / 87 / 78 / 85),
        gender_ratio: OneToOne,
        abilities: &[FlowerGift, FlowerGift],
        types: [Grass, Grass],
        forms: &[/* Sunshine */ Personal {
            base_stats: stats!(70 / 60 / 70 / 87 / 78 / 85),
            gender_ratio: OneToOne,
            abilities: &[FlowerGift, FlowerGift],
            types: [Grass, Grass],
            forms: &[],
        }],
    },
    /* Shellos */ /* West */
    Personal {
        base_stats: stats!(76 / 48 / 48 / 57 / 62 / 34),
        gender_ratio: OneToOne,
        abilities: &[StickyHold, StormDrain],
        types: [Water, Water],
        forms: &[/* East */ Personal {
            base_stats: stats!(76 / 48 / 48 / 57 / 62 / 34),
            gender_ratio: OneToOne,
            abilities: &[StickyHold, StormDrain],
            types: [Water, Water],
            forms: &[],
        }],
    },
    /* Gastrodon */ /* West */
    Personal {
        base_stats: stats!(111 / 83 / 68 / 92 / 82 / 39),
        gender_ratio: OneToOne,
        abilities: &[StickyHold, StormDrain],
        types: [Water, Ground],
        forms: &[/* East */ Personal {
            base_stats: stats!(111 / 83 / 68 / 92 / 82 / 39),
            gender_ratio: OneToOne,
            abilities: &[StickyHold, StormDrain],
            types: [Water, Ground],
            forms: &[],
        }],
    },
    /* Ambipom */
    Personal {
        base_stats: stats!(75 / 100 / 66 / 60 / 66 / 115),
        gender_ratio: OneToOne,
        abilities: &[Technician, Pickup],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Drifloon */
    Personal {
        base_stats: stats!(90 / 50 / 34 / 60 / 44 / 70),
        gender_ratio: OneToOne,
        abilities: &[Aftermath, Unburden],
        types: [Ghost, Flying],
        forms: &[],
    },
    /* Drifblim */
    Personal {
        base_stats: stats!(150 / 80 / 44 / 90 / 54 / 80),
        gender_ratio: OneToOne,
        abilities: &[Aftermath, Unburden],
        types: [Ghost, Flying],
        forms: &[],
    },
    /* Buneary */
    Personal {
        base_stats: stats!(55 / 66 / 44 / 44 / 56 / 85),
        gender_ratio: OneToOne,
        abilities: &[RunAway, Klutz],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Lopunny */
    Personal {
        base_stats: stats!(65 / 76 / 84 / 54 / 96 / 105),
        gender_ratio: OneToOne,
        abilities: &[CuteCharm, Klutz],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Mismagius */
    Personal {
        base_stats: stats!(60 / 60 / 60 / 105 / 105 / 105),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Ghost, Ghost],
        forms: &[],
    },
    /* Honchkrow */
    Personal {
        base_stats: stats!(100 / 125 / 52 / 105 / 52 / 71),
        gender_ratio: OneToOne,
        abilities: &[Insomnia, SuperLuck],
        types: [Dark, Flying],
        forms: &[],
    },
    /* Glameow */
    Personal {
        base_stats: stats!(49 / 55 / 42 / 42 / 37 / 85),
        gender_ratio: ThreeToOne,
        abilities: &[Limber, OwnTempo],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Purugly */
    Personal {
        base_stats: stats!(71 / 82 / 64 / 64 / 59 / 112),
        gender_ratio: ThreeToOne,
        abilities: &[ThickFat, OwnTempo],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Chingling */
    Personal {
        base_stats: stats!(45 / 30 / 50 / 65 / 50 / 45),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Stunky */
    Personal {
        base_stats: stats!(63 / 63 / 47 / 41 / 41 / 74),
        gender_ratio: OneToOne,
        abilities: &[Stench, Aftermath],
        types: [Poison, Dark],
        forms: &[],
    },
    /* Skuntank */
    Personal {
        base_stats: stats!(103 / 93 / 67 / 71 / 61 / 84),
        gender_ratio: OneToOne,
        abilities: &[Stench, Aftermath],
        types: [Poison, Dark],
        forms: &[],
    },
    /* Bronzor */
    Personal {
        base_stats: stats!(57 / 24 / 86 / 24 / 86 / 23),
        gender_ratio: Genderless,
        abilities: &[Levitate, Heatproof],
        types: [Steel, Psychic],
        forms: &[],
    },
    /* Bronzong */
    Personal {
        base_stats: stats!(67 / 89 / 116 / 79 / 116 / 33),
        gender_ratio: Genderless,
        abilities: &[Levitate, Heatproof],
        types: [Steel, Psychic],
        forms: &[],
    },
    /* Bonsly */
    Personal {
        base_stats: stats!(50 / 80 / 95 / 10 / 45 / 10),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, RockHead],
        types: [Rock, Rock],
        forms: &[],
    },
    /* Mime. Jr */
    Personal {
        base_stats: stats!(20 / 25 / 45 / 70 / 90 / 60),
        gender_ratio: OneToOne,
        abilities: &[Soundproof, Filter],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Happiny */
    Personal {
        base_stats: stats!(100 / 5 / 5 / 15 / 65 / 30),
        gender_ratio: FemaleOnly,
        abilities: &[NaturalCure, SereneGrace],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Chatot */
    Personal {
        base_stats: stats!(76 / 65 / 45 / 92 / 42 / 91),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, TangledFeet],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Spiritomb */
    Personal {
        base_stats: stats!(50 / 92 / 108 / 92 / 108 / 35),
        gender_ratio: OneToOne,
        abilities: &[Pressure, Pressure],
        types: [Ghost, Dark],
        forms: &[],
    },
    /* Gible */
    Personal {
        base_stats: stats!(58 / 70 / 45 / 40 / 45 / 42),
        gender_ratio: OneToOne,
        abilities: &[SandVeil, SandVeil],
        types: [Dragon, Ground],
        forms: &[],
    },
    /* Gabite */
    Personal {
        base_stats: stats!(68 / 90 / 65 / 50 / 55 / 82),
        gender_ratio: OneToOne,
        abilities: &[SandVeil, SandVeil],
        types: [Dragon, Ground],
        forms: &[],
    },
    /* Garchomp */
    Personal {
        base_stats: stats!(108 / 130 / 95 / 80 / 85 / 102),
        gender_ratio: OneToOne,
        abilities: &[SandVeil, SandVeil],
        types: [Dragon, Ground],
        forms: &[],
    },
    /* Munchlax */
    Personal {
        base_stats: stats!(135 / 85 / 40 / 40 / 85 / 5),
        gender_ratio: OneToSeven,
        abilities: &[Pickup, ThickFat],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Riolu */
    Personal {
        base_stats: stats!(40 / 70 / 40 / 35 / 40 / 60),
        gender_ratio: OneToSeven,
        abilities: &[Steadfast, InnerFocus],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Lucario */
    Personal {
        base_stats: stats!(70 / 110 / 70 / 115 / 70 / 90),
        gender_ratio: OneToSeven,
        abilities: &[Steadfast, InnerFocus],
        types: [Fighting, Steel],
        forms: &[],
    },
    /* Hippopotas */
    Personal {
        base_stats: stats!(68 / 72 / 78 / 38 / 42 / 32),
        gender_ratio: OneToOne,
        abilities: &[SandStream, SandStream],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Hippowdon */
    Personal {
        base_stats: stats!(108 / 112 / 118 / 68 / 72 / 47),
        gender_ratio: OneToOne,
        abilities: &[SandStream, SandStream],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Skorupi */
    Personal {
        base_stats: stats!(40 / 50 / 90 / 30 / 55 / 65),
        gender_ratio: OneToOne,
        abilities: &[BattleArmor, Sniper],
        types: [Poison, Bug],
        forms: &[],
    },
    /* Drapion */
    Personal {
        base_stats: stats!(70 / 90 / 110 / 60 / 75 / 95),
        gender_ratio: OneToOne,
        abilities: &[BattleArmor, Sniper],
        types: [Poison, Dark],
        forms: &[],
    },
    /* Croagunk */
    Personal {
        base_stats: stats!(48 / 61 / 40 / 61 / 40 / 50),
        gender_ratio: OneToOne,
        abilities: &[Anticipation, DrySkin],
        types: [Poison, Fighting],
        forms: &[],
    },
    /* Toxicroak */
    Personal {
        base_stats: stats!(83 / 106 / 65 / 86 / 65 / 85),
        gender_ratio: OneToOne,
        abilities: &[Anticipation, DrySkin],
        types: [Poison, Fighting],
        forms: &[],
    },
    /* Carnivine */
    Personal {
        base_stats: stats!(74 / 100 / 72 / 90 / 72 / 46),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Finneon */
    Personal {
        base_stats: stats!(49 / 49 / 56 / 49 / 61 / 66),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, StormDrain],
        types: [Water, Water],
        forms: &[],
    },
    /* Lumineon */
    Personal {
        base_stats: stats!(69 / 69 / 76 / 69 / 86 / 91),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, StormDrain],
        types: [Water, Water],
        forms: &[],
    },
    /* Mantyke */
    Personal {
        base_stats: stats!(45 / 20 / 50 / 60 / 120 / 50),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, WaterAbsorb],
        types: [Water, Flying],
        forms: &[],
    },
    /* Snover */
    Personal {
        base_stats: stats!(60 / 62 / 50 / 62 / 60 / 40),
        gender_ratio: OneToOne,
        abilities: &[SnowWarning, SnowWarning],
        types: [Grass, Ice],
        forms: &[],
    },
    /* Abomasnow */
    Personal {
        base_stats: stats!(90 / 92 / 75 / 92 / 85 / 60),
        gender_ratio: OneToOne,
        abilities: &[SnowWarning, SnowWarning],
        types: [Grass, Ice],
        forms: &[],
    },
    /* Weavile */
    Personal {
        base_stats: stats!(70 / 120 / 65 / 45 / 85 / 125),
        gender_ratio: OneToOne,
        abilities: &[Pressure, Pressure],
        types: [Dark, Ice],
        forms: &[],
    },
    /* Magnezone */
    Personal {
        base_stats: stats!(70 / 70 / 115 / 130 / 90 / 60),
        gender_ratio: Genderless,
        abilities: &[MagnetPull, Sturdy],
        types: [Electric, Steel],
        forms: &[],
    },
    /* Lickilicky */
    Personal {
        base_stats: stats!(110 / 85 / 95 / 80 / 95 / 50),
        gender_ratio: OneToOne,
        abilities: &[OwnTempo, Oblivious],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Rhyperior */
    Personal {
        base_stats: stats!(115 / 140 / 130 / 55 / 55 / 40),
        gender_ratio: OneToOne,
        abilities: &[LightningRod, SolidRock],
        types: [Ground, Rock],
        forms: &[],
    },
    /* Tangrowth */
    Personal {
        base_stats: stats!(100 / 100 / 125 / 110 / 50 / 50),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, LeafGuard],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Electivire */
    Personal {
        base_stats: stats!(75 / 123 / 67 / 95 / 85 / 95),
        gender_ratio: OneToThree,
        abilities: &[MotorDrive, MotorDrive],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Magmortar */
    Personal {
        base_stats: stats!(75 / 95 / 67 / 125 / 95 / 83),
        gender_ratio: OneToThree,
        abilities: &[FlameBody, FlameBody],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Togekiss */
    Personal {
        base_stats: stats!(85 / 50 / 95 / 120 / 115 / 80),
        gender_ratio: OneToSeven,
        abilities: &[Hustle, SereneGrace],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Yanmega */
    Personal {
        base_stats: stats!(86 / 76 / 86 / 116 / 56 / 95),
        gender_ratio: OneToOne,
        abilities: &[SpeedBoost, TintedLens],
        types: [Bug, Flying],
        forms: &[],
    },
    /* Leafeon */
    Personal {
        base_stats: stats!(65 / 110 / 130 / 60 / 65 / 95),
        gender_ratio: OneToSeven,
        abilities: &[LeafGuard, LeafGuard],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Glaceon */
    Personal {
        base_stats: stats!(65 / 60 / 110 / 130 / 95 / 65),
        gender_ratio: OneToSeven,
        abilities: &[SnowCloak, SnowCloak],
        types: [Ice, Ice],
        forms: &[],
    },
    /* Gliscor */
    Personal {
        base_stats: stats!(75 / 95 / 125 / 45 / 75 / 95),
        gender_ratio: OneToOne,
        abilities: &[HyperCutter, SandVeil],
        types: [Ground, Flying],
        forms: &[],
    },
    /* Mamoswine */
    Personal {
        base_stats: stats!(110 / 130 / 80 / 70 / 60 / 80),
        gender_ratio: OneToOne,
        abilities: &[Oblivious, SnowCloak],
        types: [Ice, Ground],
        forms: &[],
    },
    /* Porygon Z */
    Personal {
        base_stats: stats!(85 / 80 / 70 / 135 / 75 / 90),
        gender_ratio: Genderless,
        abilities: &[Adaptability, Download],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Gallade */
    Personal {
        base_stats: stats!(68 / 125 / 65 / 65 / 115 / 80),
        gender_ratio: MaleOnly,
        abilities: &[Steadfast, Steadfast],
        types: [Psychic, Fighting],
        forms: &[],
    },
    /* Probopass */
    Personal {
        base_stats: stats!(60 / 55 / 145 / 75 / 150 / 40),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, MagnetPull],
        types: [Rock, Steel],
        forms: &[],
    },
    /* Dusknoir */
    Personal {
        base_stats: stats!(45 / 100 / 135 / 65 / 135 / 45),
        gender_ratio: OneToOne,
        abilities: &[Pressure, Pressure],
        types: [Ghost, Ghost],
        forms: &[],
    },
    /* Froslass */
    Personal {
        base_stats: stats!(70 / 80 / 70 / 80 / 70 / 110),
        gender_ratio: FemaleOnly,
        abilities: &[SnowCloak, SnowCloak],
        types: [Ice, Ghost],
        forms: &[],
    },
    /* Rotom */ /* Normal */
    Personal {
        base_stats: stats!(50 / 50 / 77 / 95 / 77 / 91),
        gender_ratio: Genderless,
        abilities: &[Levitate, Levitate],
        types: [Electric, Ghost],
        forms: &[
            /* Heat */
            Personal {
                base_stats: stats!(50 / 65 / 107 / 105 / 107 / 86),
                gender_ratio: Genderless,
                abilities: &[Levitate, Levitate],
                types: [Electric, Fire],
                forms: &[],
            },
            /* Wash */
            Personal {
                base_stats: stats!(50 / 65 / 107 / 105 / 107 / 86),
                gender_ratio: Genderless,
                abilities: &[Levitate, Levitate],
                types: [Electric, Water],
                forms: &[],
            },
            /* Frost */
            Personal {
                base_stats: stats!(50 / 65 / 107 / 105 / 107 / 86),
                gender_ratio: Genderless,
                abilities: &[Levitate, Levitate],
                types: [Electric, Ice],
                forms: &[],
            },
            /* Fan */
            Personal {
                base_stats: stats!(50 / 65 / 107 / 105 / 107 / 86),
                gender_ratio: Genderless,
                abilities: &[Levitate, Levitate],
                types: [Electric, Flying],
                forms: &[],
            },
            /* Mow */
            Personal {
                base_stats: stats!(50 / 65 / 107 / 105 / 107 / 86),
                gender_ratio: Genderless,
                abilities: &[Levitate, Levitate],
                types: [Electric, Grass],
                forms: &[],
            },
        ],
    },
    /* Uxie */
    Personal {
        base_stats: stats!(75 / 75 / 130 / 75 / 130 / 95),
        gender_ratio: Genderless,
        abilities: &[Levitate, Levitate],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Mesprit */
    Personal {
        base_stats: stats!(80 / 105 / 105 / 105 / 105 / 80),
        gender_ratio: Genderless,
        abilities: &[Levitate, Levitate],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Azelf */
    Personal {
        base_stats: stats!(75 / 125 / 70 / 125 / 70 / 115),
        gender_ratio: Genderless,
        abilities: &[Levitate, Levitate],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Dialga */
    Personal {
        base_stats: stats!(100 / 120 / 120 / 150 / 100 / 90),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Steel, Dragon],
        forms: &[],
    },
    /* Palkia */
    Personal {
        base_stats: stats!(90 / 120 / 100 / 150 / 120 / 100),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Water, Dragon],
        forms: &[],
    },
    /* Heatran */
    Personal {
        base_stats: stats!(91 / 90 / 106 / 130 / 106 / 77),
        gender_ratio: OneToOne,
        abilities: &[FlashFire, FlashFire],
        types: [Fire, Steel],
        forms: &[],
    },
    /* Regigigas */
    Personal {
        base_stats: stats!(110 / 160 / 110 / 80 / 110 / 100),
        gender_ratio: Genderless,
        abilities: &[SlowStart, SlowStart],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Giratina */ /* Altered */
    Personal {
        base_stats: stats!(150 / 100 / 120 / 100 / 120 / 90),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Ghost, Dragon],
        forms: &[/* Origin */ Personal {
            base_stats: stats!(150 / 120 / 100 / 120 / 100 / 90),
            gender_ratio: Genderless,
            abilities: &[Levitate, Levitate],
            types: [Ghost, Dragon],
            forms: &[],
        }],
    },
    /* Cresselia */
    Personal {
        base_stats: stats!(120 / 70 / 120 / 75 / 130 / 85),
        gender_ratio: FemaleOnly,
        abilities: &[Levitate, Levitate],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Phione */
    Personal {
        base_stats: stats!(80 / 80 / 80 / 80 / 80 / 80),
        gender_ratio: Genderless,
        abilities: &[Hydration, Hydration],
        types: [Water, Water],
        forms: &[],
    },
    /* Manaphy */
    Personal {
        base_stats: stats!(100 / 100 / 100 / 100 / 100 / 100),
        gender_ratio: Genderless,
        abilities: &[Hydration, Hydration],
        types: [Water, Water],
        forms: &[],
    },
    /* Darkrai */
    Personal {
        base_stats: stats!(70 / 90 / 90 / 135 / 90 / 125),
        gender_ratio: Genderless,
        abilities: &[BadDreams, BadDreams],
        types: [Dark, Dark],
        forms: &[],
    },
    /* Shaymin */ /* Land */
    Personal {
        base_stats: stats!(100 / 100 / 100 / 100 / 100 / 100),
        gender_ratio: Genderless,
        abilities: &[NaturalCure, NaturalCure],
        types: [Grass, Grass],
        forms: &[/* Sky */ Personal {
            base_stats: stats!(100 / 103 / 75 / 120 / 75 / 127),
            gender_ratio: Genderless,
            abilities: &[SereneGrace, SereneGrace],
            types: [Grass, Flying],
            forms: &[],
        }],
    },
    /* Arceus */ /* Normal */
    Personal {
        base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
        gender_ratio: Genderless,
        abilities: &[Multitype, Multitype],
        types: [Normal, Normal],
        forms: &[
            /* Fighting */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Flying */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Poison */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Ground */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Rock */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Bug */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Ghost */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Steel */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Fire */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Water */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Grass */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Electric */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Psychic */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Ice */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Dragon */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Dark */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
            /* Fairy */
            Personal {
                base_stats: stats!(120 / 120 / 120 / 120 / 120 / 120),
                gender_ratio: Genderless,
                abilities: &[Multitype, Multitype],
                types: [Normal, Normal],
                forms: &[],
            },
        ],
    },
    /* Victini */
    Personal {
        base_stats: stats!(100 / 100 / 100 / 100 / 100 / 100),
        gender_ratio: Genderless,
        abilities: &[VictoryStar, VictoryStar],
        types: [Psychic, Fire],
        forms: &[],
    },
    /* Snivy */
    Personal {
        base_stats: stats!(45 / 45 / 55 / 45 / 55 / 63),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Servine */
    Personal {
        base_stats: stats!(60 / 60 / 75 / 60 / 75 / 83),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Serperior */
    Personal {
        base_stats: stats!(75 / 75 / 95 / 75 / 95 / 113),
        gender_ratio: OneToSeven,
        abilities: &[Overgrow, Overgrow],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Tepig */
    Personal {
        base_stats: stats!(65 / 63 / 45 / 45 / 45 / 45),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Pignite */
    Personal {
        base_stats: stats!(90 / 93 / 55 / 70 / 55 / 55),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fighting],
        forms: &[],
    },
    /* Emboar */
    Personal {
        base_stats: stats!(110 / 123 / 65 / 100 / 65 / 65),
        gender_ratio: OneToSeven,
        abilities: &[Blaze, Blaze],
        types: [Fire, Fighting],
        forms: &[],
    },
    /* Oshawott */
    Personal {
        base_stats: stats!(55 / 55 / 45 / 63 / 45 / 45),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Dewott */
    Personal {
        base_stats: stats!(75 / 75 / 60 / 83 / 60 / 60),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Samurott */
    Personal {
        base_stats: stats!(95 / 100 / 85 / 108 / 70 / 70),
        gender_ratio: OneToSeven,
        abilities: &[Torrent, Torrent],
        types: [Water, Water],
        forms: &[],
    },
    /* Patrat */
    Personal {
        base_stats: stats!(45 / 55 / 39 / 35 / 39 / 42),
        gender_ratio: OneToOne,
        abilities: &[RunAway, KeenEye],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Watchog */
    Personal {
        base_stats: stats!(60 / 85 / 69 / 60 / 69 / 77),
        gender_ratio: OneToOne,
        abilities: &[Illuminate, KeenEye],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Lillipup */
    Personal {
        base_stats: stats!(45 / 60 / 45 / 25 / 45 / 55),
        gender_ratio: OneToOne,
        abilities: &[VitalSpirit, Pickup],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Herdier */
    Personal {
        base_stats: stats!(65 / 80 / 65 / 35 / 65 / 60),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, SandRush],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Stoutland */
    Personal {
        base_stats: stats!(85 / 100 / 90 / 45 / 90 / 80),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, SandRush],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Purrloin */
    Personal {
        base_stats: stats!(41 / 50 / 37 / 50 / 37 / 66),
        gender_ratio: OneToOne,
        abilities: &[Limber, Unburden],
        types: [Dark, Dark],
        forms: &[],
    },
    /* Liepard */
    Personal {
        base_stats: stats!(64 / 88 / 50 / 88 / 50 / 106),
        gender_ratio: OneToOne,
        abilities: &[Limber, Unburden],
        types: [Dark, Dark],
        forms: &[],
    },
    /* Pansage */
    Personal {
        base_stats: stats!(50 / 53 / 48 / 53 / 48 / 64),
        gender_ratio: OneToSeven,
        abilities: &[Gluttony, Gluttony],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Simisage */
    Personal {
        base_stats: stats!(75 / 98 / 63 / 98 / 63 / 101),
        gender_ratio: OneToSeven,
        abilities: &[Gluttony, Gluttony],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Pansear */
    Personal {
        base_stats: stats!(50 / 53 / 48 / 53 / 48 / 64),
        gender_ratio: OneToSeven,
        abilities: &[Gluttony, Gluttony],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Simisear */
    Personal {
        base_stats: stats!(75 / 98 / 63 / 98 / 63 / 101),
        gender_ratio: OneToSeven,
        abilities: &[Gluttony, Gluttony],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Panpour */
    Personal {
        base_stats: stats!(50 / 53 / 48 / 53 / 48 / 64),
        gender_ratio: OneToSeven,
        abilities: &[Gluttony, Gluttony],
        types: [Water, Water],
        forms: &[],
    },
    /* Simipour */
    Personal {
        base_stats: stats!(75 / 98 / 63 / 98 / 63 / 101),
        gender_ratio: OneToSeven,
        abilities: &[Gluttony, Gluttony],
        types: [Water, Water],
        forms: &[],
    },
    /* Munna */
    Personal {
        base_stats: stats!(76 / 25 / 45 / 67 / 55 / 24),
        gender_ratio: OneToOne,
        abilities: &[Forewarn, Synchronize],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Musharna */
    Personal {
        base_stats: stats!(116 / 55 / 85 / 107 / 95 / 29),
        gender_ratio: OneToOne,
        abilities: &[Forewarn, Synchronize],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Pidove */
    Personal {
        base_stats: stats!(50 / 55 / 50 / 36 / 30 / 43),
        gender_ratio: OneToOne,
        abilities: &[BigPecks, SuperLuck],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Tranquill */
    Personal {
        base_stats: stats!(62 / 77 / 62 / 50 / 42 / 65),
        gender_ratio: OneToOne,
        abilities: &[BigPecks, SuperLuck],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Unfezant */
    Personal {
        base_stats: stats!(80 / 105 / 80 / 65 / 55 / 93),
        gender_ratio: OneToOne,
        abilities: &[BigPecks, SuperLuck],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Blitzle */
    Personal {
        base_stats: stats!(45 / 60 / 32 / 50 / 32 / 76),
        gender_ratio: OneToOne,
        abilities: &[LightningRod, MotorDrive],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Zebstrika */
    Personal {
        base_stats: stats!(75 / 100 / 63 / 80 / 63 / 116),
        gender_ratio: OneToOne,
        abilities: &[LightningRod, MotorDrive],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Roggenrola */
    Personal {
        base_stats: stats!(55 / 75 / 85 / 25 / 25 / 15),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, Sturdy],
        types: [Rock, Rock],
        forms: &[],
    },
    /* Boldore */
    Personal {
        base_stats: stats!(70 / 105 / 105 / 50 / 40 / 20),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, Sturdy],
        types: [Rock, Rock],
        forms: &[],
    },
    /* Gigalith */
    Personal {
        base_stats: stats!(85 / 135 / 130 / 60 / 70 / 25),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, Sturdy],
        types: [Rock, Rock],
        forms: &[],
    },
    /* Woobat */
    Personal {
        base_stats: stats!(55 / 45 / 43 / 55 / 43 / 72),
        gender_ratio: OneToOne,
        abilities: &[Unaware, Klutz],
        types: [Psychic, Flying],
        forms: &[],
    },
    /* Swoobat */
    Personal {
        base_stats: stats!(67 / 57 / 55 / 77 / 55 / 114),
        gender_ratio: OneToOne,
        abilities: &[Unaware, Klutz],
        types: [Psychic, Flying],
        forms: &[],
    },
    /* Drilbur */
    Personal {
        base_stats: stats!(60 / 85 / 40 / 30 / 45 / 68),
        gender_ratio: OneToOne,
        abilities: &[SandRush, SandForce],
        types: [Ground, Ground],
        forms: &[],
    },
    /* Excadrill */
    Personal {
        base_stats: stats!(110 / 135 / 60 / 50 / 65 / 88),
        gender_ratio: OneToOne,
        abilities: &[SandRush, SandForce],
        types: [Ground, Steel],
        forms: &[],
    },
    /* Audino */
    Personal {
        base_stats: stats!(103 / 60 / 86 / 60 / 86 / 50),
        gender_ratio: OneToOne,
        abilities: &[Healer, Regenerator],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Timburr */
    Personal {
        base_stats: stats!(75 / 80 / 55 / 25 / 35 / 35),
        gender_ratio: OneToThree,
        abilities: &[Guts, SheerForce],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Gurdurr */
    Personal {
        base_stats: stats!(85 / 105 / 85 / 40 / 50 / 40),
        gender_ratio: OneToThree,
        abilities: &[Guts, SheerForce],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Conkeldurr */
    Personal {
        base_stats: stats!(105 / 140 / 95 / 55 / 65 / 45),
        gender_ratio: OneToThree,
        abilities: &[Guts, SheerForce],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Tympole */
    Personal {
        base_stats: stats!(50 / 50 / 40 / 50 / 40 / 64),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, Hydration],
        types: [Water, Water],
        forms: &[],
    },
    /* Palpitoad */
    Personal {
        base_stats: stats!(75 / 65 / 55 / 65 / 55 / 69),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, Hydration],
        types: [Water, Ground],
        forms: &[],
    },
    /* Seismitoad */
    Personal {
        base_stats: stats!(105 / 85 / 75 / 85 / 75 / 74),
        gender_ratio: OneToOne,
        abilities: &[SwiftSwim, PoisonTouch],
        types: [Water, Ground],
        forms: &[],
    },
    /* Throh */
    Personal {
        base_stats: stats!(120 / 100 / 85 / 30 / 85 / 45),
        gender_ratio: MaleOnly,
        abilities: &[Guts, InnerFocus],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Sawk */
    Personal {
        base_stats: stats!(75 / 125 / 75 / 30 / 75 / 85),
        gender_ratio: MaleOnly,
        abilities: &[Sturdy, InnerFocus],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Sewaddle */
    Personal {
        base_stats: stats!(45 / 53 / 70 / 40 / 60 / 42),
        gender_ratio: OneToOne,
        abilities: &[Swarm, Chlorophyll],
        types: [Bug, Grass],
        forms: &[],
    },
    /* Swadloon */
    Personal {
        base_stats: stats!(55 / 63 / 90 / 50 / 80 / 42),
        gender_ratio: OneToOne,
        abilities: &[LeafGuard, Chlorophyll],
        types: [Bug, Grass],
        forms: &[],
    },
    /* Leavanny */
    Personal {
        base_stats: stats!(75 / 103 / 80 / 70 / 70 / 92),
        gender_ratio: OneToOne,
        abilities: &[Swarm, Chlorophyll],
        types: [Bug, Grass],
        forms: &[],
    },
    /* Venipede */
    Personal {
        base_stats: stats!(30 / 45 / 59 / 30 / 39 / 57),
        gender_ratio: OneToOne,
        abilities: &[PoisonPoint, Swarm],
        types: [Bug, Poison],
        forms: &[],
    },
    /* Whirlipede */
    Personal {
        base_stats: stats!(40 / 55 / 99 / 40 / 79 / 47),
        gender_ratio: OneToOne,
        abilities: &[PoisonPoint, Swarm],
        types: [Bug, Poison],
        forms: &[],
    },
    /* Scolipede */
    Personal {
        base_stats: stats!(60 / 90 / 89 / 55 / 69 / 112),
        gender_ratio: OneToOne,
        abilities: &[PoisonPoint, Swarm],
        types: [Bug, Poison],
        forms: &[],
    },
    /* Cottonee */
    Personal {
        base_stats: stats!(40 / 27 / 60 / 37 / 50 / 66),
        gender_ratio: OneToOne,
        abilities: &[Prankster, Infiltrator],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Whimsicott */
    Personal {
        base_stats: stats!(60 / 67 / 85 / 77 / 75 / 116),
        gender_ratio: OneToOne,
        abilities: &[Prankster, Infiltrator],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Petilil */
    Personal {
        base_stats: stats!(45 / 35 / 50 / 70 / 50 / 30),
        gender_ratio: FemaleOnly,
        abilities: &[Chlorophyll, OwnTempo],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Lilligant */
    Personal {
        base_stats: stats!(70 / 60 / 75 / 110 / 75 / 90),
        gender_ratio: FemaleOnly,
        abilities: &[Chlorophyll, OwnTempo],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Basculin */ /* Red-Striped */
    Personal {
        base_stats: stats!(70 / 92 / 65 / 80 / 55 / 98),
        gender_ratio: OneToOne,
        abilities: &[Reckless, Adaptability],
        types: [Water, Water],
        forms: &[/* Blue-Striped */ Personal {
            base_stats: stats!(70 / 92 / 65 / 80 / 55 / 98),
            gender_ratio: OneToOne,
            abilities: &[RockHead, Adaptability],
            types: [Water, Water],
            forms: &[],
        }],
    },
    /* Sandile */
    Personal {
        base_stats: stats!(50 / 72 / 35 / 35 / 35 / 65),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, Moxie],
        types: [Ground, Dark],
        forms: &[],
    },
    /* Krokorok */
    Personal {
        base_stats: stats!(60 / 82 / 45 / 45 / 45 / 74),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, Moxie],
        types: [Ground, Dark],
        forms: &[],
    },
    /* Krookodile */
    Personal {
        base_stats: stats!(95 / 117 / 70 / 65 / 70 / 92),
        gender_ratio: OneToOne,
        abilities: &[Intimidate, Moxie],
        types: [Ground, Dark],
        forms: &[],
    },
    /* Darumaka */
    Personal {
        base_stats: stats!(70 / 90 / 45 / 15 / 45 / 50),
        gender_ratio: OneToOne,
        abilities: &[Hustle, Hustle],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Darmanitan */ /* Standard Mode */
    Personal {
        base_stats: stats!(105 / 140 / 55 / 30 / 55 / 95),
        gender_ratio: OneToOne,
        abilities: &[SheerForce, SheerForce],
        types: [Fire, Fire],
        forms: &[/* Zen Mode */ Personal {
            base_stats: stats!(105 / 30 / 105 / 140 / 105 / 55),
            gender_ratio: OneToOne,
            abilities: &[SheerForce, SheerForce],
            types: [Fire, Psychic],
            forms: &[],
        }],
    },
    /* Maractus */
    Personal {
        base_stats: stats!(75 / 86 / 67 / 106 / 67 / 60),
        gender_ratio: OneToOne,
        abilities: &[WaterAbsorb, Chlorophyll],
        types: [Grass, Grass],
        forms: &[],
    },
    /* Dwebble */
    Personal {
        base_stats: stats!(50 / 65 / 85 / 35 / 35 / 55),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, ShellArmor],
        types: [Bug, Rock],
        forms: &[],
    },
    /* Crustle */
    Personal {
        base_stats: stats!(70 / 95 / 125 / 65 / 75 / 45),
        gender_ratio: OneToOne,
        abilities: &[Sturdy, ShellArmor],
        types: [Bug, Rock],
        forms: &[],
    },
    /* Scraggy */
    Personal {
        base_stats: stats!(50 / 75 / 70 / 35 / 70 / 48),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, Moxie],
        types: [Dark, Fighting],
        forms: &[],
    },
    /* Scrafty */
    Personal {
        base_stats: stats!(65 / 90 / 115 / 45 / 115 / 58),
        gender_ratio: OneToOne,
        abilities: &[ShedSkin, Moxie],
        types: [Dark, Fighting],
        forms: &[],
    },
    /* Sigilyph */
    Personal {
        base_stats: stats!(72 / 58 / 80 / 103 / 80 / 97),
        gender_ratio: OneToOne,
        abilities: &[WonderSkin, MagicGuard],
        types: [Psychic, Flying],
        forms: &[],
    },
    /* Yamask */
    Personal {
        base_stats: stats!(38 / 30 / 85 / 55 / 65 / 30),
        gender_ratio: OneToOne,
        abilities: &[Mummy, Mummy],
        types: [Ghost, Ghost],
        forms: &[],
    },
    /* Cofagrigus */
    Personal {
        base_stats: stats!(58 / 50 / 145 / 95 / 105 / 30),
        gender_ratio: OneToOne,
        abilities: &[Mummy, Mummy],
        types: [Ghost, Ghost],
        forms: &[],
    },
    /* Tirtouga */
    Personal {
        base_stats: stats!(54 / 78 / 103 / 53 / 45 / 22),
        gender_ratio: OneToSeven,
        abilities: &[SolidRock, Sturdy],
        types: [Water, Rock],
        forms: &[],
    },
    /* Carracosta */
    Personal {
        base_stats: stats!(74 / 108 / 133 / 83 / 65 / 32),
        gender_ratio: OneToSeven,
        abilities: &[SolidRock, Sturdy],
        types: [Water, Rock],
        forms: &[],
    },
    /* Archen */
    Personal {
        base_stats: stats!(55 / 112 / 45 / 74 / 45 / 70),
        gender_ratio: OneToSeven,
        abilities: &[Defeatist, Defeatist],
        types: [Rock, Flying],
        forms: &[],
    },
    /* Archeops */
    Personal {
        base_stats: stats!(75 / 140 / 65 / 112 / 65 / 110),
        gender_ratio: OneToSeven,
        abilities: &[Defeatist, Defeatist],
        types: [Rock, Flying],
        forms: &[],
    },
    /* Trubbish */
    Personal {
        base_stats: stats!(50 / 50 / 62 / 40 / 62 / 65),
        gender_ratio: OneToOne,
        abilities: &[Stench, StickyHold],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Garbodor */
    Personal {
        base_stats: stats!(80 / 95 / 82 / 60 / 82 / 75),
        gender_ratio: OneToOne,
        abilities: &[Stench, WeakArmor],
        types: [Poison, Poison],
        forms: &[],
    },
    /* Zorua */
    Personal {
        base_stats: stats!(40 / 65 / 40 / 80 / 40 / 65),
        gender_ratio: OneToSeven,
        abilities: &[Illusion, Illusion],
        types: [Dark, Dark],
        forms: &[],
    },
    /* Zoroark */
    Personal {
        base_stats: stats!(60 / 105 / 60 / 120 / 60 / 105),
        gender_ratio: OneToSeven,
        abilities: &[Illusion, Illusion],
        types: [Dark, Dark],
        forms: &[],
    },
    /* Minccino */
    Personal {
        base_stats: stats!(55 / 50 / 40 / 40 / 40 / 75),
        gender_ratio: ThreeToOne,
        abilities: &[CuteCharm, Technician],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Cinccino */
    Personal {
        base_stats: stats!(75 / 95 / 60 / 65 / 60 / 115),
        gender_ratio: ThreeToOne,
        abilities: &[CuteCharm, Technician],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Gothita */
    Personal {
        base_stats: stats!(45 / 30 / 50 / 55 / 65 / 45),
        gender_ratio: ThreeToOne,
        abilities: &[Frisk, Frisk],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Gothorita */
    Personal {
        base_stats: stats!(60 / 45 / 70 / 75 / 85 / 55),
        gender_ratio: ThreeToOne,
        abilities: &[Frisk, Frisk],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Gothitelle */
    Personal {
        base_stats: stats!(70 / 55 / 95 / 95 / 110 / 65),
        gender_ratio: ThreeToOne,
        abilities: &[Frisk, Frisk],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Solosis */
    Personal {
        base_stats: stats!(45 / 30 / 40 / 105 / 50 / 20),
        gender_ratio: OneToOne,
        abilities: &[Overcoat, MagicGuard],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Duosion */
    Personal {
        base_stats: stats!(65 / 40 / 50 / 125 / 60 / 30),
        gender_ratio: OneToOne,
        abilities: &[Overcoat, MagicGuard],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Reuniclus */
    Personal {
        base_stats: stats!(110 / 65 / 75 / 125 / 85 / 30),
        gender_ratio: OneToOne,
        abilities: &[Overcoat, MagicGuard],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Ducklett */
    Personal {
        base_stats: stats!(62 / 44 / 50 / 44 / 50 / 55),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, BigPecks],
        types: [Water, Flying],
        forms: &[],
    },
    /* Swanna */
    Personal {
        base_stats: stats!(75 / 87 / 63 / 87 / 63 / 98),
        gender_ratio: OneToOne,
        abilities: &[KeenEye, BigPecks],
        types: [Water, Flying],
        forms: &[],
    },
    /* Vanillite */
    Personal {
        base_stats: stats!(36 / 50 / 50 / 65 / 60 / 44),
        gender_ratio: OneToOne,
        abilities: &[IceBody, IceBody],
        types: [Ice, Ice],
        forms: &[],
    },
    /* Vanillish */
    Personal {
        base_stats: stats!(51 / 65 / 65 / 80 / 75 / 59),
        gender_ratio: OneToOne,
        abilities: &[IceBody, IceBody],
        types: [Ice, Ice],
        forms: &[],
    },
    /* Vanilluxe */
    Personal {
        base_stats: stats!(71 / 95 / 85 / 110 / 95 / 79),
        gender_ratio: OneToOne,
        abilities: &[IceBody, IceBody],
        types: [Ice, Ice],
        forms: &[],
    },
    /* Deerling */ /* Spring */
    Personal {
        base_stats: stats!(60 / 60 / 50 / 40 / 50 / 75),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, SapSipper],
        types: [Normal, Grass],
        forms: &[
            /* Summer */
            Personal {
                base_stats: stats!(60 / 60 / 50 / 40 / 50 / 75),
                gender_ratio: OneToOne,
                abilities: &[Chlorophyll, SapSipper],
                types: [Normal, Grass],
                forms: &[],
            },
            /* Autumn */
            Personal {
                base_stats: stats!(60 / 60 / 50 / 40 / 50 / 75),
                gender_ratio: OneToOne,
                abilities: &[Chlorophyll, SapSipper],
                types: [Normal, Grass],
                forms: &[],
            },
            /* Winter */
            Personal {
                base_stats: stats!(60 / 60 / 50 / 40 / 50 / 75),
                gender_ratio: OneToOne,
                abilities: &[Chlorophyll, SapSipper],
                types: [Normal, Grass],
                forms: &[],
            },
        ],
    },
    /* Sawsbuck */ /* Spring */
    Personal {
        base_stats: stats!(80 / 100 / 70 / 60 / 70 / 95),
        gender_ratio: OneToOne,
        abilities: &[Chlorophyll, SapSipper],
        types: [Normal, Grass],
        forms: &[
            /* Summer */
            Personal {
                base_stats: stats!(80 / 100 / 70 / 60 / 70 / 95),
                gender_ratio: OneToOne,
                abilities: &[Chlorophyll, SapSipper],
                types: [Normal, Grass],
                forms: &[],
            },
            /* Autumn */
            Personal {
                base_stats: stats!(80 / 100 / 70 / 60 / 70 / 95),
                gender_ratio: OneToOne,
                abilities: &[Chlorophyll, SapSipper],
                types: [Normal, Grass],
                forms: &[],
            },
            /* Winter */
            Personal {
                base_stats: stats!(80 / 100 / 70 / 60 / 70 / 95),
                gender_ratio: OneToOne,
                abilities: &[Chlorophyll, SapSipper],
                types: [Normal, Grass],
                forms: &[],
            },
        ],
    },
    /* Emolga */
    Personal {
        base_stats: stats!(55 / 75 / 60 / 75 / 60 / 103),
        gender_ratio: OneToOne,
        abilities: &[Static, Static],
        types: [Electric, Flying],
        forms: &[],
    },
    /* Karrablast */
    Personal {
        base_stats: stats!(50 / 75 / 45 / 40 / 45 / 60),
        gender_ratio: OneToOne,
        abilities: &[Swarm, ShedSkin],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Escavalier */
    Personal {
        base_stats: stats!(70 / 135 / 105 / 60 / 105 / 20),
        gender_ratio: OneToOne,
        abilities: &[Swarm, ShellArmor],
        types: [Bug, Steel],
        forms: &[],
    },
    /* Foongus */
    Personal {
        base_stats: stats!(69 / 55 / 45 / 55 / 55 / 15),
        gender_ratio: OneToOne,
        abilities: &[EffectSpore, EffectSpore],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Amoonguss */
    Personal {
        base_stats: stats!(114 / 85 / 70 / 85 / 80 / 30),
        gender_ratio: OneToOne,
        abilities: &[EffectSpore, EffectSpore],
        types: [Grass, Poison],
        forms: &[],
    },
    /* Frillish */
    Personal {
        base_stats: stats!(55 / 40 / 50 / 65 / 85 / 40),
        gender_ratio: OneToOne,
        abilities: &[WaterAbsorb, CursedBody],
        types: [Water, Ghost],
        forms: &[],
    },
    /* Jellicent */
    Personal {
        base_stats: stats!(100 / 60 / 70 / 85 / 105 / 60),
        gender_ratio: OneToOne,
        abilities: &[WaterAbsorb, CursedBody],
        types: [Water, Ghost],
        forms: &[],
    },
    /* Alomomola */
    Personal {
        base_stats: stats!(165 / 75 / 80 / 40 / 45 / 65),
        gender_ratio: OneToOne,
        abilities: &[Healer, Hydration],
        types: [Water, Water],
        forms: &[],
    },
    /* Joltik */
    Personal {
        base_stats: stats!(50 / 47 / 50 / 57 / 50 / 65),
        gender_ratio: OneToOne,
        abilities: &[CompoundEyes, Unnerve],
        types: [Bug, Electric],
        forms: &[],
    },
    /* Galvantula */
    Personal {
        base_stats: stats!(70 / 77 / 60 / 97 / 60 / 108),
        gender_ratio: OneToOne,
        abilities: &[CompoundEyes, Unnerve],
        types: [Bug, Electric],
        forms: &[],
    },
    /* Ferroseed */
    Personal {
        base_stats: stats!(44 / 50 / 91 / 24 / 86 / 10),
        gender_ratio: OneToOne,
        abilities: &[IronBarbs, IronBarbs],
        types: [Grass, Steel],
        forms: &[],
    },
    /* Ferrothorn */
    Personal {
        base_stats: stats!(74 / 94 / 131 / 54 / 116 / 20),
        gender_ratio: OneToOne,
        abilities: &[IronBarbs, IronBarbs],
        types: [Grass, Steel],
        forms: &[],
    },
    /* Klink */
    Personal {
        base_stats: stats!(40 / 55 / 70 / 45 / 60 / 30),
        gender_ratio: Genderless,
        abilities: &[Plus, Minus],
        types: [Steel, Steel],
        forms: &[],
    },
    /* Klang */
    Personal {
        base_stats: stats!(60 / 80 / 95 / 70 / 85 / 50),
        gender_ratio: Genderless,
        abilities: &[Plus, Minus],
        types: [Steel, Steel],
        forms: &[],
    },
    /* Klinklang */
    Personal {
        base_stats: stats!(60 / 100 / 115 / 70 / 85 / 90),
        gender_ratio: Genderless,
        abilities: &[Plus, Minus],
        types: [Steel, Steel],
        forms: &[],
    },
    /* Tynamo */
    Personal {
        base_stats: stats!(35 / 55 / 40 / 45 / 40 / 60),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Eelektrik */
    Personal {
        base_stats: stats!(65 / 85 / 70 / 75 / 70 / 40),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Eelektross */
    Personal {
        base_stats: stats!(85 / 115 / 80 / 105 / 80 / 50),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Electric, Electric],
        forms: &[],
    },
    /* Elgyem */
    Personal {
        base_stats: stats!(55 / 55 / 55 / 85 / 55 / 30),
        gender_ratio: OneToOne,
        abilities: &[Telepathy, Synchronize],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Beheeyem */
    Personal {
        base_stats: stats!(75 / 75 / 75 / 125 / 95 / 40),
        gender_ratio: OneToOne,
        abilities: &[Telepathy, Synchronize],
        types: [Psychic, Psychic],
        forms: &[],
    },
    /* Litwick */
    Personal {
        base_stats: stats!(50 / 30 / 55 / 65 / 55 / 20),
        gender_ratio: OneToOne,
        abilities: &[FlashFire, FlameBody],
        types: [Ghost, Fire],
        forms: &[],
    },
    /* Lampent */
    Personal {
        base_stats: stats!(60 / 40 / 60 / 95 / 60 / 55),
        gender_ratio: OneToOne,
        abilities: &[FlashFire, FlameBody],
        types: [Ghost, Fire],
        forms: &[],
    },
    /* Chandelure */
    Personal {
        base_stats: stats!(60 / 55 / 90 / 145 / 90 / 80),
        gender_ratio: OneToOne,
        abilities: &[FlashFire, FlameBody],
        types: [Ghost, Fire],
        forms: &[],
    },
    /* Axew */
    Personal {
        base_stats: stats!(46 / 87 / 60 / 30 / 40 / 57),
        gender_ratio: OneToOne,
        abilities: &[Rivalry, MoldBreaker],
        types: [Dragon, Dragon],
        forms: &[],
    },
    /* Fraxure */
    Personal {
        base_stats: stats!(66 / 117 / 70 / 40 / 50 / 67),
        gender_ratio: OneToOne,
        abilities: &[Rivalry, MoldBreaker],
        types: [Dragon, Dragon],
        forms: &[],
    },
    /* Haxorus */
    Personal {
        base_stats: stats!(76 / 147 / 90 / 60 / 70 / 97),
        gender_ratio: OneToOne,
        abilities: &[Rivalry, MoldBreaker],
        types: [Dragon, Dragon],
        forms: &[],
    },
    /* Cubchoo */
    Personal {
        base_stats: stats!(55 / 70 / 40 / 60 / 40 / 40),
        gender_ratio: OneToOne,
        abilities: &[SnowCloak, SnowCloak],
        types: [Ice, Ice],
        forms: &[],
    },
    /* Beartic */
    Personal {
        base_stats: stats!(95 / 110 / 80 / 70 / 80 / 50),
        gender_ratio: OneToOne,
        abilities: &[SnowCloak, SnowCloak],
        types: [Ice, Ice],
        forms: &[],
    },
    /* Cryogonal */
    Personal {
        base_stats: stats!(70 / 50 / 30 / 95 / 135 / 105),
        gender_ratio: Genderless,
        abilities: &[Levitate, Levitate],
        types: [Ice, Ice],
        forms: &[],
    },
    /* Shelmet */
    Personal {
        base_stats: stats!(50 / 40 / 85 / 40 / 65 / 25),
        gender_ratio: OneToOne,
        abilities: &[Hydration, ShellArmor],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Accelgor */
    Personal {
        base_stats: stats!(80 / 70 / 40 / 100 / 60 / 145),
        gender_ratio: OneToOne,
        abilities: &[Hydration, StickyHold],
        types: [Bug, Bug],
        forms: &[],
    },
    /* Stunfisk */
    Personal {
        base_stats: stats!(109 / 66 / 84 / 81 / 99 / 32),
        gender_ratio: OneToOne,
        abilities: &[Static, Limber],
        types: [Ground, Electric],
        forms: &[],
    },
    /* Mienfoo */
    Personal {
        base_stats: stats!(45 / 85 / 50 / 55 / 50 / 65),
        gender_ratio: OneToOne,
        abilities: &[InnerFocus, Regenerator],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Mienshao */
    Personal {
        base_stats: stats!(65 / 125 / 60 / 95 / 60 / 105),
        gender_ratio: OneToOne,
        abilities: &[InnerFocus, Regenerator],
        types: [Fighting, Fighting],
        forms: &[],
    },
    /* Druddigon */
    Personal {
        base_stats: stats!(77 / 120 / 90 / 60 / 90 / 48),
        gender_ratio: OneToOne,
        abilities: &[RoughSkin, SheerForce],
        types: [Dragon, Dragon],
        forms: &[],
    },
    /* Golett */
    Personal {
        base_stats: stats!(59 / 74 / 50 / 35 / 50 / 35),
        gender_ratio: Genderless,
        abilities: &[IronFist, Klutz],
        types: [Ground, Ghost],
        forms: &[],
    },
    /* Golurk */
    Personal {
        base_stats: stats!(89 / 124 / 80 / 55 / 80 / 55),
        gender_ratio: Genderless,
        abilities: &[IronFist, Klutz],
        types: [Ground, Ghost],
        forms: &[],
    },
    /* Pawniard */
    Personal {
        base_stats: stats!(45 / 85 / 70 / 40 / 40 / 60),
        gender_ratio: OneToOne,
        abilities: &[Defiant, InnerFocus],
        types: [Dark, Steel],
        forms: &[],
    },
    /* Bisharp */
    Personal {
        base_stats: stats!(65 / 125 / 100 / 60 / 70 / 70),
        gender_ratio: OneToOne,
        abilities: &[Defiant, InnerFocus],
        types: [Dark, Steel],
        forms: &[],
    },
    /* Bouffalant */
    Personal {
        base_stats: stats!(95 / 110 / 95 / 40 / 95 / 55),
        gender_ratio: OneToOne,
        abilities: &[Reckless, SapSipper],
        types: [Normal, Normal],
        forms: &[],
    },
    /* Rufflet */
    Personal {
        base_stats: stats!(70 / 83 / 50 / 37 / 50 / 60),
        gender_ratio: MaleOnly,
        abilities: &[KeenEye, SheerForce],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Braviary */
    Personal {
        base_stats: stats!(100 / 123 / 75 / 57 / 75 / 80),
        gender_ratio: MaleOnly,
        abilities: &[KeenEye, SheerForce],
        types: [Normal, Flying],
        forms: &[],
    },
    /* Vullaby */
    Personal {
        base_stats: stats!(70 / 55 / 75 / 45 / 65 / 60),
        gender_ratio: FemaleOnly,
        abilities: &[BigPecks, Overcoat],
        types: [Dark, Flying],
        forms: &[],
    },
    /* Mandibuzz */
    Personal {
        base_stats: stats!(110 / 65 / 105 / 55 / 95 / 80),
        gender_ratio: FemaleOnly,
        abilities: &[BigPecks, Overcoat],
        types: [Dark, Flying],
        forms: &[],
    },
    /* Heatmor */
    Personal {
        base_stats: stats!(85 / 97 / 66 / 105 / 66 / 65),
        gender_ratio: OneToOne,
        abilities: &[Gluttony, FlashFire],
        types: [Fire, Fire],
        forms: &[],
    },
    /* Durant */
    Personal {
        base_stats: stats!(58 / 109 / 112 / 48 / 48 / 109),
        gender_ratio: OneToOne,
        abilities: &[Swarm, Hustle],
        types: [Bug, Steel],
        forms: &[],
    },
    /* Deino */
    Personal {
        base_stats: stats!(52 / 65 / 50 / 45 / 50 / 38),
        gender_ratio: OneToOne,
        abilities: &[Hustle, Hustle],
        types: [Dark, Dragon],
        forms: &[],
    },
    /* Zweilous */
    Personal {
        base_stats: stats!(72 / 85 / 70 / 65 / 70 / 58),
        gender_ratio: OneToOne,
        abilities: &[Hustle, Hustle],
        types: [Dark, Dragon],
        forms: &[],
    },
    /* Hydreigon */
    Personal {
        base_stats: stats!(92 / 105 / 90 / 125 / 90 / 98),
        gender_ratio: OneToOne,
        abilities: &[Levitate, Levitate],
        types: [Dark, Dragon],
        forms: &[],
    },
    /* Larvesta */
    Personal {
        base_stats: stats!(55 / 85 / 55 / 50 / 55 / 60),
        gender_ratio: OneToOne,
        abilities: &[FlameBody, FlameBody],
        types: [Bug, Fire],
        forms: &[],
    },
    /* Volcarona */
    Personal {
        base_stats: stats!(85 / 60 / 65 / 135 / 105 / 100),
        gender_ratio: OneToOne,
        abilities: &[FlameBody, FlameBody],
        types: [Bug, Fire],
        forms: &[],
    },
    /* Cobalion */
    Personal {
        base_stats: stats!(91 / 90 / 129 / 90 / 72 / 108),
        gender_ratio: Genderless,
        abilities: &[Justified, Justified],
        types: [Steel, Fighting],
        forms: &[],
    },
    /* Terrakion */
    Personal {
        base_stats: stats!(91 / 129 / 90 / 72 / 90 / 108),
        gender_ratio: Genderless,
        abilities: &[Justified, Justified],
        types: [Rock, Fighting],
        forms: &[],
    },
    /* Virizion */
    Personal {
        base_stats: stats!(91 / 90 / 72 / 90 / 129 / 108),
        gender_ratio: Genderless,
        abilities: &[Justified, Justified],
        types: [Grass, Fighting],
        forms: &[],
    },
    /* Tornadus */ /* Incarnate Forme */
    Personal {
        base_stats: stats!(79 / 115 / 70 / 125 / 80 / 111),
        gender_ratio: MaleOnly,
        abilities: &[Prankster, Prankster],
        types: [Flying, Flying],
        forms: &[/* Therian Forme */ Personal {
            base_stats: stats!(79 / 100 / 80 / 110 / 90 / 121),
            gender_ratio: MaleOnly,
            abilities: &[Regenerator, Regenerator],
            types: [Flying, Flying],
            forms: &[],
        }],
    },
    /* Thundurus */ /* Incarnate Forme */
    Personal {
        base_stats: stats!(79 / 115 / 70 / 125 / 80 / 111),
        gender_ratio: MaleOnly,
        abilities: &[Prankster, Prankster],
        types: [Electric, Flying],
        forms: &[/* Therian Forme */ Personal {
            base_stats: stats!(79 / 105 / 70 / 145 / 80 / 101),
            gender_ratio: MaleOnly,
            abilities: &[VoltAbsorb, VoltAbsorb],
            types: [Electric, Flying],
            forms: &[],
        }],
    },
    /* Reshiram */
    Personal {
        base_stats: stats!(100 / 120 / 100 / 150 / 120 / 90),
        gender_ratio: Genderless,
        abilities: &[Turboblaze, Turboblaze],
        types: [Dragon, Fire],
        forms: &[],
    },
    /* Zekrom */
    Personal {
        base_stats: stats!(100 / 150 / 120 / 120 / 100 / 90),
        gender_ratio: Genderless,
        abilities: &[Teravolt, Teravolt],
        types: [Dragon, Electric],
        forms: &[],
    },
    /* Landorus */ /* Incarnate Forme */
    Personal {
        base_stats: stats!(89 / 125 / 90 / 115 / 80 / 101),
        gender_ratio: MaleOnly,
        abilities: &[SandForce, SandForce],
        types: [Ground, Flying],
        forms: &[/* Therian Forme */ Personal {
            base_stats: stats!(89 / 145 / 90 / 105 / 80 / 91),
            gender_ratio: MaleOnly,
            abilities: &[Intimidate, Intimidate],
            types: [Ground, Flying],
            forms: &[],
        }],
    },
    /* Kyurem */ /* Normal */
    Personal {
        base_stats: stats!(125 / 130 / 90 / 130 / 90 / 95),
        gender_ratio: Genderless,
        abilities: &[Pressure, Pressure],
        types: [Dragon, Ice],
        forms: &[
            /* White */
            Personal {
                base_stats: stats!(125 / 120 / 90 / 170 / 100 / 95),
                gender_ratio: Genderless,
                abilities: &[Turboblaze, Turboblaze],
                types: [Dragon, Ice],
                forms: &[],
            },
            /* Black */
            Personal {
                base_stats: stats!(125 / 170 / 100 / 120 / 90 / 95),
                gender_ratio: Genderless,
                abilities: &[Teravolt, Teravolt],
                types: [Dragon, Ice],
                forms: &[],
            },
        ],
    },
    /* Keldeo */ /* Ordinary Form */
    Personal {
        base_stats: stats!(91 / 72 / 90 / 129 / 90 / 108),
        gender_ratio: Genderless,
        abilities: &[Justified, Justified],
        types: [Water, Fighting],
        forms: &[/* Resolute Form */ Personal {
            base_stats: stats!(91 / 72 / 90 / 129 / 90 / 108),
            gender_ratio: Genderless,
            abilities: &[Justified, Justified],
            types: [Water, Fighting],
            forms: &[],
        }],
    },
    /* Meloetta */ /* Aria Forme */
    Personal {
        base_stats: stats!(100 / 77 / 77 / 128 / 128 / 90),
        gender_ratio: Genderless,
        abilities: &[SereneGrace, SereneGrace],
        types: [Normal, Psychic],
        forms: &[/* Pirouette Forme */ Personal {
            base_stats: stats!(100 / 128 / 90 / 77 / 77 / 128),
            gender_ratio: Genderless,
            abilities: &[SereneGrace, SereneGrace],
            types: [Normal, Fighting],
            forms: &[],
        }],
    },
    /* Genesect */ /* Normal */
    Personal {
        base_stats: stats!(71 / 120 / 95 / 120 / 95 / 99),
        gender_ratio: Genderless,
        abilities: &[Download, Download],
        types: [Bug, Steel],
        forms: &[
            /* Douse */
            Personal {
                base_stats: stats!(71 / 120 / 95 / 120 / 95 / 99),
                gender_ratio: Genderless,
                abilities: &[Download, Download],
                types: [Bug, Steel],
                forms: &[],
            },
            /* Shock */
            Personal {
                base_stats: stats!(71 / 120 / 95 / 120 / 95 / 99),
                gender_ratio: Genderless,
                abilities: &[Download, Download],
                types: [Bug, Steel],
                forms: &[],
            },
            /* Burn */
            Personal {
                base_stats: stats!(71 / 120 / 95 / 120 / 95 / 99),
                gender_ratio: Genderless,
                abilities: &[Download, Download],
                types: [Bug, Steel],
                forms: &[],
            },
            /* Chill */
            Personal {
                base_stats: stats!(71 / 120 / 95 / 120 / 95 / 99),
                gender_ratio: Genderless,
                abilities: &[Download, Download],
                types: [Bug, Steel],
                forms: &[],
            },
        ],
    },
];

pub fn get_personal(species: u16, form: u16) -> &'static Personal {
    let personal = &PERSONALS.get(species as usize).unwrap_or(&PERSONALS[0]);

    if form == 0 {
        return personal;
    }

    personal.forms.get((form - 1) as usize).unwrap_or(personal)
}
