import { useEffect, useState } from "react";
import { Recipe } from "../../types";
import styles from "./RecipeSelection.module.css";
import RecipeSummary from "./RecipeSummary";
import BackButton from "../buttons/BackButton";

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
    <div className={styles.recipesModal}>
      <div className={styles.recipesContent}>
        <h2>
          <span className="bold">add</span> a recipe
        </h2>
        <BackButton onClick={onClose} text="BACK TO PLANNER" />
        <div className={styles.savedRecipes}>
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
