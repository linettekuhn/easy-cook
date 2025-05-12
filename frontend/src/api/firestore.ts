import { Day, Recipe } from "../types";

export async function saveRecipes(recipes: Recipe[]) {
  // TODO: change localhost
  await fetch("http://localhost:3000/api/recipe/store", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipes),
  });
}

export async function saveRecipe(recipe: Recipe) {
  // TODO: change localhost
  await fetch("http://localhost:3000/api/recipe/store", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
}

export async function fetchSavedRecipes(): Promise<Recipe[]> {
  const response = await fetch("http://localhost:3000/api/recipe/saved", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  const recipes: Recipe[] = await response.json();
  return recipes;
}

export async function saveWeek(week: Day[]) {
  const sunday = week[0].date;
  const id = `${sunday.getFullYear()}-${sunday.getMonth()}-${sunday.getDate}`;
  // TODO: change localhost
  await fetch(`http://localhost:3000/api/planner/week/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(week),
  });
}

export async function fetchSavedWeek(sunday: Date): Promise<Day[]> {
  const id = `${sunday.getFullYear()}-${sunday.getMonth()}-${sunday.getDate}`;
  // TODO: change localhost
  const response = await fetch(`http://localhost:3000/api/planner/week/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  const week: Day[] = await response.json();
  return week;
}
