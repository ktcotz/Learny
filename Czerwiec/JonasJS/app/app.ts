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

    this.addMarker(this.coords, "Custom Marker!");

    this.addEventListeners();
  }

  addMarker(position: number[], content: string) {
    if (!this.map) return;

    L.marker(position)
      .addTo(this.map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "running-popup",
          content,
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

      this.mapty_map.addMarker(this.mapty_map.coords, "COSIEK!");

      this.ui.hideError();
    });

    inputType?.addEventListener("change", () => {
      this.ui.toggleElevationField();
    });
  }
}

new App();
