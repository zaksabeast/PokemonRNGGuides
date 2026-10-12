import { Link } from "~/components";
import { type InfoTooltipContent } from "~/components/form";

export const leadCycleSpeedTooltip = (): { tooltip: InfoTooltipContent } => ({
  tooltip: {
    title: "Lead Cycle Speed",
    description: (
      <>
        The PID of the first Pokémon in the party impacts the RNG. Learn more
        about{" "}
        <Link newTab href="/gba-methods-lead-impact/">
          Methods & Leads
        </Link>
        .
      </>
    ),
  },
});
