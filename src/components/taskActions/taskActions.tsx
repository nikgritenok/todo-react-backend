import { useState } from "react"
import styles from "./TaskActions.module.scss"
import { ShareButton } from "../Buttons/ShareButton/ShareButton"
import { EditButton } from "../Buttons/EditButton/EditButton"
import { InfoButton } from "../Buttons/InfoButton/InfoButton"
import { TaskProps } from "../../features/tasks/taskTypes"
import { EditTaskModal } from "../modals/EditTaskModal/EditTaskModal"
import { ShareModal } from "../modals/ShareModal/ShareModal"
import { PinButton } from "../Buttons/PinButton/PinButton"

export const TaskActions: React.FC<TaskProps> = ({ task }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const openEditModal = () => setIsEditModalOpen(true)
  const closeEditModal = () => setIsEditModalOpen(false)

  const openShareModal = () => setIsShareModalOpen(true)
  const closeShareModal = () => setIsShareModalOpen(false)

  return (
    <div className={styles["task-actions"]}>
      <div className={styles["block-buttons"]}>
        <PinButton task={task} />
        <ShareButton onClick={openShareModal} />
        <InfoButton task={task} />
        <EditButton onClick={openEditModal} />
      </div>

      {isShareModalOpen && (
        <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
      )}
      {isEditModalOpen && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          task={task}
        />
      )}
    </div>
  )
}
