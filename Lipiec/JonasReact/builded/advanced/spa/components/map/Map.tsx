import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "./Map.module.css";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import { MapMarker } from "./MapMarker";
import { useCity } from "../cities/context/useCity";

export const Map = () => {
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState<LatLngTuple>([40, 0]);
  const { cities } = useCity();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigate = useNavigate();

  useEffect(() => {
    if (lat && lng) {
      const position = [Number(lat), Number(lng)] as LatLngTuple;
      setMapPosition(position);
    }
  }, [lat, lng]);

  const ChangeCenter = () => {
    const map = useMap();
    map.setView(mapPosition);
    return null;
  };

  const DetectClick = () => {
    useMapEvents({
      click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });

    return null;
  };

  return (
    <div className={styled.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        tap={true}
        scrollWheelZoom={true}
        className={styled.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <MapMarker city={city} key={city.id} />
        ))}
        <ChangeCenter />
        <DetectClick />
      </MapContainer>
    </div>
  );
};
