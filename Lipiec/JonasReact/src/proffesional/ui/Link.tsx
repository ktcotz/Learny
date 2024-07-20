import { ReactNode } from "react";
import { Link, LinkProps, useNavigate } from "react-router-dom";

export const LinkButton = ({
  children,
  to,
  ...rest
}: { children: ReactNode } & LinkProps) => {
  const navigate = useNavigate();
  const base = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

  if (to === "-1") {
    return (
      <button onClick={() => navigate(-1)} className={base}>
        {children}
      </button>
    );
  }

  return (
    <Link {...rest} to={to} className={base}>
      {children}
    </Link>
  );
};
