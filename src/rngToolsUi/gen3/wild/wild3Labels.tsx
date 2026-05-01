import { Link } from "~/components";

export const leadCycleSpeedTooltip = () => ({
    tooltip:<>The PID of the first Pokémon in the party impacts the RNG. Learn more about <Link newTab href="/gba-methods-lead-impact/">Methods & Leads</Link>.</>,
});

export const minFramesBeforePainting = () => ({
    label: "Min frames before painting",
    tooltip: "For advanced users. Those frames ensure there is enough time between booting the game and interacting with the painting.",
});

export const minAdvsAfterPainting = () => ({
    label: "Min advances after painting",
     tooltip: "To ensure there is enough time between interacting with the painting, and creating a Battle Video.",
});

export const usingPaintingReseeding = () => ({
      label: "Using Painting Reseeding?",
      tooltip:<><Link href="/emerald-painting-reseeding/" newTab>
            Painting Reseeding
          </Link> is a RNG technique to make the RNG state jump by millions of advances instantly, giving access to RNG states that would normally not be reachable realistically.</>,
});
