import { ModalProps } from "../../../features/tasks/taskTypes"
import styles from "./DeleteTaskModal.module.scss"
import Modal from "react-modal"
import { useDispatch } from "react-redux"
import { deleteTask } from "../../../features/tasks/taskSlice"
import { AppDispatch } from "../../../store"

Modal.setAppElement("#root")

export const DeleteModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const dispatch: AppDispatch = useDispatch()

  const handleDelete = () => {
    if (task && task.id) {
      dispatch(deleteTask(task.id))
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles["modal-content"]}
      closeTimeoutMS={200}
      overlayClassName={styles["modal-overlay"]}
      ariaHideApp={false}
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
