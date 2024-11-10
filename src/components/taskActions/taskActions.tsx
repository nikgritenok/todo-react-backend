import styles from "./taskActions.module.scss";
import { ShareButton } from "../buttons/shareButton/shareButton";
import { EditButton } from "../buttons/editButton/editButton";
import { InfoButton } from "../buttons/infoButton/infoButton";
import { ITask } from "../../features/tasks/taskTypes";

interface TaskProps {
  task: ITask;
}

export const TaskActions: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className={styles["task-actions"]}>
      <div className={styles["block-buttons"]}>
        <ShareButton />
        <InfoButton task={task} />
        <EditButton task={task} />
      </div>
    </div>
  );
};
