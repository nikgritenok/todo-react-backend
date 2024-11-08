import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./TaskInput.module.scss";
import { addTask } from "../../features/tasks/taskSlice";
import { Task } from "../../features/tasks/taskTypes";

export const TaskInput: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [about, setAbout] = useState<string>("");

  const dispatch = useDispatch(); // Создаем dispatch

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAboutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAbout(event.target.value);
  };

  const handleAddClick = () => {
    if (title.trim() && about.trim()) {
      const newTask: Task = {
        id: Date.now(), // Генерируем уникальный ID
        title,
        about,
      };
      dispatch(addTask(newTask)); // Отправляем задачу в Redux Store
      
      setTitle("");
      setAbout("");
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  };

  return (
    <div className={styles["task-input-container"]}>
      <div className={styles["input-container"]}>
        <input
          placeholder="Title..."
          className={styles["title-input"]}
          value={title}
          onChange={handleTitleChange}
        />
        <input
          placeholder="About..."
          className={styles["about-input"]}
          value={about}
          onChange={handleAboutChange}
        />
      </div>
      <button className={styles["add-button"]} onClick={handleAddClick}>
        +
      </button>
    </div>
  );
};
