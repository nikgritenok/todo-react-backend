import styles from "./PinButton.module.scss"
import icon_pin from "../../../assets/icon/icon_pin.svg"

interface PinButtonProps {
  onClick: (e: React.MouseEvent) => void
}

export const PinButton: React.FC<PinButtonProps> = ({ onClick }) => {
  return (
    <>
      <button className={styles["info_button"]} onClick={onClick}>
        <img src={icon_pin} alt="pin" />
      </button>
    </>
  )
}
