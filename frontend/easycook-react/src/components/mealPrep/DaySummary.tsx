import { Day } from "../../types";
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
  return (
    <div className="dayOutput">
      <DayHeader date={date} totalCalories={calories} />
      <div className="daySummary">
        <div className="breakfast">
          <MealHeader mealType="Breakfast" calories={0} />
          <MealRecipes recipes={breakfastRecipes} />
        </div>
        <div className="lunch">
          <MealHeader mealType="Lunch" calories={0} />
          <MealRecipes recipes={lunchRecipes} />
        </div>
        <div className="dinner">
          <MealHeader mealType="Dinner" calories={0} />
          <MealRecipes recipes={dinnerRecipes} />
        </div>
      </div>
    </div>
  );
}
