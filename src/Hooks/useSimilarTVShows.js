import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { addSimilarTVShows } from "../Utils/tvShowsSlice";

const useSimilarTVShows = (tvShowId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tvShowId) return;

    const fetchSimilarTVShows = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShowId}/similar?language=en-US&page=1`,
          API_OPTIONS
        );
        const data = await response.json();
        dispatch(addSimilarTVShows(data.results || []));
      } catch (error) {
        console.error("Error fetching similar TV shows:", error);
      }
    };

    fetchSimilarTVShows();
  }, [tvShowId, dispatch]);
};

export default useSimilarTVShows;
