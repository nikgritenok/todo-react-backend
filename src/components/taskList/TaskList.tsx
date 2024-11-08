import React from "react";
import { useSelector } from "react-redux"; // Импортируем useSelector
import { RootState } from "../../store"; // Типизируем store
import { useDispatch } from "react-redux"; // Импортируем useDispatch
import styles from "./taskList.module.scss";
import { deleteTask } from "../../features/tasks/taskSlice";

export const TaskList: React.FC = () => {
  // Получаем список задач из Redux Store
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  // Функция для удаления задачи
  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className={styles["task-container"]}>
      {tasks.length === 0 ? (
        <div className={styles["no-task-message"]}>
          <p className={styles["no-task-message__text"]}>No tasks</p>
        </div>
      ) : (
        tasks.map((Task) => (
          <div key={Task.id} className={styles["task-item"]}>
            <div className={styles["task-item-text"]}>
              <h3>{Task.title}</h3>
              <p>{Task.about}</p>
            </div>
            <button
              className={styles["delete-button"]}
              onClick={() => handleDelete(Task.id)}
            >
              x
            </button>
          </div>
        ))
      )}
    </div>
  );
};
