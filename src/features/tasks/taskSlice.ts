import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "./taskTypes";

// Функция для загрузки задач из localStorage
const loadTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

// Начальное состояние
const initialState: { tasks: Task[] } = {
  tasks: loadTasksFromLocalStorage(), // Загружаем задачи при старте
};

// Слайс для задач
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Добавление задачи
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Сохраняем в localStorage
    },
    // Удаление задачи
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Сохраняем в localStorage
    },
    // Обновление задачи
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Сохраняем в localStorage
      }
    },
  },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
