import React from "react";
import { Flex, Card, Typography, Tag, Icon } from "~/components";
import styled from "@emotion/styled";
import * as tst from "ts-toolbelt";
import { match } from "ts-pattern";
import { upperFirst } from "lodash-es";
import { Color } from "@emotion/react";
import { RngTask } from "./challenges";
import { ChallengeModal } from "./modal";
import { track } from "~/analytics";

const TaskCardContainer = styled(Card)(({ theme }) => ({
  cursor: "pointer",
  width: "100%",
  boxShadow: theme.token.boxShadowTertiary,
  transition: "box-shadow 0.2s ease-in-out",
  ":hover": {
    boxShadow: theme.token.boxShadowSecondary,
  },
  "& .ant-card-body": {
    height: "100%",
  },
}));

type TaskCardProps = {
  task: RngTask;
  onClick?: (id: RngTask["id"]) => void;
};

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const tagColor = match<typeof task.difficulty, Color>(task.difficulty)
    .with("easy", () => "Success")
    .with("medium", () => "Warning")
    .with("hard", () => "Error")
    .otherwise(() => "Success");
  const statusColor = match<typeof task.status, Color>(task.status)
    .with("not-started", () => "White")
    .with("in-progress", () => "Warning")
    .with("completed", () => "Success")
    .otherwise(() => "White");
  const statusLabel = match<typeof task.status, string>(task.status)
    .with("not-started", () => "Not Started")
    .with("in-progress", () => "In Progress")
    .with("completed", () => "Completed")
    .otherwise(() => "Unknown");

  return (
    <TaskCardContainer onClick={() => onClick?.(task.id)}>
      <Flex gap={8} justify="space-between" align="center" height="100%">
        <Flex vertical gap={12} justify="space-between" height="100%">
          <Flex gap={4} align="flex-start" vertical>
            <Tag color="White" backgroundColor={tagColor} border={0}>
              {upperFirst(task.difficulty)}
            </Tag>

            <Typography.Title m={0} fontSize={20}>
              {task.name}
            </Typography.Title>

            <Typography.Text m={0} color="TextDescription">
              {task.description}
            </Typography.Text>
          </Flex>

          <Typography.Text fontSize={14} color="TextSecondary">
            Status: {statusLabel}
          </Typography.Text>
        </Flex>
        <Flex
          flexShrink={0}
          width={44}
          height={44}
          borderRadius={10}
          border="1px solid"
          borderColor="Border"
          justify="center"
          align="center"
        >
          {task.status === "not-started" ? (
            " "
          ) : (
            <Icon
              size={task.status === "completed" ? 30 : 20}
              name={task.status === "completed" ? "Check" : "Play"}
              color={statusColor}
            />
          )}
        </Flex>
      </Flex>
    </TaskCardContainer>
  );
};

const gap = 16;
const getFlex = (columns: tst.L.KeySet<1, 12>) => {
  return `1 1 calc(${(1 / columns) * 100}% - ${gap}px)`;
};

const Item = styled(Flex)(({ theme }) => ({
  flex: "1 1 100%",
  [theme.mediaQueries.up("mobile")]: {
    flex: getFlex(1),
  },
  [theme.mediaQueries.up("tablet")]: {
    flex: getFlex(2),
  },
}));

type Props = {
  tasks: RngTask[];
  onUpdateTask: (task: RngTask) => void;
};

export const Tasks = ({ tasks, onUpdateTask }: Props) => {
  const [selectedTaskId, setSelectedTaskId] = React.useState<
    RngTask["id"] | null
  >(null);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  return (
    <Flex wrap="wrap" gap={gap} justify="center">
      {tasks.map((task) => (
        <Item>
          <TaskCard
            task={task}
            onClick={(id) => {
              setSelectedTaskId(id);
              track("Task clicked", { id });
            }}
          />
        </Item>
      ))}
      <ChallengeModal
        task={selectedTask}
        onClose={() => setSelectedTaskId(null)}
        onUpdateTask={onUpdateTask}
      />
    </Flex>
  );
};
