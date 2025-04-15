import { Filter, Recipe, SavedFilters, SavedRecipes } from "../types";

export default class Store {
  $ = {};

  #saved: SavedRecipes = { recipes: [] };
  #found: SavedRecipes = { recipes: [] };
  #savedFilters: SavedFilters = { filters: [] };

  constructor(
    private readonly apiKey: string = "8edf14d31d184cc8b150c289c049b124"
  ) {
    this.loadSavedRecipes();
  }

  #getKey(): string {
    return this.apiKey;
  }

  // API requests

  async fetchWebsiteRecipe(recipeURL: string) {
    try {
      // convert string to url
      const encondedURL = encodeURIComponent(recipeURL);

      // construct url for api request
      let apiRequest = `https://api.spoonacular.com/recipes/extract?url=${encondedURL}&apiKey=${this.#getKey()}`;

      // request data from api
      const data = await this.requestGetData(apiRequest);

      return data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }

  async fetchRecipeInfo(id: number) {
    try {
      // api request
      let apiRequest = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.#getKey()}`;

      // request data from api
      const data = await this.requestGetData(apiRequest);
      return data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }

  async fetchQueryRecipes(query: string, quantity: number) {
    try {
      // encode query for url
      const encondedQuery = encodeURIComponent(query);

      // construct url for api request
      let apiRequest = `https://api.spoonacular.com/recipes/complexSearch?query=${encondedQuery}&number=${quantity}&apiKey=${this.#getKey()}`;

      // add filters to request if there are filters
      let filtersQuery = "";
      this.filters.forEach((filter) => {
        filtersQuery += `&${filter.value}`;
      });

      if (filtersQuery) {
        apiRequest += filtersQuery;
      }

      // request data from api
      const data = await this.requestGetData(apiRequest);

      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  // Helper functions
  get filters(): Filter[] {
    if (this.#savedFilters.filters) {
      return this.#savedFilters.filters;
    }
    return [];
  }

  get savedRecipes(): Recipe[] {
    if (this.#saved.recipes) {
      return this.#saved.recipes;
    }
    return [];
  }

  get foundRecipes(): Recipe[] {
    if (this.#found.recipes) {
      return this.#found.recipes;
    }
    return [];
  }

  set savedRecipes(recipes) {
    this.#saved.recipes = recipes;
  }

  set foundRecipes(recipes) {
    this.#found.recipes = recipes;
  }

  set filters(filters) {
    this.#savedFilters.filters = filters;
  }

  clearSaved() {
    this.#saved.recipes.length = 0;
    this.#saveToLocalStorage();
  }

  findRecipe(recipeCard: HTMLElement): Recipe | undefined {
    const recipeId = Number(recipeCard.getAttribute("data-recipe-id"));
    let recipeData: Recipe | undefined;

    if (recipeId != 1) {
      recipeData = this.foundRecipes.find((recipe) => {
        recipe.id === recipeId;
      });
    } else {
      const recipeURL = recipeCard.getAttribute("data-recipe-id");
      recipeData = this.foundRecipes.find((recipe) => {
        recipe.sourceURL === recipeURL;
      });
    }

    if (!recipeData) {
      console.warn("Recipe not found");
      return;
    }

    return recipeData;
  }

  addToSaved(recipe: Recipe): boolean {
    // check if recipe is already saved
    let index = this.#saved.recipes.findIndex((savedRecipe) => {
      recipe.id !== -1
        ? savedRecipe.id === recipe.id
        : savedRecipe.sourceURL === recipe.sourceURL;
    });

    let isSaved = index !== -1;

    // add to saved
    if (!isSaved) {
      this.#saved.recipes.push(recipe);
      this.#saveToLocalStorage();
    }

    return isSaved;
  }

  removeFromSaved(recipe: Recipe): boolean {
    // check if recipe is already saved
    let index = this.#saved.recipes.findIndex((savedRecipe) => {
      recipe.id !== -1
        ? savedRecipe.id === recipe.id
        : savedRecipe.sourceURL === recipe.sourceURL;
    });

    let isSaved = index !== -1;

    // remove from saved
    if (isSaved) {
      this.#saved.recipes.splice(index, 1);
      this.#saveToLocalStorage();
    }

    return isSaved;
  }

  loadSavedRecipes() {
    const savedRecipes = localStorage.getItem("savedRecipes");
    if (savedRecipes) {
      this.#saved.recipes = JSON.parse(savedRecipes);
    }
  }

  addToFound(recipe: Recipe) {
    this.#found.recipes.push(recipe);
  }

  #saveToLocalStorage() {
    localStorage.setItem("savedRecipes", JSON.stringify(this.#saved.recipes));
  }

  async requestGetData(apiRequest: string) {
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
}
