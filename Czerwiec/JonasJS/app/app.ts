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

class CustomError {
  setError<T extends HTMLElement>(parentElement: T | null, error: string) {
    if (!parentElement) return;

    parentElement?.insertAdjacentHTML(
      "beforeend",
      `<p class="error">${error}</p>`
    );
  }
}

class MaptyMap {
  private parentElement = document.querySelector<HTMLDivElement>("#map");
  private mapService = new MapService();
  private coords: GeolocationCoordinates | null = null;

  constructor() {
    this.initialize();
  }

  async initialize() {
    const coords = await this.mapService.getGeolocation(this.parentElement);

    if (coords) {
      this.coords = coords;
    }

    console.log(this.coords);
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

      const { coords } = position;

      return coords;
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        this.customError.setError(parent, err.message);
      }
    }
  }
}

new MaptyMap();
