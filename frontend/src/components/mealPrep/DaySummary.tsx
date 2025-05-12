import { useEffect, useState } from "react";
import { fetchSavedRecipes } from "../../api/firestore";
import { Day, Recipe } from "../../types";
import { DayHeader } from "./DayHeader";
import MealHeader from "./MealHeader";
import MealRecipes from "./MealRecipes";

export default function DaySummary({
  date,
  calories,
  breakfastRecipes,
  lunchRecipes,
  dinnerRecipes,
}: Day) {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const loadSavedRecipes = async () => {
      const saved = await fetchSavedRecipes();
      setSavedRecipes(saved);
      console.log(saved);
    };

    loadSavedRecipes();
  }, []);

  const [localBreakfast, setLocalBreakfast] =
    useState<Recipe[]>(breakfastRecipes);
  const [localLunch, setLocalLunch] = useState<Recipe[]>(lunchRecipes);
  const [localDinner, setLocalDinner] = useState<Recipe[]>(dinnerRecipes);

  return (
    <div className="dayOutput">
      <DayHeader date={date} totalCalories={calories} />
      <div className="daySummary">
        <div className="breakfast">
          <MealHeader mealType="Breakfast" calories={0} />
          <MealRecipes
            savedRecipes={savedRecipes}
            mealRecipes={localBreakfast}
            setRecipes={setLocalBreakfast}
          />
        </div>
        <div className="lunch">
          <MealHeader mealType="Lunch" calories={0} />
          <MealRecipes
            savedRecipes={savedRecipes}
            mealRecipes={localLunch}
            setRecipes={setLocalLunch}
          />
        </div>
        <div className="dinner">
          <MealHeader mealType="Dinner" calories={0} />
          <MealRecipes
            savedRecipes={savedRecipes}
            mealRecipes={localDinner}
            setRecipes={setLocalDinner}
          />
        </div>
      </div>
    </div>
  );
}
