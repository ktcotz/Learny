export type WatchedMovieData = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
};

export const WatchedMovie = ({
  imdbID,
  Poster,
  Title,
  imdbRating,
  userRating,
  runtime,
}: WatchedMovieData) => {
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
      </div>
    </li>
  );
};
