export type MovieData = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

type MovieProps = {
  onSelectMovie: (id: string) => void;
};

export const Movie = ({
  imdbID,
  Title,
  Year,
  Poster,
  onSelectMovie,
}: MovieData & MovieProps) => {
  return (
    <li key={imdbID} onClick={() => onSelectMovie(imdbID)}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
};
