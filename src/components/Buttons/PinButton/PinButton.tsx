import styles from "./PinButton.module.scss"
import { TaskProps } from "../../../features/tasks/taskTypes"
import icon_pin from "../../../assets/icon/icon_pin.svg"

export const PinButton: React.FC<TaskProps> = ({ task }) => {
  return (
    <>
      <button className={styles["info_button"]}>
        <img src={icon_pin} alt="pin" />
      </button>
    </>
  )
}
