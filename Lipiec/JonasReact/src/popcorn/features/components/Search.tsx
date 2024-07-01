import { useEffect, useRef } from "react";

type SearchProps = {
  query: string;
  setQuery: (newQuery: string) => void;
};

export const Search = ({ query, setQuery }: SearchProps) => {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchRef.current) return;

    searchRef.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchRef}
    />
  );
};
