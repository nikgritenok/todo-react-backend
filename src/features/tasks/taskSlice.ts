import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { Task } from "./taskTypes"

// API URL
const API_URL = "http://localhost:3000/api/tasks"

// Асинхронные операции
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
  async (id: number) => {
    console.log(`${API_URL}/${id}`)
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

// Начальное состояние
const initialState: { tasks: Task[]; status: string; error: string | null } = {
  tasks: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reorderTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Загрузка задач
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded"
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch tasks"
      })
      // Добавление задачи
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload)
      })
      // Удаление задачи
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      })
      // Обновление задачи
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

export const { reorderTasks } = taskSlice.actions
export default taskSlice.reducer
