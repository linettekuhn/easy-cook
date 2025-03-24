export default class View {
  $ = {};

  constructor() {
    this.$.sundayBtn = this.#qs('[data-id="sunday-btn"]');
    this.$.mondayBtn = this.#qs('[data-id="monday-btn"]');
    this.$.tuesdayBtn = this.#qs('[data-id="tuesday-btn"]');
    this.$.wednesdayBtn = this.#qs('[data-id="wednesday-btn"]');
    this.$.thursdayBtn = this.#qs('[data-id="thursday-btn"]');
    this.$.fridayBtn = this.#qs('[data-id="friday-btn"]');
    this.$.saturdayBtn = this.#qs('[data-id="saturday-btn"]');
    this.$.days = this.#qs(".days");
    this.$.dayOutput = this.#qs(".day-output");
  }

  #qs(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error("Could not find element");
    }
    return element;
  }

  updateDays(sunday) {
    const dayButtonDisplays = this.$.days.querySelectorAll(".day");
    const sundayDate = sunday.getDate();
    for (let i = 0; i < dayButtonDisplays.length; i++) {
      const element = dayButtonDisplays[i];
      element.textContent = sundayDate + i;
    }
  }

  setSelectedDay(dayHTML) {
    const output = this.$.dayOutput;
    output.innerHTML = dayHTML;
    this.showElement(output);
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
  createDayOutput(day) {
    const output = this.#createElementWithClass("div", ".day-output");
    output.appendChild(this.createDayHeader(day));

    const summary = this.createDaySummary();
    output.appendChild(summary);
    return output;
  }

  createDaySummary() {
    const summary = this.#createElementWithClass("div", "day-summary");

    // breakfast
    const breakfast = this.#createElementWithClass("div", "breakfast");

    breakfast.appendChild(this.createMealHeader("Breakfast", 0));

    const breakfastRecipes = this.#createElementWithClass(
      "div",
      "recipe-container"
    );

    breakfast.appendChild(breakfastRecipes);
    summary.appendChild(breakfast);

    // lunch
    const lunch = this.#createElementWithClass("div", "lunch");

    lunch.appendChild(this.createMealHeader("Lunch", 0));

    const lunchRecipes = this.#createElementWithClass(
      "div",
      "recipe-container"
    );

    lunch.appendChild(lunchRecipes);
    summary.appendChild(lunch);

    // dinner
    const dinner = this.#createElementWithClass("div", "dinner");

    dinner.appendChild(this.createMealHeader("Dinner", 0));

    const dinnerRecipes = this.#createElementWithClass(
      "div",
      "recipe-container"
    );

    dinner.appendChild(dinnerRecipes);
    summary.appendChild(dinner);

    return summary;
  }

  createMealHeader(mealType) {
    const header = document.createElement("div");
    header.classList.add(`${mealType.toLowerCase()}-header`);

    const mealTitle = document.createElement("h2");
    mealTitle.classList.add("bold", "italic");
    mealTitle.textContent = mealType;
    header.appendChild(mealTitle);

    const calorieText = document.createElement("p");
    const calorieCount = document.createElement("span");
    calorieCount.classList.add(`${mealType.toLowerCase()}-calories`);
    calorieCount.textContent = 0;
    calorieText.appendChild(calorieCount);
    calorieText.appendChild(document.createTextNode(" calories"));
    header.appendChild(calorieText);

    const addButton = document.createElement("button");
    addButton.classList.add("button");
    addButton.setAttribute("data-id", `add-${mealType.toLowerCase()}-btn`);
    addButton.textContent = "+";
    header.appendChild(addButton);

    return header;
  }
  createDayHeader(date, totalCalories) {
    const header = this.#createElementWithClass("div", "day-header");

    const dateElement = this.#createElementWithClass("h2", "selected-date");
    dateElement.textContent = date;
    header.appendChild(dateElement);

    const totalCaloriesElement = document.createElement("h3");
    totalCaloriesElement.innerHTML = `total calories: <span class="total-calories">${totalCalories}</span> calories`;
    header.appendChild(totalCaloriesElement);

    return header;
  }

  createRecipePreview(recipe, id = -1) {
    const card = this.#createElementWithClass("div", "recipe-card");
    card.setAttribute("data-id-recipe", id);

    const title = this.#createElementWithClass("h3", "recipe-title");
    title.textContent = recipe.title;
    card.appendChild(title);

    const image = this.#createElementWithClass("img", "recipe-image");
    image.src = recipe.image;
    image.alt = recipe.title;
    card.appendChild(image);

    const calorieCount = this.#createElementWithClass(
      "h4",
      "recipe-calorie-count"
    );
    calorieCount.textContent = `${recipe.nutrition.calories} calories`;
    card.appendChild(calorieCount);

    const saveRecipeBtn = this.#createElementWithClass("button", "button");
    saveRecipeBtn.textContent = "Save to Favorites";
    saveRecipeBtn.setAttribute("data-id", "save-recipe-btn");
    card.appendChild(saveRecipeBtn);

    return card;
  }

  showSelectedDaySummary() {}

  #createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
  }

  bindSundayEvent(eventHandler) {
    this.$.sundayBtn.addEventListener("click", eventHandler);
  }

  bindMondayEvent(eventHandler) {
    this.$.mondayBtn.addEventListener("click", eventHandler);
  }

  bindTuesdayEvent(eventHandler) {
    this.$.tuesdayBtn.addEventListener("click", eventHandler);
  }

  bindWednesdayEvent(eventHandler) {
    this.$.wednesdayBtn.addEventListener("click", eventHandler);
  }

  bindThursdayEvent(eventHandler) {
    this.$.thursdayBtn.addEventListener("click", eventHandler);
  }

  bindFridayEvent(eventHandler) {
    this.$.fridayBtn.addEventListener("click", eventHandler);
  }

  bindSaturdayEvent(eventHandler) {
    this.$.saturdayBtn.addEventListener("click", eventHandler);
  }
}
