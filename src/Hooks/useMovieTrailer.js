import { API_OPTIONS} from "../Utils/constant";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import { addTrailerVideo } from "../Utils/movieSlice";

const useMovieTrailer = (movieId)=>{
  const dispatch = useDispatch();
  //fetch and update the store 
  const getMovieVideo = async () => {
    if(!movieId) return;
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
        API_OPTIONS
      );
      const res = await data.json();
      
      if (!res.results || res.results.length === 0) {
        dispatch(addTrailerVideo(null));
        return;
      }

      // Filter videos by site (only YouTube)
      const youtubeVideos = res.results.filter((video) => video.site === "YouTube");
      
      if (youtubeVideos.length === 0) {
        dispatch(addTrailerVideo(null));
        return;
      }

      // Priority order: Trailer > Teaser > Clip > Featurette > Behind the Scenes > Other
      const videoTypes = ["Trailer", "Teaser", "Clip", "Featurette", "Behind the Scenes"];
      
      let selectedVideo = null;
      
      // Try to find video in priority order
      for (const type of videoTypes) {
        const filtered = youtubeVideos.filter((video) => video.type === type);
        if (filtered.length > 0) {
          selectedVideo = filtered[0];
          break;
        }
      }
      
      // If no video found in priority types, use the first YouTube video
      if (!selectedVideo) {
        selectedVideo = youtubeVideos[0];
      }
      
      dispatch(addTrailerVideo(selectedVideo));
    } catch (error) {
      console.error("Error fetching movie videos:", error);
      dispatch(addTrailerVideo(null));
    }
  };

  useEffect(() => {
    getMovieVideo();
  },[movieId]);
}
export default useMovieTrailer;