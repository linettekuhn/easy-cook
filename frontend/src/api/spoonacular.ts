import { Filter } from "../types";

export async function fetchWebsiteRecipe(recipeURL: string) {
  const encodedURL = encodeURIComponent(recipeURL);
  // TODO: change localhost
  const response = await fetch(
    `http://localhost:3000/api/recipes/from-url?url=${encodedURL}`
  );
  const data = await response.json();
  return data;
}

export async function fetchRecipeInfo(id: number) {
  // TODO: change localhost
  const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
  const data = await response.json();
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
