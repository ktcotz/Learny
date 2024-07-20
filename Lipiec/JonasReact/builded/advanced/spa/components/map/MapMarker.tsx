import { Marker, Popup } from "react-leaflet";
import { CityData } from "../cities/city/City";

type MapMarkerProps = {
  city: CityData;
};

export const MapMarker = ({ city }: MapMarkerProps) => {
  return (
    <Marker position={[city.position.lat, city.position.lng]}>
      <Popup>
        <span>{city.emoji} </span>
        <span>{city.cityName} </span>
      </Popup>
    </Marker>
  );
};
