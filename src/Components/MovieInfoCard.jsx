import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_OPTIONS } from "../Utils/constant";
import { IMG_CDN_URL } from "../Utils/constant";
import WatchlistButton from "./WatchlistButton";
import GenreTag from "./GenreTag";

const MovieInfoCard = ({ movieId, onClose, isTVShow = false }) => {
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!movieId) return;
      try {
        setLoading(true);
        const endpoint = isTVShow
          ? `https://api.themoviedb.org/3/tv/${movieId}?language=en-US`
          : `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const response = await fetch(endpoint, API_OPTIONS);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId, isTVShow]);

  if (loading || !movieDetails) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-black rounded-lg p-8">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  const {
    title,
    name,
    overview,
    genres = [],
    release_date,
    first_air_date,
    runtime,
    number_of_seasons,
    number_of_episodes,
    vote_average,
    backdrop_path,
    poster_path,
  } = movieDetails;

  const displayTitle = title || name;
  const displayDate = release_date || first_air_date;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop Image */}
        {backdrop_path && (
          <div className="relative h-64 md:h-80">
            <img
            src={IMG_CDN_URL + backdrop_path}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 transition-all"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster */}
            {poster_path && (
              <div className="flex-shrink-0">
                <img
                  src={IMG_CDN_URL + poster_path}
                  alt={displayTitle}
                  className="w-32 md:w-48 rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl md:text-4xl font-bold text-white">
                  {displayTitle}
                </h2>
                <WatchlistButton movie={movieDetails} />
              </div>

              {overview && (
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                  {overview}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {genres.map((genre) => (
                  <GenreTag key={genre.id} genre={genre} />
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-300 mb-4">
                {displayDate && (
                  <span>
                    {isTVShow ? "First Aired" : "Release Date"}: {new Date(displayDate).getFullYear()}
                  </span>
                )}
                {isTVShow ? (
                  <>
                    {number_of_seasons && <span>Seasons: {number_of_seasons}</span>}
                    {number_of_episodes && <span>Episodes: {number_of_episodes}</span>}
                  </>
                ) : (
                  runtime && <span>Runtime: {runtime} min</span>
                )}
                {vote_average && (
                  <span>Rating: {vote_average.toFixed(1)} ⭐</span>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    onClose();
                    navigate(isTVShow ? `/tv/${movieId}` : `/movie/${movieId}`);
                  }}
                  className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-opacity-80 transition-all"
                >
                  ▶ Play
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-600 text-white font-bold rounded hover:bg-opacity-80 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoCard;
