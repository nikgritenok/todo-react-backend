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
app.use(express.json())

app.use((req, res, next) => {
  console.log(`Headers:`, req.headers)
  console.log(`Body:`, req.body)
  next()
})

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
app.put("/tasks/reorder", async (req, res) => {
  try {
    const updatedTasks = req.body

    const bulkOperations = updatedTasks.map((task) => ({
      updateOne: {
        filter: { id: task.id },
        update: { $set: { index: task.index } },
      },
    }))

    await TaskModel.bulkWrite(bulkOperations)
    res.status(200).send({ message: "Order updated successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: "Failed to update order" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
