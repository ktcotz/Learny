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

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  description!: string;
  type!: string;

  constructor(
    public coords: number[],
    public distance: number,
    public duration: number
  ) {}

  setDescription() {
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

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  pace!: number;
  type = "running";
  constructor(
    public coords: number[],
    public distance: number,
    public duration: number,
    public cadence: number
  ) {
    super(coords, distance, duration);

    this.calcPace();
    this.setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  speed!: number;
  type = "cycling";
  constructor(
    public coords: number[],
    public distance: number,
    public duration: number,
    public elevationGain: number
  ) {
    super(coords, distance, duration);

    this.calcSpeed();
    this.setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class UI {
  mapElement = document.querySelector<HTMLDivElement>("#map");

  showForm() {
    form?.classList.remove("hidden");
    inputDistance?.focus();
  }

  hideError() {
    if (!form) return;

    this.clearInputs([
      inputDistance,
      inputDuration,
      inputCadence,
      inputElevation,
    ]);

    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  toggleElevationField() {
    inputElevation
      ?.closest(".form__row")
      ?.classList.toggle("form__row--hidden");
    inputCadence?.closest(".form__row")?.classList.toggle("form__row--hidden");
  }

  clearInputs(inputs: (HTMLInputElement | null)[]) {
    if (!inputs) return [];

    inputs.forEach((input) => (input!.value = ""));
  }
}

class CustomError {
  setError<T extends HTMLElement>(parentElement: T | null, error: string) {
    if (!parentElement) return;

    parentElement?.insertAdjacentHTML(
      "beforeend",
      `<p class="error">${error}</p>`
    );
  }
}

class MaptyMap extends UI {
  private mapService = new MapService();
  coords: number[] | null = null;
  private map: L.Map | null = null;

  private mapOptions = {
    zoom: 13,
    maxZoom: 19,
  };

  constructor() {
    super();
    this.initialize();
  }

  async initialize() {
    const coords = await this.mapService.getGeolocation(this.mapElement);

    if (coords) {
      this.coords = coords;
    }

    this.generateMap();
  }

  private generateMap() {
    if (!this.coords || !this.mapElement) return;

    this.map = L.map(this.mapElement).setView(
      this.coords,
      this.mapOptions.zoom
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: this.mapOptions.maxZoom,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.addEventListeners();
  }

  addMarker(workout: Running | Cycling) {
    if (!this.map) return;

    L.marker(workout.coords)
      .addTo(this.map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
          content: `${workout.description}`,
        })
      )
      .openPopup();
  }

  private addEventListeners() {
    if (!this.map) return;

    this.map.on("click", (ev) => {
      const { lat, lng } = ev.latlng;

      this.coords = [lat, lng];

      this.showForm();
    });
  }
}

class MapService {
  private customError = new CustomError();

  private getCurrentPosition(): Promise<
    GeolocationPosition | GeolocationPositionError
  > {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  }

  async getGeolocation<T extends HTMLElement>(parent: T | null) {
    if (!parent) return;

    try {
      const position = await this.getCurrentPosition();

      if (!(position instanceof GeolocationPosition)) return;

      const {
        coords: { latitude, longitude },
      } = position;

      return [latitude, longitude];
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        this.customError.setError(parent, err.message);
      }
    }
  }
}

class App {
  private mapty_map = new MaptyMap();
  private ui = new UI();
  private workouts: (Running | Cycling)[] = [];

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.mapty_map.initialize();

    this.addEventListeners();
  }

  private addEventListeners() {
    form?.addEventListener("submit", (ev) => {
      ev.preventDefault();

      this.addWorkout();

      this.ui.hideError();
    });

    inputType?.addEventListener("change", () => {
      this.ui.toggleElevationField();
    });
  }

  private addWorkout() {
    const validInputs = (inputs: number[]) => {
      return inputs.every((input) => Number.isFinite(input));
    };
    const positiveInputs = (inputs: number[]) => {
      return inputs.every((input) => input > 0);
    };

    const type = inputType?.value;
    const distance = Number(inputDistance?.value);
    const duration = Number(inputDuration?.value);

    const additional =
      type === "running"
        ? Number(inputCadence?.value)
        : Number(inputElevation?.value);

    if (
      !validInputs([distance, duration, additional]) ||
      !positiveInputs([distance, duration, additional])
    ) {
      return alert("Inputs have to be positive number!");
    }

    const workout =
      type === "running"
        ? new Running(this.mapty_map.coords, distance, duration, additional)
        : new Cycling(this.mapty_map.coords, distance, duration, additional);

    this.workouts.push(workout);

    this.renderWorkout(workout);

    this.mapty_map.addMarker(workout);

    this.ui.clearInputs([
      inputDistance,
      inputDuration,
      inputCadence,
      inputElevation,
    ]);
  }

  private renderWorkout(workout: Running | Cycling) {
    const html = /* HTML */ `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">
            ${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span
          >
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">min</span>
        </div>
        ${workout.type === "running"
          ? /* HTML */ `<div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value"
                  >${workout instanceof Running ? workout.pace : 0}</span
                >
                <span class="workout__unit">min/km</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value"
                  >${workout instanceof Running ? workout.cadence : 0}</span
                >
                <span class="workout__unit">spm</span>
              </div>`
          : null}
        ${workout.type === "cycling"
          ? /* HTML */ ` <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value"
                  >${workout instanceof Cycling ? workout.speed : 0}</span
                >
                <span class="workout__unit">km/h</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value"
                  >${workout instanceof Cycling
                    ? workout.elevationGain
                    : 0}</span
                >
                <span class="workout__unit">m</span>
              </div>`
          : null}
      </li>
    `;

    form?.insertAdjacentHTML("afterend", html);
  }
}

new App();
