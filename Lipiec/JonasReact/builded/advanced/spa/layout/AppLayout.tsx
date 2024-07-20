import { Map } from "../components/map/Map";
import { Sidebar } from "./Sidebar";
import styled from "./AppLayout.module.css";

export const AppLayout = () => {
  return (
    <div className={styled.app}>
      <Sidebar />
      <Map />
    </div>
  );
};
