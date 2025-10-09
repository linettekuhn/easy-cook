import { useEffect, useRef, useState } from "react";
import styles from "./NumberInput.module.css";
import { motion, spring, useMotionValue, useTransform } from "motion/react";
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
  placeholder = "10",
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

    intervalRef.current = setInterval(() => {
      handleChange(delta);
    }, 110);
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
      <input
        type="number"
        value={localQuantity}
        min={min}
        max={max}
        placeholder={placeholder}
        style={{ display: "none" }}
      />
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
