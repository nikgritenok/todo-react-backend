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

    // Используйте findByIdAndUpdate для обновления данных
    const updatedTask = await TaskModel.findOneAndUpdate(
      { id: id }, // Указываем идентификатор задачи
      { title, about },
      { new: true }, // это возвращает обновленный документ
    )

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" })
    }

    // Успешное обновление
    res.status(200).json(updatedTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

// Эндпоинт для получения всех задач
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find().sort({ index: 1 }) // Можно отсортировать по индексу, если это важно
    res.status(200).json(tasks) // Возвращаем все задачи
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

// Эндпоинт для изменения порядка задач
app.put("/api/tasks/reorder", async (req, res) => {
  try {
    const { tasks } = req.body

    // Проверка, что данные в запросе корректны
    if (!tasks || !Array.isArray(tasks)) {
      return res
        .status(400)
        .json({ message: "Invalid request: 'tasks' should be an array" })
    }

    // Массив обновленных задач
    const updatedTasks = []

    // Проходим по каждому объекту в массиве tasks
    for (const task of tasks) {
      if (!task.id || task.index === undefined) {
        return res
          .status(400)
          .json({ message: "Each task must have an 'id' and 'index'" })
      }

      console.log(`Ищем задачу с id: ${task.id}`) // Логируем запрос на поиск

      // Находим задачу в базе данных
      const existingTask = await TaskModel.findOne({ id: task.id })

      if (!existingTask) {
        // Если задача не найдена, выводим 404
        console.log(`Задача с id ${task.id} не найдена`) // Логируем отсутствие задачи
        return res
          .status(404)
          .json({ message: `Task with id ${task.id} not found` })
      }

      // Если индекс задачи изменился
      if (existingTask.index !== task.index) {
        existingTask.index = task.index
        const updatedTask = await existingTask.save() // Сохраняем изменения
        updatedTasks.push(updatedTask) // Добавляем обновленную задачу в массив
      }
    }

    // Возвращаем обновленные задачи
    res.status(200).json(updatedTasks)
  } catch (error) {
    console.error("Ошибка при обновлении порядка задач:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
