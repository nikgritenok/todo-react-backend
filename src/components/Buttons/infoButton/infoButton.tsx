import React, { useState } from "react";
import { EditTaskModal } from "../../modals/editTaskModal/editTaskModal";
import styles from "./infoButton.module.scss";
import { ITask } from "../../../features/tasks/taskTypes";

interface TaskProps {
  task: ITask;
}

export const InfoButton: React.FC<TaskProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button className={styles["info_button"]}>i</button>
      <EditTaskModal isOpen={isModalOpen} onClose={closeModal} task={task} />
    </>
  );
};
