import { expect } from "vitest";
import { renderGuide } from "../utils/render";
import {
  getOnly,
  getSelectByLabel,
  getText,
  selectOption,
  waitFor,
} from "../utils/dom";

export type ChallengeProgress = {
  stats: Record<string, string>;
  taskStatuses: string[];
};

const STATUS_LABEL = "Status";
const TASK_STATUS_PREFIX = "Status: ";

const getTaskTitle = (root: ParentNode, taskName: string) => {
  const titles = [...root.querySelectorAll<HTMLElement>("*")].filter(
    (element) => getText(element) === taskName && element.children.length === 0,
  );

  return getOnly(titles, `task named "${taskName}"`);
};

const getStatsTable = (root: ParentNode) => {
  return getOnly([...root.querySelectorAll("table")], "stats table");
};

const readStatRow = (row: Element) => {
  const [label = "", value = ""] = [...row.querySelectorAll("td")].map(getText);

  return [label, value];
};

const readStats = (root: ParentNode) => {
  const rows = getStatsTable(root).querySelectorAll("tr");

  return Object.fromEntries([...rows].map(readStatRow));
};

const isTaskStatus = (element: Element) => {
  return (
    getText(element).startsWith(TASK_STATUS_PREFIX) &&
    element.children.length === 0
  );
};

const readTaskStatuses = (root: ParentNode) => {
  return [...root.querySelectorAll("*")].filter(isTaskStatus).map(getText);
};

export const openChallengePage = async () => {
  const container = renderGuide("/challenge-usum-ta/");
  await waitFor(() => readStats(container));

  const readProgress = (): ChallengeProgress => ({
    stats: readStats(container),
    taskStatuses: readTaskStatuses(container),
  });

  return {
    readProgress,

    setTaskStatus: async (taskName: string, status: string) => {
      const previousProgress = readProgress();
      getTaskTitle(container, taskName).click();
      const statusSelect = await waitFor(() =>
        getSelectByLabel(document.body, STATUS_LABEL),
      );

      await selectOption(statusSelect, status);

      return waitFor(() => {
        const progress = readProgress();
        expect(progress).not.toEqual(previousProgress);

        return progress;
      });
    },
  };
};
