import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../features/tasks/taskSlice";
import { ITask } from "../../features/tasks/taskTypes";
import styles from "./taskItem.module.scss";

interface TaskProps {
  task: ITask;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div className={styles["task-item"]}>
      <div className={styles["task-item-text"]}>
        <h3>{task.title}</h3>
        <p>{task.about}</p>
      </div>
      <button className={styles["delete-button"]} onClick={handleDelete}>
        x
      </button>
    </div>
  );
};
