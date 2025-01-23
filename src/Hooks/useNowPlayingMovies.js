import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addnowPlayingMovies } from "../Utils/movieSlice";
import {API_OPTIONS} from "../Utils/constant";


const useNowPlayingMovies = ()=>{
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(store=>store.movies.nowPlayingMovies);
  const getNowPlayingMovies = async () => {
    const data = await fetch(
    'https://api.themoviedb.org/3/movie/now_playing?page=1',
      API_OPTIONS
    );
    const res = await data.json();
    dispatch(addnowPlayingMovies(res.results));
  };
  useEffect(() => {
    !nowPlayingMovies&&getNowPlayingMovies();
  },[]);
}
export default useNowPlayingMovies;