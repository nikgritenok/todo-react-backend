import { useState } from "react"
import styles from "./TaskActions.module.scss"
import { ShareButton } from "../Buttons/ShareButton/ShareButton"
import { EditButton } from "../Buttons/EditButton/EditButton"
import { InfoButton } from "../Buttons/InfoButton/InfoButton"
import { TaskProps } from "../../features/tasks/taskTypes"
import { EditTaskModal } from "../modals/EditTaskModal/EditTaskModal"
import { ShareModal } from "../modals/ShareModal/ShareModal"
import { PinButton } from "../Buttons/PinButton/PinButton"
import { AppDispatch } from "../../store"
import { useDispatch } from "react-redux"
import {
  togglePinnedTask,
  togglePinnedTaskOnServer,
} from "../../features/tasks/taskSlice"

export const TaskActions: React.FC<TaskProps> = ({ task }) => {
  const dispatch: AppDispatch = useDispatch()

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const openEditModal = () => setIsEditModalOpen(true)
  const closeEditModal = () => setIsEditModalOpen(false)

  const openShareModal = () => setIsShareModalOpen(true)
  const closeShareModal = () => setIsShareModalOpen(false)

  const handlePinToggle = (taskId: string) => {
    console.log("handlePinToggle called with taskId:", taskId)

    dispatch(togglePinnedTask(taskId))
    dispatch(togglePinnedTaskOnServer(task))
  }

  return (
    <div className={styles["task-actions"]}>
      <div className={styles["block-buttons"]}>
        <PinButton onClick={() => handlePinToggle(task.id)} />
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
