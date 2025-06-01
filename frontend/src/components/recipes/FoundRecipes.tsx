import { Recipe } from "../../types";
import RecipeCard from "./RecipeCard";
import styles from "./FoundRecipes.module.css";

type FoundRecipes = {
  recipes: Recipe[];
  savedRecipes: Recipe[];
  onSave: (recipe: Recipe) => void;
  onRemove: (recipe: Recipe) => void;
};

export default function FoundRecipes({
  recipes,
  savedRecipes,
  onSave,
  onRemove,
}: FoundRecipes) {
  return (
    <>
      <div className={styles["recipesHeader"]}>
        <h1 className="bold">found recipes</h1>
        <h2>{`${recipes.length} recipe(s)`}</h2>
      </div>
      <div className={styles["recipeOutput"]} id="recipeOutput">
        {recipes.map((recipe: Recipe) => {
          const isSaved = savedRecipes.some((saved) => {
            if (recipe.id === -1) {
              return saved.sourceURL === recipe.sourceURL;
            }
            return saved.id === recipe.id;
          });
          return (
            <RecipeCard
              key={`${recipe.id}-${recipe.title}`}
              recipe={recipe}
              isSaved={isSaved}
              onSave={onSave}
              onRemove={onRemove}
            />
          );
        })}
      </div>
    </>
  );
}
