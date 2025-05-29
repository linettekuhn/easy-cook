import { useEffect, useRef, useState } from "react";
import { fetchSavedRecipes } from "../../api/firestore";
import { Day, Recipe } from "../../types";
import { DayHeader } from "./DayHeader";
import MealRecipes from "./MealRecipes";
import styles from "./DaySummary.module.css";

type DaySummaryProps = {
  day: Day;
  setDay: (day: Day) => void;
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "error" | "warning" | "success") => void;
};
export default function DaySummary({
  day,
  setDay,
  setAlertMessage,
  setAlertType,
}: DaySummaryProps) {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const loaded = useRef(false);
  useEffect(() => {
    const loadSavedRecipes = async () => {
      if (loaded.current) return;
      loaded.current = true;
      try {
        const saved = await fetchSavedRecipes();
        setSavedRecipes(saved);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setAlertMessage(error.message);
          setAlertType("error");
        }
      }
    };

    loadSavedRecipes();
  }, []);

  const [localBreakfast, setLocalBreakfast] = useState<Recipe[]>(
    day.breakfastRecipes || []
  );
  const [localLunch, setLocalLunch] = useState<Recipe[]>(
    day.lunchRecipes || []
  );
  const [localDinner, setLocalDinner] = useState<Recipe[]>(
    day.dinnerRecipes || []
  );

  useEffect(() => {
    setLocalBreakfast(day.breakfastRecipes);
    setLocalLunch(day.lunchRecipes);
    setLocalDinner(day.dinnerRecipes);
  }, [day]);

  const updateDay = (
    breakfast = localBreakfast,
    lunch = localLunch,
    dinner = localDinner
  ) => {
    const newDay: Day = {
      ...day,
      breakfastRecipes: breakfast,
      lunchRecipes: lunch,
      dinnerRecipes: dinner,
    };
    setDay(newDay);
  };

  const handleSetBreakfast = (recipes: Recipe[]) => {
    setLocalBreakfast(recipes);
    updateDay(recipes, localLunch, localDinner);
  };

  const handleSetLunch = (recipes: Recipe[]) => {
    setLocalLunch(recipes);
    updateDay(localBreakfast, recipes, localDinner);
  };

  const handleSetDinner = (recipes: Recipe[]) => {
    setLocalDinner(recipes);
    updateDay(localBreakfast, localLunch, recipes);
  };

  const getCalories = (recipes: Recipe[]) => {
    let calorieSum = 0;
    recipes.forEach((recipe: Recipe) => {
      const caloriesNutrient = recipe.nutrients.find(
        (nutrient) => nutrient.name === "Calories"
      );
      calorieSum += caloriesNutrient?.amount || 0;
    });
    return calorieSum;
  };

  const breakfastCalories = Math.round(getCalories(localBreakfast));
  const lunchCalories = Math.round(getCalories(localLunch));
  const dinnerCalories = Math.round(getCalories(localDinner));

  return (
    <div className={styles.dayOutput}>
      <DayHeader
        date={day.date}
        totalCalories={breakfastCalories + lunchCalories + dinnerCalories}
      />
      <div className={styles.daySummary}>
        <MealRecipes
          mealType="Breakfast"
          calories={breakfastCalories}
          savedRecipes={savedRecipes}
          mealRecipes={localBreakfast}
          setRecipes={handleSetBreakfast}
          setAlertMessage={setAlertMessage}
          setAlertType={setAlertType}
        />
        <MealRecipes
          mealType="Lunch"
          calories={lunchCalories}
          savedRecipes={savedRecipes}
          mealRecipes={localLunch}
          setRecipes={handleSetLunch}
          setAlertMessage={setAlertMessage}
          setAlertType={setAlertType}
        />
        <MealRecipes
          mealType="Dinner"
          calories={dinnerCalories}
          savedRecipes={savedRecipes}
          mealRecipes={localDinner}
          setRecipes={handleSetDinner}
          setAlertMessage={setAlertMessage}
          setAlertType={setAlertType}
        />
      </div>
    </div>
  );
}
