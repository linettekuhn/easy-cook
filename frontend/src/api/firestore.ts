import { Day, IngredientData, Recipe } from "../types";
import { getUserID } from "./authentication";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorBody = await response.text();
    let alertMessage = `HTTP error! Status: ${response.status}`;
    try {
      const errorJson = JSON.parse(errorBody);
      alertMessage = errorJson.message || alertMessage || errorJson.error;
    } catch (error: unknown) {
      console.log(error);
      alertMessage = errorBody || alertMessage;
    }
    throw new Error(`Failed to fetch: ${response.status} - ${alertMessage}`);
  }
  return response;
}

export async function saveIngredients(
  newIngredients: IngredientData[],
  oldIngredients: IngredientData[]
) {
  const userID = await getUserID();
  if (!userID) {
    throw new Error("User not signed in: Cannot save ingredients.");
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

  await handleResponse(
    await fetch("https://easy-cook-backend.onrender.com/api/pantry/store", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userID}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredientsToUpdate, ingredientIdsToDelete }),
    })
  );
}

export async function fetchSavedIngredients(): Promise<IngredientData[]> {
  const userID = await getUserID();
  if (!userID) {
    throw new Error("User not signed in: Cannot fetch saved ingredients.");
  }
  const response = await handleResponse(
    await fetch("https://easy-cook-backend.onrender.com/api/pantry/saved", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userID}`,
        "Content-Type": "application/json",
      },
    })
  );
  const recipes: IngredientData[] = await response.json();
  return recipes;
}

export async function saveRecipes(newRecipes: Recipe[], oldRecipes: Recipe[]) {
  const userID = await getUserID();
  if (!userID) {
    throw new Error("User not signed in: Cannot save recipes.");
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
  await handleResponse(
    await fetch("https://easy-cook-backend.onrender.com/api/recipe/store", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userID}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipesToUpdate, recipeIdsToDelete }),
    })
  );
}

export async function fetchSavedRecipes(): Promise<Recipe[]> {
  const userID = await getUserID();
  if (!userID) {
    throw new Error("User not signed in: Cannot fetch saved recipes.");
  }
  const response = await handleResponse(
    await fetch("https://easy-cook-backend.onrender.com/api/recipe/saved", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userID}`,
        "Content-Type": "application/json",
      },
    })
  );
  const recipes: Recipe[] = await response.json();
  return recipes;
}

export async function saveWeek(week: Day[]) {
  const userID = await getUserID();
  if (!userID) {
    throw new Error("User not signed in: Cannot save week.");
  }
  const sunday = week[0].date;
  const id = `${sunday.getFullYear()}-${
    sunday.getMonth() + 1
  }-${sunday.getDate()}`;
  await handleResponse(
    await fetch(
      `https://easy-cook-backend.onrender.com/api/planner/week/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userID}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(week),
      }
    )
  );
}

export async function fetchSavedWeek(sunday: Date): Promise<Day[]> {
  const userID = await getUserID();
  if (!userID) {
    throw new Error("User not signed in: Cannot fetch saved week.");
  }
  const id = `${sunday.getFullYear()}-${
    sunday.getMonth() + 1
  }-${sunday.getDate()}`;
  const response = await handleResponse(
    await fetch(
      `https://easy-cook-backend.onrender.com/api/planner/week/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userID}`,
          "Content-Type": "application/json",
        },
      }
    )
  );

  const weekJson = await response.json();

  const week: Day[] = weekJson.week.map((day: Day) => ({
    ...day,
    date: new Date(day.date),
  }));
  return week;
}
