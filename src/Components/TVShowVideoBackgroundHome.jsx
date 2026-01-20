import { useState, useEffect } from "react";
import useTVShowTrailer from "../Hooks/useTVShowTrailer";
import { useSelector } from "react-redux";
import { API_OPTIONS, IMG_CDN_URL } from "../Utils/constant";

const TVShowVideoBackgroundHome = ({tvShowId}) => {
  const trailerVideo = useSelector((store) => store.tvShows?.trailerVideo);
  const [backdropImage, setBackdropImage] = useState(null);
  useTVShowTrailer(tvShowId);

  useEffect(() => {
    if (!trailerVideo?.key && tvShowId) {
      const fetchBackdrop = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`,
            API_OPTIONS
          );
          const data = await response.json();
          if (data.backdrop_path) {
            setBackdropImage(IMG_CDN_URL + data.backdrop_path);
          }
        } catch (error) {
          console.error("Error fetching backdrop:", error);
        }
      };
      fetchBackdrop();
    } else {
      setBackdropImage(null);
    }
  }, [trailerVideo, tvShowId]);
  
  if (!trailerVideo?.key) {
    if (backdropImage) {
      return (
        <div className='w-screen aspect-video relative bg-black'>
          <img
            src={backdropImage}
            alt="TV Show backdrop"
            className='w-screen aspect-video object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent' />
        </div>
      );
    }
    return (
      <div className='w-screen aspect-video bg-black flex items-center justify-center'>
        <div className='text-white'>Loading...</div>
      </div>
    );
  }
  
  return (
    <div>
      <iframe
        key={trailerVideo.key}
        className='w-screen aspect-video'
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo.key +
          "?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1&iv_load_policy=3&loop=1"
        }
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      >
      </iframe>
    </div>
  );
}

export default TVShowVideoBackgroundHome;
