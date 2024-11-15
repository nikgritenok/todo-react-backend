import styles from "./taskActions.module.scss"
import { ShareButton } from "../Buttons/ShareButton/ShareButton"
import { EditButton } from "../Buttons/EditButton/EditButton"
import { InfoButton } from "../Buttons/InfoButton/InfoButton"
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
