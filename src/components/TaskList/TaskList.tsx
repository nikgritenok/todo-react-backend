import { useEffect } from "react"
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
import { AppDispatch, RootState } from "../../store"
import { Task } from "../TaskItem/TaskItem"
import { fetchTasks, reorderTasksThunk } from "../../features/tasks/taskSlice"
import styles from "./TaskList.module.scss"
import { NoTaskMessage } from "../NoTaskMessage/NoTaskMessage"
import { reorderTasks } from "../../features/tasks/taskSlice"

export const TaskList = () => {
  const dispatch: AppDispatch = useDispatch()
  const { tasks, status, error } = useSelector(
    (state: RootState) => state.tasks,
  )

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    const draggedTask = tasks.find((task) => task.id === active.id)
    if (draggedTask?.pinned) {
      return
    }

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id)
      const newIndex = tasks.findIndex((task) => task.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedTasks = arrayMove(tasks, oldIndex, newIndex)

        const updatedTasks = reorderedTasks.map((task, index) => ({
          ...task,
          index,
        }))

        dispatch(reorderTasks(updatedTasks))

        dispatch(reorderTasksThunk(updatedTasks))
      }
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 5 } }),
  )

  if (status === "loading") {
    return <div>Загрузка задач...</div>
  }

  if (status === "failed") {
    return <div>Ошибка загрузки задач: {error}</div>
  }

  const sortedTasks = [...tasks].sort((a, b) => a.index - b.index)

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
            items={sortedTasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {sortedTasks.map((task) => (
              <Task task={task} key={task.id} isPinned={task.pinned} />
            ))}
          </SortableContext>
        )}
      </div>
    </DndContext>
  )
}
