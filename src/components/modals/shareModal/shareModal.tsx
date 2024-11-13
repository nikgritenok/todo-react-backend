import styles from "./shareModal.module.scss"
import Modal from "react-modal"
import { IModalProps } from "../../../features/tasks/taskTypes"
import icon_copy from "../../../assets/icon/icon_copy.svg"
import icon_vk from "../../../assets/icon/icon_vk.svg"
import icon_telegram from "../../../assets/icon/icon_telegram.svg"
import icon_whatsapp from "../../../assets/icon/icon_whatsapp.svg"
import icon_facebook from "../../../assets/icon/icon_facebook.svg"

Modal.setAppElement("#root")
export const ShareModal: React.FC<IModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      closeTimeoutMS={200}
      overlayClassName={styles["modal-overlay"]}
    >
      <div className={styles["share-buttons"]}>
        <button>
          <img src={icon_copy} alt="Copy" />
        </button>
        <button>
          <img src={icon_vk} alt="VK" />
        </button>
        <button>
          <img src={icon_telegram} alt="Telegram" />
        </button>
        <button>
          <img src={icon_whatsapp} alt="Whatsapp" />
        </button>
        <button>
          <img src={icon_facebook} alt="Facebook" />
        </button>
      </div>
    </Modal>
  )
}
