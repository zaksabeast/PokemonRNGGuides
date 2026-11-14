import { Modal } from "antd";
import { RngTask, RngTaskStatus } from "./challenges";
import { Flex, Typography, Link } from "~/components";
import { SelectField, type SelectOption } from "~/components/form";
import { upperFirst } from "lodash-es";
import { track } from "~/analytics";

const statusOptions: SelectOption<RngTaskStatus>[] = [
  { label: "Not Started", value: "not-started" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

type TableColumn = {
  label: string;
  value: React.ReactNode;
};

type InnerChallengeModalProps = {
  task: RngTask;
  onUpdateTask: (task: RngTask) => void;
};

const InnerChallengeModal = ({
  task,
  onUpdateTask,
}: InnerChallengeModalProps) => {
  const columns: TableColumn[] = [
    { label: "Difficulty", value: upperFirst(task.difficulty) },
    { label: "Requirements", value: task.requirements },
    {
      label: "Guide",
      value: <Link href={task.slug}>{task.name} Guide</Link>,
    },
    task.tips == null
      ? null
      : {
          label: "Tips",
          value: task.tips,
        },
  ].filter((column) => column != null);

  return (
    <Flex gap={16} vertical>
      <Typography.Text fontSize={16}>{task.description}</Typography.Text>
      <table width="100%">
        <tbody>
          {columns.map(({ label, value }) => (
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
      <SelectField<RngTaskStatus>
        label="Status"
        options={statusOptions}
        value={task.status}
        onChange={(status) => onUpdateTask({ ...task, status })}
      />
    </Flex>
  );
};

type Props = {
  task?: RngTask;
  onUpdateTask: (task: RngTask) => void;
  onClose?: () => void;
};

export const ChallengeModal = ({ task, onClose, onUpdateTask }: Props) => {
  return (
    <Modal
      open={task != null}
      onCancel={onClose}
      footer={null}
      width={800}
      title={<Typography.Title level={2}>{task?.name}</Typography.Title>}
    >
      {task != null && (
        <InnerChallengeModal
          task={task}
          onUpdateTask={(task) => {
            onUpdateTask(task);
            track("Update task", { taskId: task.id, status: task.status });
          }}
        />
      )}
    </Modal>
  );
};
