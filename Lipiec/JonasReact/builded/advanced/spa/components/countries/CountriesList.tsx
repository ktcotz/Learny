import { useCity } from "../cities/context/useCity";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import CountryItem, { CountryData } from "./CountryItem";
import styled from "./CountryList.module.css";

export const CountriesList = () => {
  const { isLoading, cities } = useCity();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking by clicking on a city on the map" />
    );

  const countries = cities.reduce((acc: CountryData[], city) => {
    if (!acc.map((el) => el.country).includes(city.country)) {
      return [...acc, { country: city.country, emoji: city.emoji }];
    } else {
      return acc;
    }
  }, []);

  return (
    <ul className={styled.countryList}>
      {countries.map((country) => (
        <CountryItem {...country} key={country.country} />
      ))}
    </ul>
  );
};
