import icon_share from "../../assets/icon/icon_share.svg";
import icon_edit from "../../assets/icon/icon_edit.svg";
import styles from "./taskActions.module.scss";

export const TaskActions: React.FC = () => {
  return (
    <div className={styles["task-actions"]}>
      <div className={styles["block-buttons"]}>
        <button className={styles["block-buttons__button"]}>
          <img src={icon_share} alt="share" />
        </button>
        <button className={styles["block-buttons__button"]}>i</button>
        <button className={styles["block-buttons__button"]}>
          <img src={icon_edit} alt="edit" />
        </button>
      </div>
    </div>
  );
};
