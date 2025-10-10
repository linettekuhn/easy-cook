import { motion, type HTMLMotionProps } from "motion/react";

type DivProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

export default function FadeInStaggerChild({ children, ...props }: DivProps) {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  return (
    <motion.div className="wrapper" variants={variants} {...props}>
      {children}
    </motion.div>
  );
}
