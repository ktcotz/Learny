import { ReactNode, useState } from "react";

type BoxProps = {
  children: ReactNode;
};

export const Box = ({ children }: BoxProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};
