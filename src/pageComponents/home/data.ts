import { type Route } from "~/routes/defs";

export type StarterStep = {
  title: string;
  slug: Route;
};

export const starterSteps: StarterStep[] = [
  { title: "What is RNG?", slug: "/what-is-rng/" },
  { title: "Pick retail or emulator", slug: "/retail-or-emulator/" },
  { title: "Your first shiny", slug: "/your-first-rng/" },
];
