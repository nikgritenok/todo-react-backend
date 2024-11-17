import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { Task } from "../../features/tasks/taskTypes"

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
  async (tasks: Task[], { dispatch }) => {
    try {
      console.log("tasks", tasks)
      await axios.put(`${API_URL}/reorder`, tasks)

      const response = await axios.get(`${API_URL}/tasks`)

      dispatch(reorderTasks(response.data))
    } catch (error) {
      console.error("Ошибка синхронизации порядка задач с сервером:", error)
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

export const { reorderTasks } = taskSlice.actions
export default taskSlice.reducer
