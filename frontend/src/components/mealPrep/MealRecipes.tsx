import { useEffect, useState } from "react";
import { Recipe } from "../../types";
import RecipesModal from "./RecipesModal";
import RecipeSummary from "./RecipeSummary";
import MealHeader from "./MealHeader";
import styles from "./MealRecipes.module.css";

type MealRecipesProps = {
  mealType: string;
  calories: number;
  savedRecipes: Recipe[];
  mealRecipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "error" | "warning" | "success") => void;
};

export default function MealRecipes({
  mealType,
  calories,
  savedRecipes,
  mealRecipes,
  setRecipes,
  setAlertMessage,
  setAlertType,
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
      setAlertMessage(`Recipe added to ${mealType.toLowerCase()}!`);
      setAlertType("success");
    } else {
      setAlertMessage(`Recipe already added to ${mealType.toLowerCase()}`);
      setAlertType("warning");
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
    setAlertMessage(`Recipe removed from ${mealType.toLowerCase()}!`);
    setAlertType("success");
  };

  return (
    <>
      <div className={styles.mealRecipeHeader}>
        <MealHeader mealType={mealType} calories={calories} />
        <RecipesModal
          savedRecipes={savedRecipes}
          onAddToMeal={handleAddToMeal}
        />
      </div>
      <div className={styles.recipeContainer}>
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
