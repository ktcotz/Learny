import { useParams } from "react-router";
import { formatDate } from "../CityItem";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCity } from "../context/useCity";
import Spinner from "../../spinner/Spinner";

export type CityData = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: Position;
  id: string;
};

export type Position = {
  lat: number;
  lng: number;
};

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCity();

  useEffect(() => {
    if (id) {
      getCity(Number(id));
    }
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    currentCity && (
      <div className={styles.city}>
        <div className={styles.row}>
          <h6>City name</h6>
          <h3>
            <span>{currentCity.emoji}</span> {currentCity.cityName}
          </h3>
        </div>

        <div className={styles.row}>
          <h6>You went to {currentCity.cityName} on</h6>
          <p>{formatDate(currentCity.date)}</p>
        </div>

        {currentCity.notes && (
          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{currentCity.notes}</p>
          </div>
        )}

        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${currentCity.cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {currentCity.cityName} on Wikipedia &rarr;
          </a>
        </div>
      </div>
    )
  );
}

export default City;
