import { useEffect, useRef, useState } from "react";
import { fetchSavedRecipes } from "../../api/firestore";
import { Day, Recipe } from "../../types";
import { DayHeader } from "./DayHeader";
import MealHeader from "./MealHeader";
import MealRecipes from "./MealRecipes";

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

  const breakfastCalories = getCalories(localBreakfast);
  const lunchCalories = getCalories(localLunch);
  const dinnerCalories = getCalories(localDinner);

  return (
    <div className="dayOutput">
      <DayHeader
        date={day.date}
        totalCalories={breakfastCalories + lunchCalories + dinnerCalories}
      />
      <div className="daySummary">
        <div className="breakfast">
          <MealHeader mealType="Breakfast" calories={breakfastCalories} />
          <MealRecipes
            savedRecipes={savedRecipes}
            mealRecipes={localBreakfast}
            setRecipes={handleSetBreakfast}
          />
        </div>
        <div className="lunch">
          <MealHeader mealType="Lunch" calories={lunchCalories} />
          <MealRecipes
            savedRecipes={savedRecipes}
            mealRecipes={localLunch}
            setRecipes={handleSetLunch}
          />
        </div>
        <div className="dinner">
          <MealHeader mealType="Dinner" calories={dinnerCalories} />
          <MealRecipes
            savedRecipes={savedRecipes}
            mealRecipes={localDinner}
            setRecipes={handleSetDinner}
          />
        </div>
      </div>
    </div>
  );
}
