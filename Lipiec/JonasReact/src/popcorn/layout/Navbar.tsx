import { ReactNode } from "react";

type NavbarProps = {
  children: ReactNode;
};

export const Navbar = ({ children }: NavbarProps) => {
  return <nav className="nav-bar">{children}</nav>;
};
