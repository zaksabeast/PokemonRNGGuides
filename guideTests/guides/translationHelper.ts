import { expect } from "vitest";
import { z } from "zod";
import { renderGuide } from "../utils/render";
import {
  click,
  getButton,
  getInnermostElementWithText,
  getInputByFieldText,
  getOnly,
  getSelectByLabel,
  getStep,
  getText,
  selectOption,
  stubClipboard,
  typeInto,
  waitFor,
} from "../utils/dom";

const STEPS = { selectGuide: 0, editGuide: 1 };

const LANGUAGE_LABEL = "Select a language";
const TREE_ROOT_TITLE = "PokemonRNG.com";

const ToolTranslationsSchema = z.record(z.string(), z.string());

export type GuideInTree = { category: string; title: string };

const getTextArea = (root: ParentNode) => {
  return getOnly([...root.querySelectorAll("textarea")], "text area");
};

const getTree = (root: ParentNode) => {
  const tree = root.querySelector("[role=tree]");
  if (tree == null) {
    throw new Error("Guide tree isn't rendered");
  }

  return tree;
};

const getExpandToggle = (titleElement: Element) => {
  const treeItem = titleElement.closest("[role=treeitem]");
  const nodeContent = [...(treeItem?.children ?? [])].find((child) =>
    child.contains(titleElement),
  );

  const toggle = nodeContent?.previousElementSibling;
  if (toggle == null) {
    throw new Error(`Tree node "${getText(titleElement)}" can't expand`);
  }

  return toggle;
};

const expandTreeNode = async (tree: Element, title: string) => {
  const titleElement = await waitFor(() =>
    getInnermostElementWithText(tree, title),
  );

  click(getExpandToggle(titleElement));
};

export const openTranslationGuide = async () => {
  const container = renderGuide("/help-translate/");
  const selectGuideStep = await waitFor(() =>
    getStep(container, STEPS.selectGuide),
  );
  const editGuideStep = getStep(container, STEPS.editGuide);
  const copiedTexts = stubClipboard();

  const copy = () => {
    getButton(editGuideStep, "Copy to Clipboard").click();
    const copiedText = copiedTexts.at(-1);
    if (copiedText == null) {
      throw new Error("Nothing was copied");
    }

    return copiedText;
  };

  const guideFile = () => getTextArea(editGuideStep).value;

  return {
    selectLanguage: (language: string) => {
      return selectOption(
        getSelectByLabel(selectGuideStep, LANGUAGE_LABEL),
        language,
      );
    },

    selectGuide: async ({ category, title }: GuideInTree) => {
      const tree = getTree(selectGuideStep);
      await expandTreeNode(tree, TREE_ROOT_TITLE);
      await expandTreeNode(tree, category);
      click(await waitFor(() => getInnermostElementWithText(tree, title)));

      await waitFor(() => expect(guideFile()).not.toBe(""));
    },

    guideFrontMatter: () => guideFile().split("---")[1]?.trim(),

    editGuideFile: (file: string) => {
      typeInto(getTextArea(editGuideStep), file);
    },

    copyGuideFile: copy,

    translateTools: async () => {
      getButton(selectGuideStep, "Translate tools").click();
      await waitFor(() => getButton(editGuideStep, "Copy to Clipboard"));
    },

    toolTranslation: (key: string) =>
      getInputByFieldText(editGuideStep, key).value,

    editToolTranslation: (key: string, translation: string) => {
      typeInto(getInputByFieldText(editGuideStep, key), translation);
    },

    copyToolTranslations: () =>
      ToolTranslationsSchema.parse(JSON.parse(copy())),
  };
};
