import { Recipe } from "../../types";
import RecipeCard from "./RecipeCard";
import styles from "./FoundRecipes.module.css";

type FoundRecipes = {
  recipes: Recipe[];
};

function FoundRecipes({ recipes }: FoundRecipes) {
  return (
    <>
      <div className={styles["recipesHeader"]}>
        <h2 className="bold">found recipes</h2>
        <p>{`${recipes.length} recipe(s)`}</p>
      </div>
      <div className={styles["recipeOutput"]} id="recipeOutput">
        {recipes.map((recipe: Recipe) => {
          return (
            <RecipeCard key={`${recipe.id}-${recipe.title}`} recipe={recipe} />
          );
        })}
      </div>
    </>
  );
}
export default FoundRecipes;
