import styles from "./taskActions.module.scss"
import { ShareButton } from "../Buttons/shareButton/shareButton"
import { EditButton } from "../Buttons/editButton/editButton"
import { InfoButton } from "../Buttons/infoButton/infoButton"
import { TaskProps } from "../../features/tasks/taskTypes"

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
