import View from "./view.js";
import Store from "./store.js";

function init() {
  const view = new View();
  const store = new Store();

  const today = new Date();
  const dayOfWeek = today.getDay();

  // if sunday make offset -7, else make it dayofweek
  const offset = dayOfWeek === 0 ? -7 : -dayOfWeek;

  const sunday = new Date(today);
  sunday.setDate(today.getDate() + offset);
  const sundayNode = view.createDayOutput(sunday);

  const monday = new Date(sunday);
  monday.setDate(sunday.getDate() + 1);
  const mondayNode = view.createDayOutput(monday);

  const tuesday = new Date(monday);
  tuesday.setDate(monday.getDate() + 1);
  const tuesdayNode = view.createDayOutput(tuesday);

  const wednesday = new Date(monday);
  wednesday.setDate(monday.getDate() + 2);
  const wednesdayNode = view.createDayOutput(wednesday);

  const thursday = new Date(monday);
  thursday.setDate(monday.getDate() + 3);
  const thursdayNode = view.createDayOutput(thursday);

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  const fridayNode = view.createDayOutput(friday);

  const saturday = new Date(monday);
  saturday.setDate(monday.getDate() + 5);
  const saturdayNode = view.createDayOutput(saturday);

  store.setWeekDates(
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday
  );

  store.setDayNodes(
    sundayNode.outerHTML,
    mondayNode.outerHTML,
    tuesdayNode.outerHTML,
    wednesdayNode.outerHTML,
    thursdayNode.outerHTML,
    fridayNode.outerHTML,
    saturdayNode.outerHTML
  );

  view.updateDays(store.week.sunday.date);

  view.bindSundayEvent(() => {
    store.selectedDay = sunday;
    view.setSelectedDay(store.getDayNode(0).innerHTML);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindMondayEvent(() => {
    store.selectedDay = monday;
    view.setSelectedDay(store.getDayNode(1).innerHTML);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindTuesdayEvent(() => {
    store.selectedDay = tuesday;
    view.setSelectedDay(store.getDayNode(2).innerHTML);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindWednesdayEvent(() => {
    store.selectedDay = wednesday;
    view.setSelectedDay(store.getDayNode(3).innerHTML);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindThursdayEvent(() => {
    store.selectedDay = thursday;
    view.setSelectedDay(store.getDayNode(4).innerHTML);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindFridayEvent(() => {
    store.selectedDay = friday;
    view.setSelectedDay(store.getDayNode(5).innerHTML);
    console.log(`Selected day: ${store.selectedDay}`);
  });

  view.bindSaturdayEvent(() => {
    store.selectedDay = saturday;
    view.setSelectedDay(store.getDayNode(6).innerHTML);
    console.log(`Selected day: ${store.selectedDay}`);
  });
}

window.addEventListener("load", init);
