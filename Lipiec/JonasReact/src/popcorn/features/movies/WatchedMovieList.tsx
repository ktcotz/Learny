import { WatchedMovie, WatchedMovieData } from "./WatchedMovie";

type WatchedMovieListProps = {
  watched: WatchedMovieData[];
};

export const WatchedMovieList = ({ watched }: WatchedMovieListProps) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie {...movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};
