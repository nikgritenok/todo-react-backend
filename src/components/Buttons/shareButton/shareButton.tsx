import { useState } from "react"
import icon_share from "../../../assets/icon/icon_share.svg"
import { ShareModal } from "../../Modals/ShareModal/ShareModal"
import styles from "./ShareButton.module.scss"

export const ShareButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <button className={styles["share_button"]} onClick={openModal}>
        <img src={icon_share} alt="share" />
      </button>
      <ShareModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
