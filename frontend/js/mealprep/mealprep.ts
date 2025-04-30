import View from "./view.js";
import Store from "./store.js";

function init() {
  const view = new View();
  const store = new Store();

  const today = new Date();
  const dayOfWeek = today.getDay();

  // if sunday make offset -7, else make it dayofweek
  const offset = dayOfWeek === 0 ? -7 : -dayOfWeek;

  // initialize days of the week
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset + i);
    let day = store.week.days[i];
    day.date = date;
    day.html = view.createDayOutput(day);
  }

  view.updateDays(store.week.days);

  view.bindSundayEvent(() => {
    store.week.selectedDay = store.week.days[0];
    view.setSelectedDay(store.week.days[0].html);
    console.log(`Selected day: ${store.week.selectedDay}`);
  });

  view.bindMondayEvent(() => {
    store.week.selectedDay = store.week.days[1];
    view.setSelectedDay(store.week.days[1].html);
    console.log(`Selected day: ${store.week.selectedDay}`);
  });

  view.bindTuesdayEvent(() => {
    store.week.selectedDay = store.week.days[2];
    view.setSelectedDay(store.week.days[2].html);
    console.log(`Selected day: ${store.week.selectedDay}`);
  });

  view.bindWednesdayEvent(() => {
    store.week.selectedDay = store.week.days[3];
    view.setSelectedDay(store.week.days[3].html);
    console.log(`Selected day: ${store.week.selectedDay}`);
  });

  view.bindThursdayEvent(() => {
    store.week.selectedDay = store.week.days[4];
    view.setSelectedDay(store.week.days[4].html);
    console.log(`Selected day: ${store.week.selectedDay}`);
  });

  view.bindFridayEvent(() => {
    store.week.selectedDay = store.week.days[5];
    view.setSelectedDay(store.week.days[5].html);
    console.log(`Selected day: ${store.week.selectedDay}`);
  });

  view.bindSaturdayEvent(() => {
    store.week.selectedDay = store.week.days[6];
    view.setSelectedDay(store.week.days[6].html);
    console.log(`Selected day: ${store.week.selectedDay}`);
  });
}

window.addEventListener("load", init);
