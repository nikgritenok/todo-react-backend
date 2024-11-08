import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styles from "./TaskInput.module.scss";
import { addTask } from "../../features/tasks/taskSlice";
import { Task } from "../../features/tasks/taskTypes";

export const TaskInput: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const titleRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAboutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAbout(event.target.value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    currentRef: React.RefObject<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddClick();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Предотвращаем стандартное поведение клавиши
      if (currentRef === titleRef) aboutRef.current?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentRef === aboutRef) titleRef.current?.focus();
    }
  };

  const handleAddClick = () => {
    if (title.trim() && about.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title,
        about,
      };
      dispatch(addTask(newTask));

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
  );
};
