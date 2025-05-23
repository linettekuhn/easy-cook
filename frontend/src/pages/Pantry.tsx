import { useEffect, useRef, useState } from "react";
import AutocompleteIngredientSearch from "../components/pantry/AutocompleteIngredientSearch";
import { IngredientData } from "../types";
import IngredientCard from "../components/pantry/IngredientCard";
import styles from "./Pantry.module.css";
import Header from "../components/pantry/Header";
import PantryRecipeLookup from "../components/pantry/PantryRecipeLookup";
import { fetchSavedIngredients, saveIngredients } from "../api/firestore";
import NavigationBar from "../components/NavigationBar";

export default function Pantry() {
  const [savedIngredients, setSavedIngredients] = useState<IngredientData[]>(
    []
  );
  const [originalSavedIngredients, setOriginalSavedIngredients] = useState<
    IngredientData[]
  >([]);
  const [loading, setLoading] = useState(true);

  const loaded = useRef(false);
  useEffect(() => {
    const loadSavedIngredients = async () => {
      if (loaded.current) return;
      loaded.current = true;

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

  return (
    <>
      <NavigationBar theme="red" />
      <main data-theme="red">
        <Header />
        {loading ? (
          <p>Loading ingredients</p>
        ) : (
          <>
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
          </>
        )}

        <PantryRecipeLookup ingredients={savedIngredients} />
      </main>
    </>
  );
}
