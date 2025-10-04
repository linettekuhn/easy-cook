import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import MenuIcon from "./buttons/MenuIcon";
import { GiChefToque } from "react-icons/gi";
import { GiCurvyKnife } from "react-icons/gi";
import { GiPaperBagOpen } from "react-icons/gi";
import { GiOpenedFoodCan } from "react-icons/gi";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    const isOpen = !menuOpen;
    setMenuOpen(isOpen);
  };
  return (
    <>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <MenuIcon isOpen={menuOpen} />
      </button>

      {createPortal(
        <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          <Link className={`${styles.link} ${styles.recipes}`} to={"/recipes"}>
            <GiChefToque /> recipes
          </Link>
          <Link className={`${styles.link} ${styles.pantry}`} to={"/pantry"}>
            <GiOpenedFoodCan />
            pantry
          </Link>
          <Link className={`${styles.link} ${styles.mealPlan}`} to={"/plan"}>
            <GiCurvyKnife />
            meal plan
          </Link>
          <Link
            className={`${styles.link} ${styles.groceries}`}
            to={"/groceries"}
          >
            <GiPaperBagOpen />
            groceries
          </Link>
        </div>,
        document.body
      )}
    </>
  );
}
