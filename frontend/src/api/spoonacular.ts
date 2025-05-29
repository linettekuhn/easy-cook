import { Filter, IngredientData } from "../types";

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

export async function fetchWebsiteRecipe(recipeURL: string) {
  const encodedURL = encodeURIComponent(recipeURL);
  // TODO: change localhost
  const response = await handleResponse(
    await fetch(`http://localhost:3000/api/recipe/from-url?url=${encodedURL}`)
  );
  const data = await response.json();
  return data;
}

export async function fetchRecipeInfo(id: number) {
  // TODO: change localhost
  const response = await handleResponse(
    await fetch(`http://localhost:3000/api/recipe/${id}`)
  );
  const data = await response.json();
  return data;
}

export async function fetchRecipeNutritionLabel(id: number) {
  // TODO: change localhost
  const response = await handleResponse(
    await fetch(`http://localhost:3000/api/recipe/label/${id}`)
  );
  const data = await response.text();
  return data;
}

export async function fetchQueryRecipes(
  query: string,
  quantity: number,
  filters: Filter[]
) {
  const params = new URLSearchParams();
  params.append("query", query);
  params.append("quantity", quantity.toString());
  filters.forEach((filter) => {
    if (filter.isChecked) {
      params.append("filters", filter.value);
    }
  });
  const response = await handleResponse(
    await fetch(`http://localhost:3000/api/recipe/search?${params.toString()}`)
  );
  const data = await response.json();
  return data;
}

export async function fetchAutocompleteIngredient(query: string) {
  const params = new URLSearchParams();
  params.append("query", query);
  const response = await handleResponse(
    await fetch(
      `http://localhost:3000/api/pantry/search/autocomplete?${params.toString()}`
    )
  );
  const data = await response.json();
  return data;
}

export async function fetchPantryRecipes(ingredients: IngredientData[]) {
  const ingredientNames = ingredients
    .map((ingredient) => ingredient.name)
    .join(",");
  const params = new URLSearchParams();
  params.append("ingredients", ingredientNames);
  const response = await handleResponse(
    await fetch(
      `http://localhost:3000/api/pantry/search/recipes?${params.toString()}`
    )
  );
  const data = await response.json();
  return data;
}
