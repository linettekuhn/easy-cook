export default class View {
  $ = {};

  constructor() {
    this.$.selectedDateDisplay = this.#qs(".selected-date");
    this.$.sundayBtn = this.#qs('[data-id="sunday-btn"]');
    this.$.mondayBtn = this.#qs('[data-id="monday-btn"]');
    this.$.tuesdayBtn = this.#qs('[data-id="tuesday-btn"]');
    this.$.wednesdayBtn = this.#qs('[data-id="wednesday-btn"]');
    this.$.thursdayBtn = this.#qs('[data-id="thursday-btn"]');
    this.$.fridayBtn = this.#qs('[data-id="friday-btn"]');
    this.$.saturdayBtn = this.#qs('[data-id="saturday-btn"]');
    this.$.days = this.#qs(".days");
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

  setSelectedDay(day) {
    const display = this.$.selectedDateDisplay;
    display.textContent = `${day.toDateString()}`;
  }
  createDay() {}

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

    const calorieCount = this.#createElementWithClass(
      "h4",
      "recipe-calorie-count"
    );
    calorieCount.textContent = `${recipe.} calories`;
    card.appendChild(ingredientsTitle);

    const saveRecipeBtn = this.#createElementWithClass("button", "button");
    saveRecipeBtn.textContent = "Save to Favorites";
    saveRecipeBtn.setAttribute("data-id", "save-recipe-btn");
    card.appendChild(saveRecipeBtn);

    return card;
  }

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
