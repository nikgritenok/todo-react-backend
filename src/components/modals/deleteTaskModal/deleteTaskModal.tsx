import { ModalProps } from "../../../features/tasks/taskTypes"
import styles from "./deleteTaskModal.module.scss"
import Modal from "react-modal"
import { useDispatch } from "react-redux"
import { deleteTask } from "../../../features/tasks/taskSlice"

Modal.setAppElement("#root")

export const DeleteModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    if (task) {
      dispatch(deleteTask(task?.id))
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles["modal-content"]}
      closeTimeoutMS={200}
      overlayClassName={styles["modal-overlay"]}
    >
      <span>Delete this task?</span>
      <div className={styles["delete-buttons"]}>
        <button
          className={`${styles["button"]} ${styles["yes-button"]}`}
          onClick={handleDelete}
        >
          Yes
        </button>
        <button
          className={`${styles["button"]} ${styles["no-button"]}`}
          onClick={onClose}
        >
          No
        </button>
      </div>
    </Modal>
  )
}
