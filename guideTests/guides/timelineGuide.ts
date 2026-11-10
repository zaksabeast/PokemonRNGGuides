import { expect } from "vitest";
import { renderGuide } from "../utils/render";
import {
  getButton,
  getInputByFieldText,
  getOnly,
  getText,
  readTextNodes,
  typeInto,
  waitFor,
} from "../utils/dom";

export type TimelineInputs = {
  initialSeed: string;
  npcCount: string;
  currentAdvance: string;
  targetAdvance: string;
};

const CARD_TITLES = {
  safeAdvances: "Step one frame at a time until you land on one of these",
  nextAdvances: "Keep stepping and compare",
  leap: "Timeline Leap",
  target: "Target Advance",
};

const EMPTY_VALUE = "-";

const isCardTitledWith = (element: Element, title: string) => {
  const firstChild = element.firstElementChild;

  return (
    firstChild != null &&
    getText(firstChild) === title &&
    getText(element) !== title &&
    element.querySelector("input") == null
  );
};

const getCard = (root: ParentNode, title: string) => {
  const cards = [...root.querySelectorAll("*")].filter((element) =>
    isCardTitledWith(element, title),
  );

  return getOnly(cards, `card titled "${title}"`);
};

export const openTimelineGuide = async () => {
  const container = renderGuide("/retail-usum-timeline/");
  await waitFor(() => getButton(container, "Find Safe Advances"));

  const readCard = (title: string) => readTextNodes(getCard(container, title));

  const waitForFilledCard = (title: string) =>
    waitFor(() => {
      const texts = readCard(title);
      expect(texts).not.toContain(EMPTY_VALUE);

      return texts;
    });

  return {
    findSafeAdvances: async (inputs: TimelineInputs) => {
      const fields = [
        { label: "Initial Seed", value: inputs.initialSeed },
        { label: "NPC Count", value: inputs.npcCount },
        { label: "Current Advance", value: inputs.currentAdvance },
        { label: "Target Advance", value: inputs.targetAdvance },
      ];

      for (const { label, value } of fields) {
        typeInto(getInputByFieldText(container, label), value);
      }

      getButton(container, "Find Safe Advances").click();

      return waitForFilledCard(CARD_TITLES.safeAdvances);
    },

    selectSafeAdvance: async (safeAdvance: string) => {
      getButton(
        getCard(container, CARD_TITLES.safeAdvances),
        safeAdvance,
      ).click();

      return {
        nextAdvances: await waitForFilledCard(CARD_TITLES.nextAdvances),
        leap: await waitForFilledCard(CARD_TITLES.leap),
        target: await waitForFilledCard(CARD_TITLES.target),
      };
    },
  };
};
