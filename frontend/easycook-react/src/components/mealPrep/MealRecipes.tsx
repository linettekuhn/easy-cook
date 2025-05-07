import { Recipe } from "../../types";
import RecipeSummary from "./RecipeSummary";

type MealRecipesProps = {
  recipes: Recipe[];
};

export default function MealRecipes({ recipes }: MealRecipesProps) {
  return (
    <div className="recipeContainer">
      {recipes.map((recipe) => (
        <RecipeSummary recipe={recipe} />
      ))}
    </div>
  );
}
