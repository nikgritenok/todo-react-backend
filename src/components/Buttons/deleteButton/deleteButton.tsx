import React, { useState } from "react"
import styles from "./deleteButton.module.scss"
import { ITask } from "../../../features/tasks/taskTypes"
import { DeleteModal } from "../../modals/deleteTaskModal/deleteTaskModal"

interface TaskProps {
  task: ITask
}

export const DeleteButton: React.FC<TaskProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <button className={styles["delete-button"]} onClick={openModal}>
        x
      </button>
      <DeleteModal isOpen={isModalOpen} onClose={closeModal} task={task} />
    </>
  )
}
