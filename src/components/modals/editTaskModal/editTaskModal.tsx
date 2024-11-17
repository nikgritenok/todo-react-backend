import { ModalProps } from "../../../features/tasks/taskTypes"
import styles from "./editTaskModal.module.scss"
import Modal from "react-modal"
import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { updateTask } from "../../../features/tasks/taskSlice"
import { AppDispatch } from "../../../store"

Modal.setAppElement("#root")

export const EditTaskModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const dispatch: AppDispatch = useDispatch()

  const [title, setTitle] = useState(task?.title || "")
  const [about, setAbout] = useState(task?.about || "")
  const titleRef = useRef<HTMLInputElement>(null)
  const aboutRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      titleRef.current?.focus()
    }, 0)

    return () => clearTimeout(timer)
  }, [isOpen])

  const handleSave = () => {
    if (!title.trim() || !about.trim()) {
      alert("Пожалуйста, заполните все поля")
      return
    }

    if (task) {
      const updatedTask = { ...task, title, about }
      dispatch(updateTask(updatedTask)) // Обновляем задачу через Redux
      onClose() // Закрываем модальное окно после обновления
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent,
    currentRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (currentRef.current === titleRef.current) {
        aboutRef.current?.focus()
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (currentRef.current === aboutRef.current) {
        titleRef.current?.focus()
      }
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
      <div className={styles["edit-window"]}>
        <input
          type="text"
          placeholder="Mini Input..."
          className={styles["edit-title"]}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, titleRef)}
          ref={titleRef}
        />

        <textarea
          className={styles["edit-about"]}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, aboutRef)}
          ref={aboutRef}
        />
        <div className={styles["buttons"]}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className="save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  )
}
