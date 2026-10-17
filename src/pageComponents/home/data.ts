import { type Route } from "~/routes/defs";
import type { Species } from "~/rngTools";
import { type Console } from "~/components/consoleIcons";

export type StarterStep = {
  title: string;
  slug: Route;
};

export const starterSteps: StarterStep[] = [
  { title: "What is RNG?", slug: "/what-is-rng/" },
  { title: "Pick retail or emulator", slug: "/retail-or-emulator/" },
  { title: "Your first shiny", slug: "/your-first-rng/" },
];

export type HomeGame = {
  name: string;
  species: Species;
  slug: Route;
};

export type Platform = {
  console: Console;
  label: string;
  games: HomeGame[];
};

export const platforms: Platform[] = [
  {
    console: "GB",
    label: "GB",
    games: [{ name: "Crystal", species: "Suicune", slug: "/crystal/" }],
  },
  {
    console: "GBA",
    label: "GBA",
    games: [
      {
        name: "Ruby & Sapphire",
        species: "Groudon",
        slug: "/ruby-and-sapphire/",
      },
      {
        name: "FireRed & LeafGreen",
        species: "Charizard",
        slug: "/fire-red-and-leaf-green/",
      },
      {
        name: "Emerald",
        species: "Rayquaza",
        slug: "/emerald/",
      },
    ],
  },
  {
    console: "Gamecube",
    label: "GameCube",
    games: [{ name: "Colosseum & XD", species: "Lugia", slug: "/gamecube/" }],
  },
  {
    console: "NDS",
    label: "NDS",
    games: [
      {
        name: "Diamond & Pearl",
        species: "Dialga",
        slug: "/diamond-pearl-and-platinum/",
      },
      {
        name: "Platinum",
        species: "Giratina_Origin",
        slug: "/diamond-pearl-and-platinum/",
      },
      {
        name: "HeartGold & SoulSilver",
        species: "HoOh",
        slug: "/heart-gold-and-soul-silver/",
      },
      {
        name: "Black & White",
        species: "Reshiram",
        slug: "/black-and-white/",
      },
      {
        name: "Black 2 & White 2",
        species: "Kyurem",
        slug: "/black-2-and-white-2/",
      },
    ],
  },
  {
    console: "3DS",
    label: "3DS",
    games: [
      {
        name: "Dream Radar",
        species: "Tornadus",
        slug: "/dream-radar/",
      },
      {
        name: "Bank & Transporter",
        species: "Celebi",
        slug: "/bank-transporter/",
      },
      {
        name: "X & Y",
        species: "Xerneas",
        slug: "/x-and-y/",
      },
      {
        name: "Omega Ruby & Alpha Sapphire",
        species: "Kyogre",
        slug: "/omega-ruby-and-alpha-sapphire/",
      },
      {
        name: "Sun & Moon",
        species: "Solgaleo",
        slug: "/sun-and-moon/",
      },
      {
        name: "Ultra Sun & Ultra Moon",
        species: "Necrozma",
        slug: "/ultra-sun-and-ultra-moon/",
      },
    ],
  },
  {
    console: "Switch",
    label: "Switch",
    games: [
      {
        name: "Sword & Shield",
        species: "Ditto",
        slug: "/sword-and-shield/",
      },
      {
        name: "Brilliant Diamond & Shining Pearl",
        species: "Palkia",
        slug: "/brilliant-diamond-and-shining-pearl/",
      },
    ],
  },
];
