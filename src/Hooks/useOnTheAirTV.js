import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOnTheAirTV } from "../Utils/tvShowsSlice";
import { API_OPTIONS } from "../Utils/constant";

const useOnTheAirTV = () => {
  const dispatch = useDispatch();
  const onTheAirTV = useSelector((store) => store.tvShows.onTheAirTV);

  const getOnTheAirTV = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
      API_OPTIONS
    );
    const res = await data.json();
    dispatch(addOnTheAirTV(res.results));
  };

  useEffect(() => {
    !onTheAirTV && getOnTheAirTV();
  }, []);
};

export default useOnTheAirTV;
