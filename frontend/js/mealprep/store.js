export default class Store {
  $ = {};

  #selectedDay = { date: null };

  #sunday = {
    date: null,
    html: "",
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #monday = {
    date: null,
    html: "",
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #tuesday = {
    date: null,
    html: "",
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #wednesday = {
    date: null,
    html: "",
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #thursday = {
    date: null,
    html: "",
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #friday = {
    date: null,
    html: "",
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #saturday = {
    date: null,
    html: "",
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };

  #week = {
    selectedDay: this.#selectedDay,
    sunday: this.#sunday,
    monday: this.#monday,
    tuesday: this.#tuesday,
    wednesday: this.#wednesday,
    thursday: this.#thursday,
    friday: this.#friday,
    saturday: this.#saturday,
  };
  constructor() {
    this.$.apiKey = "8edf14d31d184cc8b150c289c049b124";
  }

  get selectedDay() {
    return this.#selectedDay.date;
  }

  set selectedDay(day) {
    this.#selectedDay.date = day;
  }

  get week() {
    return this.#week;
  }

  #getKey() {
    return this.$.apiKey;
  }

  getDayNode(dayIndex) {
    const tempNode = document.createElement("div");

    switch (dayIndex) {
      case 0:
        tempNode.innerHTML = this.#sunday.html;
        break;
      case 1:
        tempNode.innerHTML = this.#monday.html;
        break;
      case 2:
        tempNode.innerHTML = this.#tuesday.html;
        break;
      case 3:
        tempNode.innerHTML = this.#wednesday.html;
        break;
      case 4:
        tempNode.innerHTML = this.#thursday.html;
        break;
      case 5:
        tempNode.innerHTML = this.#friday.html;
        break;
      case 6:
        tempNode.innerHTML = this.#saturday.html;
        break;
      default:
        tempNode.innerHTML = "Invalid day";
        break;
    }
    return tempNode.firstElementChild;
  }

  setDayNodes(
    sundayHTML,
    mondayHTML,
    tuesdayHTML,
    wednesdayHTML,
    thursdayHTML,
    fridayHTML,
    saturdayHTML
  ) {
    this.#sunday.html = sundayHTML;
    this.#monday.html = mondayHTML;
    this.#tuesday.html = tuesdayHTML;
    this.#wednesday.html = wednesdayHTML;
    this.#thursday.html = thursdayHTML;
    this.#friday.html = fridayHTML;
    this.#saturday.html = saturdayHTML;
  }

  setWeekDates(sunday, monday, tuesday, wednesday, thursday, friday, saturday) {
    this.#sunday.date = sunday;
    this.#monday.date = monday;
    this.#tuesday.date = tuesday;
    this.#wednesday.date = wednesday;
    this.#thursday.date = thursday;
    this.#friday.date = friday;
    this.#saturday.date = saturday;
  }

  async fetchRecipeInfo(id) {
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
}
