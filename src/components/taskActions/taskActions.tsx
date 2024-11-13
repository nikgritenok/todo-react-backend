import styles from "./taskActions.module.scss"
import { ShareButton } from "../Buttons/shareButton/shareButton"
import { EditButton } from "../Buttons/editButton/editButton"
import { InfoButton } from "../Buttons/infoButton/infoButton"
import { ITask } from "../../features/tasks/taskTypes"

interface TaskProps {
  task: ITask
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
  )
}
