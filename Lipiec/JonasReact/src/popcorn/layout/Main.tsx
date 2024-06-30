import { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export const Main = ({ children }: MainProps) => {
  return <nav className="main">{children}</nav>;
};
