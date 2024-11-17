// server/src/index.js

import express, { json } from "express"
import { connect } from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { TaskModel } from "./models/Tasks.js"

dotenv.config()

// Создаем экземпляр приложения Express
const app = express()
const PORT = process.env.PORT || 3000

// Используем CORS для обеспечения доступа с фронтенда
app.use(cors())

// Парсинг JSON-тела запросов
app.use(json())

const mongoURI = process.env.MONGO_URI

connect(mongoURI, {})
  .then(() => {
    console.log("Connected to MongoDB Atlas")
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
  })

// Эндпоинт для получения задач
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find() // Получаем все задачи
    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch tasks" })
  }
})

// Эндпоинт для добавления задачи
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, about } = req.body

    if (!title || !about) {
      return res.status(400).json({ message: "Title and About are required" })
    }

    const newTask = new TaskModel({
      id: Date.now(),
      title,
      about,
    })

    await newTask.save()
    res.status(201).json(newTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

// Эндпоинт для удаления задачи
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

// Эндпоинт для обновления задачи
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { title, about } = req.body
    const { id } = req.params

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
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

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
