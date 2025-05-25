import { useEffect, useState } from "react";
import { CgRemoveR } from "react-icons/cg";
import { CgAddR } from "react-icons/cg";
import styles from "./NumberInput.module.css";

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
  min,
  max,
  step,
  placeholder,
}: NumberInputProps) {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  useEffect(() => {
    setQuantity(localQuantity);
  }, [localQuantity, setQuantity]);
  return (
    <div className={styles.spinner}>
      <button type="button">
        <CgRemoveR
          onClick={() => {
            const newQuantity = Math.max(1, localQuantity - (step ? step : 1));
            setLocalQuantity(Number(newQuantity.toFixed(2)));
          }}
        />
      </button>
      <input
        type="number"
        value={localQuantity}
        onChange={(e) => {
          setLocalQuantity(Number(e.target.value));
        }}
        min={min ? min : 1}
        max={max ? max : 100}
        placeholder={placeholder ? placeholder : "10"}
      />
      <button type="button">
        <CgAddR
          onClick={() => {
            const newQuantity = Math.min(
              100,
              localQuantity + (step ? step : 1)
            );
            setLocalQuantity(Number(newQuantity.toFixed(2)));
          }}
        />
      </button>
    </div>
  );
}
