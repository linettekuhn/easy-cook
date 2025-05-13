import { useEffect, useState } from "react";
import { Recipe } from "../../types";
import RecipesModal from "./RecipesModal";
import RecipeSummary from "./RecipeSummary";

type MealRecipesProps = {
  savedRecipes: Recipe[];
  mealRecipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
};

export default function MealRecipes({
  savedRecipes,
  mealRecipes,
  setRecipes,
}: MealRecipesProps) {
  const [localRecipes, setLocalRecipes] = useState<Recipe[]>([]);
  useEffect(() => setLocalRecipes(mealRecipes), [mealRecipes]);

  const handleAddToMeal = (recipeToAdd: Recipe) => {
    const isAdded = localRecipes.some((recipe) => {
      if (recipeToAdd.id === -1) {
        return recipe.sourceURL === recipeToAdd.sourceURL;
      }
      return recipe.id === recipeToAdd.id;
    });

    if (!isAdded) {
      const newMealRecipes = [...localRecipes, recipeToAdd];
      setRecipes(newMealRecipes);
    } else {
      console.log(`recipe ${recipeToAdd.title} is already in this meal`);
    }
  };

  const handleRemoveFromMeal = (recipeToRemove: Recipe) => {
    const newMealRecipes = localRecipes.filter((recipe) => {
      if (recipeToRemove.id === -1 && recipe.id === -1) {
        return recipe.sourceURL !== recipeToRemove.sourceURL;
      }
      return recipe.id !== recipeToRemove.id;
    });
    setRecipes(newMealRecipes);
  };

  return (
    <>
      <RecipesModal savedRecipes={savedRecipes} onAddToMeal={handleAddToMeal} />
      <div className="recipeContainer">
        {localRecipes.map((recipe) => (
          <RecipeSummary
            key={recipe.id}
            recipe={recipe}
            onRemoveFromMeal={handleRemoveFromMeal}
          />
        ))}
      </div>
    </>
  );
}
