import { Ingredient, Instruction, InstructionSet, Recipe } from "../types";

export default class View {
  $: Record<string, Element> = {};

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
  bindWebsiteInputEvent(eventHandler: EventListener) {
    this.$.websiteSubmitBtn.addEventListener("click", eventHandler);
  }

  bindQueryInputEvent(eventHandler: EventListener) {
    this.$.querySubmitBtn.addEventListener("click", eventHandler);
  }

  bindSaveRecipeEvent(eventHandler: EventListener) {
    this.$.recipeOutput.addEventListener("click", eventHandler);
  }

  bindRemoveRecipeEvent(eventHandler: EventListener) {
    this.$.savedRecipesOutput.addEventListener("click", eventHandler);
  }

  bindFiltersApplyEvent(eventHandler: EventListener) {
    this.$.filtersApplyBtn.addEventListener("click", eventHandler);
  }

  bindQueryFilterEvent(eventHandler: EventListener) {
    this.$.queryFiltersBtn.addEventListener("click", eventHandler);
  }

  bindFiltersClearEvent(eventHandler: EventListener) {
    this.$.filtersClearBtn.addEventListener("click", eventHandler);
  }

  // UI Only Events

  bindFiltersCancelEvent() {
    this.$.filtersCancelBtn.addEventListener("click", () => {
      this.hideElement(this.$.filtersModal as HTMLElement);
    });
  }

  // Helper Mehtods
  #qs(selector: string, parent?: Element): Element {
    const element = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);
    if (!element) {
      throw new Error("Could not find element");
    }
    return element;
  }

  #createElementWithClass(tag: string, className: string): HTMLElement {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
  }

  clearRecipeOutput() {
    this.$.recipeOutput.innerHTML = "";
    console.log("Recipe output cleared");
  }

  createRecipeOutputHeader(recipeCount: number, title: string): HTMLElement {
    const header = this.#createElementWithClass("div", "recipes-header");

    const headerTitle = this.#createElementWithClass("h2", "bold");
    headerTitle.textContent = title;
    header.appendChild(headerTitle);

    const quantity = document.createElement("p");
    quantity.textContent = `${recipeCount} recipe(s)`;
    header.appendChild(quantity);

    return header;
  }

  updateRecipeCounter(recipeCount: number) {
    let recipeCountDisplay = this.#qs(".recipes-header p");
    recipeCountDisplay.textContent = `${recipeCount} recipe(s)`;
  }
  showElement(element: Element) {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    }
  }
  hideElement(element: Element) {
    if (!element.classList.contains("hidden")) {
      element.classList.add("hidden");
    }
  }

  createSavedRecipe(recipeCard: HTMLElement): HTMLElement {
    const cloneCard = recipeCard.cloneNode(true) as HTMLElement;
    let cardBtn = this.#qs("[data-id=save-recipe-btn]", cloneCard);
    cardBtn.setAttribute("data-id", "remove-recipe-btn");
    cardBtn.textContent = "Remove from Favorites";
    return cloneCard;
  }

  createRecipeCard(
    recipeData: any,
    id: number,
    sourceURL: string = ""
  ): Recipe {
    const card = this.#createElementWithClass("div", "recipe-card");
    card.setAttribute("data-recipe-id", id.toString());
    card.setAttribute("data-source-url", sourceURL);

    const title = this.#createElementWithClass("h3", "recipe-title");
    title.textContent = recipeData.title;
    card.appendChild(title);

    const image = this.#createElementWithClass(
      "img",
      "recipe-image"
    ) as HTMLImageElement;
    image.src = recipeData.image;
    image.alt = recipeData.title;
    card.appendChild(image);

    const ingredientsTitle = this.#createElementWithClass(
      "h4",
      "recipe-ingredients-title"
    );
    ingredientsTitle.textContent = "Ingredients:";
    card.appendChild(ingredientsTitle);

    const ingredients: Ingredient[] = [];
    const ingredientList = this.#createElementWithClass(
      "ul",
      "recipe-ingredient-list"
    );

    let ingredientsArr: any[] = recipeData.extendedIngredients;
    ingredientsArr.forEach((ingredient) => {
      const listItem = document.createElement("li");
      let quantity;
      // TODO measure trigger
      quantity = ingredient.measures.us;
      listItem.textContent = `${quantity.amount} ${quantity.unitShort} ${ingredient.nameClean}`;
      ingredientList.appendChild(listItem);

      ingredients.push({
        id: ingredient.id,
        name: ingredient.name,
        img_src: ingredient.image,
        img_alt: ingredient.name,
        amount: quantity.amount,
        unit: quantity.unitShort,
      });
    });
    card.appendChild(ingredientList);

    const directionsTitle = this.#createElementWithClass(
      "h4",
      "recipe-directions-title"
    );
    directionsTitle.textContent = "Directions:";
    card.appendChild(directionsTitle);

    const directionsList = this.#createElementWithClass(
      "ol",
      "recipe-directions-list"
    );
    const directionSet: InstructionSet[] = [];

    recipeData.analyzedInstructions.forEach((set: InstructionSet) => {
      const directions: InstructionSet = { name: set.name, steps: [] };
      let directionCount = 0;
      set.steps.forEach((steps: Instruction) => {
        const listItem = document.createElement("li");
        listItem.textContent = steps.step;
        directionsList.appendChild(listItem);
        directions.steps.push({
          number: steps.number,
          step: steps.step,
        });
      });
    });
    card.appendChild(directionsList);

    const saveRecipeBtn = this.#createElementWithClass("button", "button");
    saveRecipeBtn.textContent = "Save to Favorites";
    saveRecipeBtn.setAttribute("data-id", "save-recipe-btn");
    card.appendChild(saveRecipeBtn);

    return {
      id: id,
      card: card,
      title: recipeData.title,
      img_src: recipeData.image,
      img_alt: recipeData.title,
      ingredients: ingredients,
      directions: directionSet,
      sourceURL: sourceURL,
    };
  }
}
