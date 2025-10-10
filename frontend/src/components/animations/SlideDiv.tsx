import { motion, type HTMLMotionProps } from "motion/react";

type DivProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

export default function SlideDiv({ children, ...props }: DivProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
