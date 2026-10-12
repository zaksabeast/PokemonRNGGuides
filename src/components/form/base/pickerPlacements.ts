const pickerPlacement = (points: [string, string], offsetY: number) => ({
  points,
  offset: [0, offsetY],
  // Flipping alone can't fit the popup when the field is narrower than it, e.g. in a card on small phones,
  // so shift it back on screen instead
  overflow: { adjustX: 1, adjustY: 1, shiftX: true },
});

// antd's defaults, but shifted horizontally to stay on screen
export const pickerPlacements = {
  bottomLeft: pickerPlacement(["tl", "bl"], 4),
  bottomRight: pickerPlacement(["tr", "br"], 4),
  topLeft: pickerPlacement(["bl", "tl"], -4),
  topRight: pickerPlacement(["br", "tr"], -4),
};
