import styles from "./noTaskMessage.module.scss"

export const NoTaskMessage: React.FC = () => {
  return (
    <div className={styles["no-task-message"]}>
      <p className={styles["no-task-message__text"]}>No tasks</p>
    </div>
  )
}
