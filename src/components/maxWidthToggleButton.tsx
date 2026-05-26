import { useMaxWidthEnabled } from "~/state/contentMaxWidth";
import { Button } from "./button";
import { Icon } from "./icons";

export const MaxWidthToggleButton = () => {
  const [maxWidthEnabled, setMaxWidthEnabled] = useMaxWidthEnabled();

  return (
    <Button
      icon={<Icon name={maxWidthEnabled ? "Fullscreen" : "FullscreenExit"} />}
      size="medium"
      trackerId="toggle_max_width"
      onClick={() => setMaxWidthEnabled(!maxWidthEnabled)}
    ></Button>
  );
};
