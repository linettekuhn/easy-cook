import { useState } from "react";
import { Ingredient } from "../../types";
import styles from "./IngredientCard.module.css";
import NumberInput from "../NumberInput";
import CloseIcon from "../../../public/icons/CloseIcon";

type IngredientProps = {
  ingredient: Ingredient;
  onRemove: (ingredientToRemove: Ingredient) => void;
  onChange: (newIngredient: Ingredient) => void;
};

export default function IngredientCard({
  ingredient,
  onRemove,
  onChange,
}: IngredientProps) {
  const [amount, setAmount] = useState(ingredient.measures.us.amount);
  const [localIngredient, setLocalIngredient] = useState(ingredient);

  const onAmountChange = (value: number) => {
    const newIngredient = localIngredient;
    newIngredient.measures.us.amount = value;
    onChange(newIngredient);
    setLocalIngredient(newIngredient);
    setAmount(value);
  };
  return (
    <div
      className={styles.ingredientCard}
      data-ingredient-id={localIngredient.id}
    >
      <div className={styles.removeButtonWrapper}>
        <button
          className={`${styles.removeButton} iconButton`}
          onClick={() => onRemove(ingredient)}
          title="Click to remove ingredient"
        >
          <CloseIcon className="fIconButton" />
        </button>
      </div>
      <img
        className={styles.ingredientImage}
        src={`https://img.spoonacular.com/ingredients_250x250/${localIngredient.image}`}
        alt={localIngredient.name}
      />
      <h4 className={styles.ingredientTitle}>{localIngredient.name}</h4>
      <NumberInput
        quantity={amount}
        setQuantity={onAmountChange}
        min={1}
        max={100}
        step={1}
        placeholder="1"
      />
      <p className={styles.ingredientQuantity}>
        {localIngredient.measures.us.unitShort}
      </p>
    </div>
  );
}
