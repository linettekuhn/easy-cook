import { motion, stagger, type HTMLMotionProps } from "motion/react";

type DivProps = HTMLMotionProps<"main"> & {
  children: React.ReactNode;
};

export default function FadeInStaggerParent({ children, ...props }: DivProps) {
  const variants = {
    hidden: {},
    visible: {
      transition: { delayChildren: stagger(0.2) },
    },
  };
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.main>
  );
}
