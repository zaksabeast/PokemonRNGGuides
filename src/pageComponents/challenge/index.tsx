import React from "react";
import { Progress, Tabs, TabsProps, Skeleton } from "antd";
import { Tasks } from "./tasks";
import { Leaderboard, LeaderboardRank } from "./leaderboard";
import { useActiveRoute } from "~/hooks/useActiveRoute";
import { match } from "ts-pattern";
import {
  Challenges,
  challenges,
  RngTask,
  RngTaskStatusSchema,
} from "./challenges";
import { Flex, Card, Typography } from "~/components";
import { useTheme } from "@emotion/react";
import { atomWithPersistence, useAtom } from "~/state/localStorage";
import { z } from "zod";
import * as tst from "ts-toolbelt";
import { useHydrate } from "~/hooks/useHydrate";
import { hydrationLock, HydrationLock } from "~/utils/hydration";

type Metric = {
  label: string;
  value: React.ReactNode;
};

const UserTaskStateSchema = z.object({
  id: z.string(),
  status: RngTaskStatusSchema,
}) satisfies z.Schema<tst.O.Pick<RngTask, "status">>;

type UserTaskState = z.infer<typeof UserTaskStateSchema>;

type UserChallengeState = {
  [ChallengeId in keyof Challenges]: UserTaskState[];
};

const UserChallengeStateSchema = z.object({
  usumTa: UserTaskStateSchema.array(),
}) satisfies z.Schema<UserChallengeState>;

const rngChallengeAtom = atomWithPersistence(
  "userChallengeState",
  UserChallengeStateSchema,
  {
    usumTa: [],
  },
);

const getRank = (completedPercent: number): LeaderboardRank => {
  if (completedPercent >= 100) {
    return "Legend";
  }

  if (completedPercent >= 90) {
    return "Gold";
  }

  if (completedPercent >= 50) {
    return "Silver";
  }

  if (completedPercent >= 30) {
    return "Bronze";
  }

  if (completedPercent > 0) {
    return "Beginner";
  }

  return "None";
};

type InnerProps = {
  state: UserChallengeState;
  setState: (state: HydrationLock<UserChallengeState>) => void;
};

const InnerChallengePageComponent = ({ state, setState }: InnerProps) => {
  const theme = useTheme();
  const route = useActiveRoute();

  const tasks: RngTask[] = match(route)
    .with("/challenge-usum-ta/", () => {
      return challenges.usumTa.map((task) => ({
        ...task,
        status:
          state.usumTa.find((usumTask) => usumTask.id === task.id)?.status ??
          "not-started",
      }));
    })
    .otherwise(() => []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const completionPercent = (completedTasks / totalTasks) * 100;

  const metrics: Metric[] = React.useMemo(() => {
    return [
      {
        label: "Tasks Completed",
        value: (
          <>
            {completedTasks} / {totalTasks}
          </>
        ),
      },
      {
        label: "Rank",
        value: getRank(completionPercent),
      },
      {
        label: "Completion Percentage",
        value: `${completionPercent.toFixed(2)}%`,
      },
    ];
  }, [completionPercent, totalTasks, completedTasks]);

  const items: TabsProps["items"] = React.useMemo(() => {
    return [
      {
        key: "tasks",
        label: "Tasks",
        children: (
          <Tasks
            tasks={tasks}
            onUpdateTask={(task) =>
              setState(
                hydrationLock({
                  [task.challengeId]: tasks.map((oldTask) =>
                    oldTask.id === task.id ? task : oldTask,
                  ),
                }),
              )
            }
          />
        ),
      },
      {
        key: "leaderboard",
        label: "Discord Leaderboard",
        children: <Leaderboard />,
      },
    ];
  }, [tasks, setState]);

  return (
    <Flex gap={24} vertical>
      <Card id="challenge-header">
        <Flex gap={8} vertical>
          <Typography.Title fontSize={24}>Completion Stats</Typography.Title>

          <table>
            <tbody>
              {metrics.map(({ label, value }) => (
                <tr key={label}>
                  <td>
                    <Typography.Text fontSize={16} color="TextSecondary">
                      {label}
                    </Typography.Text>
                  </td>
                  <td>
                    <Typography.Text fontSize={16} color="Text">
                      {value}
                    </Typography.Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Progress
            showInfo={false}
            strokeColor={
              completionPercent >= 100
                ? theme.token.colorSuccess
                : theme.token.colorPrimary
            }
            percent={completionPercent}
          />
        </Flex>
      </Card>
      <Tabs defaultActiveKey="tasks" items={items} />
    </Flex>
  );
};

export const ChallengePageComponent = () => {
  const [lockedState, setState] = useAtom(rngChallengeAtom);
  const { hydrated, client: state } = useHydrate(lockedState);

  if (!hydrated) {
    return <Skeleton />;
  }

  return <InnerChallengePageComponent state={state} setState={setState} />;
};
