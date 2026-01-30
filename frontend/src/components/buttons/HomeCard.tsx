import { motion } from "motion/react";
import styles from "./HomeCard.module.css";
import { useState } from "react";

type Props = {
  title: string;
  link: string;
  filename: string;
  theme: string;
  message: string;
};

export default function HomeCard({
  title,
  link,
  filename,
  theme,
  message,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
      data-theme={theme}
      className={styles.cardWrapper}
      onClick={() => (window.location.href = `#${link}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className={styles.cardInner}
        animate={{ rotateY: hovered ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`${styles.cardFace} ${styles.front}`}>
          <img
            className={styles.image}
            src={`/images/${filename}`}
            alt={title}
          />
        </div>
        <div className={`${styles.cardFace} ${styles.back}`}>
          <h3>{message}</h3>
        </div>
      </motion.div>
      <div className={styles.title}>{title}</div>
    </motion.div>
  );
}
