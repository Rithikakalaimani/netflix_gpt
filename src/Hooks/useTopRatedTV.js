import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedTV } from "../Utils/tvShowsSlice";
import { API_OPTIONS } from "../Utils/constant";

const useTopRatedTV = () => {
  const dispatch = useDispatch();
  const topRatedTV = useSelector((store) => store.tvShows.topRatedTV);

  const getTopRatedTV = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const res = await data.json();
    dispatch(addTopRatedTV(res.results));
  };

  useEffect(() => {
    !topRatedTV && getTopRatedTV();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTopRatedTV;
