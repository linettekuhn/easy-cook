import { useState } from "react";
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
  const [servingMultiplier, setServingMultiplier] = useState(1);

  const handleAddToMealClick = () => {
    if (onAddToMeal) {
      const adjustedNutrients = recipe.nutrients.map((nutrient) => ({
        ...nutrient,
        amount: nutrient.amount * servingMultiplier,
      }));

      const adjustedRecipe: Recipe = {
        ...recipe,
        nutrients: adjustedNutrients,
        servingSize: {
          ...recipe.servingSize,
          amount: recipe.servingSize.amount * servingMultiplier,
        },
      };

      onAddToMeal(adjustedRecipe);
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
        <>
          <form action="" className="servingSizeForm">
            <label htmlFor="recipe-serving-size">serving size:</label>
            <input
              type="number"
              id="recipe-serving-size"
              value={servingMultiplier}
              onChange={(e) => {
                setServingMultiplier(Number(e.target.value));
              }}
              min="0.1"
              max="10"
              step="0.1"
              placeholder="1"
              required
            />
            <p>
              1 serving = {recipe.servingSize.amount} {recipe.servingSize.unit}
            </p>
          </form>
          <button className="button" onClick={handleAddToMealClick}>
            Add to meal
          </button>
        </>
      ) : (
        <button className="button" onClick={handleRemoveFromMealClick}>
          Remove from meal
        </button>
      )}
    </div>
  );
}
