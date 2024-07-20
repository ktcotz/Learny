import { useEffect, useState } from "react";
import { API_KEY } from "../../../App";
import { StarsRating } from "../stars/StarsRating";
import { WatchedMovieData } from "./WatchedMovie";

type SelectedMovieProps = {
  selectedID: string;
  watched: WatchedMovieData[];
  onBack: () => void;
  onAddWatchedMovie: (watchedMovie: WatchedMovieData) => void;
};

export const SelectedMovie = ({
  selectedID,
  onBack,
  onAddWatchedMovie,
  watched,
}: SelectedMovieProps) => {
  const [movie, setMovie] = useState<any>(null);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.find((watch) => watch.imdbID === selectedID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedID}`
        );

        const data = await res.json();

        setMovie(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    };

    fetchData();
  }, [selectedID]);

  useEffect(() => {
    if (!movie?.Title) return;

    document.title = `Movie | ${movie.Title}`;

    return () => {
      document.title = "usePopcorn!";
    };
  }, [movie?.Title]);

  useEffect(() => {
    const keyPress = (key: string) => {
      if (key === "Escape") {
        onBack();
      }
    };

    window.addEventListener("keydown", (ev) => {
      keyPress(ev.key);
    });

    return () => {
      window.removeEventListener("keydown", (ev) => {
        keyPress(ev.key);
      });
    };
  }, [onBack]);

  const handleAdd = () => {
    const watchedMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      runtime: movie.Runtime,
      imdbRating: movie.imdbRating,
      userRating,
    };

    onAddWatchedMovie(watchedMovie);
  };

  return (
    <div className="details">
      {movie && (
        <>
          <header>
            <button className="btn-back" onClick={onBack}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>👌</span>
                {movie.imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarsRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rated this movie with {isWatched.userRating}{" "}
                  stars!
                </p>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directred by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
};
