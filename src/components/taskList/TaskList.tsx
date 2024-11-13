import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"

import { RootState } from "../../store"
import { Task } from "../taskItem/taskItem"
import { setTasks } from "../../features/tasks/taskSlice"
import styles from "./taskList.module.scss"
import { NoTaskMessage } from "../noTaskMessage/noTaskMessage"

export const TaskList: React.FC = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id)
      const newIndex = tasks.findIndex((task) => task.id === over.id)

      const newTasks = arrayMove(tasks, oldIndex, newIndex)
      dispatch(setTasks(newTasks))
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  )

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
      sensors={sensors}
    >
      <div className={styles["task-container"]}>
        {tasks.length === 0 ? (
          <NoTaskMessage />
        ) : (
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </SortableContext>
        )}
      </div>
    </DndContext>
  )
}
