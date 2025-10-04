import styles from "./MenuIcon.module.css";

export default function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="27"
      height="28"
      viewBox="0 0 27 29"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.menu} ${isOpen ? styles.open : styles.closed}`}
    >
      <g>
        <path
          className={styles.bottomBar}
          d="M0 28H27"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          className={styles.centerBar}
          d="M0 14H27"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          className={styles.topBar}
          d="M0 1H27"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
