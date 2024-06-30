import { useEffect, useState } from "react";
import { API_KEY } from "../../../App";
import { StarsRating } from "../stars/StarsRating";

type SelectedMovieProps = {
  selectedID: string;
  onBack: () => void;
};

export const SelectedMovie = ({ selectedID, onBack }: SelectedMovieProps) => {
  const [movie, setMovie] = useState<any>(null);

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
              <StarsRating maxRating={10} size={24} />
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
