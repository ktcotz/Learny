const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector<HTMLFormElement>(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType =
  document.querySelector<HTMLInputElement>(".form__input--type");
const inputDistance = document.querySelector<HTMLInputElement>(
  ".form__input--distance"
);
const inputDuration = document.querySelector<HTMLInputElement>(
  ".form__input--duration"
);
const inputCadence = document.querySelector<HTMLInputElement>(
  ".form__input--cadence"
);
const inputElevation = document.querySelector<HTMLInputElement>(
  ".form__input--elevation"
);
