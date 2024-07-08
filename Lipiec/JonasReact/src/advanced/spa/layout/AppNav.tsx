import { NavLink } from "react-router-dom";
import styled from "./AppNav.module.css";

export const AppNav = () => {
  return (
    <nav className={styled.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
};
