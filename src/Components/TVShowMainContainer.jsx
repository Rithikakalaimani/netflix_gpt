import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VideoTitle from "./VideoTitle";
import TVShowVideoBackgroundHome from "./TVShowVideoBackgroundHome";
import MovieInfoCard from "./MovieInfoCard";

const TVShowMainContainer = () => {
  const [showInfoCard, setShowInfoCard] = useState(false);
  const navigate = useNavigate();
  const tvShows = useSelector((store) => store.tvShows?.airingTodayTV);
  
  if (!tvShows) return;
  const mainTVShow = tvShows[0];
  const { name, overview, id } = mainTVShow;

  const handlePlayClick = () => {
    navigate(`/tv/${id}`);
  };

  const handleMoreInfoClick = () => {
    setShowInfoCard(true);
  };

  const handleCloseInfoCard = () => {
    setShowInfoCard(false);
  };

  return (
    <div className="md:pt-0 pt-20">
      <VideoTitle
        title={name}
        overview={overview}
        onPlayClick={handlePlayClick}
        onMoreInfoClick={handleMoreInfoClick}
      />
      <TVShowVideoBackgroundHome tvShowId={id} />
      {showInfoCard && (
        <MovieInfoCard movieId={id} onClose={handleCloseInfoCard} isTVShow={true} />
      )}
    </div>
  );
};

export default TVShowMainContainer;
