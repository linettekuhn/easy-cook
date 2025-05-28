import { useState } from "react";
import { Recipe } from "../../types";
import styles from "./RecipeSummary.module.css";
import { Link } from "react-router-dom";
import { CgCloseR } from "react-icons/cg";
import RecipeCard from "../recipes/RecipeCard";
import NumberInput from "../NumberInput";

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
    <>
      {onRemoveFromMeal ? (
        <div className={styles.recipeSummary}>
          <button
            className="iconButton"
            onClick={handleRemoveFromMealClick}
            title="Click to remove recipe"
          >
            <CgCloseR />
          </button>
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
      ) : null}
      {onAddToMeal ? (
        <div className={styles.recipeAdd}>
          <RecipeCard recipe={recipe} />
          <p>
            1 serving = {recipe.servingSize?.amount} {recipe.servingSize?.unit}
          </p>
          <NumberInput
            quantity={servingMultiplier}
            setQuantity={setServingMultiplier}
            min={1}
            max={10}
            step={0.1}
            placeholder="1"
          />
          <button className="button" onClick={handleAddToMealClick}>
            Add to meal
          </button>
        </div>
      ) : null}
    </>
  );
}
