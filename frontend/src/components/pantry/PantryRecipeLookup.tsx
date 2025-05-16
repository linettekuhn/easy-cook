import { useEffect, useState } from "react";
import { fetchPantryRecipes, fetchRecipeInfo } from "../../api/spoonacular";
import { IngredientData, Recipe } from "../../types";
import parseRecipeData from "../../util/parseRecipeData";
import FoundRecipes from "../recipes/FoundRecipes";
import { fetchSavedRecipes, saveRecipes } from "../../api/firestore";

type PantryRecipeLookupProps = {
  ingredients: IngredientData[];
};

export default function PantryRecipeLookup({
  ingredients,
}: PantryRecipeLookupProps) {
  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>([]);
  const [hidden, setHidden] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [originalSavedRecipes, setOriginalSavedRecipes] = useState<Recipe[]>(
    []
  );
  useEffect(() => {
    const loadSavedRecipes = async () => {
      const saved = await fetchSavedRecipes();
      setSavedRecipes(saved);
      setOriginalSavedRecipes(saved);
      console.log(saved);
    };

    loadSavedRecipes();
  }, []);

  const handleSearch = async () => {
    if (ingredients.length < 1) {
      alert("Add ingredients to pantry before using this");
      return;
    }

    const results = await fetchPantryRecipes(ingredients);
    console.log(results);

    const recipes = [];
    for (let i = 0; i < results.length; i++) {
      const id = results[i].id;
      const recipeData = await fetchRecipeInfo(id);
      const recipe: Recipe = parseRecipeData(recipeData, id);
      recipes.push(recipe);
    }
    setFoundRecipes(recipes);
    setHidden(false);
  };

  const handleRecipesChange = async (newRecipes: Recipe[]) => {
    setSavedRecipes(newRecipes);
    await saveRecipes(newRecipes, originalSavedRecipes);
    setOriginalSavedRecipes(newRecipes);
  };
  const handleRecipeSave = (recipeToSave: Recipe) => {
    const isSaved = savedRecipes.some((recipe) => {
      if (recipeToSave.id === -1) {
        return recipe.sourceURL === recipeToSave.sourceURL;
      }
      return recipe.id === recipeToSave.id;
    });

    if (!isSaved) {
      const newSavedRecipes = [...savedRecipes, recipeToSave];
      handleRecipesChange(newSavedRecipes);
    } else {
      console.log(`recipe ${recipeToSave.title} is already saved`);
    }
  };

  return (
    <div className="recipeLookup">
      <h3 className="recipeLookupTitle">
        <span className="bold">find</span> recipes
      </h3>
      <h4>with ingredients you have</h4>
      <button
        className="button"
        type="button"
        data-id="search-btn"
        onClick={handleSearch}
      >
        search
      </button>
      {!hidden && (
        <FoundRecipes recipes={foundRecipes} onSave={handleRecipeSave} />
      )}
    </div>
  );
}
