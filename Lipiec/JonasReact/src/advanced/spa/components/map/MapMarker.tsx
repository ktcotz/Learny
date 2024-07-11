import { Marker, Popup } from "react-leaflet";
import { Position } from "../cities/city/City";

type MapMarkerProps = {
  mapPosition: Position;
};

export const MapMarker = ({ mapPosition }: MapMarkerProps) => {
  return (
    <Marker position={[mapPosition.lat, mapPosition.lng]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};
