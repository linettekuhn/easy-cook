import { useState } from "react";
import AutocompleteIngredientSearch from "../components/pantry/AutocompleteIngredientSearch";
import { IngredientData } from "../types";
import IngredientCard from "../components/pantry/IngredientCard";
import styles from "./Pantry.module.css";
import Header from "../components/pantry/Header";
import PantryRecipeLookup from "../components/pantry/PantryRecipeLookup";

export default function Pantry() {
  const [ingredients, setIngredients] = useState<IngredientData[]>([]);

  const handleIngredientRemove = (ingredientToRemove: IngredientData) => {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== ingredientToRemove.id
    );
    setIngredients(newIngredients);
  };

  const handleIngredientSave = (ingredientToSave: IngredientData) => {
    const isSaved = ingredients.some(
      (ingredient) => ingredient.id === ingredientToSave.id
    );

    if (!isSaved) {
      const newIngredients = [...ingredients, ingredientToSave];
      setIngredients(newIngredients);
    } else {
      console.log(`ingredient ${ingredientToSave.name} is already saved`);
    }
  };

  return (
    <>
      <Header />
      <AutocompleteIngredientSearch onSave={handleIngredientSave} />
      <div className={styles.ingredientsOutput}>
        {ingredients.map((ingredient) => {
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
      <PantryRecipeLookup ingredients={ingredients} />
    </>
  );
}
