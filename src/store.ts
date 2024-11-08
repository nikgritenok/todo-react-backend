// store.ts
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer, // Добавляем taskSlice в store
  },
});

// Экспорт для использования в компонентах
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
