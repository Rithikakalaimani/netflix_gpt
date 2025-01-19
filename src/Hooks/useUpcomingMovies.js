import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { addUpcomingMovies } from "../Utils/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const getUpcomingMovies = async () => {
    const data = await fetch(
     'https://api.themoviedb.org/3/movie/upcoming?page=1',
      API_OPTIONS
    );
    const res = await data.json();
    dispatch(addUpcomingMovies(res.results));
  };
  useEffect(() => {
    getUpcomingMovies();
  }, []);
};
export default useUpcomingMovies;
