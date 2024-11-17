import React, { useEffect } from "react"
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
import axios from "axios"

import { AppDispatch, RootState } from "../../store"
import { Task } from "../TaskItem/TaskItem"
import { fetchTasks, reorderTasks } from "../../features/tasks/taskSlice"
import styles from "./taskList.module.scss"
import { NoTaskMessage } from "../NoTaskMessage/NoTaskMessage"

export const TaskList = () => {
  const dispatch: AppDispatch = useDispatch()
  const { tasks, status, error } = useSelector(
    (state: RootState) => state.tasks,
  )

  // Загружаем задачи из БД при монтировании компонента
  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex(
        (task) => String(task.id) === String(active.id),
      )
      const newIndex = tasks.findIndex(
        (task) => String(task.id) === String(over.id),
      )

      const newTasks = arrayMove(tasks, oldIndex, newIndex)
      dispatch(reorderTasks(newTasks))

      try {
        // Отправляем обновленный порядок задач на сервер
        await axios.post("http://localhost:3000/api/tasks/reorder", newTasks)
      } catch (error) {
        console.error("Ошибка синхронизации порядка задач с сервером:", error)
      }
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

  if (status === "loading") {
    return <div>Загрузка задач...</div>
  }

  if (status === "failed") {
    return <div>Ошибка загрузки задач: {error}</div>
  }

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
          <SortableContext
            items={tasks.map((task) => String(task.id))}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </SortableContext>
        )}
      </div>
    </DndContext>
  )
}
