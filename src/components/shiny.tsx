import type { ShinyType } from "~/rngTools";
import { shinyLabels } from "~/rngTools/shiny";
import { Icon } from "~/components/icons";
import { Tooltip } from "antd";

export const ShinyIcon = ({ shiny }: { shiny: ShinyType }) => (
  <Tooltip title={shinyLabels[shiny]}>
    <span role="img" aria-label={shinyLabels[shiny]}>
      <Icon
        name={
          shiny === "SquareShiny"
            ? "Square"
            : shiny === "StarShiny"
              ? "Star"
              : "Close"
        }
      />
    </span>
  </Tooltip>
);
