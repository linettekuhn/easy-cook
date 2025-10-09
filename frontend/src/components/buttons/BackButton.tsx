import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "./BackButton.module.css";
import { easeOut, motion } from "motion/react";
import { useState } from "react";

type BackButtonProps = {
  onClick: () => void;
  text: string;
};

export default function BackButton({ onClick, text }: BackButtonProps) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      onClick();
    }, 200);
  };

  const arrowVariants = {
    idle: { x: 0 },
    hover: {
      x: [0, -2, 0, 2, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: easeOut,
      },
    },
  };

  const buttonVariants = {
    idle: { scale: 1, letterSpacing: "0px" },
    hover: { scale: 1.1, letterSpacing: "1px" },
  };
  return (
    <div className={styles.wrapper}>
      <motion.button
        className={styles.backButton}
        variants={buttonVariants}
        initial="idle"
        animate="idle"
        whileHover={"hover"}
        whileTap={{ scale: 1 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 500,
        }}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.span
          initial="idle"
          animate={hovered ? "hover" : "idle"}
          variants={arrowVariants}
        >
          <IoIosArrowRoundBack className={styles.icon} />
        </motion.span>
        <span className={styles.text}>{text}</span>
      </motion.button>
    </div>
  );
}
