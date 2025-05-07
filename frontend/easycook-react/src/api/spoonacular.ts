import { Filter } from "../types";

const API_KEY = "8edf14d31d184cc8b150c289c049b124";

export async function requestGetData(apiRequest: string) {
  // fetch api request and wait for response
  const response = await fetch(apiRequest, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // parse json data returned by api
  const data = await response.json();
  console.log(data);
  return data;
}
export async function fetchWebsiteRecipe(recipeURL: string) {
  try {
    // convert string to url
    const encondedURL = encodeURIComponent(recipeURL);

    // construct url for api request
    const apiRequest = `https://api.spoonacular.com/recipes/extract?url=${encondedURL}&apiKey=${API_KEY}`;

    // request data from api
    const data = await requestGetData(apiRequest);

    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}

export async function fetchRecipeInfo(id: number) {
  try {
    // api request
    const apiRequest = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

    // request data from api
    const data = await requestGetData(apiRequest);
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}

export async function fetchQueryRecipes(
  query: string,
  quantity: number,
  filters: Filter[]
) {
  try {
    // encode query for url
    const encondedQuery = encodeURIComponent(query);

    // construct url for api request
    let apiRequest = `https://api.spoonacular.com/recipes/complexSearch?query=${encondedQuery}&number=${quantity}&apiKey=${API_KEY}`;

    // add filters to request if there are filters
    let filtersQuery = "";
    filters.forEach((filter) => {
      if (filter.isChecked) {
        filtersQuery += `&${filter.value}`;
      }
    });

    if (filtersQuery) {
      apiRequest += filtersQuery;
    }

    // request data from api
    const data = await requestGetData(apiRequest);

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}
