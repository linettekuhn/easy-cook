import { Filter, IngredientData } from "../types";

export async function fetchWebsiteRecipe(recipeURL: string) {
  const encodedURL = encodeURIComponent(recipeURL);
  // TODO: change localhost
  const response = await fetch(
    `http://localhost:3000/api/recipe/from-url?url=${encodedURL}`
  );
  const data = await response.json();
  return data;
}

export async function fetchRecipeInfo(id: number) {
  // TODO: change localhost
  const response = await fetch(`http://localhost:3000/api/recipe/${id}`);
  const data = await response.json();
  return data;
}

export async function fetchRecipeNutritionLabel(id: number) {
  // TODO: change localhost
  const response = await fetch(`http://localhost:3000/api/recipe/label/${id}`);
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
  let paramsFilters = "";
  filters.forEach((filter) => {
    if (filter.isChecked) {
      paramsFilters += `&${filter.value}`;
    }
  });
  params.append("filters", paramsFilters);
  try {
    const response = await fetch(
      `http://localhost:3000/api/recipe/search?${params.toString()}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAutocompleteIngredient(query: string) {
  const params = new URLSearchParams();
  params.append("query", query);

  try {
    const response = await fetch(
      `http://localhost:3000/api/pantry/search/autocomplete?${params.toString()}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPantryRecipes(ingredients: IngredientData[]) {
  const ingredientNames = ingredients
    .map((ingredient) => ingredient.name)
    .join(",");
  const params = new URLSearchParams();
  params.append("ingredients", ingredientNames);

  try {
    const response = await fetch(
      `http://localhost:3000/api/pantry/search/recipes?${params.toString()}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
