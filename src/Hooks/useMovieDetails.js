import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { addSelectedMovie } from "../Utils/movieSlice";

const useMovieDetails = (movieId) => {
  const dispatch = useDispatch();
  
  const getMovieDetails = async () => {
    if (!movieId) return;
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      API_OPTIONS
    );
    const res = await data.json();
    dispatch(addSelectedMovie(res));
  };

  useEffect(() => {
    getMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);
};

export default useMovieDetails;
