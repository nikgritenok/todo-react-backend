import React, { useState } from "react"
import styles from "./deleteButton.module.scss"
import { TaskProps } from "../../../features/tasks/taskTypes"
import { DeleteModal } from "../../Modals/DeleteTaskModal/DeleteTaskModal"

export const DeleteButton: React.FC<TaskProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }
  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(false)
  }

  return (
    <>
      <button className={styles["delete-button"]} onClick={openModal}>
        x
      </button>
      <DeleteModal isOpen={isModalOpen} onClose={closeModal} task={task} />
    </>
  )
}
