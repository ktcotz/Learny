import { Movie, MovieData } from "./Movie";

type MovieListProps = {
  movies: MovieData[];
  onSelectMovie: (id: string) => void;
};

export const MovieList = ({ movies, onSelectMovie }: MovieListProps) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie {...movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};
