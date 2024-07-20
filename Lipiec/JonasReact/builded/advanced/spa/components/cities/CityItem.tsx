import { Link } from "react-router-dom";
import { CityData } from "./city/City";
import styled from "./CityItem.module.css";
import { useCity } from "./context/useCity";

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export const CityItem = ({ id, cityName, emoji, date, position }: CityData) => {
  const { currentCity } = useCity();

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styled.cityItem} ${
          id === currentCity?.id ? styled["cityItem--active"] : ""
        }`}
      >
        <span className={styled.emoji}>{emoji}</span>
        <h3 className={styled.name}>{cityName}</h3>
        <time className={styled.date}>{formatDate(date)}</time>
        <button className={styled.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};
