import express, { json } from "express"
import { connect } from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { TaskModel } from "./models/Tasks.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGO_URI

app.use(cors())
app.use(json())

connect(mongoURI, {})
  .then(() => {
    console.log("Connected to MongoDB Atlas")
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
  })

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find()
    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch tasks" })
  }
})
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, about, id, index } = req.body

    if (!title || !about) {
      return res.status(400).json({ message: "Title and About are required" })
    }

    const newTask = new TaskModel({
      id,
      title,
      about,
      index,
    })

    await newTask.save()
    res.status(201).json(newTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params
    const task = await TaskModel.findOneAndDelete({ id })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.status(200).json({ message: "Task deleted", id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { title, about } = req.body
    const { id } = req.params

    const updatedTask = await TaskModel.findOneAndUpdate(
      { id: id },
      { title, about },
      { new: true },
    )

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.status(200).json(updatedTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find().sort({ index: 1 })
    res.status(200).json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})
app.put("/api/tasks/reorder", async (req, res) => {
  try {
    const { tasks } = req.body

    if (!tasks || !Array.isArray(tasks)) {
      return res
        .status(400)
        .json({ message: "Invalid request: 'tasks' should be an array" })
    }

    const updatedTasks = []

    for (const task of tasks) {
      if (!task.id || task.index === undefined) {
        return res
          .status(400)
          .json({ message: "Each task must have an 'id' and 'index'" })
      }

      console.log(`Ищем задачу с id: ${task.id}`)

      const existingTask = await TaskModel.findOne({ id: task.id })

      if (!existingTask) {
        console.log(`Задача с id ${task.id} не найдена`)
        return res
          .status(404)
          .json({ message: `Task with id ${task.id} not found` })
      }

      if (existingTask.index !== task.index) {
        existingTask.index = task.index
        const updatedTask = await existingTask.save()
        updatedTasks.push(updatedTask)
      }
    }

    res.status(200).json(updatedTasks)
  } catch (error) {
    console.error("Ошибка при обновлении порядка задач:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
