import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../features/tasks/taskSlice";
import { ITask } from "../../features/tasks/taskTypes";
import styles from "./taskItem.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskActions } from "../taskActions/taskActions";

interface TaskProps {
  task: ITask;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useDispatch();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${
      transform?.y || 0
    }px, 0) scaleY(1)`,
    transition,
  };

  const [isClick, setIsClick] = React.useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(task.id);
    dispatch(deleteTask(task.id));
  };

  const handleClick = () => {
    setIsClick((prev) => !prev);
    console.log(isClick);
  };

  return (
    <div
      className="task-item-wrap"
      ref={setNodeRef}
      {...attributes}
      style={style}
    >
      <div className={styles["task-item"]} onClick={handleClick} {...listeners}>
        <div className={styles["task-item-text"]}>
          <h3>{task.title}</h3>
          <p>{task.about}</p>
        </div>
        <button className={styles["delete-button"]} onClick={handleDelete}>
          x
        </button>
      </div>
      <div>{isClick && <TaskActions></TaskActions>}</div>
    </div>
  );
};
