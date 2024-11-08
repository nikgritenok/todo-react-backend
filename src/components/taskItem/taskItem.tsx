import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../features/tasks/taskSlice";
import { ITask } from "../../features/tasks/taskTypes";
import styles from "./taskItem.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isClick, setIsClick] = React.useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  const handleClick = () => {
    setIsClick(!isClick);
    console.log(isClick);
  };

  return (
    <div
      className={styles["task-item"]}
      onClick={handleClick}
      ref={setNodeRef}
      {...attributes}
      style={style}
      {...listeners}
    >
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
