import styles from "./taskActions.module.scss";
import { ShareButton } from "../Buttons/shareButton/shareButton";
import { EditButton } from "../Buttons/editButton/editButton";
import { ITask } from "../../features/tasks/taskTypes";

interface TaskProps {
  task: ITask;
}

export const TaskActions: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className={styles["task-actions"]}>
      <div className={styles["block-buttons"]}>
        <ShareButton />
        <button className={styles["block-buttons__button"]}>i</button>
        <EditButton task={task} />
      </div>
    </div>
  );
};
