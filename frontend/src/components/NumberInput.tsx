import { useEffect, useState } from "react";
import { CgRemoveR } from "react-icons/cg";
import { CgAddR } from "react-icons/cg";
import styles from "./NumberInput.module.css";

type NumberInputProps = {
  quantity: number;
  setQuantity: (value: number) => void;
};

export default function NumberInput({
  quantity,
  setQuantity,
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
            const newQuantity = Math.max(1, localQuantity - 1);
            setLocalQuantity(newQuantity);
          }}
        />
      </button>
      <input
        type="number"
        value={localQuantity}
        onChange={(e) => {
          setLocalQuantity(Number(e.target.value));
        }}
        min="1"
        max="100"
        placeholder="10"
      />
      <button type="button">
        <CgAddR
          onClick={() => {
            const newQuantity = Math.min(100, localQuantity + 1);
            setLocalQuantity(newQuantity);
          }}
        />
      </button>
    </div>
  );
}
