import { useEffect } from "react";
import {useDispatch} from "react-redux";
import { addnowPlayingMovies } from "../Utils/movieSlice";
import {API_OPTIONS} from "../Utils/constant";
import { MOVIELIST_URL } from "../Utils/constant";

const useNowPlayingMovies = ()=>{
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    const data = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const res = await data.json();
    console.log(res);
    dispatch(addnowPlayingMovies(res.results));
  };
  useEffect(() => {
    getNowPlayingMovies();
  }, []);
}
export default useNowPlayingMovies;