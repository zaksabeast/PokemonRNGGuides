import type { ShinyType } from "~/rngTools";
import { shinyLabels } from "~/rngTools/shiny";
import { Icon, IconName } from "./icons";
import { Tooltip } from "antd";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

const iconMap: Record<ShinyType, IconName> = {
  SquareShiny: "Square",
  StarShiny: "Star",
  NotShiny: "Close",
};

type ShinyIconProps = {
  shiny: ShinyType;
};

export const ShinyIcon = ({ shiny }: ShinyIconProps) => {
  const t = useActiveRouteTranslations();
  const label = t[shinyLabels[shiny]];

  return (
    <Tooltip title={label}>
      <span role="img" aria-label={label}>
        <Icon name={iconMap[shiny]} />
      </span>
    </Tooltip>
  );
};
