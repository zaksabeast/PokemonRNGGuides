import React from "react";
import styled from "@emotion/styled";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { BaseMap, type BaseMapProps } from "./base";
import { Controls } from "./controls";
import { MapContext } from "./context";

const MapContainer = styled.div({
  position: "relative",
});

export type InteractableMapProps = BaseMapProps;

export const InteractableMap = (props: InteractableMapProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <MapContainer ref={ref}>
      <MapContext.Provider value={{ ref }}>
        <TransformWrapper
          minScale={1}
          maxScale={8}
          doubleClick={{ disabled: true }}
          wheel={{ step: 0.1 }}
        >
          <Controls />
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%" }}
            contentStyle={{ width: "100%" }}
          >
            <BaseMap {...props} />
          </TransformComponent>
        </TransformWrapper>
      </MapContext.Provider>
    </MapContainer>
  );
};
