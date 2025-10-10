import { useEffect, useRef, useState } from "react";
import styles from "./NumberInput.module.css";
import { motion, useMotionValue, useTransform } from "motion/react";
import DefaultButton from "./buttons/DefaultButton";
import { animate } from "motion";

type NumberInputProps = {
  quantity: number;
  setQuantity: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
};

export default function NumberInput({
  quantity,
  setQuantity,
  min = 1,
  max = 100,
  step = 1,
}: NumberInputProps) {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const count = useMotionValue(quantity);
  const displayCount = useTransform(count, (latest) => Math.round(latest));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // sync quantity with local quantity
  useEffect(() => {
    setQuantity(localQuantity);
  }, [localQuantity, setQuantity]);

  // sync motion value count to local quantity and animate changes
  useEffect(() => {
    const animation = animate(count, localQuantity, { duration: 0.25 });
    // stop animation if another click happens
    return () => animation.stop();
  }, [localQuantity, count]);

  const handleChange = (delta: number) => {
    setLocalQuantity((prev) => {
      let newQuantity = prev + delta;

      newQuantity = Math.max(min, Math.min(max, newQuantity));

      return Number(newQuantity.toFixed(0));
    });
  };

  const startCount = (delta: number) => {
    handleChange(delta);

    let interval = 220; // initial interval
    const minInterval = 40; // fastest speed
    const acceleration = 0.9;

    const stepCount = () => {
      handleChange(delta);

      interval = Math.max(minInterval, interval * acceleration);

      // recursive calls to set timeout to a faster interval over time
      intervalRef.current = setTimeout(stepCount, interval);
    };

    intervalRef.current = setTimeout(stepCount, interval);
  };

  const stopCount = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  return (
    <div className={styles.spinner}>
      <DefaultButton
        type="button"
        title="Click to decrease amount"
        className={styles.control}
        onMouseDown={() => startCount(-step)}
        onMouseUp={stopCount}
        onMouseLeave={stopCount}
      >
        –
      </DefaultButton>
      <motion.div className={styles.display}>{displayCount}</motion.div>
      <DefaultButton
        type="button"
        title="Click to increase amount"
        className={styles.control}
        onMouseDown={() => startCount(step)}
        onMouseUp={stopCount}
        onMouseLeave={stopCount}
      >
        +
      </DefaultButton>
    </div>
  );
}
