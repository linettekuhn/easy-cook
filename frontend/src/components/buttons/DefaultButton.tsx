import { motion, type HTMLMotionProps } from "motion/react";
import styles from "./DefaultButton.module.css";

type ButtonProps = HTMLMotionProps<"button"> & {
  children: React.ReactNode;
};

export default function DefaultButton({ children, ...props }: ButtonProps) {
  return (
    <motion.button
      style={{ backgroundColor: "var(--color-lighter)" }}
      whileHover={{
        scale: 1.2,
        backgroundColor: "var(--color-light)",
      }}
      whileTap={{ scale: 0.9, backgroundColor: "var(--color)" }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 500,
      }}
      className={styles.button}
      {...props}
    >
      {children}
    </motion.button>
  );
}
