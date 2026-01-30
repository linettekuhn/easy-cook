import { useEffect, useRef, useState } from "react";
import Header from "../components/recipes/Header";
import RecipeLookupForm from "../components/recipes/RecipeLookupForm";
import SavedRecipes from "../components/recipes/SavedRecipes";
import { Recipe } from "../types";
import { fetchSavedRecipes, saveRecipes } from "../api/firestore";
import FoundRecipes from "../components/recipes/FoundRecipes";
import BackButton from "../components/buttons/BackButton";
import AlertMessage from "../components/AlertMessage";
import FadeInStaggerChild from "../components/animations/FadeInStaggerChild";
import FadeInStaggerParent from "../components/animations/FadeInStaggerParent";

export default function Recipes() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "warning" | "success">(
    "error"
  );
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [originalSavedRecipes, setOriginalSavedRecipes] = useState<Recipe[]>(
    []
  );
  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>([]);
  const [showFoundRecipes, setShowFoundRecipes] = useState(false);

  const loaded = useRef(false);
  useEffect(() => {
    const loadSavedRecipes = async () => {
      if (loaded.current) return;
      loaded.current = true;
      try {
        const saved = await fetchSavedRecipes();
        setSavedRecipes(saved);
        setOriginalSavedRecipes(saved);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setAlertMessage(error.message);
          setAlertType("error");
        }
      }
    };

    loadSavedRecipes();
  }, []);

  const handleRecipesChange = async (newRecipes: Recipe[]) => {
    setSavedRecipes(newRecipes);
    try {
      await saveRecipes(newRecipes, originalSavedRecipes);
      setAlertMessage("Saved recipes changed!");
      setAlertType("success");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAlertMessage(error.message);
        setAlertType("error");
      }
    }
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
      setAlertMessage("Recipe is already saved");
      setAlertType("warning");
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
    <FadeInStaggerParent data-theme="blue">
      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage(null)}
        />
      )}
      {showFoundRecipes ? (
        <>
          <BackButton onClick={handleBack} text="BACK TO RECIPES" />
          <FadeInStaggerChild>
            <FoundRecipes
              recipes={foundRecipes}
              savedRecipes={savedRecipes}
              onSave={handleRecipeSave}
              onRemove={handleRecipeRemove}
            />
          </FadeInStaggerChild>
        </>
      ) : (
        <>
          <FadeInStaggerChild>
            <Header />
          </FadeInStaggerChild>
          <FadeInStaggerChild>
            <RecipeLookupForm
              onFoundRecipes={handleFoundRecipes}
              setAlertMessage={setAlertMessage}
              setAlertType={setAlertType}
            />
          </FadeInStaggerChild>
          <FadeInStaggerChild>
            <SavedRecipes
              recipes={savedRecipes}
              onSave={handleRecipeSave}
              onRemove={handleRecipeRemove}
            />
          </FadeInStaggerChild>
        </>
      )}
    </FadeInStaggerParent>
  );
}
