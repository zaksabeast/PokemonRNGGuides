import type { ShinyType } from "~/rngTools";
import { shinyLabels } from "~/rngTools/shiny";
import { Icon } from "~/components/icons";
import { Tooltip } from "antd";
import type { Translations } from "~/translations";

type ShinyIconProps = {
  shiny: ShinyType;
  translations?: Translations;
};

export const ShinyIcon = ({ shiny, translations }: ShinyIconProps) => {
  const label = translations?.[shinyLabels[shiny]] ?? shinyLabels[shiny];

  return (
    <Tooltip title={label}>
      <span role="img" aria-label={label}>
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
};
