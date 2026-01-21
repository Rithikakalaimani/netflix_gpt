import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularTV } from "../Utils/tvShowsSlice";
import { API_OPTIONS } from "../Utils/constant";

const usePopularTV = () => {
  const dispatch = useDispatch();
  const popularTV = useSelector((store) => store.tvShows.popularTV);

  const getPopularTV = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const res = await data.json();
    dispatch(addPopularTV(res.results));
  };

  useEffect(() => {
    !popularTV && getPopularTV();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePopularTV;
