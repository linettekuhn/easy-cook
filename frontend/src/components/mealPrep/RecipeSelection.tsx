import { useEffect, useState } from "react";
import { Recipe } from "../../types";
import styles from "./RecipeSelection.module.css";
import RecipeSummary from "./RecipeSummary";

type RecipeSelectionProps = {
  savedRecipes: Recipe[];
  onAddToMeal: (recipe: Recipe) => void;
  onClose: () => void;
};

export default function RecipeSelection({
  savedRecipes,
  onAddToMeal,
  onClose,
}: RecipeSelectionProps) {
  const [localSavedRecipes, setLocalSavedRecipes] =
    useState<Recipe[]>(savedRecipes);
  useEffect(() => setLocalSavedRecipes(savedRecipes), [savedRecipes]);
  return (
    <div className={styles["recipesModal"]}>
      <div className={styles["recipesContent"]}>
        <h2>
          <span className="bold">add</span> a recipe
        </h2>
        <button className="button" onClick={onClose}>
          x
        </button>
        <div className={styles["savedRecipes"]} id="savedRecipes">
          {Array.isArray(localSavedRecipes) &&
            localSavedRecipes.map((recipe: Recipe) => {
              if (recipe) {
                return (
                  <RecipeSummary
                    key={`${recipe.id}-${recipe.title}`}
                    recipe={recipe}
                    onAddToMeal={onAddToMeal}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}
