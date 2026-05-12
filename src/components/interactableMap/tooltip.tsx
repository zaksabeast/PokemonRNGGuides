import React from "react";
import { Tooltip, type TooltipProps } from "antd";
import { MapContext } from "./context";

export const MapTooltip = (props: TooltipProps) => {
  const ctx = React.useContext(MapContext);

  return (
    <Tooltip
      fresh
      {...props}
      getPopupContainer={() =>
        ctx.ref.current?.querySelector(".react-transform-wrapper") ??
        document.body
      }
    />
  );
};
