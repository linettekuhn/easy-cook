import { Day } from "../types";

export function buildEmptyWeek(selectedDate: Date): Day[] {
  const defaultWeek: Day[] = Array(7)
    .fill(null)
    .map(() => ({
      date: new Date(),
      calories: 0,
      breakfastRecipes: [],
      lunchRecipes: [],
      dinnerRecipes: [],
    }));
  const dayOfWeek = selectedDate.getDay();
  const offset = -dayOfWeek;
  const newWeek: Day[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(selectedDate);
    date.setDate(selectedDate.getDate() + offset + i);
    newWeek.push({ ...defaultWeek[i], date: date });
  }
  return newWeek;
}

export function getPreviousSunday(date: Date): Date {
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0) {
    return date;
  }

  date.setDate(date.getDate() - dayOfWeek);
  return new Date(date);
}
