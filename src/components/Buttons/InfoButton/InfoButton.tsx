import React, { useState } from "react"
import { EditTaskModal } from "../../modals/EditTaskModal/EditTaskModal"
import styles from "./infoButton.module.scss"
import { TaskProps } from "../../../features/tasks/taskTypes"

export const InfoButton: React.FC<TaskProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <button className={styles["info_button"]}>i</button>
      <EditTaskModal isOpen={isModalOpen} onClose={closeModal} task={task} />
    </>
  )
}
