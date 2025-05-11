import { useEffect, useState } from "react";
import { Recipe } from "../../types";
import RecipeCard from "./RecipeCard";
import styles from "./SavedRecipes.module.css";

export type SavedRecipes = {
  recipes: Recipe[];
  onRemove: (recipe: Recipe) => void;
};

export default function SavedRecipes({ recipes, onRemove }: SavedRecipes) {
  const [localSavedRecipes, setLocalSavedRecipes] = useState<Recipe[]>(recipes);
  useEffect(() => setLocalSavedRecipes(recipes), [recipes]);
  return (
    <>
      <div className={styles["recipesHeader"]}>
        <h2 className="bold">saved recipes</h2>
        <p>{`${
          Array.isArray(localSavedRecipes) ? localSavedRecipes.length : 0
        } recipe(s)`}</p>
      </div>
      <div className={styles["savedRecipes"]} id="savedRecipes">
        {Array.isArray(localSavedRecipes) &&
          localSavedRecipes.map((recipe: Recipe) => {
            if (recipe) {
              return (
                <RecipeCard
                  key={`${recipe.id}-${recipe.title}`}
                  recipe={recipe}
                  isSaved={true}
                  onRemove={onRemove}
                />
              );
            }
          })}
      </div>
    </>
  );
}
