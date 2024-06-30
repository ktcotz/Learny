import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./popcorn/features/movies/data";
import { MovieList } from "./popcorn/features/movies/MovieList";
import { Logo } from "./popcorn/features/components/Logo";
import { Navbar } from "./popcorn/layout/Navbar";
import { NumResults } from "./popcorn/features/components/NumResults";
import { Search } from "./popcorn/features/components/Search";
import { Main } from "./popcorn/layout/Main";
import { Box } from "./popcorn/features/components/Box";
import { WatchedMovieList } from "./popcorn/features/movies/WatchedMovieList";
import { WatchedMoviesSummary } from "./popcorn/features/movies/WatchedMoviesSummary";
import { Loader } from "./popcorn/features/components/Loader";
import { ErrorMessage } from "./popcorn/features/components/ErrorMessage";
import { SelectedMovie } from "./popcorn/features/movies/SelectedMovie";

export const API_KEY = "6f788cfc";
export const App = () => {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [selectedMovieID, setSelectedMovieID] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSelectMovie = (id: string) => {
    setSelectedMovieID(selectedMovieID === id ? null : id);
  };

  const handleCloseMovie = () => {
    setSelectedMovieID(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        if (!query) return;

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching data!");
        }

        const data = await res.json();

        console.log(data);

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        if (data.Response === "True") {
          setMovies(data.Search);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedMovieID ? (
            <SelectedMovie
              selectedID={selectedMovieID}
              onBack={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};
