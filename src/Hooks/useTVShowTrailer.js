import { API_OPTIONS } from "../Utils/constant";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addTVTrailerVideo } from "../Utils/tvShowsSlice";

const useTVShowTrailer = (tvShowId) => {
  const dispatch = useDispatch();
  const getTVShowVideo = async () => {
    if (!tvShowId) return;
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/" + tvShowId + "/videos?language=en-US",
      API_OPTIONS
    );
    const res = await data.json();
    const youtubeVideos = res.results.filter((video) => video.site === "YouTube");

    const trailer =
      youtubeVideos.find((video) => video.type === "Trailer") ||
      youtubeVideos.find((video) => video.type === "Teaser") ||
      youtubeVideos.find((video) => video.type === "Clip") ||
      youtubeVideos.find((video) => video.type === "Featurette") ||
      youtubeVideos.find((video) => video.type === "Behind the Scenes") ||
      youtubeVideos[0];

    dispatch(addTVTrailerVideo(trailer || null));
  };

  useEffect(() => {
    getTVShowVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tvShowId]);
};

export default useTVShowTrailer;
