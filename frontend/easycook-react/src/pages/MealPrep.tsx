import DaySelection from "../components/mealPrep/DaySelection";
import Header from "../components/mealPrep/Header";
import WeekSelection from "../components/mealPrep/WeekSelection";
import { Week } from "../types";

// TODO: implement on backend
const defaultWeek: Week = {
  days: Array(7)
    .fill(null)
    .map(() => ({
      date: new Date(),
      calories: 0,
      breakfastRecipes: [],
      lunchRecipes: [],
      dinnerRecipes: [],
    })),
};
export default function MealPrep() {
  return (
    <>
      <main>
        <Header />
        <WeekSelection />
        <DaySelection days={defaultWeek.days} />
      </main>
    </>
  );
}
