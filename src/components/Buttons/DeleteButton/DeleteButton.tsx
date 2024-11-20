import styles from "./DeleteButton.module.scss"

interface DeleteButtonProps {
  onClick: (e: React.MouseEvent) => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button className={styles["delete-button"]} onClick={onClick}>
      x
    </button>
  )
}