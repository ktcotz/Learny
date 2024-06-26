const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector<HTMLDivElement>(".countries");

const API_URL = "https://restcountries.com/v3.1";

const fetchCountry = async (country: string, extra?: string) => {
  try {
    const response = await fetch(`${API_URL}/name/${country}`);

    if (!response.ok) {
      throw new Error("Something goes wrong!");
    }

    const data = await response.json();

    renderCountry(data[0], extra);

    return data[0];
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

const renderCountry = (country: any, extra?: string) => {
  const html = /* HTML */ `
    <article class="country ${extra}">
      <img class="country__img" src="${country.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${country.name.common}</h3>
        <h4 class="country__region">REGION</h4>
        <p class="country__row">
          <span>👫</span>${(country.population / 1000000).toFixed(1)} people
        </p>
        <p class="country__row"><span>🗣️</span>LANG</p>
        <p class="country__row"><span>💰</span>CUR</p>
      </div>
    </article>
  `;

  countriesContainer?.insertAdjacentHTML("beforeend", html);
  countriesContainer!.style.opacity = "1";
};

const fetchCountryWithNeighbour = async (countryName: string) => {
  const country = await fetchCountry(countryName);
  const neighbour = await fetchCountry(country.borders[0], "neighbour");
};

// CODING CHALLENGE #1

const getUserLocationByCoords = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=464168014728347330177x30970`
    );

    if (!response.ok) {
      throw new Error(`Error : ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

const whereAmI = async (lat: number, lng: number) => {
  const data = await getUserLocationByCoords(lat, lng);
  console.log(`You are in ${data?.city}, ${data?.country}`);

  await fetchCountry(data.country);
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
