import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

export const SearchOrder = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-sm placeholder:text-stone-400 rounded-full bg-yellow-100 px-4 py-2 w-28 sm:w-64 focus:w-72 transition-all focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
      />
    </form>
  );
};
