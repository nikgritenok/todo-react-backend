import React from "react";
import { useSelector } from "react-redux"; // Импортируем useSelector
import { RootState } from "../app/store"; // Типизируем store
import { Task } from "../features/tasks/taskTypes"; // Тип Task
import styles from "./taskList.module.scss";

export const TaskList: React.FC = () => {
  // Получаем список задач из Redux Store
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div className={styles["task-container"]}>
      {tasks.map((Task) => (
        <div key={Task.id} className={styles["task-item"]}>
          <h3>{Task.title}</h3>
          <p>{Task.about}</p>
        </div>
      ))}
    </div>
  );
};
