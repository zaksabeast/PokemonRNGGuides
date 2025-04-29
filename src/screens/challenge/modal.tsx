import { Modal } from "antd";
import { RngTask } from "./challenges";
import { Flex, Select, Typography } from "~/components";
import { Link } from "~/routes";
import { upperFirst } from "lodash-es";

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
    {
      label: "Status",
      value: (
        <Select<RngTask["status"]>
          fullFlex
          options={[
            {
              label: <Typography.Text>Not Started</Typography.Text>,
              value: "not-started",
            },
            {
              label: <Typography.Text>In Progress</Typography.Text>,
              value: "in-progress",
            },
            {
              label: <Typography.Text>Completed</Typography.Text>,
              value: "completed",
            },
          ]}
          value={task.status}
          onChange={(value) => {
            if (task != null) {
              onUpdateTask({ ...task, status: value });
            }
          }}
        />
      ),
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
        <InnerChallengeModal task={task} onUpdateTask={onUpdateTask} />
      )}
    </Modal>
  );
};
