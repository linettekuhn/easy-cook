import { useEffect, useRef, useState } from "react";
import { fetchSavedWeek } from "../api/firestore";
import { Day, Ingredient, Recipe } from "../types";
import { getPreviousSunday } from "../util/plannerHelper";
import Header from "../components/groceries/Header";
import IngredientCard from "../components/groceries/IngredientCard";
import styles from "./Groceries.module.css";

export default function Groceries() {
  const [week, setWeek] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const getIngredients = (week: Day[]) => {
    const weekIngredients: Ingredient[] = [];
    week.forEach((day: Day) => {
      day.breakfastRecipes.forEach((recipe: Recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          const savedIngredient = weekIngredients.find(
            (weekIngredient) => weekIngredient.id === ingredient.id
          );
          if (savedIngredient) {
            savedIngredient.measures.us.amount += ingredient.measures.us.amount;
          } else {
            weekIngredients.push(ingredient);
          }
        });
      });
    });
    setIngredients(weekIngredients);
  };

  const loaded = useRef(false);
  useEffect(() => {
    const loadDefaultWeek = async () => {
      if (loaded.current) return;
      loaded.current = true;
      const defaultSunday = getPreviousSunday(new Date());
      const savedWeek = await fetchSavedWeek(defaultSunday);
      setWeek(savedWeek);
    };

    loadDefaultWeek();
  }, []);

  // set loading to false once week loaded
  useEffect(() => {
    if (week.length > 0) {
      getIngredients(week);
      setLoading(false);
    }
  }, [week]);

  const handleIngredientRemove = (ingredientToRemove: Ingredient) => {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== ingredientToRemove.id
    );
    setIngredients(newIngredients);
  };

  const handleIngredientChange = (newIngredient: Ingredient) => {
    const index = ingredients.findIndex(
      (ingridient) => ingridient.id === newIngredient.id
    );
    if (index !== -1) {
      const newIngredients = ingredients;
      ingredients[index] = newIngredient;
      setIngredients(newIngredients);
    }
  };

  const handleSaveToTextFile = () => {
    const ingredientsList = ingredients
      .map((ingredient) => {
        return `- ${ingredient.measures.us.amount.toFixed(2)} ${
          ingredient.measures.us.unitShort
        } ${ingredient.name}`;
      })
      .join("\n");

    const blob = new Blob([ingredientsList], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "grocery-list.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <main>
        <Header />
        {loading ? (
          <p>Loading current week...</p>
        ) : (
          <>
            <button
              className={styles.exportButton}
              onClick={handleSaveToTextFile}
            >
              Save grocery list as text file
            </button>
            <div className={styles.ingredientOutput}>
              {ingredients.map((ingredient) => {
                if (ingredient) {
                  return (
                    <IngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                      onRemove={handleIngredientRemove}
                      onChange={handleIngredientChange}
                    />
                  );
                }
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
}
