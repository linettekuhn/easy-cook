import { useEffect, useRef, useState } from "react";
import AutocompleteIngredientSearch from "../components/pantry/AutocompleteIngredientSearch";
import { IngredientData, Recipe } from "../types";
import IngredientCard from "../components/pantry/IngredientCard";
import styles from "./Pantry.module.css";
import Header from "../components/pantry/Header";
import {
  fetchSavedIngredients,
  fetchSavedRecipes,
  saveIngredients,
  saveRecipes,
} from "../api/firestore";
import NavigationBar from "../components/NavigationBar";
import { fetchPantryRecipes, fetchRecipeInfo } from "../api/spoonacular";
import parseRecipeData from "../util/parseRecipeData";
import BackButton from "../components/buttons/BackButton";
import FoundRecipes from "../components/recipes/FoundRecipes";

export default function Pantry() {
  const [savedIngredients, setSavedIngredients] = useState<IngredientData[]>(
    []
  );
  const [originalSavedIngredients, setOriginalSavedIngredients] = useState<
    IngredientData[]
  >([]);
  const [loading, setLoading] = useState(true);

  const savedIngredientsLoaded = useRef(false);
  useEffect(() => {
    const loadSavedIngredients = async () => {
      if (savedIngredientsLoaded.current) return;
      savedIngredientsLoaded.current = true;

      const saved = await fetchSavedIngredients();
      setSavedIngredients(saved);
      setOriginalSavedIngredients(saved);
      console.log(saved);
    };

    loadSavedIngredients();
  }, []);

  // set loading to false once week loaded
  useEffect(() => {
    if (savedIngredients.length > 0) {
      setLoading(false);
    }
  }, [savedIngredients]);

  const handleIngredientsChange = async (newIngredients: IngredientData[]) => {
    setSavedIngredients(newIngredients);
    await saveIngredients(newIngredients, originalSavedIngredients);
    setOriginalSavedIngredients(newIngredients);
  };

  const handleIngredientRemove = (ingredientToRemove: IngredientData) => {
    const newIngredients = savedIngredients.filter(
      (ingredient) => ingredient.id !== ingredientToRemove.id
    );
    handleIngredientsChange(newIngredients);
  };

  const handleIngredientSave = (ingredientToSave: IngredientData) => {
    const isSaved = savedIngredients.some(
      (ingredient) => ingredient.id === ingredientToSave.id
    );

    if (!isSaved) {
      const newIngredients = [...savedIngredients, ingredientToSave];
      handleIngredientsChange(newIngredients);
    } else {
      console.log(`ingredient ${ingredientToSave.name} is already saved`);
    }
  };

  const [showFoundRecipes, setShowFoundRecipes] = useState(false);
  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [originalSavedRecipes, setOriginalSavedRecipes] = useState<Recipe[]>(
    []
  );

  const savedRecipesLoaded = useRef(false);
  useEffect(() => {
    const loadSavedRecipes = async () => {
      if (savedRecipesLoaded.current) return;
      savedRecipesLoaded.current = true;
      const saved = await fetchSavedRecipes();
      setSavedRecipes(saved);
      setOriginalSavedRecipes(saved);
      console.log(saved);
    };

    loadSavedRecipes();
  }, []);

  const handleSearch = async () => {
    if (savedIngredients.length < 1) {
      alert("Add ingredients to pantry before using this");
      return;
    }

    const results = await fetchPantryRecipes(savedIngredients);
    console.log(results);

    const recipes = [];
    for (let i = 0; i < results.length; i++) {
      const id = results[i].id;
      const recipeData = await fetchRecipeInfo(id);
      const recipe: Recipe = recipeData.directions
        ? recipeData
        : parseRecipeData(recipeData, id);
      recipes.push(recipe);
    }
    setFoundRecipes(recipes);
    setShowFoundRecipes(true);
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
  const handleRecipeRemove = (recipeToRemove: Recipe) => {
    const newSavedRecipes = savedRecipes.filter((recipe) => {
      if (recipeToRemove.id === -1 && recipe.id === -1) {
        return recipe.sourceURL !== recipeToRemove.sourceURL;
      }
      return recipe.id !== recipeToRemove.id;
    });
    handleRecipesChange(newSavedRecipes);
  };
  const handleBack = () => {
    setShowFoundRecipes(false);
    setFoundRecipes([]);
  };

  return (
    <>
      <NavigationBar theme="red" />
      <main data-theme="red">
        {showFoundRecipes ? (
          <>
            <BackButton onClick={handleBack} text="BACK TO PANTRY" />
            <FoundRecipes
              recipes={foundRecipes}
              savedRecipes={savedRecipes}
              onSave={handleRecipeSave}
              onRemove={handleRecipeRemove}
            />
          </>
        ) : (
          <>
            <Header />
            {loading ? (
              <p>Loading ingredients</p>
            ) : (
              <div className={styles.pantryIngredients}>
                <AutocompleteIngredientSearch onSave={handleIngredientSave} />
                <div className={styles.ingredientsOutput}>
                  {savedIngredients.map((ingredient) => {
                    if (ingredient) {
                      return (
                        <IngredientCard
                          key={ingredient.id}
                          ingredient={ingredient}
                          onRemove={handleIngredientRemove}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            )}
            <div className={styles.pantryRecipeSearch}>
              <h3>
                <span className="bold">find</span> recipes
              </h3>
              <h4 className="italic">with ingredients you have</h4>
              <button className="button" type="button" onClick={handleSearch}>
                search
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
