import styles from "./Pagination.module.scss"
import icon_left from "../../assets/icon/icon_left.svg"
import icon_right from "../../assets/icon/icon_right.svg"
import { useState } from "react"

export const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedValue, setSelectedValue] = useState("option1")

  const handlePageChange = (direction: "prev" | "next") => {
    setCurrentPage((prev) =>
      direction === "prev" ? Math.max(prev - 1, 1) : prev + 1,
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value)
  }

  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination__block"]}>
        <button
          className={styles["pagination__button"]}
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          <img src={icon_left} alt="" />
        </button>
        <span className={styles["pagination__current-page"]}>
          {currentPage} page
        </span>
        <button
          className={styles["pagination__button"]}
          onClick={() => handlePageChange("next")}
        >
          <img src={icon_right} alt="" />
        </button>
      </div>
      <select
        className={styles["pagination__items-per-page"]}
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="10">10 задач</option>
        <option value="20">20 задач</option>
        <option value="30">30 задач</option>
      </select>
    </div>
  )
}
