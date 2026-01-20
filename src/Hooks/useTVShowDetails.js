import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { addSelectedTVShow } from "../Utils/tvShowsSlice";

const useTVShowDetails = (tvShowId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tvShowId) return;

    const fetchTVShowDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`,
          API_OPTIONS
        );
        const data = await response.json();
        dispatch(addSelectedTVShow(data));
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      }
    };

    fetchTVShowDetails();
  }, [tvShowId, dispatch]);
};

export default useTVShowDetails;
