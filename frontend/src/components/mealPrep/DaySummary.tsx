import { useEffect, useRef, useState } from "react";
import { fetchSavedRecipes } from "../../api/firestore";
import { Day, Recipe } from "../../types";
import { DayHeader } from "./DayHeader";
import MealRecipes from "./MealRecipes";
import styles from "./DaySummary.module.css";

type DaySummaryProps = {
  day: Day;
  setDay: (day: Day) => void;
};
export default function DaySummary({ day, setDay }: DaySummaryProps) {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const loaded = useRef(false);
  useEffect(() => {
    const loadSavedRecipes = async () => {
      if (loaded.current) return;
      loaded.current = true;
      const saved = await fetchSavedRecipes();
      setSavedRecipes(saved);
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
        />
        <MealRecipes
          mealType="Lunch"
          calories={lunchCalories}
          savedRecipes={savedRecipes}
          mealRecipes={localLunch}
          setRecipes={handleSetLunch}
        />
        <MealRecipes
          mealType="Dinner"
          calories={dinnerCalories}
          savedRecipes={savedRecipes}
          mealRecipes={localDinner}
          setRecipes={handleSetDinner}
        />
      </div>
    </div>
  );
}
