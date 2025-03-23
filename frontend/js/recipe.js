import View from "./view.js";
import Store from "./store.js";

function init() {
  const view = new View();
  const store = new Store();

  view.bindWebsiteInputEvent(async (event) => {
    console.log(event);
    const recipeURL = view.$.recipeWebsiteInput.value;

    if (!recipeURL) {
      alert("Please enter a recipe URL");
      return;
    }

    const recipeData = await store.fetchWebsiteRecipe(recipeURL);

    if (recipeData) {
      view.showOutput(view.$.recipeOutput);
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

    const query = view.$.recipeQueryInput.value;
    const quantity = view.$.recipeQueryQuantity.value;

    if (!query) {
      alert("Please enter a recipe query");
      return;
    }

    const response = await store.fetchQueryRecipes(query, quantity);
    store.foundRecipes = response.results;

    view.showOutput(view.$.recipeOutput);
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

      if (recipeCard) {
        const recipeId = recipeCard.getAttribute("data-id-recipe");

        // check if recipe is already saved
        store.savedRecipes.forEach((savedCard) => {
          if (savedCard.getAttribute("data-id-recipe") === recipeId) {
            alert("Recipe already saved");
            return;
          }
        });

        const clonedCard = view.createSavedRecipe(recipeCard);
        console.log(clonedCard);

        store.addToSaved(clonedCard);

        const recipeCount = store.savedRecipes.length;

        if (recipeCount - 1 == 0) {
          view.$.recipeOutput.appendChild(
            view.createRecipeOutputHeader(recipeCount, "saved recipes")
          );
        } else {
          view.updateRecipeCounter(recipeCount);
        }

        view.showOutput(view.$.savedRecipesOutput);

        console.log(recipeCount);

        // add cloned card to saved recipes div
        view.$.savedRecipesOutput.appendChild(clonedCard);
      }
    }
  });
}

window.addEventListener("load", init);
