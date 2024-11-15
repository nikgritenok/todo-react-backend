import React from "react"
import icon_edit from "../../../assets/icon/icon_edit.svg"
import styles from "./EditButton.module.scss"

interface EditButtonProps {
  onClick: () => void
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button className={styles["edit_button"]} onClick={onClick}>
      <img src={icon_edit} alt="edit" />
    </button>
  )
}
