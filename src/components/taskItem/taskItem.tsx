import React from "react"
import { TaskProps } from "../../features/tasks/taskTypes"
import styles from "./taskItem.module.scss"
import { useSortable } from "@dnd-kit/sortable"
import { TaskActions } from "../TaskActions/taskActions"
import { DeleteButton } from "../Buttons/DeleteButton/DeleteButton"

export const Task: React.FC<TaskProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    })

  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${
      transform?.y || 0
    }px, 0) scaleY(1)`,
    transition,
  }

  const [isClick, setIsClick] = React.useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsClick((prev) => !prev)
  }

  return (
    <div
      className="task-item-wrap"
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <div className={styles["task-item"]} onClick={handleClick} {...listeners}>
        <div className={styles["task-item-text"]}>
          <h3>{task.title}</h3>
          <p>{task.about}</p>
        </div>
        <DeleteButton task={task} />
      </div>
      <div>{isClick && <TaskActions task={task}></TaskActions>}</div>
    </div>
  )
}
