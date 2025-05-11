import { Recipe } from "../types";

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
