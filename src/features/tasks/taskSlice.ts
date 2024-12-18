import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { Task } from "../../features/tasks/taskTypes"
import axios from "axios"

const API_URL = "http://localhost:3000/api/tasks"

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
})

export const addTask = createAsyncThunk("tasks/addTask", async (task: Task) => {
  const response = await axios.post(`${API_URL}`, task)
  return response.data
})

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}`)
    return id
  },
)

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: Task) => {
    const response = await axios.put(`${API_URL}/${task.id}`, task)
    return response.data
  },
)

export const reorderTasksThunk = createAsyncThunk(
  "tasks/reorderTasks",
  async (tasks: Task[]) => {
    try {
      await axios.put(`http://localhost:3000/tasks/reorder`, tasks)
    } catch (error) {
      console.error("Ошибка синхронизации порядка задач с сервером:", error)
    }
  },
)

// Новый асинхронный экшен для синхронизации закрепленной задачи с сервером
export const togglePinnedTaskOnServer = createAsyncThunk(
  "tasks/togglePinnedTaskOnServer",
  async (task: Task) => {
    try {
      const response = await axios.put(`${API_URL}/${task.id}`, task)
      return response.data
    } catch (error) {
      console.error(
        "Ошибка при обновлении закрепленной задачи на сервере:",
        error,
      )
      throw error
    }
  },
)

export const initialState: {
  tasks: Task[]
  status: string
  error: string | null
} = {
  tasks: [],
  status: "idle",
  error: null,
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reorderTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload
    },
    togglePinnedTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload)

      if (task) {
        // Если задача уже закреплена, снимаем закрепление
        if (task.pinned) {
          task.pinned = false
          console.log("Задача снята с закрепления")
        } else {
          // Если количество закрепленных задач меньше 3, закрепляем
          console.log("Закрепляем задачу")
          const pinnedTasks = state.tasks.filter((task) => task.pinned)
          if (pinnedTasks.length < 3) {
            task.pinned = true
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded"
        state.tasks = action.payload.sort((a, b) => a.index - b.index)
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Ошибка загрузки задач"
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload)
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        )
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
  },
})

export const { reorderTasks, togglePinnedTask } = taskSlice.actions
export default taskSlice.reducer
