import type { Species } from "../../src/rngTools";

type POKEMON_TYPE =
  | "Normal"
  | "Fighting"
  | "Flying"
  | "Poison"
  | "Ground"
  | "Rock"
  | "Bug"
  | "Ghost"
  | "Steel"
  | "Fire"
  | "Water"
  | "Grass"
  | "Electric"
  | "Psychic"
  | "Ice"
  | "Dragon"
  | "Dark";

const gen3TypesBySpecies = {
  Bulbasaur: ["Grass", "Poison"],
  Ivysaur: ["Grass", "Poison"],
  Venusaur: ["Grass", "Poison"],
  Charmander: ["Fire"],
  Charmeleon: ["Fire"],
  Charizard: ["Fire", "Flying"],
  Squirtle: ["Water"],
  Wartortle: ["Water"],
  Blastoise: ["Water"],
  Caterpie: ["Bug"],
  Metapod: ["Bug"],
  Butterfree: ["Bug", "Flying"],
  Weedle: ["Bug", "Poison"],
  Kakuna: ["Bug", "Poison"],
  Beedrill: ["Bug", "Poison"],
  Pidgey: ["Normal", "Flying"],
  Pidgeotto: ["Normal", "Flying"],
  Pidgeot: ["Normal", "Flying"],
  Rattata: ["Normal"],
  Raticate: ["Normal"],
  Spearow: ["Normal", "Flying"],
  Fearow: ["Normal", "Flying"],
  Ekans: ["Poison"],
  Arbok: ["Poison"],
  Pikachu: ["Electric"],
  Raichu: ["Electric"],
  Sandshrew: ["Ground"],
  Sandslash: ["Ground"],
  NidoranF: ["Poison"],
  Nidorina: ["Poison"],
  Nidoqueen: ["Poison", "Ground"],
  NidoranM: ["Poison"],
  Nidorino: ["Poison"],
  Nidoking: ["Poison", "Ground"],
  Clefairy: ["Normal"],
  Clefable: ["Normal"],
  Vulpix: ["Fire"],
  Ninetales: ["Fire"],
  Jigglypuff: ["Normal"],
  Wigglytuff: ["Normal"],
  Zubat: ["Poison", "Flying"],
  Golbat: ["Poison", "Flying"],
  Oddish: ["Grass", "Poison"],
  Gloom: ["Grass", "Poison"],
  Vileplume: ["Grass", "Poison"],
  Paras: ["Bug", "Grass"],
  Parasect: ["Bug", "Grass"],
  Venonat: ["Bug", "Poison"],
  Venomoth: ["Bug", "Poison"],
  Diglett: ["Ground"],
  Dugtrio: ["Ground"],
  Meowth: ["Normal"],
  Persian: ["Normal"],
  Psyduck: ["Water"],
  Golduck: ["Water"],
  Mankey: ["Fighting"],
  Primeape: ["Fighting"],
  Growlithe: ["Fire"],
  Arcanine: ["Fire"],
  Poliwag: ["Water"],
  Poliwhirl: ["Water"],
  Poliwrath: ["Water", "Fighting"],
  Abra: ["Psychic"],
  Kadabra: ["Psychic"],
  Alakazam: ["Psychic"],
  Machop: ["Fighting"],
  Machoke: ["Fighting"],
  Machamp: ["Fighting"],
  Bellsprout: ["Grass", "Poison"],
  Weepinbell: ["Grass", "Poison"],
  Victreebel: ["Grass", "Poison"],
  Tentacool: ["Water", "Poison"],
  Tentacruel: ["Water", "Poison"],
  Geodude: ["Rock", "Ground"],
  Graveler: ["Rock", "Ground"],
  Golem: ["Rock", "Ground"],
  Ponyta: ["Fire"],
  Rapidash: ["Fire"],
  Slowpoke: ["Water", "Psychic"],
  Slowbro: ["Water", "Psychic"],
  Magnemite: ["Electric", "Steel"],
  Magneton: ["Electric", "Steel"],
  FarfetchD: ["Normal", "Flying"],
  Doduo: ["Normal", "Flying"],
  Dodrio: ["Normal", "Flying"],
  Seel: ["Water"],
  Dewgong: ["Water", "Ice"],
  Grimer: ["Poison"],
  Muk: ["Poison"],
  Shellder: ["Water"],
  Cloyster: ["Water", "Ice"],
  Gastly: ["Ghost", "Poison"],
  Haunter: ["Ghost", "Poison"],
  Gengar: ["Ghost", "Poison"],
  Onix: ["Rock", "Ground"],
  Drowzee: ["Psychic"],
  Hypno: ["Psychic"],
  Krabby: ["Water"],
  Kingler: ["Water"],
  Voltorb: ["Electric"],
  Electrode: ["Electric"],
  Exeggcute: ["Grass", "Psychic"],
  Exeggutor: ["Grass", "Psychic"],
  Cubone: ["Ground"],
  Marowak: ["Ground"],
  Hitmonlee: ["Fighting"],
  Hitmonchan: ["Fighting"],
  Lickitung: ["Normal"],
  Koffing: ["Poison"],
  Weezing: ["Poison"],
  Rhyhorn: ["Ground", "Rock"],
  Rhydon: ["Ground", "Rock"],
  Chansey: ["Normal"],
  Tangela: ["Grass"],
  Kangaskhan: ["Normal"],
  Horsea: ["Water"],
  Seadra: ["Water"],
  Goldeen: ["Water"],
  Seaking: ["Water"],
  Staryu: ["Water"],
  Starmie: ["Water", "Psychic"],
  MrMime: ["Psychic"],
  Scyther: ["Bug", "Flying"],
  Jynx: ["Ice", "Psychic"],
  Electabuzz: ["Electric"],
  Magmar: ["Fire"],
  Pinsir: ["Bug"],
  Tauros: ["Normal"],
  Magikarp: ["Water"],
  Gyarados: ["Water", "Flying"],
  Lapras: ["Water", "Ice"],
  Ditto: ["Normal"],
  Eevee: ["Normal"],
  Vaporeon: ["Water"],
  Jolteon: ["Electric"],
  Flareon: ["Fire"],
  Porygon: ["Normal"],
  Omanyte: ["Rock", "Water"],
  Omastar: ["Rock", "Water"],
  Kabuto: ["Rock", "Water"],
  Kabutops: ["Rock", "Water"],
  Aerodactyl: ["Rock", "Flying"],
  Snorlax: ["Normal"],
  Articuno: ["Ice", "Flying"],
  Zapdos: ["Electric", "Flying"],
  Moltres: ["Fire", "Flying"],
  Dratini: ["Dragon"],
  Dragonair: ["Dragon"],
  Dragonite: ["Dragon", "Flying"],
  Mewtwo: ["Psychic"],
  Mew: ["Psychic"],
  Chikorita: ["Grass"],
  Bayleef: ["Grass"],
  Meganium: ["Grass"],
  Cyndaquil: ["Fire"],
  Quilava: ["Fire"],
  Typhlosion: ["Fire"],
  Totodile: ["Water"],
  Croconaw: ["Water"],
  Feraligatr: ["Water"],
  Sentret: ["Normal"],
  Furret: ["Normal"],
  Hoothoot: ["Normal", "Flying"],
  Noctowl: ["Normal", "Flying"],
  Ledyba: ["Bug", "Flying"],
  Ledian: ["Bug", "Flying"],
  Spinarak: ["Bug", "Poison"],
  Ariados: ["Bug", "Poison"],
  Crobat: ["Poison", "Flying"],
  Chinchou: ["Water", "Electric"],
  Lanturn: ["Water", "Electric"],
  Pichu: ["Electric"],
  Cleffa: ["Normal"],
  Igglybuff: ["Normal"],
  Togepi: ["Normal"],
  Togetic: ["Normal", "Flying"],
  Natu: ["Psychic", "Flying"],
  Xatu: ["Psychic", "Flying"],
  Mareep: ["Electric"],
  Flaaffy: ["Electric"],
  Ampharos: ["Electric"],
  Bellossom: ["Grass"],
  Marill: ["Water"],
  Azumarill: ["Water"],
  Sudowoodo: ["Rock"],
  Politoed: ["Water"],
  Hoppip: ["Grass", "Flying"],
  Skiploom: ["Grass", "Flying"],
  Jumpluff: ["Grass", "Flying"],
  Aipom: ["Normal"],
  Sunkern: ["Grass"],
  Sunflora: ["Grass"],
  Yanma: ["Bug", "Flying"],
  Wooper: ["Water", "Ground"],
  Quagsire: ["Water", "Ground"],
  Espeon: ["Psychic"],
  Umbreon: ["Dark"],
  Murkrow: ["Dark", "Flying"],
  Slowking: ["Water", "Psychic"],
  Misdreavus: ["Ghost"],
  Unown: ["Psychic"],
  Wobbuffet: ["Psychic"],
  Girafarig: ["Normal", "Psychic"],
  Pineco: ["Bug"],
  Forretress: ["Bug", "Steel"],
  Dunsparce: ["Normal"],
  Gligar: ["Ground", "Flying"],
  Steelix: ["Steel", "Ground"],
  Snubbull: ["Normal"],
  Granbull: ["Normal"],
  Qwilfish: ["Water", "Poison"],
  Scizor: ["Bug", "Steel"],
  Shuckle: ["Bug", "Rock"],
  Heracross: ["Bug", "Fighting"],
  Sneasel: ["Dark", "Ice"],
  Teddiursa: ["Normal"],
  Ursaring: ["Normal"],
  Slugma: ["Fire"],
  Magcargo: ["Fire", "Rock"],
  Swinub: ["Ice", "Ground"],
  Piloswine: ["Ice", "Ground"],
  Corsola: ["Water", "Rock"],
  Remoraid: ["Water"],
  Octillery: ["Water"],
  Delibird: ["Ice", "Flying"],
  Mantine: ["Water", "Flying"],
  Skarmory: ["Steel", "Flying"],
  Houndour: ["Dark", "Fire"],
  Houndoom: ["Dark", "Fire"],
  Kingdra: ["Water", "Dragon"],
  Phanpy: ["Ground"],
  Donphan: ["Ground"],
  Porygon2: ["Normal"],
  Stantler: ["Normal"],
  Smeargle: ["Normal"],
  Tyrogue: ["Fighting"],
  Hitmontop: ["Fighting"],
  Smoochum: ["Ice", "Psychic"],
  Elekid: ["Electric"],
  Magby: ["Fire"],
  Miltank: ["Normal"],
  Blissey: ["Normal"],
  Raikou: ["Electric"],
  Entei: ["Fire"],
  Suicune: ["Water"],
  Larvitar: ["Rock", "Ground"],
  Pupitar: ["Rock", "Ground"],
  Tyranitar: ["Rock", "Dark"],
  Lugia: ["Psychic", "Flying"],
  HoOh: ["Fire", "Flying"],
  Celebi: ["Psychic", "Grass"],
  Treecko: ["Grass"],
  Grovyle: ["Grass"],
  Sceptile: ["Grass"],
  Torchic: ["Fire"],
  Combusken: ["Fire", "Fighting"],
  Blaziken: ["Fire", "Fighting"],
  Mudkip: ["Water"],
  Marshtomp: ["Water", "Ground"],
  Swampert: ["Water", "Ground"],
  Poochyena: ["Dark"],
  Mightyena: ["Dark"],
  Zigzagoon: ["Normal"],
  Linoone: ["Normal"],
  Wurmple: ["Bug"],
  Silcoon: ["Bug"],
  Beautifly: ["Bug", "Flying"],
  Cascoon: ["Bug"],
  Dustox: ["Bug", "Poison"],
  Lotad: ["Water", "Grass"],
  Lombre: ["Water", "Grass"],
  Ludicolo: ["Water", "Grass"],
  Seedot: ["Grass"],
  Nuzleaf: ["Grass", "Dark"],
  Shiftry: ["Grass", "Dark"],
  Taillow: ["Normal", "Flying"],
  Swellow: ["Normal", "Flying"],
  Wingull: ["Water", "Flying"],
  Pelipper: ["Water", "Flying"],
  Ralts: ["Psychic"],
  Kirlia: ["Psychic"],
  Gardevoir: ["Psychic"],
  Surskit: ["Bug", "Water"],
  Masquerain: ["Bug", "Flying"],
  Shroomish: ["Grass"],
  Breloom: ["Grass", "Fighting"],
  Slakoth: ["Normal"],
  Vigoroth: ["Normal"],
  Slaking: ["Normal"],
  Nincada: ["Bug", "Ground"],
  Ninjask: ["Bug", "Flying"],
  Shedinja: ["Bug", "Ghost"],
  Whismur: ["Normal"],
  Loudred: ["Normal"],
  Exploud: ["Normal"],
  Makuhita: ["Fighting"],
  Hariyama: ["Fighting"],
  Azurill: ["Normal"],
  Nosepass: ["Rock"],
  Skitty: ["Normal"],
  Delcatty: ["Normal"],
  Sableye: ["Dark", "Ghost"],
  Mawile: ["Steel"],
  Aron: ["Steel", "Rock"],
  Lairon: ["Steel", "Rock"],
  Aggron: ["Steel", "Rock"],
  Meditite: ["Fighting", "Psychic"],
  Medicham: ["Fighting", "Psychic"],
  Electrike: ["Electric"],
  Manectric: ["Electric"],
  Plusle: ["Electric"],
  Minun: ["Electric"],
  Volbeat: ["Bug"],
  Illumise: ["Bug"],
  Roselia: ["Grass", "Poison"],
  Gulpin: ["Poison"],
  Swalot: ["Poison"],
  Carvanha: ["Water", "Dark"],
  Sharpedo: ["Water", "Dark"],
  Wailmer: ["Water"],
  Wailord: ["Water"],
  Numel: ["Fire", "Ground"],
  Camerupt: ["Fire", "Ground"],
  Torkoal: ["Fire"],
  Spoink: ["Psychic"],
  Grumpig: ["Psychic"],
  Spinda: ["Normal"],
  Trapinch: ["Ground"],
  Vibrava: ["Ground", "Dragon"],
  Flygon: ["Ground", "Dragon"],
  Cacnea: ["Grass"],
  Cacturne: ["Grass", "Dark"],
  Swablu: ["Normal", "Flying"],
  Altaria: ["Dragon", "Flying"],
  Zangoose: ["Normal"],
  Seviper: ["Poison"],
  Lunatone: ["Rock", "Psychic"],
  Solrock: ["Rock", "Psychic"],
  Barboach: ["Water", "Ground"],
  Whiscash: ["Water", "Ground"],
  Corphish: ["Water"],
  Crawdaunt: ["Water", "Dark"],
  Baltoy: ["Ground", "Psychic"],
  Claydol: ["Ground", "Psychic"],
  Lileep: ["Rock", "Grass"],
  Cradily: ["Rock", "Grass"],
  Anorith: ["Rock", "Bug"],
  Armaldo: ["Rock", "Bug"],
  Feebas: ["Water"],
  Milotic: ["Water"],
  Castform: ["Normal"],
  Kecleon: ["Normal"],
  Shuppet: ["Ghost"],
  Banette: ["Ghost"],
  Duskull: ["Ghost"],
  Dusclops: ["Ghost"],
  Tropius: ["Grass", "Flying"],
  Chimecho: ["Psychic"],
  Absol: ["Dark"],
  Wynaut: ["Psychic"],
  Snorunt: ["Ice"],
  Glalie: ["Ice"],
  Spheal: ["Ice", "Water"],
  Sealeo: ["Ice", "Water"],
  Walrein: ["Ice", "Water"],
  Clamperl: ["Water"],
  Huntail: ["Water"],
  Gorebyss: ["Water"],
  Relicanth: ["Water", "Rock"],
  Luvdisc: ["Water"],
  Bagon: ["Dragon"],
  Shelgon: ["Dragon"],
  Salamence: ["Dragon", "Flying"],
  Beldum: ["Steel", "Psychic"],
  Metang: ["Steel", "Psychic"],
  Metagross: ["Steel", "Psychic"],
  Regirock: ["Rock"],
  Regice: ["Ice"],
  Registeel: ["Steel"],
  Latias: ["Dragon", "Psychic"],
  Latios: ["Dragon", "Psychic"],
  Kyogre: ["Water"],
  Groudon: ["Ground"],
  Rayquaza: ["Dragon", "Flying"],
  Jirachi: ["Steel", "Psychic"],
  Deoxys: ["Psychic"],
} as const satisfies Partial<Record<Species, POKEMON_TYPE[]>>;

export const doesSpeciesHaveType = (
  _gen: 3,
  species: Species,
  type: POKEMON_TYPE,
) => {
  const types = gen3TypesBySpecies[species];
  if (!types) throw new Error(`Unsupported species ${species}`);
  return types.includes(type);
};
