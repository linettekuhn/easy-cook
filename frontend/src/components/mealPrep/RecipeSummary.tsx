import { useState } from "react";
import { Recipe } from "../../types";
import styles from "./RecipeSummary.module.css";
import { Link } from "react-router-dom";
import { CgCloseR } from "react-icons/cg";

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
        servingSize: recipe.servingSize
          ? {
              ...recipe.servingSize,
              amount: recipe.servingSize.amount * servingMultiplier,
            }
          : undefined,
      };

      onAddToMeal(adjustedRecipe);
    }
  };
  const handleRemoveFromMealClick = () => {
    if (onRemoveFromMeal) {
      onRemoveFromMeal(recipe);
    }
  };

  const getServing = () => {
    if (recipe.servingSize) {
      const recipeAmount = recipe.servingSize.amount * servingMultiplier;
      return `${recipeAmount.toFixed(2)} ${recipe.servingSize.unit}`;
    } else {
      return "";
    }
  };

  const getCalories = () => {
    if (caloriesNutrient) {
      const recipeCalories = caloriesNutrient.amount * servingMultiplier;
      return `(${recipeCalories.toFixed(0)} cal)`;
    } else {
      return "";
    }
  };

  return (
    <div className={styles.recipeCard}>
      <div className={styles.recipeSummary}>
        {onRemoveFromMeal ? (
          <button className="iconButton" onClick={handleRemoveFromMealClick}>
            <CgCloseR />
          </button>
        ) : null}
        <h4 className={styles.recipeTitle}>
          <Link
            to={`/recipe/${recipe.id === -1 ? recipe.sourceURL : recipe.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {recipe.title} — {getServing()} {getCalories()}
          </Link>
        </h4>
      </div>
      {onAddToMeal ? (
        <>
          <img
            src={recipe.img_src}
            alt={recipe.img_alt}
            className={styles.recipeImage}
          />
          <p className={styles.calories}>
            Total calories:{" "}
            {caloriesNutrient
              ? `${caloriesNutrient.amount} ${caloriesNutrient.unit}`
              : "Calories were not found"}
          </p>
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
            {recipe.servingSize ? (
              <p>
                1 serving = {recipe.servingSize?.amount}{" "}
                {recipe.servingSize?.unit}
              </p>
            ) : null}
          </form>
          <button className="button" onClick={handleAddToMealClick}>
            Add to meal
          </button>
        </>
      ) : null}
    </div>
  );
}
