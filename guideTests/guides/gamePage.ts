import { expect } from "vitest";
import type { Route } from "~/routes/defs";
import { renderGuide } from "../utils/render";
import {
  getInnermostElementWithText,
  getOnly,
  getRadioOptionLabel,
  getText,
  readTextNodes,
  waitFor,
} from "../utils/dom";

export type SetupGuides = {
  setup: string | null;
  pokemonRngGuides: string[];
};

const SETUP_LABEL = "Your setup";
const POKEMON_RNG_HEADING = "Pokemon RNG";
const RADIO_SELECTOR = "input[type=radio]";

const getRadioGroupAround = (element: Element) => {
  let group = element.parentElement;
  while (group != null && group.querySelector(RADIO_SELECTOR) == null) {
    group = group.parentElement;
  }

  if (group == null) {
    throw new Error("No radios around the setup label");
  }

  return group;
};

const getSetupRadios = (root: ParentNode) => {
  const label = getInnermostElementWithText(root, SETUP_LABEL);
  const group = getRadioGroupAround(label);

  return [...group.querySelectorAll<HTMLInputElement>(RADIO_SELECTOR)];
};

const getSetupRadio = (root: ParentNode, setup: string) => {
  const radios = getSetupRadios(root).filter(
    (radio) => getRadioOptionLabel(radio) === setup,
  );

  return getOnly(radios, `setup named "${setup}"`);
};

const isSectionHeadedBy = (section: Element, heading: string) => {
  const headingElement = section.querySelector("h2");

  return headingElement != null && getText(headingElement) === heading;
};

const readFirstText = (element: Element) => {
  return readTextNodes(element)[0] ?? "";
};

const readGuideTitles = (root: ParentNode, heading: string) => {
  const sections = [...root.querySelectorAll("section")].filter((section) =>
    isSectionHeadedBy(section, heading),
  );

  return sections.flatMap((section) =>
    [...section.querySelectorAll("a")].map(readFirstText),
  );
};

export const openGamePage = async (route: Route) => {
  const container = renderGuide(route);
  await waitFor(() => getSetupRadios(container));

  const readSetupGuides = (): SetupGuides => {
    const checkedRadio = getSetupRadios(container).find(
      (radio) => radio.checked,
    );

    return {
      setup: checkedRadio == null ? null : getRadioOptionLabel(checkedRadio),
      pokemonRngGuides: readGuideTitles(container, POKEMON_RNG_HEADING),
    };
  };

  return {
    readSetupGuides,

    pickSetup: (setup: string) => {
      getSetupRadio(container, setup).click();

      return waitFor(() => {
        const setupGuides = readSetupGuides();
        expect(setupGuides.setup).toBe(setup);

        return setupGuides;
      });
    },
  };
};
