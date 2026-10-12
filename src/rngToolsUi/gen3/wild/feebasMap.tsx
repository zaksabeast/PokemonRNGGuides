import { useState } from "react";
import {
  Button,
  InteractableMap,
  MapGlow,
  type MapFeature,
} from "~/components";
import {
  FieldFrame,
  useFieldIds,
  type LabeledFieldProps,
} from "~/components/form";
import styled from "@emotion/styled";
import { type FeebasTile, getFeebasTiles } from "./feebasMapData";
import { useField } from "~/hooks/form";
import { GenericForm, GuaranteeFormNameType } from "~/types";
import FeebasMap from "~/assets/Emerald/Wild/FeebasMap.png";

const tiles = getFeebasTiles();
const selectableTiles = tiles.filter((tile) => tile.canContainFeebas);
const TILE_WIDTH_PERCENT = 100 / 40;
const TILE_HEIGHT_PERCENT = 100 / 100;
const GRID_PATH = [
  ...Array.from(
    { length: 100 / TILE_WIDTH_PERCENT + 1 },
    (_, x) => `M${x} 0V${100 / TILE_HEIGHT_PERCENT}`,
  ),
  ...Array.from(
    { length: 100 / TILE_HEIGHT_PERCENT + 1 },
    (_, y) => `M0 ${y}H${100 / TILE_WIDTH_PERCENT}`,
  ),
].join(" ");

export type FeebasMapProps = {
  selectedTiles?: number[];
  setSelectedTiles: (tiles: number[]) => void;
  canOnlySelectOne?: boolean;
};

const getTileKey = (tile: FeebasTile) =>
  `${tile.websiteImageX},${tile.websiteImageY}`;

const TileGlow = styled(MapGlow)<{
  $instability: FeebasTile["instability"];
  $selected: boolean;
}>(({ $instability, $selected }) => ({
  backgroundColor: $instability === 0 ? "lightgreen" : "red",
  opacity: $selected ? 1 : $instability === 0 ? 0 : 0.2,
}));

const FeebasMapContainer = styled.div({
  width: "100%",
  maxWidth: 400,
});

const gridFeature: MapFeature = {
  type: "polygon",
  points: [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 },
  ],
  node: (
    <svg
      viewBox={`0 0 ${100 / TILE_WIDTH_PERCENT} ${100 / TILE_HEIGHT_PERCENT}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      pointerEvents="none"
      aria-hidden="true"
    >
      <path
        d={GRID_PATH}
        fill="none"
        stroke="black"
        strokeOpacity={0.2}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  ),
};

type FeebasTilesFieldProps<FormState extends GenericForm> = Pick<
  LabeledFieldProps,
  "label" | "tooltip"
> & {
  name: GuaranteeFormNameType<FormState, number[]>;
  canOnlySelectOne?: boolean;
};

export const FeebasTilesField = <FormState extends GenericForm>({
  name,
  label,
  tooltip,
  canOnlySelectOne,
}: FeebasTilesFieldProps<FormState>) => {
  const ids = useFieldIds();
  const [{ value, onBlur }, { error }, { setValue }] = useField<number[]>(name);

  return (
    <FieldFrame
      ids={ids}
      labelTarget="group"
      label={label}
      tooltip={tooltip}
      errorMessage={error}
    >
      <div onBlur={onBlur}>
        <FeebasTilesSelector
          selectedTiles={value}
          setSelectedTiles={setValue}
          canOnlySelectOne={canOnlySelectOne}
        />
      </div>
    </FieldFrame>
  );
};

export const FeebasTilesSelector = ({
  selectedTiles,
  setSelectedTiles,
  canOnlySelectOne = false,
}: FeebasMapProps) => {
  const [internalSelectedTileKeys, setSelectedTileKeys] = useState<Set<string>>(
    () => new Set(),
  );
  const selectedTileKeys =
    selectedTiles == null
      ? internalSelectedTileKeys
      : new Set(
          selectableTiles
            .filter((tile) => selectedTiles.includes(tile.cycleCounter))
            .map(getTileKey),
        );

  const toggleTile = (tile: FeebasTile) => {
    const tileKey = getTileKey(tile);
    const nextSelectedTileKeys = new Set(selectedTileKeys);

    if (nextSelectedTileKeys.has(tileKey)) {
      nextSelectedTileKeys.delete(tileKey);
    } else {
      if (canOnlySelectOne) {
        nextSelectedTileKeys.clear();
      }
      nextSelectedTileKeys.add(tileKey);
    }

    if (selectedTiles == null) {
      setSelectedTileKeys(nextSelectedTileKeys);
    }
    setSelectedTiles(
      selectableTiles
        .filter((selectableTile) =>
          nextSelectedTileKeys.has(getTileKey(selectableTile)),
        )
        .map((tile) => tile.cycleCounter),
    );
  };

  const features = selectableTiles.map((tile): MapFeature => {
    const x = tile.websiteImageX * TILE_WIDTH_PERCENT;
    const y = tile.websiteImageY * TILE_HEIGHT_PERCENT;
    const isSelected = selectedTileKeys.has(getTileKey(tile));

    return {
      type: "polygon",
      points: [
        { x, y },
        { x: x + TILE_WIDTH_PERCENT, y },
        { x: x + TILE_WIDTH_PERCENT, y: y + TILE_HEIGHT_PERCENT },
        { x, y: y + TILE_HEIGHT_PERCENT },
      ],
      node: (
        <TileGlow
          $instability={tile.instability}
          $selected={isSelected}
          onClick={() => toggleTile(tile)}
          role="button"
        />
      ),
    };
  });

  return (
    <FeebasMapContainer>
      <InteractableMap
        maxViewportHeight={400}
        alt="Route 119 Feebas fishing tiles"
        features={[gridFeature, ...features]}
        src={FeebasMap}
      />
    </FeebasMapContainer>
  );
};

const TileViewport = styled.svg({
  display: "block",
  width: 400,
  maxWidth: "calc(100vw - 48px)",
  aspectRatio: "1",
  overflow: "hidden",
  imageRendering: "pixelated",
});

export const FeebasTileVisualizer = ({
  selectedTileCycle,
}: {
  selectedTileCycle: number;
}) => {
  const tile = tiles.find((tile) => tile.cycleCounter === selectedTileCycle);
  if (tile == null) {
    return null;
  }

  const viewportSize = 20;
  const mapWidth = 100 / TILE_WIDTH_PERCENT;
  const mapHeight = 100 / TILE_HEIGHT_PERCENT;
  const x = Math.max(
    0,
    Math.min(
      tile.websiteImageX + 0.5 - viewportSize / 2,
      mapWidth - viewportSize,
    ),
  );
  const y = Math.max(
    0,
    Math.min(
      tile.websiteImageY + 0.5 - viewportSize / 2,
      mapHeight - viewportSize,
    ),
  );

  return (
    <TileViewport
      viewBox={`${x} ${y} ${viewportSize} ${viewportSize}`}
      role="img"
      aria-label={`Route 119 Feebas map around tile cycle ${selectedTileCycle}`}
    >
      <image
        href={FeebasMap}
        width={mapWidth}
        height={mapHeight}
        preserveAspectRatio="none"
      />
      <path
        d={GRID_PATH}
        fill="none"
        stroke="black"
        strokeOpacity={0.2}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        pointerEvents="none"
      />
      <circle
        cx={tile.websiteImageX + 0.5}
        cy={tile.websiteImageY + 0.5}
        r={Math.SQRT1_2}
        fill="none"
        stroke="red"
        strokeWidth={0.2}
      />
    </TileViewport>
  );
};

export const FeebasTileVisualizerButton = ({
  selectedTileCycle,
}: {
  selectedTileCycle: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tile = tiles.find((tile) => tile.cycleCounter === selectedTileCycle);
  if (tile == null) {
    return null;
  }

  return (
    <>
      <Button
        trackerId="feebas-tile-visualizer-toggle"
        aria-expanded={isVisible}
        onClick={() => setIsVisible((visible) => !visible)}
      >
        {`Tile (${tile.ingameX},${tile.ingameY})`}
      </Button>
      {isVisible && (
        <FeebasTileVisualizer selectedTileCycle={selectedTileCycle} />
      )}
    </>
  );
};
