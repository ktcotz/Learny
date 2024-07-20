export type WatchedMovieData = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
};

type WatchedMovieProps = {
  onDelete: (id: string) => void;
};

export const WatchedMovie = ({
  imdbID,
  Poster,
  Title,
  imdbRating,
  userRating,
  runtime,
  onDelete,
}: WatchedMovieData & WatchedMovieProps) => {
  return (
    <li key={imdbID}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDelete(imdbID)}>
          X
        </button>
      </div>
    </li>
  );
};
