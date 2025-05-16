import { useState } from "react";
import { Ingredient } from "../../types";
import styles from "./IngredientCard.module.css";

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
  return (
    <div
      className={styles.ingredientCard}
      data-ingredient-id={localIngredient.id}
    >
      <button
        className="removeFromList"
        onClick={() => onRemove(localIngredient)}
      >
        x
      </button>
      <img
        className={styles.ingredientImage}
        src={`https://img.spoonacular.com/ingredients_250x250/${localIngredient.image}`}
        alt={localIngredient.name}
      />
      <h4 className={styles.ingredientTitle}>{localIngredient.name}</h4>
      <form action="" className="ingredientAmountForm">
        <label>x</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            const newIngredient = localIngredient;
            newIngredient.measures.us.amount = Number(e.target.value);
            onChange(newIngredient);
            setLocalIngredient(newIngredient);
            setAmount(Number(e.target.value));
          }}
          min="1"
          max="100"
          step="1"
          placeholder="1"
          required
        />
        <h5 className={styles.ingredientQuantity}>
          {localIngredient.measures.us.unitShort}
        </h5>
      </form>
    </div>
  );
}
