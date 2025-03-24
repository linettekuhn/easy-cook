export default class View {
  $ = {};

  constructor() {
    this.$.websiteSubmitBtn = this.#qs('[data-id="website-submit-btn"]');
    this.$.recipeWebsiteInput = this.#qs('[data-id="recipe-website"]');
    this.$.queryFiltersBtn = this.#qs('[data-id="query-filters-btn"]');
    this.$.querySubmitBtn = this.#qs('[data-id="query-submit-btn"]');
    this.$.recipeQueryInput = this.#qs('[data-id="recipe-query"]');
    this.$.recipeQueryQuantity = this.#qs("[data-id=recipe-query-quantity]");
    this.$.filtersApplyBtn = this.#qs('[data-id="apply-filters-btn"]');
    this.$.filtersCancelBtn = this.#qs('[data-id="cancel-filters-btn"]');
    this.$.filtersClearBtn = this.#qs('[data-id="clear-filters-btn"]');
    this.$.recipeOutput = this.#qs(".recipe-output");
    this.$.savedRecipesOutput = this.#qs(".saved-recipes");
    this.$.filtersModal = this.#qs(".filters-modal");
    this.$.filtersForm = this.#qs("#filters-form");
  }

  // Bind Events Methods
  bindWebsiteInputEvent(eventHandler) {
    this.$.websiteSubmitBtn.addEventListener("click", eventHandler);
  }

  bindQueryInputEvent(eventHandler) {
    this.$.querySubmitBtn.addEventListener("click", eventHandler);
  }

  bindSaveRecipeEvent(eventHandler) {
    this.$.recipeOutput.addEventListener("click", eventHandler);
  }

  bindRemoveRecipeEvent(eventHandler) {
    this.$.recipeOutput.addEventListener("click", eventHandler);
  }

  bindFiltersApplyEvent(eventHandler) {
    this.$.filtersApplyBtn.addEventListener("click", eventHandler);
  }

  bindFiltersClearEvent(eventHandler) {
    this.$.filtersClearBtn.addEventListener("click", eventHandler);
  }

  // UI Only Events
  bindQueryFilterEvent() {
    this.$.queryFiltersBtn.addEventListener("click", () => {
      this.showElement(this.$.filtersModal);
    });
  }

  bindFiltersCancelEvent() {
    this.$.filtersCancelBtn.addEventListener("click", () => {
      this.hideElement(this.$.filtersModal);
    });
  }

  // Helper Mehtods
  #qs(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error("Could not find element");
    }
    return element;
  }

  #createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
  }

  clearRecipeOutput() {
    this.$.recipeOutput.innerHTML = "";
    console.log("Recipe output cleared");
  }

  createRecipeOutputHeader(recipeCount, title) {
    const header = this.#createElementWithClass("div", "recipes-header");

    const headerTitle = this.#createElementWithClass("h2", "bold");
    headerTitle.textContent = title;
    header.appendChild(headerTitle);

    const quantity = document.createElement("p");
    quantity.textContent = `${recipeCount} recipe(s)`;
    header.appendChild(quantity);

    return header;
  }

  updateRecipeCounter(recipeCount) {
    let recipeCountDisplay = document.querySelector(".recipes-header p");
    recipeCountDisplay.textContent = `${recipeCount} recipe(s)`;
  }
  showElement(element) {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    }
  }
  hideElement(element) {
    if (!element.classList.contains("hidden")) {
      element.classList.add("hidden");
    }
  }

  createSavedRecipe(recipeCard) {
    const cloneCard = recipeCard.cloneNode(true);
    let cardBtn = cloneCard.querySelector("[data-id=save-recipe-btn]");
    cardBtn.setAttribute("data-id", "remove-recipe-btn");
    cardBtn.textContent = "Remove from Favorites";
    return cloneCard;
  }

  createRecipeCard(recipe, id = -1) {
    const card = this.#createElementWithClass("div", "recipe-card");
    card.setAttribute("data-id-recipe", id);

    const title = this.#createElementWithClass("h3", "recipe-title");
    title.textContent = recipe.title;
    card.appendChild(title);

    const image = this.#createElementWithClass("img", "recipe-image");
    image.src = recipe.image;
    image.alt = recipe.title;
    card.appendChild(image);

    const ingredientsTitle = this.#createElementWithClass(
      "h4",
      "recipe-ingredients-title"
    );
    ingredientsTitle.textContent = "Ingredients:";
    card.appendChild(ingredientsTitle);

    const ingredients = this.#createElementWithClass(
      "ul",
      "recipe-ingredient-list"
    );
    let ingredientsArr = recipe.extendedIngredients;
    ingredientsArr.forEach((ingredient) => {
      const listItem = document.createElement("li");
      let quantity;
      // TODO measure trigger
      quantity = ingredient.measures.us;
      listItem.textContent = `${quantity.amount} ${quantity.unitShort} ${ingredient.nameClean}`;
      ingredients.appendChild(listItem);
    });
    card.appendChild(ingredients);

    const directionsTitle = this.#createElementWithClass(
      "h4",
      "recipe-directions-title"
    );
    directionsTitle.textContent = "Directions:";
    card.appendChild(directionsTitle);

    const directions = this.#createElementWithClass(
      "ol",
      "recipe-directions-list"
    );
    let directionsArr = recipe.analyzedInstructions;
    directionsArr.forEach((instructionSet) => {
      instructionSet.steps.forEach((step) => {
        const listItem = document.createElement("li");
        listItem.textContent = step.step;
        directions.appendChild(listItem);
      });
    });
    card.appendChild(directions);

    const saveRecipeBtn = this.#createElementWithClass("button", "button");
    saveRecipeBtn.textContent = "Save to Favorites";
    saveRecipeBtn.setAttribute("data-id", "save-recipe-btn");
    card.appendChild(saveRecipeBtn);

    return card;
  }
}
