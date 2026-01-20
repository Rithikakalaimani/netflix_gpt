import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { addSimilarMovies } from "../Utils/movieSlice";

const useSimilarMovies = (movieId) => {
  const dispatch = useDispatch();
  
  const getSimilarMovies = async () => {
    if (!movieId) return;
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
      API_OPTIONS
    );
    const res = await data.json();
    dispatch(addSimilarMovies(res.results));
  };

  useEffect(() => {
    getSimilarMovies();
  }, [movieId]);
};

export default useSimilarMovies;
