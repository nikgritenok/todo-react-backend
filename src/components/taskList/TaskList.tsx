import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Task } from "../taskItem/taskItem";
import styles from "./taskList.module.scss";

export const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div className={styles["task-container"]}>
      {tasks.length === 0 ? (
        <div className={styles["no-task-message"]}>
          <p className={styles["no-task-message__text"]}>No tasks</p>
        </div>
      ) : (
        tasks.map((task) => <Task key={task.id} task={task} />)
      )}
    </div>
  );
};
