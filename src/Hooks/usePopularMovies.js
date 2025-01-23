import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addPopularMovies } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constant";

const usePopularMovies = () => {

  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const getPopularMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?page=1',
      API_OPTIONS
    );
    const res = await data.json();
    dispatch(addPopularMovies(res.results));
  };
  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};
export default usePopularMovies;
