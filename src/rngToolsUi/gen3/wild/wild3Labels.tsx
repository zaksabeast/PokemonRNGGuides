import { Link } from "~/components";

export const leadCycleSpeedTooltip = () => ({
  tooltip: (
    <>
      The PID of the first Pokémon in the party impacts the RNG. Learn more
      about{" "}
      <Link newTab href="/gba-methods-lead-impact/">
        Methods & Leads
      </Link>
      .
    </>
  ),
});
