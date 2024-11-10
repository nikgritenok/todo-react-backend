import React, { useState } from "react";
import icon_share from "../../../assets/icon/icon_share.svg";
import { ShareModal } from "../../modals/shareModal/shareModal";
import styles from "./shareButton.module.scss";

export const ShareButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button className={styles["share_button"]} onClick={openModal}>
        <img src={icon_share} alt="share" />
      </button>
      <ShareModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
