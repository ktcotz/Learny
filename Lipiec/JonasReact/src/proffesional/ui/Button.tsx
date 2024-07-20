import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

export const Button = ({
  children,
  to,
  modifier = "primary",
  ...rest
}: {
  children: ReactNode;
  to?: string;
  modifier?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const base =
    "bg-yellow-400 text-sm uppercase font-semibold text-stone-800  inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-all focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2";

  const modifiers = {
    primary: base + " py-3 px-4 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "border-2 text-sm border-stone-300 uppercase font-semibold text-stone-400  inline-block tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 transition-all focus:outline-none focus:ring focus:ring-stone-200 focus:bg-stone-300 focus:ring-offset-2 px-4 py-2.5 md:px-6 md:py-3.5",
  };

  if (to) {
    return (
      <Link to={to} className={modifiers[modifier]}>
        {children}
      </Link>
    );
  }

  return (
    <button {...rest} className={modifiers[modifier]}>
      {children}
    </button>
  );
};
