import mongoose from "mongoose"
const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  index: { type: Number, required: true },
})

export const TaskModel = mongoose.model("Task", taskSchema)
