import { useState } from "react";
import DaySelection from "../components/mealPrep/DaySelection";
import Header from "../components/mealPrep/Header";
import WeekSelection from "../components/mealPrep/WeekSelection";
import { Day } from "../types";

// TODO: implement on backend
const defaultWeek: Day[] = Array(7)
  .fill(null)
  .map(() => ({
    date: new Date(),
    calories: 0,
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  }));
export default function MealPrep() {
  const [week, setWeek] = useState<Day[]>(defaultWeek);

  const handleWeekUpdate = (newWeek: Day[]) => setWeek(newWeek);
  return (
    <>
      <main>
        <Header />
        <WeekSelection week={week} setWeek={handleWeekUpdate} />
        <DaySelection days={week} />
      </main>
    </>
  );
}
