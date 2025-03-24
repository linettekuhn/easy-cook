import View from "./view.js";
import Store from "./store.js";

function init() {
  const view = new View();
  const store = new Store();

  const today = new Date();
  const dayOfWeek = today.getDay();

  // if sunday make offset -7, else make it dayofw
  const offset = dayOfWeek === 0 ? -7 : -dayOfWeek;

  const sunday = new Date(today);
  sunday.setDate(today.getDate() + offset);

  const monday = new Date(sunday);
  monday.setDate(today.getDate() + 1);

  const tuesday = new Date(monday);
  tuesday.setDate(monday.getDate() + 2);

  const wednesday = new Date(monday);
  wednesday.setDate(monday.getDate() + 3);

  const thursday = new Date(monday);
  thursday.setDate(monday.getDate() + 4);

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 5);

  const saturday = new Date(monday);
  saturday.setDate(monday.getDate() + 6);

  store.setWeekDates(
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
  );
  view.updateDays(store.week.sunday.date);

  view.bindSundayEvent(() => {
    store.selectedDay = sunday;
    view.setSelectedDay(sunday);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindMondayEvent(() => {
    store.selectedDay = monday;
    view.setSelectedDay(monday);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindTuesdayEvent(() => {
    store.selectedDay = tuesday;
    view.setSelectedDay(tuesday);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindWednesdayEvent(() => {
    store.selectedDay = wednesday;
    view.setSelectedDay(wednesday);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindThursdayEvent(() => {
    store.selectedDay = thursday;
    view.setSelectedDay(thursday);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindFridayEvent(() => {
    store.selectedDay = friday;
    view.setSelectedDay(friday);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindSaturdayEvent(() => {
    store.selectedDay = saturday;
    view.setSelectedDay(saturday);
    console.log(`Selected day: ${store.selectedDay}`);
  });
}

window.addEventListener("load", init);
