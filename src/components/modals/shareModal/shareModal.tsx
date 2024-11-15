import styles from "./ShareModal.module.scss"
import Modal from "react-modal"
import { ModalProps } from "../../../features/tasks/taskTypes"
import icon_copy from "../../../assets/icon/icon_copy.svg"
import icon_vk from "../../../assets/icon/icon_vk.svg"
import icon_telegram from "../../../assets/icon/icon_telegram.svg"
import icon_whatsapp from "../../../assets/icon/icon_whatsapp.svg"
import icon_facebook from "../../../assets/icon/icon_facebook.svg"

Modal.setAppElement("#root")

const shareButtons = [
  { src: icon_copy, alt: "Copy" },
  { src: icon_vk, alt: "VK" },
  {
    src: icon_telegram,
    alt: "Telegram",
  },
  {
    src: icon_whatsapp,
    alt: "Whatsapp",
  },
  {
    src: icon_facebook,
    alt: "Facebook",
  },
]

export const ShareModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      closeTimeoutMS={200}
      overlayClassName={styles["modal-overlay"]}
    >
      <div className={styles["share-buttons"]}>
        {shareButtons.map(({ src, alt }, index) => (
          <button key={index}>
            <img src={src} alt={alt} />
          </button>
        ))}
      </div>
    </Modal>
  )
}
