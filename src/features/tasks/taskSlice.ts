import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "./taskTypes";

// Начальное состояние
const initialState: { tasks: Task[] } = {
  tasks: [],
};

// Слайс для задач
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Добавление задачи
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    // Удаление задачи
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    // Обновление задачи
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    // Инициализация задач из localStorage
    loadTasksFromLocalStorage: (state) => {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        state.tasks = JSON.parse(storedTasks);
      }
    },
    // Сохранение задач в localStorage
    saveTasksToLocalStorage: (state) => {
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} = taskSlice.actions;

export default taskSlice.reducer;
