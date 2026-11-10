import { renderToStaticMarkup } from "react-dom/server";
import type { IconType } from "react-icons";
import { MdCheck, MdClose } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";
import { PiPersonSimpleWalkBold } from "react-icons/pi";
import { expect } from "vitest";
import { renderGuide } from "../utils/render";
import {
  getButton,
  getInputByFieldText,
  getSelectByLabel,
  getShownOptionLabel,
  getStep,
  selectOption,
  typeInto,
  waitFor,
} from "../utils/dom";

export type PatchGridInputs = {
  initialSeed: string;
  advance: string;
  chainCount: string;
  battleResult: string;
  shakeType: string;
};

const SHINY_PATCH_STEP = 3;

const GRID_SIZE = 9;

const EMPTY_TILE = ".";

const PLAYER_TILE = "@";

const PATCH_ICONS = [
  { tile: "S", Icon: IoSparkles },
  { tile: "+", Icon: MdCheck },
  { tile: "x", Icon: MdClose },
];

const readIconMarkup = (Icon: IconType) => {
  const container = document.createElement("div");
  container.innerHTML = renderToStaticMarkup(<Icon />);

  return container.querySelector("svg")?.innerHTML ?? "";
};

const hasPatchTile = (grid: string[]) => {
  return PATCH_ICONS.some(({ tile }) => grid.join("").includes(tile));
};

const isGridOfSize = (element: Element) => {
  const rows = [...element.children];

  return (
    rows.length === GRID_SIZE &&
    rows.every((row) => row.children.length === GRID_SIZE)
  );
};

const getPatchGrid = (root: ParentNode, playerIconMarkup: string) => {
  const playerIcon = [...root.querySelectorAll("svg")].find(
    (svg) => svg.innerHTML === playerIconMarkup,
  );

  let grid = playerIcon?.parentElement ?? null;
  while (grid != null && !isGridOfSize(grid)) {
    grid = grid.parentElement;
  }

  if (grid == null) {
    throw new Error("Patch grid isn't rendered");
  }

  return grid;
};

export const openPokeRadarGuide = async () => {
  const container = renderGuide("/dppt-pokeradar-rng/");
  const shinyPatch = await waitFor(() => {
    const step = getStep(container, SHINY_PATCH_STEP);
    getButton(step, "Calculate");

    return step;
  });

  const playerIconMarkup = readIconMarkup(PiPersonSimpleWalkBold);
  const tilesByIconMarkup = new Map([
    [playerIconMarkup, PLAYER_TILE],
    ...PATCH_ICONS.map(
      ({ tile, Icon }) => [readIconMarkup(Icon), tile] as const,
    ),
  ]);

  const readTile = (cell: Element) => {
    const icon = cell.querySelector("svg");
    if (icon == null) {
      return EMPTY_TILE;
    }

    return tilesByIconMarkup.get(icon.innerHTML) ?? "?";
  };

  const readGrid = () => {
    const grid = getPatchGrid(shinyPatch, playerIconMarkup);

    return [...grid.children].map((row) =>
      [...row.children].map(readTile).join(""),
    );
  };

  const shakeTypeSelect = () => getSelectByLabel(shinyPatch, "Shake Type");

  return {
    readGrid,

    selectedShakeType: () => getShownOptionLabel(shakeTypeSelect()),

    calculate: async (inputs: PatchGridInputs) => {
      const numberFields = [
        { label: "Initial Seed", value: inputs.initialSeed },
        { label: "Advance", value: inputs.advance },
        { label: "Chain Count", value: inputs.chainCount },
      ];

      for (const { label, value } of numberFields) {
        typeInto(getInputByFieldText(shinyPatch, label), value);
      }

      await selectOption(
        getSelectByLabel(shinyPatch, "Battle Result"),
        inputs.battleResult,
      );
      await selectOption(shakeTypeSelect(), inputs.shakeType);

      getButton(shinyPatch, "Calculate").click();

      return waitFor(() => {
        const grid = readGrid();
        expect(hasPatchTile(grid)).toBe(true);

        return grid;
      });
    },
  };
};
