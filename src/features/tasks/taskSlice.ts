import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Task } from "./taskTypes"

const loadTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem("tasks")
  return storedTasks ? JSON.parse(storedTasks) : []
}

const initialState: { tasks: Task[] } = {
  tasks: loadTasksFromLocalStorage(),
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      )
      if (index !== -1) {
        state.tasks[index] = action.payload
        localStorage.setItem("tasks", JSON.stringify(state.tasks))
      }
    },

    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },
  },
})

export const { addTask, deleteTask, updateTask, setTasks } = taskSlice.actions

export default taskSlice.reducer
