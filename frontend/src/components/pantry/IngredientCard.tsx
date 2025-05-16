import { IngredientData } from "../../types";
import styles from "./IngredientCard.module.css";

type IngredientProps = {
  ingredient: IngredientData;
  onRemove: (ingredientToRemove: IngredientData) => void;
};

export default function IngredientCard({
  ingredient,
  onRemove,
}: IngredientProps) {
  return (
    <div className={styles.ingredientCard} data-ingredient-id={ingredient.id}>
      <button className="removeFromList" onClick={() => onRemove(ingredient)}>
        x
      </button>
      <img
        className={styles.ingredientImage}
        src={`https://img.spoonacular.com/ingredients_250x250/${ingredient.image}`}
        alt={ingredient.name}
      />
      <h4 className={styles.ingredientTitle}>{ingredient.name}</h4>
    </div>
  );
}
