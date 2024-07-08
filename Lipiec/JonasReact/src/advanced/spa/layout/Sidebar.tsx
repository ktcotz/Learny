import { Outlet } from "react-router";
import Logo from "../components/logo/Logo";
import { AppNav } from "./AppNav";
import styled from "./Sidebar.module.css";

export const Sidebar = () => {
  return (
    <div className={styled.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styled.footer}>
        <p className={styled.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWide Inc.
        </p>
      </footer>
    </div>
  );
};
