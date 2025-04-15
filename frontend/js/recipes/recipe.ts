import View from "./view.js";
import Store from "./store.js";
import { Filter, Recipe } from "../types.js";

function init() {
  const view = new View();
  const store = new Store();

  //store.clearSaved();
  // load saved recipes
  store.loadSavedRecipes();

  view.$.savedRecipesOutput.appendChild(
    view.createRecipeOutputHeader(store.savedRecipes.length, "saved recipes")
  );

  store.savedRecipes.forEach((recipe: Recipe) => {
    if (recipe) {
      view.$.savedRecipesOutput.appendChild(recipe.card);
    }
  });

  // call ui events
  view.bindFiltersCancelEvent();

  // event handlers

  view.bindWebsiteInputEvent(async (event) => {
    const recipeURL = (view.$.recipeWebsiteInput as HTMLInputElement).value;

    if (!recipeURL) {
      alert("Please enter a recipe URL");
      return;
    }

    const recipeData = await store.fetchWebsiteRecipe(recipeURL);

    if (recipeData) {
      view.showElement(view.$.recipeOutput);
      const recipe = view.createRecipeCard(recipeData, -1, recipeURL);
      store.addToFound(recipe);

      view.$.recipeOutput.appendChild(
        view.createRecipeOutputHeader(
          store.foundRecipes.length,
          "found recipes"
        )
      );
      view.$.recipeOutput.appendChild(recipe.card);
    }
  });

  view.bindQueryInputEvent(async (event) => {
    store.foundRecipes = [];
    view.clearRecipeOutput();
    const query = (view.$.recipeQueryInput as HTMLInputElement).value;
    const quantity = Number(
      (view.$.recipeQueryQuantity as HTMLInputElement).value
    );
    const filters = store.filters;

    if (!query) {
      alert("Please enter a recipe query");
      return;
    }

    const response = await store.fetchQueryRecipes(query, quantity);
    const foundRecipes = response.results;
    console.log(foundRecipes);

    view.showElement(view.$.recipeOutput);
    view.$.recipeOutput.appendChild(
      view.createRecipeOutputHeader(foundRecipes.length, "found recipes")
    );

    for (let i = 0; i < foundRecipes.length; i++) {
      const id = foundRecipes[i].id;
      const recipeData = await store.fetchRecipeInfo(id);
      const recipe = view.createRecipeCard(recipeData, id);
      console.log(recipe);
      store.foundRecipes.push(recipe);
      view.$.recipeOutput.appendChild(recipe.card);
    }
  });

  view.bindSaveRecipeEvent(async (event) => {
    if (!event.target) return;

    // if save button is clicked on a recipe card
    const el = event.target as Element;
    if (el.matches("[data-id='save-recipe-btn']")) {
      const recipeCard = el.closest(".recipe-card") as HTMLElement;

      if (recipeCard) {
        const recipeData = store.findRecipe(recipeCard);
        if (!recipeData) return;

        let isSaved = store.addToSaved(recipeData);
        if (!isSaved) {
          const clonedCard = view.createSavedRecipe(recipeCard);

          const recipeCount = store.savedRecipes.length;

          view.updateRecipeCounter(recipeCount);

          view.showElement(view.$.savedRecipesOutput);

          // add cloned card to saved recipes div
          view.$.savedRecipesOutput.appendChild(clonedCard);
        } else {
          // TODO handle what to do with already saved recipes
        }
      }
    }
  });

  view.bindRemoveRecipeEvent(async (event) => {
    if (!event.target) return;

    // if remove button is clicked on a recipe card
    const el = event.target as Element;
    if (el.matches("[data-id='remove-recipe-btn']")) {
      const recipeCard = el.closest(".recipe-card") as HTMLElement;

      if (recipeCard) {
        const recipeData = store.findRecipe(recipeCard);
        if (!recipeData) return;

        store.removeFromSaved(recipeData);

        const recipeCount = store.savedRecipes.length;

        view.updateRecipeCounter(recipeCount);

        recipeCard.remove();
      }
    }
  });

  view.bindQueryFilterEvent((event) => {
    const filters = view.$.filtersForm.querySelectorAll("input");

    filters.forEach((filter) => {
      filter.checked = false;
    });

    store.filters.forEach((activeFilter) => {
      filters.forEach((filter) => {
        if (
          filter.name === activeFilter.label &&
          filter.value === activeFilter.value
        ) {
          filter.checked = activeFilter.isChecked;
        }
      });
    });

    view.showElement(view.$.filtersModal);
  });

  view.bindFiltersClearEvent((event) => {
    const filters = view.$.filtersForm.querySelectorAll("input");

    filters.forEach((filter) => {
      filter.checked = false;
    });
  });

  view.bindFiltersApplyEvent((event) => {
    const filters = view.$.filtersForm.querySelectorAll("input");

    let activeFilters: Filter[] = [];

    filters.forEach((filter) => {
      if (filter.checked) {
        activeFilters.push({
          label: filter.name,
          value: filter.value,
          isChecked: filter.checked,
        });
      }
    });

    store.filters = activeFilters;

    view.hideElement(view.$.filtersModal);
  });

  view.bindFiltersClearEvent((event) => {
    const filters = view.$.filtersForm.querySelectorAll("input");

    filters.forEach((filter) => {
      filter.checked = false;
    });
  });
}

window.addEventListener("load", init);
