import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import TVShowList from "./TVShowList";

const GPTMovieSuggestions = () => {
  const { movieNames, movieResults, tvShowNames, tvShowResults } = useSelector((store) => store.gpt);
  
  const hasMovies = movieNames && movieResults && movieNames.length > 0;
  const hasTVShows = tvShowNames && tvShowResults && tvShowNames.length > 0;
  
  if (!hasMovies && !hasTVShows) return null;

  return (
    <div className="bg-stone-900 m-3 md:m-20 rounded-md pb-6">
      <div>
        {/* Display Movies */}
        {hasMovies && movieNames.map((movieName, index) => {
          const movies = movieResults[index];
          // Only render if there are actual movies to display
          if (movies && Array.isArray(movies) && movies.length > 0) {
            return (
              <MovieList
                key={`${movieName}-${index}`}
                title={movieName}
                movies={movies}
              />
            );
          }
          return null;
        })}
        
        {/* Display TV Shows */}
        {hasTVShows && tvShowNames.map((tvShowName, index) => {
          const tvShows = tvShowResults[index];
          // Only render if there are actual TV shows to display
          if (tvShows && Array.isArray(tvShows) && tvShows.length > 0) {
            return (
              <TVShowList
                key={`${tvShowName}-${index}`}
                title={tvShowName}
                tvShows={tvShows}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
