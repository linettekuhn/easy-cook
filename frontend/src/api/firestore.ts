import { Day, IngredientData, Recipe } from "../types";
import { buildEmptyWeek } from "../util/plannerHelper";
import { getUserID } from "./authentication";

export async function saveIngredients(
  newIngredients: IngredientData[],
  oldIngredients: IngredientData[]
) {
  const userID = await getUserID();
  if (!userID) {
    alert("You are not signed in");
    return;
  }
  const getDocId = (ingredient: IngredientData): string =>
    `ingredient-${ingredient.id}`;

  const ingredientsToUpdate = newIngredients;
  const newIds = new Set(
    newIngredients.map(getDocId).filter((id): id is string => !!id)
  );

  const ingredientIdsToDelete: string[] = oldIngredients
    .map(getDocId)
    .filter((id): id is string => !!id)
    .filter((oldId) => !newIds.has(oldId));
  // TODO: change localhost
  await fetch("http://localhost:3000/api/pantry/store", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userID}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredientsToUpdate, ingredientIdsToDelete }),
  });
}

export async function fetchSavedIngredients(): Promise<IngredientData[]> {
  const userID = await getUserID();
  if (!userID) {
    alert("You are not signed in");
    return [];
  }
  const response = await fetch("http://localhost:3000/api/pantry/saved", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userID}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status == 401) {
      return [];
    }
  }
  console.log(response);
  const recipes: IngredientData[] = await response.json();
  return recipes;
}

export async function saveRecipes(newRecipes: Recipe[], oldRecipes: Recipe[]) {
  const userID = await getUserID();
  if (!userID) {
    alert("You are not signed in");
    return;
  }
  const getDocId = (recipe: Recipe): string | null => {
    if (recipe.id && recipe.id !== -1) {
      return `recipe-${recipe.id}`;
    } else if (recipe.sourceURL) {
      const encodedURL = encodeURIComponent(recipe.sourceURL);
      return `recipe-${encodedURL}`;
    } else return null;
  };

  const recipesToUpdate = newRecipes;
  const newIds = new Set(
    newRecipes.map(getDocId).filter((id): id is string => !!id)
  );

  const recipeIdsToDelete: string[] = oldRecipes
    .map(getDocId)
    .filter((id): id is string => !!id)
    .filter((oldId) => !newIds.has(oldId));
  // TODO: change localhost
  await fetch("http://localhost:3000/api/recipe/store", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userID}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipesToUpdate, recipeIdsToDelete }),
  });
}

export async function fetchSavedRecipes(): Promise<Recipe[]> {
  const userID = await getUserID();
  if (!userID) {
    alert("You are not signed in");
    return [];
  }
  const response = await fetch("http://localhost:3000/api/recipe/saved", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userID}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status == 401) {
      return [];
    }
  }
  console.log(response);
  const recipes: Recipe[] = await response.json();
  return recipes;
}

export async function saveWeek(week: Day[]) {
  const userID = await getUserID();
  if (!userID) {
    alert("You are not signed in");
    return [];
  }
  const sunday = week[0].date;
  const id = `${sunday.getFullYear()}-${
    sunday.getMonth() + 1
  }-${sunday.getDate()}`;
  // TODO: change localhost
  await fetch(`http://localhost:3000/api/planner/week/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userID}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(week),
  });
}

export async function fetchSavedWeek(sunday: Date): Promise<Day[]> {
  const userID = await getUserID();
  if (!userID) {
    alert("You are not signed in");
    return [];
  }
  const id = `${sunday.getFullYear()}-${
    sunday.getMonth() + 1
  }-${sunday.getDate()}`;
  // TODO: change localhost
  const response = await fetch(`http://localhost:3000/api/planner/week/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userID}`,
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    console.error(`HTTP error status: ${response.status}`);
    return buildEmptyWeek(sunday);
  }

  const weekJson = await response.json();

  const week: Day[] = weekJson.week.map((day: Day) => ({
    ...day,
    date: new Date(day.date),
  }));
  return week;
}
