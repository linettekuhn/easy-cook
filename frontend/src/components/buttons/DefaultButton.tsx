import { motion, type HTMLMotionProps } from "motion/react";
import styles from "./DefaultButton.module.css";

type ButtonProps = HTMLMotionProps<"button"> & {
  children: React.ReactNode;
};

export default function DefaultButton({ children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        backgroundColor: "var(--color-light)",
      }}
      whileTap={{ scale: 0.9, backgroundColor: "var(--color)" }}
      className={styles.button}
      {...props}
    >
      {children}
    </motion.button>
  );
}
