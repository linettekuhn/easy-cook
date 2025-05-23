import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <button className={styles.menuButton}>
        <Link to={"/recipes"}>Recipes</Link>
      </button>
      <button className={styles.menuButton}>
        <Link to={"/pantry"}>Pantry</Link>
      </button>
      <button className={styles.menuButton}>
        <Link to={"/plan"}>Meal Plan</Link>
      </button>
      <button className={styles.menuButton}>
        <Link to={"/groceries"}>Groceries</Link>
      </button>
    </div>
  );
}
