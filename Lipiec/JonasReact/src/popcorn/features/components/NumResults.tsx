import { MovieData } from "../movies/Movie";

type NumResultsProps = {
  movies: MovieData[];
};

export const NumResults = ({ movies }: NumResultsProps) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};
