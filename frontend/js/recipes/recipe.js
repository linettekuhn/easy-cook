import View from "./view.js";
import Store from "./store.js";

function init() {
  const view = new View();
  const store = new Store();

  localStorage.removeItem("savedRecipes");

  view.$.savedRecipesOutput.appendChild(
    view.createRecipeOutputHeader(0, "saved recipes")
  );

  view.bindFiltersCancelEvent();

  view.bindQueryFilterEvent();

  view.bindWebsiteInputEvent(async (event) => {
    console.log(event);
    const recipeURL = view.$.recipeWebsiteInput.value;

    if (!recipeURL) {
      alert("Please enter a recipe URL");
      return;
    }

    const recipeData = await store.fetchWebsiteRecipe(recipeURL);

    if (recipeData) {
      view.showElement(view.$.recipeOutput);
      const recipeCard = view.createRecipeCard(recipeData);
      store.addToFound(recipeCard);

      view.$.recipeOutput.appendChild(
        view.createRecipeOutputHeader(
          store.foundRecipes.length,
          "found recipes"
        )
      );
      view.$.recipeOutput.appendChild(recipeCard);
    }
  });

  view.bindQueryInputEvent(async (event) => {
    console.log(event);

    store.foundRecipes = [];
    view.clearRecipeOutput();
    const query = view.$.recipeQueryInput.value;
    const quantity = view.$.recipeQueryQuantity.value;
    const filters = store.filters;

    if (!query) {
      alert("Please enter a recipe query");
      return;
    }

    const response = await store.fetchQueryRecipes(query, quantity, filters);
    store.foundRecipes = response.results;

    view.showElement(view.$.recipeOutput);
    view.$.recipeOutput.appendChild(
      view.createRecipeOutputHeader(store.foundRecipes.length, "found recipes")
    );

    for (let i = 0; i < store.foundRecipes.length; i++) {
      const id = store.foundRecipes[i].id;
      const recipe = await store.fetchRecipeInfo(id);
      const recipeCard = await view.createRecipeCard(recipe, id);
      view.$.recipeOutput.appendChild(recipeCard);
    }
  });

  view.bindSaveRecipeEvent(async (event) => {
    // if save button is clicked on a recipe card
    if (event.target.matches("[data-id='save-recipe-btn']")) {
      const btn = event.target;
      const recipeCard = btn.closest(".recipe-card");
      console.log(recipeCard);

      if (recipeCard) {
        // const recipeId = recipeCard.getAttribute("data-id-recipe");
        console.log(store.savedRecipes);
        // // check if recipe is already saved
        // if (store.savedRecipes.length > 1) {
        //   store.savedRecipes.forEach((savedCard) => {
        //     if (savedCard.getAttribute("data-id-recipe") === recipeId) {
        //       alert("Recipe already saved");
        //       return;
        //     }
        //   });
        // }

        const clonedCard = view.createSavedRecipe(recipeCard);
        console.log(clonedCard);

        store.addToSaved(clonedCard);

        const recipeCount = store.savedRecipes.length;

        view.updateRecipeCounter(recipeCount);

        view.showElement(view.$.savedRecipesOutput);

        console.log(recipeCount);

        // add cloned card to saved recipes div
        view.$.savedRecipesOutput.appendChild(clonedCard);
        store.saveSavedRecipes();
      }
    }
  });

  view.bindRemoveRecipeEvent(async (event) => {
    // if remove button is clicked on a recipe card
    if (event.target.matches("[data-id='remove-recipe-btn']")) {
      const btn = event.target;
      const recipeCard = btn.closest(".recipe-card");
      console.log(recipeCard);

      if (recipeCard) {
        console.log(store.savedRecipes);

        store.removeFromSaved(recipeCard);

        const recipeCount = store.savedRecipes.length;

        view.updateRecipeCounter(recipeCount);

        console.log(recipeCount);

        store.saveSavedRecipes();

        // remove card div from container
      }
    }
  });

  view.bindFiltersApplyEvent((event) => {
    console.log(event);

    const filters = view.$.filtersForm.querySelectorAll("input");

    let activeFilters = [];

    filters.forEach((filter) => {
      if (filter.checked) {
        activeFilters.push(filter.value);
      }
    });

    console.log(activeFilters);
    store.filters = activeFilters;

    view.hideElement(view.$.filtersModal);
  });

  view.bindFiltersClearEvent((event) => {
    console.log(event);

    const filters = view.$.filtersForm.querySelectorAll("input");

    filters.forEach((filter) => {
      filter.checked = false;
    });

    store.filters = [];
  });
}

window.addEventListener("load", init);
