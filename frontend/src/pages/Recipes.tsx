import { useEffect, useState } from "react";
import Header from "../components/recipes/Header";
import RecipeLookupForm from "../components/recipes/RecipeLookupForm";
import SavedRecipes from "../components/recipes/SavedRecipes";
import { Recipe } from "../types";
import { fetchSavedRecipes, saveRecipes } from "../api/firestore";
import NavigationBar from "../components/NavigationBar";

export default function Recipes() {
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
  const handleRecipeRemove = (recipeToRemove: Recipe) => {
    const newSavedRecipes = savedRecipes.filter((recipe) => {
      if (recipeToRemove.id === -1 && recipe.id === -1) {
        return recipe.sourceURL !== recipeToRemove.sourceURL;
      }
      return recipe.id !== recipeToRemove.id;
    });
    handleRecipesChange(newSavedRecipes);
  };
  return (
    <>
      <NavigationBar />
      <main>
        <Header />
        <RecipeLookupForm onRecipeSave={handleRecipeSave} />
        <SavedRecipes recipes={savedRecipes} onRemove={handleRecipeRemove} />
      </main>
    </>
  );
}
