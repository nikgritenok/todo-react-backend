// server/src/models/Task.js

import mongoose from "mongoose"

// Определение схемы для задачи (Task)
const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  index: { type: Number, required: true }, // Поле для хранения порядка задач
})

// Создание модели для коллекции tasks
export const TaskModel = mongoose.model("Task", taskSchema)