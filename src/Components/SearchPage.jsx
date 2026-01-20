import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import MovieList from "./MovieList";
import TVShowList from "./TVShowList";
import useSearch from "../Hooks/useSearch";
import { setSearchQuery, clearSearchResults } from "../Utils/searchSlice";
import { IMG_CDN_URL } from "../Utils/constant";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "all";
  
  const { movieResults, tvShowResults, actorResults, genreResults, isLoading } = useSelector(
    (store) => store.search
  );

  // Use search hook with the query from URL
  useSearch(query);

  useEffect(() => {
    if (query) {
      dispatch(setSearchQuery(query));
    } else {
      dispatch(clearSearchResults());
      navigate("/browse");
    }
  }, [query, dispatch, navigate]);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Searching...</div>
        </div>
      </div>
    );
  }

  const hasResults =
    movieResults.length > 0 ||
    tvShowResults.length > 0 ||
    actorResults.length > 0 ||
    (genreResults.movies && genreResults.movies.length > 0);

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="pt-20 px-4 md:px-10 py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-6">
          {query ? `Search Results for "${query}"` : "Search"}
        </h1>

        {!hasResults && query && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">
              No results found for "{query}"
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              Go Back to Browse
            </button>
          </div>
        )}

        {/* Movies Section */}
        {(type === "all" || type === "movies") && movieResults.length > 0 && (
          <div className="mb-8">
            <MovieList title="Movies" movies={movieResults} />
          </div>
        )}

        {/* TV Shows Section */}
        {(type === "all" || type === "tvshows") && tvShowResults.length > 0 && (
          <div className="mb-8">
            <TVShowList title="TV Shows" tvShows={tvShowResults} />
          </div>
        )}

        {/* Actors Section */}
        {(type === "all" || type === "actors") && actorResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              Actors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {actorResults.map((actor) => (
                <div
                  key={actor.id}
                  onClick={() => navigate(`/actor/${actor.id}`)}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  {actor.profile_path ? (
                    <img
                      src={IMG_CDN_URL + actor.profile_path}
                      alt={actor.name}
                      className="w-full h-auto rounded-md"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-gray-700 rounded-md flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                  <p className="text-white text-sm mt-2 text-center">
                    {actor.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Genre Results */}
        {genreResults.genres &&
          genreResults.genres.length > 0 &&
          genreResults.movies &&
          genreResults.movies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                {genreResults.genres[0].name} Movies
              </h2>
              <MovieList title="" movies={genreResults.movies} />
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchPage;
