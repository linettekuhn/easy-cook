import { IoIosArrowRoundForward } from "react-icons/io";
import styles from "./ForwardButton.module.css";
import { easeOut, motion } from "motion/react";
import { useState } from "react";

type ForwardButtonProps = {
  onClick: () => void;
  text: string;
};

export default function ForwardButton({ onClick, text }: ForwardButtonProps) {
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
        className={styles.moreButton}
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
        <span className={styles.text}>{text}</span>
        <motion.span
          initial="idle"
          animate={hovered ? "hover" : "idle"}
          variants={arrowVariants}
        >
          <IoIosArrowRoundForward className={styles.icon} />
        </motion.span>
      </motion.button>
    </div>
  );
}
