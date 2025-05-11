import { Recipe } from "../../types";
import RecipeCard from "./RecipeCard";
import styles from "./FoundRecipes.module.css";

type FoundRecipes = {
  recipes: Recipe[];
  onSave: (recipe: Recipe) => void;
};

export default function FoundRecipes({ recipes, onSave }: FoundRecipes) {
  return (
    <>
      <div className={styles["recipesHeader"]}>
        <h2 className="bold">found recipes</h2>
        <p>{`${recipes.length} recipe(s)`}</p>
      </div>
      <div className={styles["recipeOutput"]} id="recipeOutput">
        {recipes.map((recipe: Recipe) => {
          // TODO: check if recipe is saved in database
          return (
            <RecipeCard
              key={`${recipe.id}-${recipe.title}`}
              recipe={recipe}
              isSaved={false}
              onSave={onSave}
            />
          );
        })}
      </div>
    </>
  );
}
