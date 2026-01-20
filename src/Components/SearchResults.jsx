import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../Utils/constant";

const SearchResults = () => {
  const navigate = useNavigate();
  const { movieResults, tvShowResults, actorResults, genreResults, isLoading, query } =
    useSelector((store) => store.search);

  const hasResults =
    movieResults.length > 0 ||
    tvShowResults.length > 0 ||
    actorResults.length > 0 ||
    (genreResults.movies && genreResults.movies.length > 0);

  if (!query || query.trim().length < 2) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-black bg-opacity-95 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
        <div className="p-4 text-white text-center">Searching...</div>
      </div>
    );
  }

  if (!hasResults) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-black bg-opacity-95 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
        <div className="p-4 text-white text-center">
          No results found for "{query}"
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute top-full left-0 right-0 mt-2 bg-black bg-opacity-95 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto"
      style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
    >
      <div className="p-4">
        {/* Movies Section */}
        {movieResults.length > 0 && (
          <div className="mb-4">
            <h3 className="text-white font-semibold mb-2 text-sm">
              Movies ({movieResults.length})
            </h3>
            <div className="space-y-2">
              {movieResults.slice(0, 5).map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => {
                    navigate(`/movie/${movie.id}`);
                  }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                >
                  {movie.poster_path ? (
                    <img
                      src={IMG_CDN_URL + movie.poster_path}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-16 bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {movie.title}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
              {movieResults.length > 5 && (
                <button
                  onClick={() => navigate(`/search?q=${encodeURIComponent(query)}&type=movies`)}
                  className="w-full text-blue-400 hover:text-blue-300 text-sm py-2"
                >
                  View all {movieResults.length} movies →
                </button>
              )}
            </div>
          </div>
        )}

        {/* TV Shows Section */}
        {tvShowResults.length > 0 && (
          <div className="mb-4">
            <h3 className="text-white font-semibold mb-2 text-sm">
              TV Shows ({tvShowResults.length})
            </h3>
            <div className="space-y-2">
              {tvShowResults.slice(0, 5).map((tvShow) => (
                <div
                  key={tvShow.id}
                  onClick={() => {
                    navigate(`/tv/${tvShow.id}`);
                  }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                >
                  {tvShow.poster_path ? (
                    <img
                      src={IMG_CDN_URL + tvShow.poster_path}
                      alt={tvShow.name}
                      className="w-12 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-16 bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {tvShow.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {tvShow.first_air_date
                        ? new Date(tvShow.first_air_date).getFullYear()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
              {tvShowResults.length > 5 && (
                <button
                  onClick={() => navigate(`/search?q=${encodeURIComponent(query)}&type=tvshows`)}
                  className="w-full text-blue-400 hover:text-blue-300 text-sm py-2"
                >
                  View all {tvShowResults.length} TV shows →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Actors Section */}
        {actorResults.length > 0 && (
          <div className="mb-4">
            <h3 className="text-white font-semibold mb-2 text-sm">
              Actors ({actorResults.length})
            </h3>
            <div className="space-y-2">
              {actorResults.slice(0, 5).map((actor) => (
                <div
                  key={actor.id}
                  onClick={() => {
                    navigate(`/actor/${actor.id}`);
                  }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                >
                  {actor.profile_path ? (
                    <img
                      src={IMG_CDN_URL + actor.profile_path}
                      alt={actor.name}
                      className="w-12 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-16 bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {actor.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {actor.known_for_department || "Actor"}
                    </p>
                  </div>
                </div>
              ))}
              {actorResults.length > 5 && (
                <button
                  onClick={() => navigate(`/search?q=${encodeURIComponent(query)}&type=actors`)}
                  className="w-full text-blue-400 hover:text-blue-300 text-sm py-2"
                >
                  View all {actorResults.length} actors →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Genres Section */}
        {genreResults.genres && genreResults.genres.length > 0 && (
          <div className="mb-4">
            <h3 className="text-white font-semibold mb-2 text-sm">
              Genres ({genreResults.genres.length})
            </h3>
            <div className="space-y-2">
              {genreResults.genres.map((genre) => (
                <div
                  key={genre.id}
                  onClick={() => {
                    navigate(`/genre/${genre.id}`);
                  }}
                  className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                >
                  <div className="w-12 h-16 bg-gradient-to-br from-red-600 to-purple-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {genre.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {genre.name}
                    </p>
                    <p className="text-gray-400 text-xs">Genre</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View All Results */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <button
            onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-medium transition-colors"
          >
            View All Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
