import { Link } from "react-router-dom";
import styles from "./HomeButton.module.css";

export default function HomeButton() {
  return (
    <Link className={styles.logoButton} to={"/"}>
      <span className={styles.easy}>EASY</span>
      <span className={styles.cook}>cook</span>
    </Link>
  );
}
