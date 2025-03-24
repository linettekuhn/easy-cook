export default class Store {
  $ = {};

  #saved = { recipes: [] };
  #found = { recipes: [] };
  // TODO fill up with label values in filters-form
  #savedFilters = { filters: [] };

  constructor() {
    this.$.apiKey = "8edf14d31d184cc8b150c289c049b124";
  }

  #getKey() {
    return this.$.apiKey;
  }

  // API requests

  async fetchWebsiteRecipe(recipeURL) {
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

  async fetchRecipeInfo(id) {
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

  async fetchQueryRecipes(query, quantity, filters) {
    try {
      // encode query for url
      const encondedQuery = encodeURIComponent(query);

      // construct url for api request
      let apiRequest = `https://api.spoonacular.com/recipes/complexSearch?query=${encondedQuery}&number=${quantity}&apiKey=${this.#getKey()}`;

      // add filters to request if there are filters
      let filtersQuery = "";
      filters.forEach((filter) => {
        filtersQuery += `&${filter.value}`;
      });

      if (filtersQuery) {
        apiRequest += filtersQuery;
      }

      // request data from api
      const data = await this.requestGetData(apiRequest);

      return data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  // Helper functions
  get filters() {
    return this.#savedFilters.filters;
  }

  get savedRecipes() {
    return this.#saved.recipes;
  }

  get foundRecipes() {
    return this.#found.recipes;
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

  addToSaved(recipeCard) {
    this.#saved.recipes.push(recipeCard);
  }

  addToFound(recipeCard) {
    this.#found.recipes.push(recipeCard);
  }

  async requestGetData(apiRequest) {
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
