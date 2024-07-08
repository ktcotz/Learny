import { useContext } from "react";
import { CityContext } from "./CityContext";

export const useCity = () => {
  const context = useContext(CityContext);

  if (context === null) {
    throw new Error("Context invalid!");
  }

  return context;
};
