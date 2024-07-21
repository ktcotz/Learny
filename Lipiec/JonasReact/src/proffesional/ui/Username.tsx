import { useBoundStore } from "../store/store";

export const Username = () => {
  const name = useBoundStore((state) => state.name);

  if (!name) return null;

  return <p className="text-sm font-semibold hidden md:block">{name}</p>;
};
