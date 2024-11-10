import icon_share from "../../assets/icon/icon_share.svg";
import icon_edit from "../../assets/icon/icon_edit.svg";
import styles from "./taskActions.module.scss";
import { ShareModal } from "../modals/shareModal/shareModal";
import { useState } from "react";

export const TaskActions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles["task-actions"]}>
      <div className={styles["block-buttons"]}>
        <button className={styles["block-buttons__button"]} onClick={openModal}>
          <img src={icon_share} alt="share" />
        </button>
        <button className={styles["block-buttons__button"]}>i</button>
        <button className={styles["block-buttons__button"]}>
          <img src={icon_edit} alt="edit" />
        </button>
      </div>
      {/* Передаем состояние и функцию закрытия в модальное окно */}
      <ShareModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
