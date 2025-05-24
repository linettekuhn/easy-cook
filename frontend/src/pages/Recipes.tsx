import { useEffect, useState } from "react";
import Header from "../components/recipes/Header";
import RecipeLookupForm from "../components/recipes/RecipeLookupForm";
import SavedRecipes from "../components/recipes/SavedRecipes";
import { Recipe } from "../types";
import { fetchSavedRecipes, saveRecipes } from "../api/firestore";
import NavigationBar from "../components/NavigationBar";
import FoundRecipes from "../components/recipes/FoundRecipes";
//import styles from "./Recipes.module.css";
import BackButton from "../components/buttons/BackButton";

export default function Recipes() {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [originalSavedRecipes, setOriginalSavedRecipes] = useState<Recipe[]>(
    []
  );
  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>([]);
  const [showFoundRecipes, setShowFoundRecipes] = useState(false);

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
  const handleFoundRecipes = (recipes: Recipe[]) => {
    setFoundRecipes(recipes);
    setShowFoundRecipes(true);
  };
  const handleBack = () => {
    setShowFoundRecipes(false);
    setFoundRecipes([]);
  };
  return (
    <>
      <NavigationBar theme="blue" />
      <main data-theme="blue">
        {showFoundRecipes ? (
          <>
            <BackButton onClick={handleBack} text="BACK TO RECIPES" />
            <FoundRecipes recipes={foundRecipes} onSave={handleRecipeSave} />
          </>
        ) : (
          <>
            <Header />
            <RecipeLookupForm onFoundRecipes={handleFoundRecipes} />
            <SavedRecipes
              recipes={savedRecipes}
              onRemove={handleRecipeRemove}
            />
          </>
        )}
      </main>
    </>
  );
}
