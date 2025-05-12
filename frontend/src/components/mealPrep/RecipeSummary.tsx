import { Recipe } from "../../types";
import styles from "./RecipeSummary.module.css";

type RecipeSummaryProps = {
  recipe: Recipe;
  onAddToMeal?: (recipe: Recipe) => void;
  onRemoveFromMeal?: (recipe: Recipe) => void;
};

export default function RecipeSummary({
  recipe,
  onAddToMeal,
  onRemoveFromMeal,
}: RecipeSummaryProps) {
  const caloriesNutrient = recipe.nutrients.find(
    (nutrient) => nutrient.name === "Calories"
  );
  const handleAddToMealClick = () => {
    if (onAddToMeal) {
      onAddToMeal(recipe);
    }
  };

  const handleRemoveFromMealClick = () => {
    if (onRemoveFromMeal) {
      onRemoveFromMeal(recipe);
    }
  };

  return (
    <div
      className={styles.recipeCard}
      data-recipe-id={recipe.id}
      data-recipe-url={recipe.sourceURL}
    >
      <h3 className={styles.recipeTitle}>{recipe.title}</h3>
      <img
        src={recipe.img_src}
        alt={recipe.img_alt}
        className={styles.recipeImage}
      />
      <h5 className={styles.calories}>
        Total calories:{" "}
        {caloriesNutrient
          ? `${caloriesNutrient.amount} ${caloriesNutrient.unit}`
          : "Calories were not found"}
      </h5>
      {onAddToMeal ? (
        <button className="button" onClick={handleAddToMealClick}>
          Add to meal
        </button>
      ) : (
        <button className="button" onClick={handleRemoveFromMealClick}>
          Remove from meal
        </button>
      )}
    </div>
  );
}
