import { Ingredient } from "../../types";
import styles from "./IngredientCard.module.css";

type IngredientProps = {
  ingredient: Ingredient;
};

export default function IngredientCard({ ingredient }: IngredientProps) {
  return (
    <div className={styles.ingredientCard} data-ingredient-id={ingredient.id}>
      <button className="removeFromList">x</button>
      <img
        className={styles.ingredientImage}
        src={`https://img.spoonacular.com/ingredients_250x250/${ingredient.image}`}
        alt={ingredient.name}
      />
      <h4 className={styles.ingredientTitle}>{ingredient.name}</h4>
      <h5 className={styles.ingredientQuantity}>
        x{ingredient.measures.us.amount} {ingredient.measures.us.unitShort}
      </h5>
      <button className="addToGroceries">add to list</button>
    </div>
  );
}
