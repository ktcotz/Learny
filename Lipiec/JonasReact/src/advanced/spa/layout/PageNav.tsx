import { NavLink } from "react-router-dom";
import styled from "./PageNav.module.css";
import Logo from "../components/logo/Logo";

export const PageNav = () => {
  return (
    <nav className={styled.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styled.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
