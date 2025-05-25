import { useState } from "react";
import RecipeSelection from "./RecipeSelection";
import { Recipe } from "../../types";
import { CgAddR } from "react-icons/cg";

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
      <button
        className="iconButton"
        type="button"
        onClick={() => setHidden(false)}
      >
        <CgAddR />
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
