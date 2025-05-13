import { useEffect, useState } from "react";
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
  useEffect(() => {
    const loadSavedRecipes = async () => {
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

  return (
    <div className="dayOutput">
      <DayHeader date={day.date} totalCalories={day.calories} />
      <div className="daySummary">
        <div className="breakfast">
          <MealHeader mealType="Breakfast" calories={0} />
          <MealRecipes
            savedRecipes={savedRecipes}
            mealRecipes={localBreakfast}
            setRecipes={handleSetBreakfast}
          />
        </div>
        <div className="lunch">
          <MealHeader mealType="Lunch" calories={0} />
          <MealRecipes
            savedRecipes={savedRecipes}
            mealRecipes={localLunch}
            setRecipes={handleSetLunch}
          />
        </div>
        <div className="dinner">
          <MealHeader mealType="Dinner" calories={0} />
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
