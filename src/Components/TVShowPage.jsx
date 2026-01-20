import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./Header";
import TVShowVideoBackground from "./TVShowVideoBackground";
import TVShowList from "./TVShowList";
import WatchlistButton from "./WatchlistButton";
import GenreTag from "./GenreTag";
import useTVShowDetails from "../Hooks/useTVShowDetails";
import useSimilarTVShows from "../Hooks/useSimilarTVShows";
import { clearSelectedTVShow } from "../Utils/tvShowsSlice";
import { useDispatch } from "react-redux";

const TVShowPage = () => {
  const { tvShowId } = useParams();
  const dispatch = useDispatch();
  const selectedTVShow = useSelector((store) => store.tvShows?.selectedTVShow);
  const similarTVShows = useSelector((store) => store.tvShows?.similarTVShows);

  useTVShowDetails(tvShowId);
  useSimilarTVShows(tvShowId);

  useEffect(() => {
    if (selectedTVShow && selectedTVShow.id !== parseInt(tvShowId)) {
      dispatch(clearSelectedTVShow());
    }
  }, [tvShowId, selectedTVShow, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedTVShow());
    };
  }, [dispatch]);

  if (!selectedTVShow || selectedTVShow.id !== parseInt(tvShowId)) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const {
    name,
    overview,
    genres = [],
    first_air_date,
    number_of_seasons,
    number_of_episodes,
    vote_average,
    id,
  } = selectedTVShow;

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="md:pt-0 pt-20">
        <TVShowVideoBackground tvShowId={id} />
      </div>
      <div className="bg-stone-900 px-2 md:px-10 py-8">
        <div className="text-white mb-6 relative">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              {name}
            </h1>
            <WatchlistButton movie={selectedTVShow} variant="inline" />
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
            {first_air_date && (
              <span>First Aired: {new Date(first_air_date).getFullYear()}</span>
            )}
            {number_of_seasons && (
              <span>Seasons: {number_of_seasons}</span>
            )}
            {number_of_episodes && (
              <span>Episodes: {number_of_episodes}</span>
            )}
            {vote_average && (
              <span>Rating: {vote_average.toFixed(1)} ⭐</span>
            )}
          </div>
        </div>
        {similarTVShows && similarTVShows.length > 0 && (
          <TVShowList title="Similar TV Shows" tvShows={similarTVShows} />
        )}
      </div>
    </div>
  );
};

export default TVShowPage;
