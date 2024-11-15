import React, { useState } from "react"
import icon_edit from "../../../assets/icon/icon_edit.svg"
import { EditTaskModal } from "../../modals/editTaskModal/editTaskModal"
import styles from "./editButton.module.scss"
import { TaskProps } from "../../../features/tasks/taskTypes"

export const EditButton: React.FC<TaskProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <button className={styles["edit_button"]} onClick={openModal}>
        <img src={icon_edit} alt="edit" />
      </button>
      <EditTaskModal isOpen={isModalOpen} onClose={closeModal} task={task} />
    </>
  )
}
