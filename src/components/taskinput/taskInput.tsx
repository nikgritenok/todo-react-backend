import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./TaskInput.module.scss"
import { addTask } from "../../features/tasks/taskSlice"
import { AppDispatch, RootState } from "../../store"

export const TaskInput = () => {
  const [title, setTitle] = useState<string>("")
  const [about, setAbout] = useState<string>("")
  const titleRef = useRef<HTMLInputElement>(null)
  const aboutRef = useRef<HTMLInputElement>(null)

  const dispatch: AppDispatch = useDispatch()

  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleAboutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAbout(event.target.value)
  }

  const handleKeyDown = (
    e: React.KeyboardEvent,
    currentRef: React.RefObject<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddClick()
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (currentRef === titleRef) aboutRef.current?.focus()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (currentRef === aboutRef) titleRef.current?.focus()
    }
  }

  const handleAddClick = () => {
    if (title.trim() && about.trim()) {
      const lastIndex = tasks.length > 0 ? tasks[tasks.length - 1].index : 0
      const newIndex = lastIndex + 1

      const newTask = {
        id: String(Date.now()),
        title,
        about,
        index: newIndex,
      }

      dispatch(addTask(newTask))
        .unwrap()
        .then(() => {
          setTitle("")
          setAbout("")
          titleRef.current?.focus()
        })
        .catch((error) => {
          alert("Не удалось добавить задачу. Попробуйте позже.")
          console.error(error)
        })
    } else {
      alert("Пожалуйста, заполните все поля")
    }
  }

  return (
    <div className={styles["task-input-container"]}>
      <div className={styles["input-container"]}>
        <input
          placeholder="Title..."
          ref={titleRef}
          onKeyDown={(e) => handleKeyDown(e, titleRef)}
          className={styles["title-input"]}
          value={title}
          onChange={handleTitleChange}
        />
        <input
          placeholder="About..."
          ref={aboutRef}
          onKeyDown={(e) => handleKeyDown(e, aboutRef)}
          className={styles["about-input"]}
          value={about}
          onChange={handleAboutChange}
        />
      </div>
      <button className={styles["add-button"]} onClick={handleAddClick}>
        +
      </button>
    </div>
  )
}
