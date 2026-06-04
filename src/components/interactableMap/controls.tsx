import { Flex } from "../flex";
import { Button } from "../button";
import { Icon } from "../icons";
import styled from "@emotion/styled";
import { useControls } from "react-zoom-pan-pinch";

const ControlContainer = styled(Flex)({
  position: "absolute",
  top: 20,
  left: 20,
  zIndex: 100,
  width: 100,
});

export const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <ControlContainer>
      <Flex backgroundColor="BgMask" borderRadius={20} ph={8}>
        <Button
          trackerId="map-zoom-in"
          color="TextLightSolid"
          hoverColor="InfoTextHover"
          onClick={() => zoomIn()}
          type="text"
          icon={<Icon name="ZoomIn" size={30} />}
        />
        <Button
          trackerId="map-zoom-out"
          color="TextLightSolid"
          hoverColor="InfoTextHover"
          onClick={() => zoomOut()}
          type="text"
          icon={<Icon name="ZoomOut" size={30} />}
        />
        <Button
          trackerId="map-reset"
          color="TextLightSolid"
          hoverColor="InfoTextHover"
          onClick={() => resetTransform()}
          type="text"
          icon={<Icon name="Reset" size={30} />}
        />
      </Flex>
    </ControlContainer>
  );
};
