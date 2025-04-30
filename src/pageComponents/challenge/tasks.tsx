import React from "react";
import { Flex, Card, Typography, Tag, Icon, Grid } from "~/components";
import { match } from "ts-pattern";
import { upperFirst } from "lodash-es";
import { Color } from "@emotion/react";
import { RngTask } from "./challenges";
import { ChallengeModal } from "./modal";
import { track } from "~/analytics";

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
    <Card
      fullBody
      onClick={() => onClick?.(task.id)}
      id={`task-card-${task.id}`}
    >
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
    </Card>
  );
};

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
    <Grid mobile={1} tablet={2}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onClick={(id) => {
            setSelectedTaskId(id);
            track("Task clicked", { id });
          }}
        />
      ))}
      <ChallengeModal
        task={selectedTask}
        onClose={() => setSelectedTaskId(null)}
        onUpdateTask={onUpdateTask}
      />
    </Grid>
  );
};
