import { Day, SavedRecipes, Week } from "../types";
export default class Store {
  $ = {};

  #saved: SavedRecipes = { recipes: [] };
  #week: Week = {
    selectedDay: this.createDefaultDay(),
    days: [],
  };

  constructor(
    private readonly apiKey: string = "8edf14d31d184cc8b150c289c049b124"
  ) {
    for (let i = 0; i < 7; i++) {
      this.#week.days[i] = this.createDefaultDay();
    }
  }

  get week(): Week {
    return this.#week;
  }

  set week(week: Week) {
    this.#week = week;
  }

  #getKey() {
    return this.apiKey;
  }

  // API requests
  async fetchRecipeInfo(id: number) {
    try {
      // api request
      let apiRequest = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.#getKey()}&addRecipeNutrition=true`;

      // request data from api
      const data = await this.requestGetData(apiRequest);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }

  // Helper functions
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

  loadSavedRecipes() {
    const savedRecipes = localStorage.getItem("savedRecipes");
    if (savedRecipes) {
      this.#saved.recipes = JSON.parse(savedRecipes);
    }
  }

  createDefaultDay(): Day {
    return {
      date: new Date(),
      calories: 0,
      html: document.createElement("div"),
      breakfastRecipes: [],
      lunchRecipes: [],
      dinnerRecipes: [],
    };
  }
}
