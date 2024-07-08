import { createContext, ReactNode, useEffect, useState } from "react";
import { CityData } from "../city/City";

type CityContextState = {
  cities: CityData[];
  isLoading: boolean;
};

export const CityContext = createContext<CityContextState | null>(null);

type CityContextProviderProps = {
  children: ReactNode;
};

const URL = "http://localhost:8080/cities";

export const CityContextProvider = ({ children }: CityContextProviderProps) => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(URL);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = (await res.json()) as CityData[];

        setCities(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <CityContext.Provider value={{ cities, isLoading }}>
      {children}
    </CityContext.Provider>
  );
};
