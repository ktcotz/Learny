type SearchProps = {
  query: string;
  setQuery: (newQuery: string) => void;
};

export const Search = ({ query, setQuery }: SearchProps) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
