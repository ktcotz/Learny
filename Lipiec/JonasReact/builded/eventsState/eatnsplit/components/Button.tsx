import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button className="button" {...rest}>
      {children}
    </button>
  );
};
