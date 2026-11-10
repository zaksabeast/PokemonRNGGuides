import { describe, expect, it } from "vitest";
import { openChallengePage } from "./guides/challenge";

describe("USUM Tool Assisted Challenge", () => {
  it("updates progress from the task's status select", async () => {
    const page = await openChallengePage();

    expect(page.readProgress()).toEqual({
      stats: {
        "Tasks Completed": "0 / 8",
        Rank: "None",
        "Completion Percentage": "0.00%",
      },
      taskStatuses: [
        "Status: Not Started",
        "Status: Not Started",
        "Status: Not Started",
        "Status: Not Started",
        "Status: Not Started",
        "Status: Not Started",
        "Status: Not Started",
        "Status: Not Started",
      ],
    });

    const progress = await page.setTaskStatus("6IV Egg", "Completed");

    expect(progress).toEqual({
      stats: {
        "Tasks Completed": "1 / 8",
        Rank: "Beginner",
        "Completion Percentage": "12.50%",
      },
      taskStatuses: [
        "Status: Completed",
        "Status: Not Started",
        "Status: Not Started",
        "Status: Not Started",
        "Status: Not Started",
        "Status: Not Started",
        "Status: Not Started",
        "Status: Not Started",
      ],
    });
  });
});
