import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import { CityItem } from "./CityItem";
import styled from "./CityList.module.css";
import { useCity } from "./context/useCity";

export const CityList = () => {
  const { isLoading, cities } = useCity();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking by clicking on a city on the map" />
    );

  return (
    <ul className={styled.cityList}>
      {cities.map((city) => (
        <CityItem {...city} key={city.id} />
      ))}
    </ul>
  );
};
