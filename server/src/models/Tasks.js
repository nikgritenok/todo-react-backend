// server/src/models/Task.js

import mongoose from "mongoose"

// Определение схемы для задачи (Task)
const taskSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
})

// Создание модели для коллекции tasks
export const TaskModel = mongoose.model("Task", taskSchema)
