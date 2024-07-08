import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "./Map.module.css";

export const Map = () => {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigate = useNavigate();

  return (
    <div className={styled.mapContainer} onClick={() => navigate("form")}>
      lat:{lat}, lng:{lng}
    </div>
  );
};
