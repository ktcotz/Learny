import { WatchedMovie, WatchedMovieData } from "./WatchedMovie";

type WatchedMovieListProps = {
  watched: WatchedMovieData[];
  onDelete: (id: string) => void;
};

export const WatchedMovieList = ({
  watched,
  onDelete,
}: WatchedMovieListProps) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie {...movie} key={movie.imdbID} onDelete={onDelete} />
      ))}
    </ul>
  );
};
