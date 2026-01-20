import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./Header";
import MovieVideoBackground from "./MovieVideoBackground";
import MovieList from "./MovieList";
import WatchlistButton from "./WatchlistButton";
import GenreTag from "./GenreTag";
import useMovieDetails from "../Hooks/useMovieDetails";
import useSimilarMovies from "../Hooks/useSimilarMovies";
import { clearSelectedMovie } from "../Utils/movieSlice";
import { useDispatch } from "react-redux";

const MoviePage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const selectedMovie = useSelector((store) => store.movies?.selectedMovie);
  const similarMovies = useSelector((store) => store.movies?.similarMovies);

  useMovieDetails(movieId);
  useSimilarMovies(movieId);

  useEffect(() => {
    // Clear old movie data if movieId doesn't match
    if (selectedMovie && selectedMovie.id !== parseInt(movieId)) {
      dispatch(clearSelectedMovie());
    }
  }, [movieId, selectedMovie, dispatch]);

  useEffect(() => {
    return () => {
      // Clean up when component unmounts
      dispatch(clearSelectedMovie());
    };
  }, [dispatch]);

  if (!selectedMovie || selectedMovie.id !== parseInt(movieId)) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const {
    title,
    overview,
    genres = [],
    release_date,
    runtime,
    vote_average,
    id,
  } = selectedMovie;

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="md:pt-0 pt-20">
        <MovieVideoBackground movieId={id} />
      </div>
      <div className="bg-stone-900 px-2 md:px-10 py-8">
        <div className="text-white mb-6 relative">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              {title}
            </h1>
            <WatchlistButton movie={selectedMovie} variant="inline" />
          </div>
          {overview && (
            <p className="text-sm md:text-base text-gray-300 mb-4 max-w-4xl">
              {overview}
            </p>
          )}
          <div className="flex flex-wrap gap-4 mb-4">
            {genres.map((genre) => (
              <GenreTag key={genre.id} genre={genre} />
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-300">
            {release_date && (
              <span>Release Date: {new Date(release_date).getFullYear()}</span>
            )}
            {runtime && <span>Runtime: {runtime} min</span>}
            {vote_average && (
              <span>Rating: {vote_average.toFixed(1)} ⭐</span>
            )}
          </div>
        </div>
        {similarMovies && similarMovies.length > 0 && (
          <MovieList title="Similar Movies" movies={similarMovies} />
        )}
      </div>
    </div>
  );
};

export default MoviePage;
