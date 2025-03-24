export default class Store {
  $ = {};

  #selectedDay = { date: null };

  #sunday = {
    date: null,
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #monday = {
    date: null,
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #tuesday = {
    date: null,
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #wednesday = {
    date: null,
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #thursday = {
    date: null,
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #friday = {
    date: null,
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  };
  #saturday = {
    date: null,
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
  constructor() {}

  get selectedDay() {
    return this.#selectedDay.date;
  }

  set selectedDay(day) {
    this.#selectedDay.date = day;
  }

  get week() {
    return this.#week;
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
}
