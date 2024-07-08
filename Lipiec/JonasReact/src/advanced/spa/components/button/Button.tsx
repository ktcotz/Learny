import { ReactNode } from "react";
import styled from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  onClick?: (event: any) => void;
  type: string;
};

export const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${styled.btn} ${styled[type]}`}>
      {children}
    </button>
  );
};
