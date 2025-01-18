import { API_OPTIONS} from "../Utils/constant";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { addTrailerVideo } from "../Utils/movieSlice";

const useMovieTrailer = (movieId)=>{
  const dispatch = useDispatch();
  //fetch and update the store 
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
      API_OPTIONS
    );
    const res = await data.json();
    const filterTrailer = res.results.filter((video) => video.type === "Trailer");
    const trailer = filterTrailer.length ? filterTrailer[0] : res.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideo();
  }, []);
}
export default useMovieTrailer;