import { useState } from "react";
import RecipeSelection from "./RecipeSelection";
import { Recipe } from "../../types";

type RecipesModalProps = {
  savedRecipes: Recipe[];
  onAddToMeal: (recipe: Recipe) => void;
};

export default function RecipesModal({
  savedRecipes,
  onAddToMeal,
}: RecipesModalProps) {
  const [hidden, setHidden] = useState(true);
  return (
    <>
      <button className="button" type="button" onClick={() => setHidden(false)}>
        +
      </button>
      {!hidden ? (
        <RecipeSelection
          savedRecipes={savedRecipes}
          onAddToMeal={onAddToMeal}
          onClose={() => setHidden(true)}
        />
      ) : null}
    </>
  );
}
