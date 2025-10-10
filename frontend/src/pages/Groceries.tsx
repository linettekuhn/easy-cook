import { useEffect, useRef, useState } from "react";
import { fetchSavedWeek } from "../api/firestore";
import { Day, Ingredient, Recipe } from "../types";
import { buildEmptyWeek, getPreviousSunday } from "../util/plannerHelper";
import Header from "../components/groceries/Header";
import IngredientCard from "../components/groceries/IngredientCard";
import styles from "./Groceries.module.css";
//import FindNearbyStoresMap from "../components/groceries/FindNearbyStoresMap";
import NavigationBar from "../components/NavigationBar";
import AlertMessage from "../components/AlertMessage";
import FadeInStaggerParent from "../components/animations/FadeInStaggerParent";
import FadeInStaggerChild from "../components/animations/FadeInStaggerChild";
import DefaultButton from "../components/buttons/DefaultButton";

export default function Groceries() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "warning" | "success">(
    "error"
  );
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
      day.lunchRecipes.forEach((recipe: Recipe) => {
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
      day.dinnerRecipes.forEach((recipe: Recipe) => {
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
      try {
        const savedWeek = await fetchSavedWeek(defaultSunday);
        setWeek(savedWeek);
        getIngredients(savedWeek);
      } catch (error) {
        const defaultWeek = buildEmptyWeek(defaultSunday);
        setWeek(defaultWeek);
        if (error instanceof Error) {
          setAlertMessage("Loaded empty week");
          setAlertType("warning");
        }
      }
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
    setAlertMessage(`Ingredient removed: ${ingredientToRemove.name}`);
    setAlertType("success");
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

    setAlertMessage(`Grocery list downloaded as text file`);
    setAlertType("success");
  };

  return (
    <>
      <NavigationBar theme="red" />
      <FadeInStaggerParent data-theme="red">
        <FadeInStaggerChild>
          <Header />
        </FadeInStaggerChild>
        {alertMessage && (
          <AlertMessage
            message={alertMessage}
            type={alertType}
            onClose={() => setAlertMessage(null)}
          />
        )}
        {loading ? (
          <FadeInStaggerChild>
            <p>Loading current week...</p>
          </FadeInStaggerChild>
        ) : (
          <>
            <FadeInStaggerChild>
              <DefaultButton onClick={handleSaveToTextFile}>
                DOWNLOAD AS .TXT
              </DefaultButton>
            </FadeInStaggerChild>
            <div className={styles.ingredientOutput}>
              {ingredients.map((ingredient) => {
                if (ingredient) {
                  return (
                    <FadeInStaggerChild key={ingredient.id}>
                      <IngredientCard
                        ingredient={ingredient}
                        onRemove={handleIngredientRemove}
                        onChange={handleIngredientChange}
                      />
                    </FadeInStaggerChild>
                  );
                }
              })}
            </div>
            {/* TODO:FIX MAP!!!!!!!!!!!!! <div className={styles.nearbyStores}>
              <FadeInStaggerChild>
                <h2>
                  <span className="bold">find</span> nearby stores
                </h2>
              </FadeInStaggerChild>
              <FindNearbyStoresMap
                setAlertMessage={setAlertMessage}
                setAlertType={setAlertType}
              />
            </div> */}
          </>
        )}
      </FadeInStaggerParent>
    </>
  );
}
