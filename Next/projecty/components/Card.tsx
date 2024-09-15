import { ReactNode } from "react";

export default function Card({ children }: { children?: ReactNode }) {
  return (
    <div className="border rounded-md border-gray-600 p-4">{children}</div>
  );
}
