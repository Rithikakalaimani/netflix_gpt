import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAiringTodayTV } from "../Utils/tvShowsSlice";
import { API_OPTIONS } from "../Utils/constant";

const useAiringTodayTV = () => {
  const dispatch = useDispatch();
  const airingTodayTV = useSelector((store) => store.tvShows.airingTodayTV);

  const getAiringTodayTV = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
      API_OPTIONS
    );
    const res = await data.json();
    dispatch(addAiringTodayTV(res.results));
  };

  useEffect(() => {
    !airingTodayTV && getAiringTodayTV();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAiringTodayTV;
