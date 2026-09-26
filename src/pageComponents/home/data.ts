import { type Route } from "~/routes/defs";
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
    games: [{ name: "Crystal", slug: "/crystal/" }],
  },
  {
    console: "GBA",
    label: "GBA",
    games: [
      { name: "Ruby & Sapphire", slug: "/ruby-and-sapphire/" },
      { name: "FireRed & LeafGreen", slug: "/fire-red-and-leaf-green/" },
      { name: "Emerald", slug: "/emerald/" },
    ],
  },
  {
    console: "Gamecube",
    label: "GameCube",
    games: [{ name: "Colosseum & XD", slug: "/gamecube/" }],
  },
  {
    console: "NDS",
    label: "NDS",
    games: [
      { name: "Diamond & Pearl", slug: "/diamond-pearl-and-platinum/" },
      { name: "Platinum", slug: "/diamond-pearl-and-platinum/" },
      { name: "HeartGold & SoulSilver", slug: "/heart-gold-and-soul-silver/" },
      { name: "Black & White", slug: "/black-and-white/" },
      { name: "Black 2 & White 2", slug: "/black-2-and-white-2/" },
    ],
  },
  {
    console: "3DS",
    label: "3DS",
    games: [
      { name: "X & Y", slug: "/x-and-y/" },
      {
        name: "Omega Ruby & Alpha Sapphire",
        slug: "/omega-ruby-and-alpha-sapphire/",
      },
      { name: "Sun & Moon", slug: "/sun-and-moon/" },
      { name: "Ultra Sun & Ultra Moon", slug: "/ultra-sun-and-ultra-moon/" },
      { name: "Transporter & Dream Radar", slug: "/transporter-dream-radar/" },
    ],
  },
  {
    console: "Switch",
    label: "Switch",
    games: [
      { name: "Sword & Shield", slug: "/sword-and-shield/" },
      {
        name: "Brilliant Diamond & Shining Pearl",
        slug: "/brilliant-diamond-and-shining-pearl/",
      },
    ],
  },
];
